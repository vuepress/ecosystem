import type { SearchIndex } from 'slimsearch'

export const enum IndexField {
  Heading = 'h',
  Anchor = 'a',
  Text = 't',
  CustomFields = 'c',
}

export type PageIndexId = `${number}`

export interface PageIndexItem {
  id: PageIndexId
  /** Heading */ h: string
  /** Text */ t?: string[]
}

export type SectionIndexId = `${PageIndexId}#${string}`

export interface SectionIndexItem {
  id: SectionIndexId
  /** Heading */ h: string
  /** Text */ t?: string[]
}

export type CustomFieldIndexID = `${PageIndexId}@${number}`

export interface CustomFieldIndexItem {
  id: string
  /** CustomFields */ c: string[]
}

export type IndexItem = CustomFieldIndexItem | PageIndexItem | SectionIndexItem

export type LocaleIndex = Record<string, IndexItem[]>

export type SearchIndexStore = Record<
  string,
  SearchIndex<string, IndexItem, IndexItem>
>
