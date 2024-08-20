import type { PageData } from 'vuepress/shared'

export interface SearchIndexItem
  extends Pick<PageData, 'headers' | 'path' | 'title'> {
  pathLocale: string
  extraFields: string[]
}

export type SearchIndex = SearchIndexItem[]
