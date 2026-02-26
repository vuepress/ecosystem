import type { ComputedRef, InjectionKey } from 'vue'
import { inject } from 'vue'
import type { RouteLocale } from 'vuepress/client'
import type { LocaleData } from 'vuepress/shared'
import type { ThemeData } from '../../shared/index.js'

/**
 * Theme locale data ref type
 *
 * 主题多语言数据响应式引用类型
 */
export type ThemeLocaleDataRef<T extends LocaleData = LocaleData> =
  ComputedRef<T>

export const themeLocaleDataSymbol: InjectionKey<ThemeLocaleDataRef> = Symbol(
  __VUEPRESS_DEV__ ? 'themeLocaleData' : '',
)

/**
 * Use theme locale data
 *
 * 使用主题多语言数据
 *
 * @returns Theme locale data ref object / 主题多语言数据响应式引用对象
 */
export const useThemeLocaleData = <
  T extends ThemeData = ThemeData,
>(): ThemeLocaleDataRef<T> => {
  const themeLocaleData = inject(themeLocaleDataSymbol)
  if (!themeLocaleData)
    throw new Error('useThemeLocaleData() is called without provider.')

  return themeLocaleData as ThemeLocaleDataRef<T>
}

/**
 * Merge the locales fields to the root fields according to the route path
 *
 * 根据路由路径将多语言字段合并到根字段
 *
 * @param theme - Theme data object / 主题数据对象
 * @param routeLocale - Route locale / 路由多语言配置
 * @returns Merged theme data / 合并后的主题数据
 */
export const resolveThemeLocaleData = (
  theme: ThemeData,
  routeLocale: RouteLocale,
): ThemeData => {
  const { locales, ...baseOptions } = theme

  return {
    ...baseOptions,
    ...locales?.[routeLocale],
  }
}
