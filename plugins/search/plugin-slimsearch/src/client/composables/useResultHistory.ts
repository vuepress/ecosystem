import { useLocalStorage } from '@vueuse/core'
import type { Ref } from 'vue'

import { options } from '../define.js'
import type { MatchedItem, Word } from '../typings/index.js'
import { getResultPath } from '../utils/index.js'

const SLIMSEARCH_RESULT_HISTORY_STORAGE = 'SLIMSEARCH_RESULT_HISTORY'

export interface ResultHistoryItem {
  header?: string
  link: string
  display: Word[][]
}

export interface ResultHistory {
  enabled: boolean
  resultHistories: Ref<ResultHistoryItem[]>
  addResultHistory: (item: MatchedItem) => void
  removeResultHistory: (index: number) => void
}

const { resultHistoryCount } = options

const searchProResultStorage = useLocalStorage<ResultHistoryItem[]>(
  SLIMSEARCH_RESULT_HISTORY_STORAGE,
  [],
)

export const useResultHistory = (): ResultHistory => {
  const enabled = resultHistoryCount > 0

  const addResultHistory = (item: MatchedItem): void => {
    if (enabled) {
      const resultHistory: ResultHistoryItem = {
        link: getResultPath(item),
        display: item.display,
      }

      if ('header' in item) resultHistory.header = item.header

      searchProResultStorage.value = [
        resultHistory,
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
    resultHistories: searchProResultStorage,
    addResultHistory,
    removeResultHistory,
  }
}
