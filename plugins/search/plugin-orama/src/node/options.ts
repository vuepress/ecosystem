import type { Tokenizer } from '@orama/orama'
import type { KeyOptions } from '@vuepress/helper'
import type { LocaleConfig, Page } from 'vuepress/core'

import type {
  OramaCustomFieldFormatter,
  OramaLocaleData,
  OramaSortStrategy,
} from '../shared/index.js'

export interface OramaIndexOptions {
  /**
   * Custom tokenizer
   *
   * When not provided, a tokenizer based on `Intl.Segmenter` will be created
   * for the locale language.
   *
   * 自定义分词器
   *
   * 未提供时，会为语言环境创建基于 `Intl.Segmenter` 的分词器。
   */
  tokenizer?: (language: string) => Tokenizer
}

export interface CustomFieldOptions {
  /**
   * Custom field getter
   *
   * 自定义项目的获取器
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
  formatter?: OramaCustomFieldFormatter
}

export interface OramaPluginOptions {
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

  /**
   * Whether provide auto suggestions while typing
   *
   * 是否在输入时提供自动建议
   *
   * @default true
   */
  suggestion?: boolean

  /**
   * Max stored query history count
   *
   * You can set it to `0` to disable it
   *
   * 存储查询历史的最大数量
   *
   * 可以将其设置为 `0` 来禁用
   *
   * @default 5
   */
  queryHistoryCount?: number

  /**
   * Max stored matched result history count
   *
   * You can set it to `0` to disable it
   *
   * 存储结果历史的最大数量
   *
   * 可以将其设置为 `0` 来禁用
   *
   * @default 5
   */
  resultHistoryCount?: number

  /**
   * Delay to start searching after input
   *
   * 结束输入到开始搜索的延时
   *
   * @default 150
   */
  searchDelay?: number

  /*
   * Delay to start auto-suggesting after input
   *
   * 结束输入到开始自动建议的延时
   *
   * @default 0
   */
  suggestDelay?: number

  /** Custom field for search */
  customFields?: CustomFieldOptions[]

  /**
   * Specify the [event.key](http://keycode.info/) of the hotkeys
   *
   * When hotkeys are pressed, the search box input will be focused. Set to an
   * empty array to disable hotkeys
   *
   * 指定热键的 [event.key](http://keycode.info/)
   *
   * 当热键被按下时，搜索框的输入框会被聚焦，设置为空数组以禁用热键
   *
   * @default [
   *   { key: "k", ctrl: true },
   *   { key: "/", ctrl: true },
   *  ]
   */
  hotKeys?: (KeyOptions | string)[]

  /**
   * Output worker filename
   *
   * Worker 输出文件名
   *
   * @default 'orama.worker.js'
   */
  worker?: string

  /**
   * Whether enable hmr
   *
   * 是否启用 hmr
   *
   * @default false
   */
  hotReload?: boolean

  /**
   * Locales config
   *
   * 多语言选项
   */
  locales?: LocaleConfig<OramaLocaleData>

  /**
   * Result Sort strategy
   *
   * When there are multiple matched results, the result will be sorted by the
   * strategy. `max` means that page having higher total score will be placed in
   * front. `total` means that page having higher max score will be placed in
   * front.
   *
   * 结果排序策略
   *
   * 当有多个匹配的结果时，会按照策略对结果进行排序。`max` 表示最高分更高的页面会排在前面。`total` 表示总分更高的页面会排在前面
   *
   * @default 'max'
   */
  sortStrategy?: OramaSortStrategy

  /**
   * Create Index option
   *
   * 创建索引选项
   */
  indexOptions?: OramaIndexOptions

  /**
   * Create Index option per locale
   *
   * 按语言的创建索引选项
   */
  indexLocaleOptions?: Record<string, OramaIndexOptions>

  /**
   * Filter pages to be indexed
   *
   * 过滤需要索引的页面
   *
   * @param page Page
   * @returns Whether the page should be indexed
   */
  filter?: (page: Page) => boolean

  /**
   * Tags whose content should be preserved
   *
   * Tags not in the default whitelist will not be indexed. For custom Vue
   * components that render slot content by default (like
   * `<human-only>contents</human-only>`), you can add their tag names here to
   * preserve their content.
   *
   * 需要保留内容的标签
   *
   * 默认白名单之外的标签不会被索引。对于一些会将其插槽内容渲染为默认内容的 Vue 组件（如
   * `<human-only>contents</human-only>`），你可以将其标签名添加到这里以保留其内容。
   */
  preserveTags?: string[]
}
