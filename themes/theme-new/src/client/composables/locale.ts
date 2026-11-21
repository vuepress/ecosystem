import { useThemeData } from '@vuepress/plugin-theme-data/client'
import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import { useRoute, useRouteLocale, useSiteLocaleData } from 'vuepress/client'

import type { DefaultTheme } from '../../shared/types.js'

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
 * Resolve the theme locale path of a route
 *
 * The node side keys the theme locales by their route locale path (`/`, `/zh/`,
 * ...). VitePress resolves the current locale from the theme locales, so the
 * longest matched locale path is used, and the root locale path is the fallback
 * whenever it is configured.
 *
 * 解析某个路由对应的主题语言路径
 *
 * Node 端以路由 locale 路径（`/`、`/zh/` 等）作为主题语言的键。VitePress 从主题
 * 语言配置中解析当前语言，因此这里使用匹配到的最长语言路径，并在配置了根语言 路径时以根路径作为回退。
 *
 * @param locales - Locale map of the theme config / 主题配置的语言映射
 * @param routePath - Path of the current route / 当前路由的路径
 * @param fallback - Fallback locale path / 回退的语言路径
 * @returns The resolved theme locale path / 解析出的主题语言路径
 */
export const resolveThemeLocalePath = (
  locales: DefaultTheme.Config['locales'],
  routePath: string,
  fallback: string,
): string => {
  if (!locales) return fallback

  let localePath = Object.hasOwn(locales, '/') ? '/' : fallback

  for (const path of Object.keys(locales)) {
    if (path === '/') continue

    const matched =
      routePath === path ||
      routePath === path.replace(/\/$/u, '') ||
      routePath.startsWith(path)

    if (matched && path.length > localePath.length) localePath = path
  }

  return localePath
}

/**
 * Resolve the theme locale path of the current route
 *
 * 解析当前路由对应的主题语言路径
 *
 * @returns Computed theme locale path / 计算出的主题语言路径
 */
export const useThemeLocalePath = (): ComputedRef<string> => {
  const themeData = useThemeData<DefaultTheme.Config>()
  const route = useRoute()
  const routeLocale = useRouteLocale()

  return computed(() =>
    resolveThemeLocalePath(
      themeData.value.locales,
      route.path,
      routeLocale.value,
    ),
  )
}

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
  const themeData = useThemeData<DefaultTheme.Config>()
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
