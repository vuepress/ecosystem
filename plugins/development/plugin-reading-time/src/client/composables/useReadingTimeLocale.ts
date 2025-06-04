import type { ExactLocaleConfig } from '@vuepress/helper/client'
import { useLocale } from '@vuepress/helper/client'
import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import type { ReadingTimePluginLocaleData } from '../../shared/index.js'
import { getReadingTimeLocale } from '../utils/index.js'
import { useReadingTimeData } from './useReadingTimeData.js'

declare const __READING_TIME_LOCALES__:
  | ExactLocaleConfig<ReadingTimePluginLocaleData>
  | undefined

const DEFAULT_LOCALE = { words: '', time: '' }

const readingTimeLocales =
  typeof __READING_TIME_LOCALES__ === 'undefined'
    ? null
    : __READING_TIME_LOCALES__

/**
 * Get reading time locale config
 *
 * 获取阅读时间多语言配置
 *
 * @returns reading time locale config or null if plugin is disabled
 */
export const useReadingTimeLocaleConfig =
  (): ComputedRef<ReadingTimePluginLocaleData | null> =>
    readingTimeLocales ? useLocale(readingTimeLocales) : computed(() => null)

/**
 * Reading time locale interface
 *
 * 阅读时间本地化接口
 */
export interface ReadingTimeLocale {
  /**
   * Reading time text
   *
   * 阅读时间文字
   */
  time: string

  /**
   * Words count text
   *
   * 字数统计文字
   */
  words: string
}

/**
 * Get reading time locale data of current page
 *
 * 获取当前页面的阅读时间本地化数据
 *
 * @returns reading time locale data
 *
 * @example
 * ```ts
 * import { useReadingTimeLocale } from '@vuepress/plugin-reading-time/client'
 *
 * const readingTimeLocale = useReadingTimeLocale()
 * // { time: "1 minute", words: "100 words" }
 * ```
 */
export const useReadingTimeLocale = (): ComputedRef<ReadingTimeLocale> => {
  if (readingTimeLocales === null) return computed(() => DEFAULT_LOCALE)

  const readingTime = useReadingTimeData()
  const readingTimeLocale = useReadingTimeLocaleConfig()

  return computed(() =>
    readingTime.value && readingTimeLocale.value
      ? getReadingTimeLocale(readingTime.value, readingTimeLocale.value)
      : DEFAULT_LOCALE,
  )
}
