import type { ThemeLocaleDataRef } from '@vuepress/plugin-theme-data/client'
import type { Ref } from 'vue'
import { usePageData, usePageFrontmatter } from 'vuepress/client'
import type { PageDataRef, PageFrontmatterRef } from 'vuepress/client'
import type {
  DefaultThemeData,
  DefaultThemeNormalPageFrontmatter,
  DefaultThemePageData,
} from '../../shared/index.js'
import { useDarkMode } from './dark-mode.js'
import { hash } from './hash.js'
import { useThemeLocaleData } from './theme-data.js'

export function useData(): {
  page: PageDataRef<DefaultThemePageData>
  frontmatter: PageFrontmatterRef<DefaultThemeNormalPageFrontmatter>
  theme: ThemeLocaleDataRef<DefaultThemeData>
  hash: Ref<string>
  isDark: Ref<boolean>
} {
  const page = usePageData<DefaultThemePageData>()
  const frontmatter = usePageFrontmatter<DefaultThemeNormalPageFrontmatter>()
  const theme = useThemeLocaleData()
  const isDark = useDarkMode()

  return { page, frontmatter, theme, hash, isDark }
}
