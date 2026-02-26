import { startsWith } from '@vuepress/helper/client'
import { watchImmediate } from '@vueuse/core'
import type { Ref } from 'vue'
import { onMounted, onUnmounted, ref } from 'vue'
import { useData } from 'vuepress/client'

import { useSearchOptions } from '../helpers/index.js'
import { createSearchWorker } from '../utils/index.js'

declare const __SLIMSEARCH_SUGGESTION__: boolean

export interface SuggestionsRef {
  enabled: boolean
  suggestions: Ref<string[]>
}

export const useSuggestions = (queries: Ref<string[]>): SuggestionsRef => {
  const suggestions = ref<string[]>([])

  if (__SLIMSEARCH_SUGGESTION__) {
    const { page, routeLocale } = useData()
    const searchOptions = useSearchOptions()

    onMounted(() => {
      const { suggest, terminate } = createSearchWorker()

      const performSuggestion = (query: string): void => {
        const {
          resultsFilter: _r,
          querySplitter: _q,
          suggestionsFilter = (items): string[] => items,
          ...options
        } = searchOptions.value

        if (query.length >= 3) {
          suggest(query, routeLocale.value, options)
            .then((items) =>
              suggestionsFilter(items, query, routeLocale.value, page.value),
            )
            .then((items) => {
              suggestions.value = items.length
                ? startsWith(items[0], query) &&
                  !items[0].slice(query.length).includes(' ')
                  ? items
                  : [query, ...items]
                : []
            })
            // oxlint-disable-next-line promise/prefer-await-to-callbacks
            .catch((err: unknown) => {
              // eslint-disable-next-line no-console
              console.error(err)
            })
        } else {
          suggestions.value = []
        }
      }

      watchImmediate([queries, routeLocale], ([newQueries]) => {
        performSuggestion(newQueries.join(' '))
      })

      onUnmounted(() => {
        terminate()
      })
    })
  }

  return {
    enabled: __SLIMSEARCH_SUGGESTION__,
    suggestions,
  }
}
