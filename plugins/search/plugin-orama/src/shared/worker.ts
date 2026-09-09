import type { SearchParamsFullText } from '@orama/orama'

import type { IndexItem, SCHEMA, SearchIndex } from './data.js'

export type SearchableProperty = keyof typeof SCHEMA

export type WorkerSearchOptions = Omit<
  Pick<
    SearchParamsFullText<SearchIndex, IndexItem>,
    | 'boost'
    | 'exact'
    | 'limit'
    | 'offset'
    | 'properties'
    | 'sortBy'
    | 'threshold'
    | 'tolerance'
  >,
  'properties'
> & {
  /**
   * The properties of the document to search in.
   *
   * Accepts a readonly array because the option may be made readonly when
   * injected through a readonly ref.
   *
   * 需要搜索的文档属性。
   *
   * 接受只读数组，因为该选项在通过只读 ref 注入时可能会变为只读。
   */
  properties?: '*' | readonly SearchableProperty[]
}

export interface WorkerMessageData {
  /** @default 'all' */
  type?: 'all' | 'search' | 'suggest'
  query: string
  locale: string
  options?: WorkerSearchOptions
  id: number
}
