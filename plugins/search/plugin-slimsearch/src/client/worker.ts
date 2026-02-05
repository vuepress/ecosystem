import database from '@temp/slimsearch/index.js'
import { sortStrategy } from '@temp/slimsearch/worker-options.js'
import { loadJSONIndex } from 'slimsearch'

import type { IndexItem } from '../shared/index.js'
import type { WorkerMessageData } from './typings/index.js'
import { getSearchResults, getSuggestions } from './worker-utils/index.js'

globalThis.onmessage = async ({
  data: { type = 'all', query, locale = '/', options, id },
}: MessageEvent<WorkerMessageData>): Promise<void> => {
  const { default: localeIndex } = await database[locale]()

  const searchLocaleIndex = loadJSONIndex<string, IndexItem, IndexItem>(
    localeIndex,
    {
      fields: [/** Heading */ 'h', /** Text */ 't', /** CustomFields */ 'c'],
      storeFields: [
        /** Heading */ 'h',
        /** Text */ 't',
        /** CustomFields */ 'c',
      ],
    },
  )

  if (type === 'suggest')
    globalThis.postMessage([
      type,
      id,
      getSuggestions(query, searchLocaleIndex, options),
    ])
  else if (type === 'search')
    globalThis.postMessage([
      type,
      id,
      getSearchResults(query, searchLocaleIndex, options, sortStrategy),
    ])
  else
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
