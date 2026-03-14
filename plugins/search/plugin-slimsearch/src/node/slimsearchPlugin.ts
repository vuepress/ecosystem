import { fromEntries, getFullLocaleConfig } from '@vuepress/helper'
import type { Page, PluginFunction } from 'vuepress/core'

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

      onInitialized: async () => {
        searchIndexStore = await getSearchIndexStore(app, options, store)
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

      onPageUpdated: async (_, type, page) => {
        if (!(options.hotReload ?? app.env.isDebug)) return

        if (type === 'delete') {
          await removeSearchIndex(
            app,
            searchIndexStore!,
            store,
            page as Page<{ excerpt?: string }>,
          )
        } else {
          await updateSearchIndex(
            app,
            options,
            searchIndexStore!,
            store,
            page as Page<{ excerpt?: string }>,
          )
        }
      },

      onGenerated: () => generateWorker(app, options, searchIndexStore!),
    }
  }
