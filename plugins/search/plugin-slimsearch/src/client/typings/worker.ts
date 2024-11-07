import type { SearchOptions } from 'slimsearch'

import type { IndexItem } from '../../shared/index.js'

export type WorkerSearchOptions = Omit<
  SearchOptions<string, IndexItem>,
  'boostDocument' | 'fields' | 'filter' | 'processTerm' | 'tokenize'
>

export interface MessageData {
  /**
   * @default "all"
   */
  type?: 'all' | 'search' | 'suggest'
  query: string
  locale: string
  options?: WorkerSearchOptions
  id: number
}
