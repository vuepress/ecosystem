import type { Page } from 'vuepress/core'

import type { SearchCustomFieldFormatter } from '../shared/index.js'

/** Options for a custom field to be indexed. 需要索引的自定义字段的选项。 */
export interface SearchCustomField {
  /**
   * Custom field getter
   *
   * 自定义项目的获取器
   *
   * @param page - VuePress page VuePress 页面
   * @returns Values of the custom field 自定义字段的值
   */
  getter: <
    ExtraPageData extends Record<string, unknown> = Record<never, never>,
    ExtraPageFrontmatter extends Record<string, unknown> = Record<
      string,
      unknown
    >,
    ExtraPageFields extends Record<string, unknown> = Record<never, never>,
  >(
    page: Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>,
  ) => string[] | string | null | undefined

  /**
   * Display content
   *
   * `$content` will be replaced by the content returned by `getter`
   *
   * 展示的内容
   *
   * `$content` 会被 `getter` 返回的内容替换
   *
   * @default `$content`
   */
  formatter?: SearchCustomFieldFormatter
}

/**
 * Options shared by the search plugins.
 *
 * 搜索插件共有的选项。
 */
export interface SearchPluginOptions {
  /**
   * Whether index page content
   *
   * By default only headings and excerpt of the page will be indexed, and the
   * content of the page will not be indexed. If you need to index the content
   * of the page, you can set this option to `true`
   *
   * 是否索引正文内容
   *
   * 默认情况下，只会索引页面的标题和摘要，不会索引页面的正文内容。如果需要索引页面的正文内容，可以将该选项设置为 `true`
   *
   * @default false
   */
  indexContent?: boolean

  /** Custom fields to be indexed 需要索引的自定义字段 */
  customFields?: SearchCustomField[]

  /**
   * Filter pages to be indexed
   *
   * 过滤需要索引的页面
   *
   * @param page - VuePress page VuePress 页面
   * @returns Whether the page should be indexed 是否索引该页面
   */
  filter?: (page: Page) => boolean

  /**
   * Tags whose content should be preserved
   *
   * Tags not in the default whitelist will not be indexed.
   *
   * 需要保留内容的标签
   *
   * 默认白名单之外的标签不会被索引。
   */
  preserveTags?: string[]
}
