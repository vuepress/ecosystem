import type { Orama } from '@orama/orama'

export const HEADING_INDEX_ID = 'h'
export const TEXT_INDEX_ID = 't'
export const CUSTOM_FIELDS_INDEX_ID = 'c'

export const SCHEMA = {
  [HEADING_INDEX_ID]: 'string',
  [TEXT_INDEX_ID]: 'string[]',
  [CUSTOM_FIELDS_INDEX_ID]: 'string[]',
  id: 'string',
} as const

export interface IndexItem {
  id: string
  [HEADING_INDEX_ID]?: string
  [TEXT_INDEX_ID]?: string[]
  [CUSTOM_FIELDS_INDEX_ID]?: string[]
}

export type SearchIndex = Orama<typeof SCHEMA>

export type SearchIndexStore = Record<string, SearchIndex>
