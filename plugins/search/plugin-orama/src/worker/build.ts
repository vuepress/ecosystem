import { entries, fromEntries } from '@vuepress/helper/client'

import {
  decodeIndex,
  getIndexLanguage,
  preloadTokenizers,
} from '../shared/index.js'
import type { SearchIndexStore, WorkerMessageData } from '../shared/index.js'
import { getSearchResults, getSuggestions } from './utils/index.js'

declare const __ORAMA_INDEX__: string
declare const __ORAMA_SORT_STRATEGY__: 'max' | 'total'

const encodedIndexes = JSON.parse(__ORAMA_INDEX__) as Record<string, string>

/**
 * Restore the search indexes.
 *
 * The official tokenizers are loaded lazily, so they have to be loaded before
 * the indexes are decoded, which is why the languages are read first.
 */
// oxlint-disable-next-line unicorn/prefer-top-level-await
const ready = preloadTokenizers(
  entries(encodedIndexes).map(([, encoded]) => getIndexLanguage(encoded)),
).then(() =>
  fromEntries(
    entries(encodedIndexes).map(([localePath, encoded]) => [
      localePath,
      decodeIndex(encoded),
    ]),
  ),
)

self.addEventListener(
  'message',
  ({
    data: { type = 'all', query, locale, options, id },
  }: MessageEvent<WorkerMessageData>) => {
    void ready.then((searchIndex: SearchIndexStore) => {
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
    })
  },
)
