import type {
  SearchableProperty,
  WorkerMessageData as BaseWorkerMessageData,
} from '@vuepress/search-helper/shared'
import type { DocumentSearchOptions } from 'flexsearch'

import type { SearchIndexItem } from './data.js'

// `context` and `resolution` are left out: the plugin searches one term at a
// time, which makes FlexSearch take its single-term fast path before it reads
// either of them.
/**
 * Search options of FlexSearch.
 *
 * The `index` and `field` options are replaced by `properties`, which matches
 * the options of the other search plugins, and `limit` and `offset` are applied
 * to the merged results rather than to each field.
 *
 * FlexSearch 的搜索选项。
 *
 * `index` 与 `field` 选项被替换为 `properties`，以与其他搜索插件的选项保持一致；`limit` 与 `offset`
 * 作用于合并后的结果，而不是每个字段各自的结果。
 */
export type WorkerSearchOptions = Pick<
  DocumentSearchOptions<SearchIndexItem>,
  'cache' | 'limit' | 'offset' | 'suggest'
> & {
  /**
   * Relevance boost of the searched properties
   *
   * 搜索属性的相关度权重
   *
   * @default { c: 4, h: 2, t: 1 }
   */
  boost?: Record<string, number>

  /**
   * The properties of the document to search in.
   *
   * Accepts a readonly array because the option may be made readonly when
   * injected through a readonly ref.
   *
   * 需要搜索的文档属性。
   *
   * 接受只读数组，因为该选项在通过只读 ref 注入时可能会变为只读。
   */
  properties?: '*' | readonly SearchableProperty[]
}

/** Data of the message sent to the search worker. 发送到搜索工作线程的消息数据。 */
export type WorkerMessageData = BaseWorkerMessageData<WorkerSearchOptions>
