import type { PageHeader } from 'vuepress/shared'

export interface SearchIndexItem {
  title: string
  path: string
  pathLocale: string
  extraFields: string[]
  headers: PageHeader[]
}

export type SearchIndex = SearchIndexItem[]
