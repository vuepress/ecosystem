import type { ThemeData } from '@vuepress/plugin-theme-data'
import type { ThemeLocaleDataRef } from '@vuepress/plugin-theme-data/client'
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/client'
import type { PageDataRef, PageFrontmatterRef } from 'vuepress/client'
import { usePageData, usePageFrontmatter } from 'vuepress/client'

/**
 * The data of a page and the theme
 *
 * 页面与主题的数据
 */
export interface ThemeDataRefs<
  ThemeLocaleData extends ThemeData,
  Frontmatter extends Record<string, unknown>,
  PageData extends Record<string, unknown>,
> {
  /**
   * The locale data of the theme
   *
   * 主题的多语言数据
   */
  theme: ThemeLocaleDataRef<ThemeLocaleData>

  /**
   * The frontmatter of the current page
   *
   * 当前页面的 frontmatter
   */
  frontmatter: PageFrontmatterRef<Frontmatter>

  /**
   * The data of the current page
   *
   * 当前页面的数据
   */
  page: PageDataRef<PageData>
}

/**
 * Get the data of the theme and the current page
 *
 * The generic parameters are used to type the theme locale data, the page
 * frontmatter and the page data. It combines `useThemeLocaleData()` with
 * `usePageData()` and `usePageFrontmatter()`.
 *
 * 获取主题与当前页面的数据
 *
 * 泛型参数用于标注主题多语言数据、页面 frontmatter 和页面数据的类型。它组合了 `useThemeLocaleData()`、
 * `usePageData()` 和 `usePageFrontmatter()`。
 *
 * @returns The data refs of the theme and the current page / 主题与当前页面的数据引用
 */
export const useData = <
  ThemeLocaleData extends ThemeData = ThemeData,
  Frontmatter extends Record<string, unknown> = Record<string, unknown>,
  PageData extends Record<string, unknown> = Record<string, unknown>,
>(): ThemeDataRefs<ThemeLocaleData, Frontmatter, PageData> => {
  const theme = useThemeLocaleData<ThemeLocaleData>()
  const frontmatter = usePageFrontmatter<Frontmatter>()
  const page = usePageData<PageData>()

  return { theme, frontmatter, page }
}
