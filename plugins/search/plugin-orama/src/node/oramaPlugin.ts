import {
  addViteOptimizeDepsInclude,
  addViteSsrNoExternal,
  fromEntries,
  getFullLocaleConfig,
} from '@vuepress/helper'
import type { Page, PluginFunction } from 'vuepress/core'

import type { SearchIndexStore } from '../shared/index.js'
import { getSearchIndexStore } from './generateIndex.js'
import { generateWorker } from './generateWorker.js'
import { oramaLocaleInfo } from './locales.js'
import type { OramaPluginOptions } from './options.js'
import { PathStore } from './pathStore.js'
import {
  prepareSearchIndex,
  prepareStore,
  prepareWorkerOptions,
  removeSearchIndex,
  updateSearchIndex,
} from './prepare.js'
import { CLIENT_FOLDER, PLUGIN_NAME, logger } from './utils.js'

export const oramaPlugin =
  (options: OramaPluginOptions = {}): PluginFunction =>
  (app) => {
    if (app.env.isDebug) logger.info('Options:', options)

    const store = new PathStore()
    let searchIndexStore: SearchIndexStore | null = null
    const indexesByPage = new Map<string, string[]>()

    return {
      name: PLUGIN_NAME,

      define: {
        __ORAMA_SUGGESTION__: options.suggestion ?? true,
        __ORAMA_CUSTOM_FIELDS__: fromEntries(
          options.customFields
            ?.map(({ formatter }, index) =>
              formatter ? [index.toString(), formatter] : null,
            )
            .filter((item): item is [string, string] => item != null) ?? [],
        ),
        __ORAMA_LOCALES__: getFullLocaleConfig({
          app,
          name: PLUGIN_NAME,
          config: options.locales,
          default: oramaLocaleInfo,
        }),
        __ORAMA_OPTIONS__: {
          searchDelay: options.searchDelay ?? 150,
          suggestDelay: options.suggestDelay ?? 0,
          queryHistoryCount: options.queryHistoryCount ?? 5,
          resultHistoryCount: options.resultHistoryCount ?? 5,
          hotKeys: options.hotKeys ?? [
            { key: 'k', ctrl: true },
            { key: '/', ctrl: true },
          ],
          worker: options.worker ?? 'orama.worker.js',
        },
      },

      clientConfigFile: `${CLIENT_FOLDER}config.js`,

      extendsBundlerOptions: (bundlerOptions: unknown) => {
        addViteOptimizeDepsInclude(bundlerOptions, app, '@orama/orama', true)
        addViteSsrNoExternal(bundlerOptions, app, [
          '@orama/orama',
          '@vuepress/helper',
          'vuepress-shared',
        ])
      },

      onInitialized: async () => {
        searchIndexStore = await getSearchIndexStore(
          app,
          options,
          store,
          indexesByPage,
        )
      },

      onPrepared: async () => {
        const { isBuild, isDev } = app.env

        const promises = [prepareStore(app, store)]

        if (isDev) {
          promises.push(
            prepareSearchIndex(app, searchIndexStore!),
            prepareWorkerOptions(app, options),
          )
        }

        await Promise.all(promises)

        // clean store in build to save memory
        if (isBuild) store.clear()
      },

      onPageUpdated: async (_, type, newPage, oldPage) => {
        if (!(options.hotReload ?? app.env.isDebug)) return

        if (type === 'delete') {
          await removeSearchIndex(
            app,
            {
              searchIndexStore: searchIndexStore!,
              store,
              indexesByPage,
            },
            oldPage as Page<{ excerpt?: string }>,
          )
        } else {
          await updateSearchIndex(
            app,
            options,
            {
              searchIndexStore: searchIndexStore!,
              store,
              indexesByPage,
            },
            newPage as Page<{ excerpt?: string }>,
          )
        }
      },

      onGenerated: () => generateWorker(app, options, searchIndexStore!),
    }
  }
