import {
  CUSTOM_FIELDS_INDEX_ID,
  HEADING_INDEX_ID,
  TEXT_INDEX_ID,
} from '@vuepress/search-helper/shared'
import type { Document, DocumentData } from 'flexsearch'

/** Fields of the index, from the most to the least relevant. 索引字段，按相关度从高到低排列。 */
export const INDEX_FIELDS = [
  CUSTOM_FIELDS_INDEX_ID,
  HEADING_INDEX_ID,
  TEXT_INDEX_ID,
] as const

/**
 * Relevance boost of the indexed fields.
 *
 * FlexSearch does not score its results, so the score of a hit is derived from
 * the boost of the field that matched it.
 *
 * 索引字段的相关度权重。
 *
 * FlexSearch 不会为其结果评分，因此命中项的分数由其命中的字段的权重推导而来。
 */
export const FIELD_BOOST: Record<string, number> = {
  [CUSTOM_FIELDS_INDEX_ID]: 4,
  [HEADING_INDEX_ID]: 2,
  [TEXT_INDEX_ID]: 1,
}

/**
 * Document stored in a FlexSearch index.
 *
 * It is declared as an intersection with `DocumentData` instead of reusing
 * `IndexItemDocument`, because FlexSearch requires its documents to be
 * implicitly indexable.
 *
 * 存储在 FlexSearch 索引中的文档。
 *
 * 它被声明为与 `DocumentData` 的交叉类型，而不是复用 `IndexItemDocument`，因为 FlexSearch
 * 要求其文档可被隐式索引。
 */
export type SearchIndexItem = {
  /** Index id of the item 索引项的索引 id */
  id: string
  [HEADING_INDEX_ID]?: string
  [TEXT_INDEX_ID]?: string[]
  [CUSTOM_FIELDS_INDEX_ID]?: string[]
} & DocumentData

/** FlexSearch index. FlexSearch 索引。 */
export type SearchIndex = Document<SearchIndexItem>

/** Index store of the locales. 各语言环境的索引存储。 */
export type SearchIndexStore = Record<string, SearchIndex>
