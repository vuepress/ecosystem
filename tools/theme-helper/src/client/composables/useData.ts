import type { ThemeLocaleDataRef } from '@vuepress/plugin-theme-data/client'
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/client'
import type { PageDataRef, PageFrontmatterRef } from 'vuepress/client'
import { usePageData, usePageFrontmatter } from 'vuepress/client'

export const useData = <ThemeLocaleData, Frontmatter, PageData>(): {
  theme: ThemeLocaleDataRef<Record<never, never> & ThemeLocaleData>
  frontmatter: PageFrontmatterRef<Frontmatter & Record<string, unknown>>
  page: PageDataRef<PageData & Record<string, unknown>>
} => {
  const theme = useThemeLocaleData<Record<never, never> & ThemeLocaleData>()
  const frontmatter = usePageFrontmatter<
    Frontmatter & Record<string, unknown>
  >()
  const page = usePageData<PageData & Record<string, unknown>>()

  return { theme, frontmatter, page }
}
