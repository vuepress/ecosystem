import { useLocalStorage } from '@vueuse/core'
import type { Ref } from 'vue'

import { options } from '../define.js'

const SLIMSEARCH_HISTORY_QUERY_STORAGE = 'SLIMSEARCH_QUERY_HISTORY'

export interface QueryHistory {
  enabled: boolean
  queryHistories: Ref<string[]>
  addQueryHistory: (item: string) => void
  removeQueryHistory: (index: number) => void
}

const searchProQueryStorage = useLocalStorage<string[]>(
  SLIMSEARCH_HISTORY_QUERY_STORAGE,
  [],
)

export const useQueryHistory = (): QueryHistory => {
  const { queryHistoryCount } = options
  const enabled = queryHistoryCount > 0

  const addQueryHistory = (item: string): void => {
    if (enabled)
      searchProQueryStorage.value = Array.from(
        new Set([
          item,
          ...searchProQueryStorage.value.slice(0, queryHistoryCount - 1),
        ]),
      )
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
