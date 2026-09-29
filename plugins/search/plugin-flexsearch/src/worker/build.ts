import { entries, fromEntries } from '@vuepress/helper/client'
import {
  createWorkerResponse,
  getOwnEntry,
} from '@vuepress/search-helper/shared'

import { decodeIndex } from '../shared/index.js'
import type { SearchIndexStore, WorkerMessageData } from '../shared/index.js'
import { getSearchResults, getSuggestions } from './utils/index.js'

declare const __FLEXSEARCH_INDEX__: string
declare const __FLEXSEARCH_SORT_STRATEGY__: 'max' | 'total'

const encodedIndexes = JSON.parse(__FLEXSEARCH_INDEX__) as Record<
  string,
  string
>

/** Restored search indexes, which are decoded once when the worker loads. */
const searchIndexStore: SearchIndexStore = fromEntries(
  entries(encodedIndexes).map(([localePath, encoded]) => [
    localePath,
    decodeIndex(encoded),
  ]),
)

self.addEventListener(
  'message',
  ({ data }: MessageEvent<WorkerMessageData>) => {
    self.postMessage(
      createWorkerResponse(
        data,
        getOwnEntry(searchIndexStore, data.locale),
        { getSearchResults, getSuggestions },
        __FLEXSEARCH_SORT_STRATEGY__,
      ),
    )
  },
)
