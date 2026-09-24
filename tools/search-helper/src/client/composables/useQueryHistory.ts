import { useLocalStorage } from '@vueuse/core'
import type { Ref } from 'vue'

import { getSearchClientConfig } from '../define.js'

const QUERY_HISTORY_STORAGE = 'VUEPRESS_SEARCH_QUERY_HISTORY'

export interface QueryHistory {
  enabled: boolean
  queryHistories: Ref<string[]>
  addQueryHistory: (item: string) => void
  removeQueryHistory: (index: number) => void
}

const searchProQueryStorage = useLocalStorage<string[]>(
  QUERY_HISTORY_STORAGE,
  [],
)

export const useQueryHistory = (): QueryHistory => {
  const { queryHistoryCount } = getSearchClientConfig().options
  const enabled = queryHistoryCount > 0

  const addQueryHistory = (item: string): void => {
    if (enabled) {
      searchProQueryStorage.value = [
        ...new Set([
          item,
          ...searchProQueryStorage.value.slice(0, queryHistoryCount - 1),
        ]),
      ]
    }
  }

  const removeQueryHistory = (index: number): void => {
    searchProQueryStorage.value = [
      ...searchProQueryStorage.value.slice(0, index),
      ...searchProQueryStorage.value.slice(index + 1),
    ]
  }

  return {
    enabled,
    queryHistories: searchProQueryStorage,
    addQueryHistory,
    removeQueryHistory,
  }
}
