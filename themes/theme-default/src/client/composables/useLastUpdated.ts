import { useThemeLocaleData } from '@theme/useThemeData'
import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import { usePageData, usePageFrontmatter } from 'vuepress/client'
import type {
  DefaultThemeNormalPageFrontmatter,
  DefaultThemePageData,
} from '../../shared/index.js'

export const useLastUpdated = (): ComputedRef<string | null> => {
  const themeLocale = useThemeLocaleData()
  const page = usePageData<DefaultThemePageData>()
  const frontmatter = usePageFrontmatter<DefaultThemeNormalPageFrontmatter>()

  return computed(() => {
    const showLastUpdated =
      frontmatter.value.lastUpdated ?? themeLocale.value.lastUpdated ?? true

    if (!showLastUpdated) return null

    if (!page.value.git?.updatedTime) return null

    const updatedDate = new Date(page.value.git.updatedTime)

    return updatedDate.toLocaleString()
  })
}
