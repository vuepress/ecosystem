import { startsWith } from '@vuepress/helper/client'
import { watchImmediate } from '@vueuse/core'
import type { Ref } from 'vue'
import { onMounted, onUnmounted, ref } from 'vue'
import { usePageData, useRouteLocale } from 'vuepress/client'

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
    const searchOptions = useSearchOptions()
    const pageData = usePageData()
    const routeLocale = useRouteLocale()

    onMounted(() => {
      const { suggest, terminate } = createSearchWorker()

      const performSuggestion = (query: string): void => {
        const {
          resultsFilter,
          querySplitter,
          suggestionsFilter = (items): string[] => items,
          ...options
        } = searchOptions.value

        if (query)
          suggest(query, routeLocale.value, options)
            .then((items) =>
              suggestionsFilter(
                items,
                query,
                routeLocale.value,
                pageData.value,
              ),
            )
            .then((items) => {
              suggestions.value = items.length
                ? startsWith(items[0], query) &&
                  !items[0].slice(query.length).includes(' ')
                  ? items
                  : [query, ...items]
                : []
            })
            .catch((err: unknown) => {
              // eslint-disable-next-line no-console
              console.error(err)
            })
        else suggestions.value = []
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
