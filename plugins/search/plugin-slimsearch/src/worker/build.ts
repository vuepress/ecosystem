import { decodeData, entries, fromEntries } from '@vuepress/helper/shared'
import { createWorkerResponse } from '@vuepress/search-helper/shared'
import type { IndexObject } from 'slimsearch'
import { loadIndex } from 'slimsearch'

import { INDEX_FIELD_CONFIG } from '../shared/index.js'
import type {
  IndexItem,
  SearchIndexStore,
  WorkerMessageData,
} from '../shared/index.js'
import { getSearchResults, getSuggestions } from './utils/index.js'

declare const __SLIMSEARCH_INDEX__: string
declare const __SLIMSEARCH_SORT_STRATEGY__: 'max' | 'total'

const searchIndex: SearchIndexStore = fromEntries(
  entries(JSON.parse(__SLIMSEARCH_INDEX__) as Record<string, string>).map(
    ([localePath, encoded]) => [
      localePath,
      loadIndex<string, IndexItem, IndexItem>(
        JSON.parse(decodeData(encoded)) as IndexObject<IndexItem>,
        INDEX_FIELD_CONFIG,
      ),
    ],
  ),
)

self.addEventListener(
  'message',
  ({ data }: MessageEvent<WorkerMessageData>) => {
    self.postMessage(
      createWorkerResponse(
        data,
        searchIndex[data.locale],
        { getSearchResults, getSuggestions },
        __SLIMSEARCH_SORT_STRATEGY__,
      ),
    )
  },
)
