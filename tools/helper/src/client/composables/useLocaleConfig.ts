import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import { useRouteLocale } from 'vuepress/client'
import type { LocaleData } from 'vuepress/shared'

export type ExactLocaleConfig<T extends LocaleData> = Record<string, T>

/**
 * Get current locale config
 *
 * @param localesConfig client locale Config
 * @returns current locale config
 */
export const useLocaleConfig = <T extends LocaleData>(
  localesConfig: ExactLocaleConfig<T>,
): ComputedRef<T> => {
  const routeLocale = useRouteLocale()

  return computed(() => localesConfig[routeLocale.value] ?? {})
}
