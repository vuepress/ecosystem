import type { Orama } from '@orama/orama'

/** Schema of the Orama index. Orama 索引的结构。 */
export const SCHEMA = {
  heading: 'string',
  text: 'string[]',
  customFields: 'string[]',
  id: 'string',
} as const

/** Orama index. Orama 索引。 */
export type SearchIndex = Orama<typeof SCHEMA>

/** Index store of the locales. 各语言环境的索引存储。 */
export type SearchIndexStore = Record<string, SearchIndex>
