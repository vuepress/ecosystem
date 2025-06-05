import type { ComputedRef, MaybeRef } from 'vue'
import { computed, toValue } from 'vue'
import { useRouteLocale } from 'vuepress/client'
import type { LocaleData } from 'vuepress/shared'
import type { ExactLocaleConfig } from '../../shared/index.js'

/**
 * Composables for current locale config
 *
 * 获取当前本地化配置的组合函数
 *
 * @param localesConfig - Client locale config / 客户端本地化配置
 *
 * @returns Current locale config / 当前本地化配置
 */
export const useLocaleConfig = <T extends LocaleData>(
  localesConfig: MaybeRef<ExactLocaleConfig<T>>,
): ComputedRef<T> => {
  const routeLocale = useRouteLocale()

  return computed(() => toValue(localesConfig)[routeLocale.value] ?? {})
}

/**
 * Short alias of `useLocaleConfig`
 *
 * `useLocaleConfig` 的简短别名
 */
export const useLocale = useLocaleConfig
