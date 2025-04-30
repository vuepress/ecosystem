import { useDebounceFn, watchImmediate } from '@vueuse/core'
import type { Ref } from 'vue'
import { computed, onMounted, onUnmounted, ref, shallowRef } from 'vue'
import { useData } from 'vuepress/client'

import { options } from '../define.js'
import { useSearchOptions } from '../helpers/index.js'
import type { SearchResult } from '../typings/index.js'
import { createSearchWorker } from '../utils/index.js'

export interface Results {
  results: Ref<SearchResult[]>
  isSearching: Ref<boolean>
}

export const useResults = (queries: Ref<string[]>): Results => {
  const { page, routeLocale } = useData()
  const searchOptions = useSearchOptions()

  const searchingProcessNumber = ref(0)
  const isSearching = computed(() => searchingProcessNumber.value > 0)
  const results = shallowRef<SearchResult[]>([])

  onMounted(() => {
    const { search, terminate } = createSearchWorker()

    const performSearch = useDebounceFn(
      (query: string): void => {
        const {
          resultsFilter = (items): SearchResult[] => items,
          querySplitter,
          suggestionsFilter,
          ...rest
        } = searchOptions.value

        if (query) {
          searchingProcessNumber.value += 1

          search(query, routeLocale.value, rest)
            .then((items) =>
              resultsFilter(items, query, routeLocale.value, page.value),
            )
            .then((items) => {
              searchingProcessNumber.value -= 1
              results.value = items
            })
            .catch((err: unknown) => {
              // eslint-disable-next-line no-console
              console.warn(err)
              searchingProcessNumber.value -= 1
              if (!searchingProcessNumber.value) results.value = []
            })
        } else {
          results.value = []
        }
      },
      options.searchDelay - options.suggestDelay,
      { maxWait: 5000 },
    )

    watchImmediate([queries, routeLocale], ([newQueries]) =>
      performSearch(newQueries.join(' ')),
    )

    onUnmounted(() => {
      terminate()
    })
  })

  return {
    isSearching,
    results,
  }
}
