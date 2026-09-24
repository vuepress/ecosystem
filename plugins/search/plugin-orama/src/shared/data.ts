import type { Orama } from '@orama/orama'
import {
  CUSTOM_FIELDS_INDEX_ID,
  HEADING_INDEX_ID,
  TEXT_INDEX_ID,
} from '@vuepress/search-helper/shared'

/** Schema of the Orama index. Orama 索引的结构。 */
export const SCHEMA = {
  [HEADING_INDEX_ID]: 'string',
  [TEXT_INDEX_ID]: 'string[]',
  [CUSTOM_FIELDS_INDEX_ID]: 'string[]',
  id: 'string',
} as const

/** Orama index. Orama 索引。 */
export type SearchIndex = Orama<typeof SCHEMA>

/** Index store of the locales. 各语言环境的索引存储。 */
export type SearchIndexStore = Record<string, SearchIndex>
