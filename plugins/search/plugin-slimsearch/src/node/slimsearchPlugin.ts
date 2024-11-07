import {
  addViteOptimizeDepsInclude,
  addViteSsrNoExternal,
  fromEntries,
  getLocaleConfig,
} from '@vuepress/helper'
import { watch } from 'chokidar'
import type { PluginFunction } from 'vuepress/core'

import type { SearchIndexStore } from '../shared/index.js'
import { getSearchIndexStore } from './generateIndex.js'
import { generateWorker } from './generateWorker.js'
import { searchProLocales } from './locales.js'
import type { SlimSearchPluginOptions } from './options.js'
import {
  prepareSearchIndex,
  prepareStore,
  removeSearchIndex,
  updateSearchIndex,
} from './prepare/index.js'
import { setPageExcerpt } from './setPageExcerpt.js'
import { CLIENT_FOLDER, PLUGIN_NAME, Store, logger } from './utils.js'

export const slimsearchPlugin =
  (options: SlimSearchPluginOptions): PluginFunction =>
  (app) => {
    if (app.env.isDebug) logger.info('Options:', options)

    const store = new Store()
    let searchIndexStore: SearchIndexStore | null = null

    return {
      name: PLUGIN_NAME,

      define: {
        SLIMSEARCH_ENABLE_AUTO_SUGGESTIONS: options.autoSuggestions ?? true,
        SLIMSEARCH_CUSTOM_FIELDS: fromEntries(
          options.customFields
            ?.map(({ formatter }, index) =>
              formatter ? [index.toString(), formatter] : null,
            )
            .filter((item): item is [string, string] => item !== null) ?? [],
        ),
        SLIMSEARCH_LOCALES: getLocaleConfig({
          app,
          name: PLUGIN_NAME,
          config: options.locales,
          default: searchProLocales,
        }),
        SLIMSEARCH_OPTIONS: {
          searchDelay: options.searchDelay ?? 150,
          suggestDelay: options.suggestDelay ?? 0,
          queryHistoryCount: options.queryHistoryCount ?? 5,
          resultHistoryCount: options.resultHistoryCount ?? 5,
          hotKeys: options.hotKeys ?? [
            { key: 'k', ctrl: true },
            { key: '/', ctrl: true },
          ],
          worker: options.worker ?? 'slimsearch.worker.js',
        },
        SLIMSEARCH_SORT_STRATEGY: JSON.stringify(options.sortStrategy ?? 'max'),
      },

      clientConfigFile: `${CLIENT_FOLDER}config.js`,

      extendsBundlerOptions: (bundlerOptions: unknown): void => {
        addViteOptimizeDepsInclude(bundlerOptions, app, 'slimsearch', true)
        addViteSsrNoExternal(bundlerOptions, app, [
          '@vuepress/helper',
          'fflate',
          'vuepress-shared',
        ])
      },

      onInitialized: async (): Promise<void> => {
        setPageExcerpt(app)
        searchIndexStore = await getSearchIndexStore(app, options, store)
      },

      onPrepared: async (): Promise<void> => {
        if (app.env.isDev) await prepareSearchIndex(app, searchIndexStore!)
        await prepareStore(app, store)
      },

      onWatched: (_, watchers): void => {
        const hotReload = options.hotReload ?? app.env.isDebug

        if (hotReload) {
          // This ensure the page is generated or updated
          const searchIndexWatcher = watch('pages/**/*.vue', {
            cwd: app.dir.temp(),
            ignoreInitial: true,
          })

          searchIndexWatcher.on('add', (path) => {
            void updateSearchIndex(app, options, searchIndexStore!, store, path)
          })
          searchIndexWatcher.on('change', (path) => {
            void updateSearchIndex(app, options, searchIndexStore!, store, path)
          })
          searchIndexWatcher.on('unlink', (path) => {
            void removeSearchIndex(app, searchIndexStore!, store, path)
          })

          watchers.push(searchIndexWatcher)
        }
      },

      onGenerated: () => generateWorker(app, options, searchIndexStore!),
    }
  }
