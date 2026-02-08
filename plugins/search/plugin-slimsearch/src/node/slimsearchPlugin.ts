import {
  addViteOptimizeDepsInclude,
  addViteSsrNoExternal,
  fromEntries,
  getFullLocaleConfig,
} from '@vuepress/helper'
import { watch } from 'chokidar'
import type { PluginFunction } from 'vuepress/core'

import type { SearchIndexStore } from '../shared/index.js'
import { getSearchIndexStore } from './generateIndex.js'
import { generateWorker } from './generateWorker.js'
import { slimsearchLocaleInfo } from './locales.js'
import type { SlimSearchPluginOptions } from './options.js'
import { PathStore } from './pathStore.js'
import {
  prepareSearchIndex,
  prepareStore,
  prepareWorkerOptions,
  removeSearchIndex,
  updateSearchIndex,
} from './prepare.js'
import { CLIENT_FOLDER, PLUGIN_NAME, logger } from './utils.js'

export const slimsearchPlugin =
  (options: SlimSearchPluginOptions = {}): PluginFunction =>
  (app) => {
    if (app.env.isDebug) logger.info('Options:', options)

    const store = new PathStore()
    let searchIndexStore: SearchIndexStore | null = null

    return {
      name: PLUGIN_NAME,

      define: {
        __SLIMSEARCH_SUGGESTION__: options.suggestion ?? true,
        __SLIMSEARCH_CUSTOM_FIELDS__: fromEntries(
          options.customFields
            ?.map(({ formatter }, index) =>
              formatter ? [index.toString(), formatter] : null,
            )
            .filter((item): item is [string, string] => item != null) ?? [],
        ),
        __SLIMSEARCH_LOCALES__: getFullLocaleConfig({
          app,
          name: PLUGIN_NAME,
          config: options.locales,
          default: slimsearchLocaleInfo,
        }),
        __SLIMSEARCH_OPTIONS__: {
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
      },

      clientConfigFile: `${CLIENT_FOLDER}config.js`,

      extendsBundlerOptions: (bundlerOptions: unknown) => {
        addViteOptimizeDepsInclude(bundlerOptions, app, 'slimsearch', true)
        addViteSsrNoExternal(bundlerOptions, app, [
          '@vuepress/helper',
          'fflate',
          'vuepress-shared',
        ])
      },

      onInitialized: async () => {
        searchIndexStore = await getSearchIndexStore(app, options, store)
      },

      onPrepared: async () => {
        const { isBuild, isDev } = app.env

        const promises = [prepareStore(app, store)]

        if (isDev)
          promises.push(
            prepareSearchIndex(app, searchIndexStore!),
            prepareWorkerOptions(app, options),
          )

        await Promise.all(promises)

        // clean store in build to save memory
        if (isBuild) store.clear()
      },

      onWatched: (_, watchers) => {
        const hotReload = options.hotReload ?? app.env.isDebug

        if (hotReload) {
          // This ensure the page is generated or updated
          const searchIndexWatcher = watch('pages', {
            cwd: app.dir.temp(),
            ignoreInitial: true,
            // only watch vue files
            ignored: (path, stats) =>
              Boolean(stats?.isFile() && !path.endsWith('.vue')),
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
