import type { KeyOptions } from '@vuepress/helper'
import type {
  SearchLocaleData,
  SearchPluginOptions,
  SearchSortStrategy,
} from '@vuepress/search-helper'
import type { LocaleConfig } from 'vuepress/core'

export type { SearchCustomField as CustomFieldOptions } from '@vuepress/search-helper'

/** Options for creating a SlimSearch index. 创建 SlimSearch 索引的选项。 */
export interface SlimSearchIndexOptions {
  /**
   * Function to tokenize the index field item.
   *
   * 用于对索引字段项进行分词的函数。
   */
  tokenize?: (text: string, fieldName?: string) => string[]

  /**
   * Function to process or normalize terms in the index field.
   *
   * 用于处理或规范索引字段中的术语的函数。
   */
  processTerm?: (term: string) => string[] | string | false | null | undefined
}

/** Options of `@vuepress/plugin-slimsearch`. `@vuepress/plugin-slimsearch` 的选项。 */
export interface SlimSearchPluginOptions extends SearchPluginOptions {
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

  /**
   * Delay to start auto-suggesting after input
   *
   * 结束输入到开始自动建议的延时
   *
   * @default 0
   */
  suggestDelay?: number

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
   * @default 'slimsearch.worker.js'
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
  locales?: LocaleConfig<SearchLocaleData>

  /**
   * Result Sort strategy
   *
   * When there are multiple matched results, the result will be sorted by the
   * strategy. `max` means that page having higher max score will be placed in
   * front. `total` means that page having higher total score will be placed in
   * front.
   *
   * 结果排序策略
   *
   * 当有多个匹配的结果时，会按照策略对结果进行排序。`max` 表示最高分更高的页面会排在前面。`total` 表示总分更高的页面会排在前面
   *
   * @default 'max'
   */
  sortStrategy?: SearchSortStrategy

  /**
   * Create Index option
   *
   * 创建索引选项
   */
  indexOptions?: SlimSearchIndexOptions

  /**
   * Create Index option per locale
   *
   * 按语言的创建索引选项
   */
  indexLocaleOptions?: Record<string, SlimSearchIndexOptions>
}
