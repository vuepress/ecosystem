import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import { useRouteLocale } from 'vuepress/client'
import type { LocaleConfig, LocaleData } from 'vuepress/shared'

/**
 * Get current locale config
 *
 * @param localesConfig client locale Config
 * @returns current locale config
 */
export const useLocaleConfig = <T extends LocaleData>(
  localesConfig: LocaleConfig<T>,
): ComputedRef<Partial<T>> => {
  const routeLocale = useRouteLocale()

  return computed(() => localesConfig[routeLocale.value] ?? {})
}
