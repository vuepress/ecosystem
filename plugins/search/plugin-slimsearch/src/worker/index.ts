/* eslint-disable no-restricted-globals */
import { entries, fromEntries } from '@vuepress/helper/client'
import type { IndexObject } from 'slimsearch'
import { loadIndex } from 'slimsearch'

import type { MessageData } from '../client/typings/index.js'
import { getResults } from '../client/worker/result.js'
import { getSuggestions } from '../client/worker/suggestion.js'
import type { IndexItem, SearchIndexStore } from '../shared/index.js'

declare const __SLIMSEARCH_INDEX__: string

const searchIndex: SearchIndexStore = fromEntries(
  entries(
    JSON.parse(__SLIMSEARCH_INDEX__) as Record<string, IndexObject<IndexItem>>,
  ).map(([localePath, index]) => [
    localePath,
    loadIndex<string, IndexItem, IndexItem>(index, {
      fields: [/** Heading */ 'h', /** Text */ 't', /** CustomFields */ 'c'],
      storeFields: [
        /** Heading */ 'h',
        /** Text */ 't',
        /** CustomFields */ 'c',
      ],
    }),
  ]),
)

self.onmessage = ({
  data: { type = 'all', query, locale, options, id },
}: MessageEvent<MessageData>): void => {
  const searchLocaleIndex = searchIndex[locale]

  if (type === 'suggest')
    self.postMessage([
      type,
      id,
      getSuggestions(query, searchLocaleIndex, options),
    ])
  else if (type === 'search')
    self.postMessage([type, id, getResults(query, searchLocaleIndex, options)])
  else
    self.postMessage({
      suggestions: [
        type,
        id,
        getSuggestions(query, searchLocaleIndex, options),
      ],
      results: [type, id, getResults(query, searchLocaleIndex, options)],
    })
}
