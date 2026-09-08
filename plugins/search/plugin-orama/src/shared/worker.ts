import type { SearchParamsFullText } from '@orama/orama'

import type { IndexItem, SearchIndex } from './data.js'

export type WorkerSearchOptions = Pick<
  SearchParamsFullText<SearchIndex, IndexItem>,
  | 'boost'
  | 'exact'
  | 'limit'
  | 'offset'
  | 'properties'
  | 'sortBy'
  | 'threshold'
  | 'tolerance'
>

export interface WorkerMessageData {
  /** @default 'all' */
  type?: 'all' | 'search' | 'suggest'
  query: string
  locale: string
  options?: WorkerSearchOptions
  id: number
}
