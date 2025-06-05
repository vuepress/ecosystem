import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import { usePage } from 'vuepress/client'
import type {
  ReadingTime,
  ReadingTimePluginPageData,
} from '../../shared/index.js'

/**
 * Get reading time data of current page
 *
 * 获取当前页面的阅读时间数据
 *
 * @returns reading time data or null if plugin is disabled
 *
 * @example
 * ```ts
 * import { useReadingTimeData } from '@vuepress/plugin-reading-time/client'
 *
 * const readingTimeData = useReadingTimeData()
 * // { minutes: 1.1, words: 100 } or null
 * ```
 */
export const useReadingTimeData = (): ComputedRef<ReadingTime | null> => {
  const page = usePage<Partial<ReadingTimePluginPageData>>()

  return computed(() => page.value.readingTime ?? null)
}
