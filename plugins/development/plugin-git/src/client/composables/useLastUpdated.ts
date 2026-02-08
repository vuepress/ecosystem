import type { ComputedRef, MaybeRefOrGetter } from 'vue'
import { computed, toValue } from 'vue'
import { useData } from 'vuepress/client'
import type {
  GitPluginFrontmatter,
  GitPluginPageData,
} from '../../shared/index.js'
import { useGitLocale } from './useGitLocales.js'

/**
 * Last updated information
 *
 * 最后更新信息
 */
export interface LastUpdated {
  /**
   * The date object of the last updated time
   *
   * 最后更新时间的日期对象
   */
  date: Date
  /**
   * The ISO string of the last updated time
   *
   * 最后更新时间的 ISO 字符串
   */
  iso: string
  /**
   * The formatted text of the last updated time
   *
   * 最后更新时间的格式化文本
   */
  text: string
  /**
   * The locale of the last updated time
   *
   * 最后更新时间的语言环境
   */
  locale: string
}

/**
 * Last updated composable
 *
 * 最后更新组合式函数
 *
 * @param enabled - Whether to enable last updated /是否启用最后更新
 * @returns The last updated information /最后更新信息
 */
export const useLastUpdated = (
  enabled: MaybeRefOrGetter<boolean> = true,
): ComputedRef<LastUpdated | null> => {
  const { lang, page } = useData<
    GitPluginFrontmatter,
    Partial<GitPluginPageData>
  >()
  const locale = useGitLocale()

  return computed(() => {
    if (!toValue(enabled)) return null

    const timeStamp =
      page.value.git?.updatedTime ?? page.value.git?.changelog?.[0].time

    if (!timeStamp) return null

    const date = new Date(timeStamp)

    const text = new Intl.DateTimeFormat(lang.value, {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(timeStamp)

    return {
      date,
      text,
      iso: date.toISOString(),
      locale: locale.value.latestUpdateAt,
    }
  })
}
