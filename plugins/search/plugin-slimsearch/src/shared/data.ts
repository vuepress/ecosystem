import {
  CUSTOM_FIELDS_INDEX_ID,
  HEADING_INDEX_ID,
  TEXT_INDEX_ID,
} from '@vuepress/search-helper/shared'
import type { IndexItem } from '@vuepress/search-helper/shared'
import type { SearchIndex as SlimSearchIndex } from 'slimsearch'

/** Field configuration of the SlimSearch index. SlimSearch 索引的字段配置。 */
export const INDEX_FIELD_CONFIG = {
  fields: [HEADING_INDEX_ID, TEXT_INDEX_ID, CUSTOM_FIELDS_INDEX_ID],
  storeFields: [HEADING_INDEX_ID, TEXT_INDEX_ID, CUSTOM_FIELDS_INDEX_ID],
}

/** SlimSearch index. SlimSearch 索引。 */
export type SearchIndex = SlimSearchIndex<string, IndexItem, IndexItem>

/** Index store of the locales. 各语言环境的索引存储。 */
export type SearchIndexStore = Record<string, SearchIndex>
