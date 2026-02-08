import type { DocSearchOptions } from '../shared/index.js'

/**
 * Options for `@vuepress/plugin-docsearch`
 *
 * `@vuepress/plugin-docsearch` 的配置项
 */
export interface DocSearchPluginOptions extends DocSearchOptions {
  /**
   * Base path of the search index
   *
   * 搜索索引的基础路径
   *
   * @default app.siteData.base
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
