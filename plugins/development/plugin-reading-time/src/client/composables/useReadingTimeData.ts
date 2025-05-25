import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import { usePage } from 'vuepress/client'
import type {
  ReadingTime,
  ReadingTimePluginPageData,
} from '../../shared/index.js'

export const useReadingTimeData = (): ComputedRef<ReadingTime | null> => {
  const page = usePage<Partial<ReadingTimePluginPageData>>()

  return computed(() => page.value.readingTime ?? null)
}
