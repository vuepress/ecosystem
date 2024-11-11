import { useLocalStorage } from '@vueuse/core'
import type { Ref } from 'vue'

import { options } from '../define.js'
import type { MatchedItem, Word } from '../typings/index.js'
import { getPath } from '../utils/index.js'

const SLIMSEARCH_HISTORY_RESULT_STORAGE = 'SLIMSEARCH_RESULT_HISTORY'

export interface SearchResult {
  header?: string
  link: string
  display: Word[][]
}

export interface SearchResultHistory {
  enabled: boolean
  resultHistory: Ref<SearchResult[]>
  addResultHistory: (item: MatchedItem) => void
  removeResultHistory: (index: number) => void
}

const { resultHistoryCount } = options

const searchProResultStorage = useLocalStorage<SearchResult[]>(
  SLIMSEARCH_HISTORY_RESULT_STORAGE,
  [],
)

export const useSearchResultHistory = (): SearchResultHistory => {
  const enabled = resultHistoryCount > 0

  const addResultHistory = (item: MatchedItem): void => {
    if (enabled) {
      const result: SearchResult = {
        link: getPath(item),
        display: item.display,
      }

      if ('header' in item) result.header = item.header

      searchProResultStorage.value = [
        result,
        ...searchProResultStorage.value.slice(0, resultHistoryCount - 1),
      ]
    }
  }

  const removeResultHistory = (index: number): void => {
    searchProResultStorage.value = [
      ...searchProResultStorage.value.slice(0, index),
      ...searchProResultStorage.value.slice(index + 1),
    ]
  }

  return {
    enabled,
    resultHistory: searchProResultStorage,
    addResultHistory,
    removeResultHistory,
  }
}
