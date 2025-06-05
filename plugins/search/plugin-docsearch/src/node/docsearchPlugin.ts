import { getFullLocaleConfig } from '@vuepress/helper'
import type { Plugin } from 'vuepress/core'
import type { DocSearchOptions } from '../shared/index.js'
import { docSearchLocaleInfo } from './locales.js'
import { prepareClientConfig } from './prepareClientConfig.js'
import { PLUGIN_NAME } from './utils.js'

/**
 * Options for @vuepress/plugin-docsearch
 *
 * @vuepress/plugin-docsearch 的配置项
 */
export interface DocSearchPluginOptions extends DocSearchOptions {
  /**
   * Base path of the search index
   *
   * 搜索索引的基础路径
   */
  indexBase?: string

  /**
   * Whether to inject docsearch default styles
   *
   * 是否注入 docsearch 的默认样式
   *
   * @default true
   */
  injectStyles?: boolean
}

/**
 * DocSearch plugin
 *
 * DocSearch 插件
 *
 * @param options - DocSearch plugin options / DocSearch 插件选项
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
 *       indexName: 'xxxxxxxx',
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
