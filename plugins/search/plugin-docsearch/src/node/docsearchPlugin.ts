import { getFullLocaleConfig } from '@vuepress/helper'
import type { Plugin } from 'vuepress/core'
import { docSearchLocaleInfo } from './locales.js'
import type { DocSearchPluginOptions } from './options.js'
import { prepareClientConfig } from './prepareClientConfig.js'
import { PLUGIN_NAME } from './utils.js'

/**
 * DocSearch plugin
 *
 * DocSearch 插件
 *
 * @example
 * ```ts
 * import { docsearchPlugin } from '@vuepress/plugin-docsearch'
 *
 * export default {
 *   plugins: [
 *     docsearchPlugin({
 *       appId: 'XXXXXX',
 *       apiKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
 *       indices: ['xxxxxxxx'],
 *       locales: {
 *         '/': {
 *           placeholder: 'Search Documentation',
 *         },
 *         '/zh/': {
 *           placeholder: '搜索文档',
 *         },
 *       },
 *     }),
 *   ],
 * }
 * ```
 *
 * @returns Plugin object / 插件对象
 */
export const docsearchPlugin = ({
  injectStyles = true,
  indexBase,
  locales = {},
  ...options
}: DocSearchPluginOptions = {}): Plugin => ({
  name: PLUGIN_NAME,

  define: (app) => ({
    __DOCSEARCH_INDEX_BASE__: indexBase || app.siteData.base,
    __DOCSEARCH_OPTIONS__: {
      ...options,
      locales: getFullLocaleConfig({
        app,
        default: docSearchLocaleInfo,
        name: PLUGIN_NAME,
        // @ts-expect-error: outer object of deep locales can be optional in docsearch
        config: locales,
      }),
    },
  }),

  clientConfigFile: (app) => prepareClientConfig(app, injectStyles),
})
