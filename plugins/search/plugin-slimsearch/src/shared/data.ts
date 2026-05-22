import type { SearchIndex } from 'slimsearch'

export const HEADING_INDEX_ID = 'h'
export const TEXT_INDEX_ID = 't'
export const CUSTOM_FIELDS_INDEX_ID = 'c'

export const INDEX_FIELD_CONFIG = {
  fields: [HEADING_INDEX_ID, TEXT_INDEX_ID, CUSTOM_FIELDS_INDEX_ID],
  storeFields: [HEADING_INDEX_ID, TEXT_INDEX_ID, CUSTOM_FIELDS_INDEX_ID],
}

export type PageIndexId = `${number}`

export interface PageIndexItem {
  id: PageIndexId
  [HEADING_INDEX_ID]: string
  [TEXT_INDEX_ID]?: string[]
}

export type SectionIndexId = `${PageIndexId}#${string}`

export interface SectionIndexItem {
  id: SectionIndexId
  [HEADING_INDEX_ID]: string
  [TEXT_INDEX_ID]?: string[]
}

export type CustomFieldIndexID = `${PageIndexId}@${number}`

export interface CustomFieldIndexItem {
  id: string
  [CUSTOM_FIELDS_INDEX_ID]: string[]
}

export type IndexItem = CustomFieldIndexItem | PageIndexItem | SectionIndexItem

export type LocaleIndex = Record<string, IndexItem[]>

export type SearchIndexStore = Record<
  string,
  SearchIndex<string, IndexItem, IndexItem>
>
