import { decodeData } from '@vuepress/helper/shared'
import { createWorkerResponse } from '@vuepress/search-helper/shared'
import { loadIndex } from 'slimsearch'
import type { IndexObject } from 'slimsearch'

import database from '@temp/slimsearch/index.js'
import { sortStrategy } from '@temp/slimsearch/worker-options.js'

import { INDEX_FIELD_CONFIG } from '../shared/index.js'
import type {
  IndexItem,
  SearchIndex,
  WorkerMessageData,
} from '../shared/index.js'
import { getSearchResults, getSuggestions } from './utils/index.js'

// oxlint-disable-next-line unicorn/prefer-add-event-listener
globalThis.onmessage = async ({
  data,
}: MessageEvent<WorkerMessageData>): Promise<void> => {
  const loadLocaleIndex = database[data.locale]

  // Guard against locales without an index chunk, so that an unknown locale
  // returns empty results instead of throwing
  let searchLocaleIndex: SearchIndex | undefined

  if (loadLocaleIndex) {
    const { default: encoded } = await loadLocaleIndex()

    searchLocaleIndex = loadIndex<string, IndexItem, IndexItem>(
      JSON.parse(decodeData(encoded)) as IndexObject<IndexItem>,
      INDEX_FIELD_CONFIG,
    )
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
