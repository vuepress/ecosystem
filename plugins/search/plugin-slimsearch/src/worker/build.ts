import { entries, fromEntries } from '@vuepress/helper/client'
import type { IndexObject } from 'slimsearch'
import { loadIndex } from 'slimsearch'

import { decodeJSON, INDEX_FIELD_CONFIG } from '../shared/index.js'
import type {
  IndexItem,
  SearchIndexStore,
  SlimSearchSortStrategy,
  WorkerMessageData,
} from '../shared/index.js'
import { getSearchResults, getSuggestions } from './utils/index.js'

declare const __SLIMSEARCH_INDEX__: string
declare const __SLIMSEARCH_SORT_STRATEGY__: SlimSearchSortStrategy

const searchIndex: SearchIndexStore = fromEntries(
  entries(JSON.parse(__SLIMSEARCH_INDEX__) as Record<string, string>).map(
    ([localePath, encoded]) => [
      localePath,
      loadIndex<string, IndexItem, IndexItem>(
        decodeJSON<IndexObject<IndexItem>>(encoded),
        INDEX_FIELD_CONFIG,
      ),
    ],
  ),
)

self.addEventListener(
  'message',
  ({
    data: { type = 'all', query, locale, options, id },
  }: MessageEvent<WorkerMessageData>) => {
    const searchLocaleIndex = searchIndex[locale]

    // Guard against locales without an index, so that an unknown locale
    // returns empty results instead of throwing
    if (!searchLocaleIndex) {
      if (type === 'suggest') self.postMessage([type, id, []])
      else if (type === 'search') self.postMessage([type, id, []])
      else self.postMessage([type, id, { suggestions: [], results: [] }])
      return
    }

    if (type === 'suggest') {
      self.postMessage([
        type,
        id,
        getSuggestions(query, searchLocaleIndex, options),
      ])
    } else if (type === 'search') {
      self.postMessage([
        type,
        id,
        getSearchResults(
          query,
          searchLocaleIndex,
          options,
          __SLIMSEARCH_SORT_STRATEGY__,
        ),
      ])
    } else {
      self.postMessage({
        suggestions: [
          type,
          id,
          getSuggestions(query, searchLocaleIndex, options),
        ],
        results: [
          type,
          id,
          getSearchResults(
            query,
            searchLocaleIndex,
            options,
            __SLIMSEARCH_SORT_STRATEGY__,
          ),
        ],
      })
    }
  },
)
