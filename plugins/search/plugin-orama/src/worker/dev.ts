import {
  createWorkerResponse,
  getOwnEntry,
} from '@vuepress/search-helper/shared'

import database from '@temp/orama/index.js'
import { sortStrategy } from '@temp/orama/worker-options.js'

import {
  decodeIndex,
  getIndexLanguage,
  preloadTokenizers,
} from '../shared/index.js'
import type { SearchIndex, WorkerMessageData } from '../shared/index.js'
import { getSearchResults, getSuggestions } from './utils/index.js'

// oxlint-disable-next-line unicorn/prefer-add-event-listener
globalThis.onmessage = async ({
  data,
}: MessageEvent<WorkerMessageData>): Promise<void> => {
  const loadLocaleIndex = getOwnEntry(database, data.locale)

  // Guard against locales without an index chunk, so that an unknown locale
  // returns empty results instead of throwing
  let searchLocaleIndex: SearchIndex | undefined

  if (loadLocaleIndex) {
    const { default: encoded } = await loadLocaleIndex()

    // The official tokenizers are loaded lazily, so they have to be loaded
    // before the index is decoded
    await preloadTokenizers([getIndexLanguage(encoded)])

    searchLocaleIndex = decodeIndex(encoded)
  }

  globalThis.postMessage(
    createWorkerResponse(
      data,
      searchLocaleIndex,
      { getSearchResults, getSuggestions },
      sortStrategy,
    ),
  )
}
