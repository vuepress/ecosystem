import { useLocalStorage } from '@vueuse/core'
import type { Ref } from 'vue'

import type { MatchedContent, MatchedItem } from '../../shared/index.js'
import { options } from '../define.js'
import { getResultPath } from '../utils/index.js'

const ORAMA_RESULT_HISTORY_STORAGE = 'ORAMA_RESULT_HISTORY_V2'

export interface ResultHistoryItem {
  header?: string
  link: string
  display: MatchedContent[]
}

export interface ResultHistory {
  enabled: boolean
  resultHistories: Ref<ResultHistoryItem[]>
  addResultHistory: (item: MatchedItem) => void
  removeResultHistory: (index: number) => void
}

const { resultHistoryCount } = options

const searchProResultStorage = useLocalStorage<ResultHistoryItem[]>(
  ORAMA_RESULT_HISTORY_STORAGE,
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
