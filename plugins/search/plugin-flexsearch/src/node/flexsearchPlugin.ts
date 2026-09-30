import {
  addViteOptimizeDepsInclude,
  addViteSsrNoExternal,
  chainWebpack,
  fromEntries,
  getFullLocaleConfig,
} from '@vuepress/helper'
import { PathStore, searchLocaleInfo } from '@vuepress/search-helper'
import type { Page, PluginFunction } from 'vuepress/core'

import type { SearchIndexStore } from '../shared/index.js'
import { getSearchIndexStore } from './generateIndex.js'
import { generateWorker } from './generateWorker.js'
import type { FlexSearchPluginOptions } from './options.js'
import {
  prepareSearchIndex,
  prepareStore,
  prepareWorkerOptions,
  removeSearchIndex,
  updateSearchIndex,
} from './prepare.js'
import { CLIENT_FOLDER, PLUGIN_NAME, logger } from './utils.js'

export const flexsearchPlugin =
  (options: FlexSearchPluginOptions = {}): PluginFunction =>
  (app) => {
    if (app.env.isDebug) logger.info('Options:', options)

    const store = new PathStore()
    let searchIndexStore: SearchIndexStore | null = null
    const indexesByPage = new Map<string, string[]>()

    return {
      name: PLUGIN_NAME,

      define: {
        __FLEXSEARCH_CUSTOM_FIELDS__: fromEntries(
          options.customFields
            ?.map(({ formatter }, index) =>
              formatter ? [index.toString(), formatter] : null,
            )
            .filter((item): item is [string, string] => item != null) ?? [],
        ),
        __FLEXSEARCH_LOCALES__: getFullLocaleConfig({
          app,
          name: PLUGIN_NAME,
          config: options.locales,
          default: searchLocaleInfo,
        }),
        __FLEXSEARCH_OPTIONS__: {
          suggestion: options.suggestion ?? true,
          searchDelay: options.searchDelay ?? 150,
          suggestDelay: options.suggestDelay ?? 0,
          queryHistoryCount: options.queryHistoryCount ?? 5,
          resultHistoryCount: options.resultHistoryCount ?? 5,
          hotKeys: options.hotKeys ?? [
            { key: 'k', ctrl: true },
            { key: '/', ctrl: true },
          ],
          worker: options.worker ?? 'flexsearch.worker.js',
        },
      },

      clientConfigFile: () =>
        app.env.isDev
          ? `${CLIENT_FOLDER}config.dev.js`
          : `${CLIENT_FOLDER}config.js`,

      extendsBundlerOptions: (bundlerOptions: unknown) => {
        addViteOptimizeDepsInclude(bundlerOptions, app, 'flexsearch', true)
        addViteSsrNoExternal(bundlerOptions, app, [
          '@vuepress/helper',
          'fflate',
          'flexsearch',
        ])
        // The ESM build of flexsearch contains bare `import.meta.dirname`,
        // which webpack does not rewrite, so a classic worker can not parse
        // it. Resolve flexsearch to its classic build under webpack instead.
        // `process.getBuiltinModule` keeps a static `node:module` import out
        // of the bundle, which a browser worker could not resolve.
        chainWebpack(bundlerOptions, app, (config) => {
          const { createRequire } = process.getBuiltinModule('node:module')

          config.resolve.alias.set(
            'flexsearch$',
            createRequire(import.meta.url).resolve('flexsearch'),
          )
        })
      },

      onInitialized: () => {
        searchIndexStore = getSearchIndexStore(
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

        const context = {
          searchIndexStore: searchIndexStore!,
          store,
          indexesByPage,
        }

        if (type === 'delete') {
          await removeSearchIndex(
            app,
            context,
            oldPage as Page<{ excerpt?: string }>,
          )
        } else {
          await updateSearchIndex(
            app,
            options,
            context,
            newPage as Page<{ excerpt?: string }>,
            // The old page is needed to drop the documents of a page whose
            // path changed, since they were indexed under the old path
            (oldPage as Page<{ excerpt?: string }> | undefined) ?? undefined,
          )
        }
      },

      onGenerated: () => generateWorker(app, options, searchIndexStore!),
    }
  }
