import { loadIndex } from 'slimsearch'
import type { IndexObject } from 'slimsearch'

import database from '@temp/slimsearch/index.js'
import { sortStrategy } from '@temp/slimsearch/worker-options.js'

import { decodeJSON, INDEX_FIELD_CONFIG } from '../shared/index.js'
import type { IndexItem, WorkerMessageData } from '../shared/index.js'
import { getSearchResults, getSuggestions } from './utils/index.js'

// oxlint-disable-next-line unicorn/prefer-add-event-listener
globalThis.onmessage = async ({
  data: { type = 'all', query, locale, options, id },
}: MessageEvent<WorkerMessageData>): Promise<void> => {
  // Guard against locales without an index chunk, so that an unknown locale
  // returns empty results instead of throwing
  const loadLocaleIndex = database[locale]

  if (!loadLocaleIndex) {
    if (type === 'suggest') globalThis.postMessage([type, id, []])
    else if (type === 'search') globalThis.postMessage([type, id, []])
    else globalThis.postMessage([type, id, { suggestions: [], results: [] }])
    return
  }

  const { default: encoded } = await loadLocaleIndex()

  const searchLocaleIndex = loadIndex<string, IndexItem, IndexItem>(
    decodeJSON<IndexObject<IndexItem>>(encoded),
    INDEX_FIELD_CONFIG,
  )

  if (type === 'suggest') {
    globalThis.postMessage([
      type,
      id,
      getSuggestions(query, searchLocaleIndex, options),
    ])
  } else if (type === 'search') {
    globalThis.postMessage([
      type,
      id,
      getSearchResults(query, searchLocaleIndex, options, sortStrategy),
    ])
  } else {
    globalThis.postMessage([
      type,
      id,
      {
        suggestions: getSuggestions(query, searchLocaleIndex, options),
        results: getSearchResults(
          query,
          searchLocaleIndex,
          options,
          sortStrategy,
        ),
      },
    ])
  }
}
