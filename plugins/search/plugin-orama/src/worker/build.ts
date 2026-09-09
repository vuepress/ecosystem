import { entries, fromEntries } from '@vuepress/helper/client'

import { createIndex } from '../shared/index.js'
import type {
  SearchIndexStore,
  SerializedIndex,
  WorkerMessageData,
} from '../shared/index.js'
import { getSearchResults, getSuggestions } from './utils/index.js'

declare const __ORAMA_INDEX__: string
declare const __ORAMA_SORT_STRATEGY__: 'max' | 'total'

const searchIndex: SearchIndexStore = fromEntries(
  entries(JSON.parse(__ORAMA_INDEX__) as Record<string, SerializedIndex>).map(
    ([localePath, { lang, data }]) => [localePath, createIndex(lang, data)],
  ),
)

self.addEventListener(
  'message',
  ({
    data: { type = 'all', query, locale, options, id },
  }: MessageEvent<WorkerMessageData>) => {
    const searchLocaleIndex = searchIndex[locale]

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
          __ORAMA_SORT_STRATEGY__,
        ),
      ])
    } else {
      self.postMessage([
        type,
        id,
        {
          suggestions: getSuggestions(query, searchLocaleIndex, options),
          results: getSearchResults(
            query,
            searchLocaleIndex,
            options,
            __ORAMA_SORT_STRATEGY__,
          ),
        },
      ])
    }
  },
)
