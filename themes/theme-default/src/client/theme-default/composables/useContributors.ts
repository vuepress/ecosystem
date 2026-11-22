import { useThemeLocaleData } from '@vuepress/plugin-theme-data/client'
import { computed, type ComputedRef } from 'vue'

import {
  useThemePageData,
  useThemePageFrontmatter,
} from '../../composables/useThemePageData.js'
import type { ThemeConfig, ThemeContributor } from '../shared.js'

/**
 * Resolve the contributors of the current page
 *
 * 解析当前页面的贡献者
 *
 * @returns The contributors of the page / 页面的贡献者
 */
export const useContributors = (): ComputedRef<ThemeContributor[]> => {
  const theme = useThemeLocaleData<ThemeConfig>()
  const frontmatter = useThemePageFrontmatter()
  const page = useThemePageData()

  return computed(() => {
    if (frontmatter.value.contributors === false) return []
    if (theme.value.contributors === false) return []

    return page.value.git?.contributors ?? []
  })
}
