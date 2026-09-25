import { entries, fromEntries } from '@vuepress/helper/client'
import {
  createWorkerResponse,
  getOwnEntry,
} from '@vuepress/search-helper/shared'

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
  ({ data }: MessageEvent<WorkerMessageData>) => {
    void ready.then((searchIndex: SearchIndexStore) => {
      self.postMessage(
        createWorkerResponse(
          data,
          getOwnEntry(searchIndex, data.locale),
          { getSearchResults, getSuggestions },
          __ORAMA_SORT_STRATEGY__,
        ),
      )
    })
  },
)
