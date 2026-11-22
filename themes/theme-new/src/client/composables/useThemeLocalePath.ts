import { useThemeData } from '@vuepress/plugin-theme-data/client'
import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import { useRouteLocale, useSiteLocaleData } from 'vuepress/client'

import type { ThemeConfig } from '../../shared/types.js'

/**
 * Locale information derived from the theme config
 *
 * 从主题配置派生出的语言信息
 */
export interface ThemeLocale {
  /** Text direction of the locale / 语言的文本方向 */
  dir: 'ltr' | 'rtl' | 'auto'
  /** Language of the locale / 语言代码 */
  lang: string
  /** Label of the locale / 语言名称 */
  label: string
  /** Link of the locale / 语言链接 */
  link: string
}

/**
 * Resolve the route locale path of the current route
 *
 * VuePress derives the route locale from the site locales, which is also the
 * source of the theme locale data merge, so the theme reuses it directly.
 *
 * 解析当前路由的路由语言路径
 *
 * VuePress 从站点 locales 推导路由语言，它同时也是主题语言数据合并的依据，因此主题直接复用。
 *
 * @returns Computed route locale path / 计算出的路由语言路径
 */
export const useThemeLocalePath = (): ComputedRef<string> => useRouteLocale()

/**
 * Resolve the locales of the theme config
 *
 * The raw theme data keeps the path-keyed locale map, while the merged theme
 * locale data provided by the theme data plugin drops the `locales` field.
 * Missing fields fall back to the site locale data.
 *
 * 解析主题配置中的语言信息
 *
 * 原始主题数据保留了以路径为键的语言映射，而主题数据插件提供的合并后的主题 语言数据会丢掉 `locales` 字段。缺失的字段会回退到站点 locale
 * 数据。
 *
 * @returns Computed locale map keyed by locale path / 以语言路径为键的计算语言映射
 */
export const useThemeLocales = (): ComputedRef<Record<string, ThemeLocale>> => {
  const themeData = useThemeData<ThemeConfig>()
  const siteLocale = useSiteLocaleData()

  return computed(() => {
    const locales = themeData.value.locales ?? {}

    return Object.fromEntries(
      Object.entries(locales).map(([localePath, locale]) => [
        localePath,
        {
          label: locale.label ?? localePath,
          link: locale.link ?? localePath,
          lang: locale.lang ?? siteLocale.value.lang,
          dir: locale.dir ?? 'ltr',
        },
      ]),
    )
  })
}
