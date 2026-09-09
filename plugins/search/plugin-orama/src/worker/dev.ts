import database from '@temp/orama/index.js'
import { sortStrategy } from '@temp/orama/worker-options.js'

import { createIndex } from '../shared/index.js'
import type { SerializedIndex, WorkerMessageData } from '../shared/index.js'
import { getSearchResults, getSuggestions } from './utils/index.js'

// oxlint-disable-next-line unicorn/prefer-add-event-listener
globalThis.onmessage = async ({
  data: { type = 'all', query, locale, options, id },
}: MessageEvent<WorkerMessageData>): Promise<void> => {
  const { default: localeIndex } = await database[locale]()

  const { lang, data } = JSON.parse(localeIndex) as SerializedIndex
  const searchLocaleIndex = createIndex(lang, data)

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
    globalThis.postMessage({
      suggestions: [
        type,
        id,
        getSuggestions(query, searchLocaleIndex, options),
      ],
      results: [
        type,
        id,
        getSearchResults(query, searchLocaleIndex, options, sortStrategy),
      ],
    })
  }
}
