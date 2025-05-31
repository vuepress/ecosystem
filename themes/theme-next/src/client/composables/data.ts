import { useThemeLocaleData } from '@theme/theme-data'
import type { ThemeLocaleDataRef } from '@vuepress/plugin-theme-data/client'
import type { PageDataRef, PageFrontmatterRef } from 'vuepress/client'
import { usePageData, usePageFrontmatter } from 'vuepress/client'
import type {
  DefaultThemeData,
  DefaultThemeNormalPageFrontmatter,
  DefaultThemePageData,
} from '../../shared/index.js'

export const useData = (): {
  page: PageDataRef<DefaultThemePageData>
  frontmatter: PageFrontmatterRef<DefaultThemeNormalPageFrontmatter>
  themeLocale: ThemeLocaleDataRef<DefaultThemeData>
} => {
  const page = usePageData<DefaultThemePageData>()
  const frontmatter = usePageFrontmatter<DefaultThemeNormalPageFrontmatter>()
  const themeLocale = useThemeLocaleData()

  return { page, frontmatter, themeLocale }
}
