import { useThemeLocaleData } from '@theme/useThemeData'
import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import { usePageData, usePageFrontmatter } from 'vuepress/client'
import type {
  DefaultThemeNormalPageFrontmatter,
  DefaultThemePageData,
} from '../../shared/index.js'

export const useContributors = (): ComputedRef<
  Exclude<DefaultThemePageData['git'], undefined>['contributors'] | null
> => {
  const themeLocale = useThemeLocaleData()
  const page = usePageData<DefaultThemePageData>()
  const frontmatter = usePageFrontmatter<DefaultThemeNormalPageFrontmatter>()

  return computed(() => {
    const showContributors =
      frontmatter.value.contributors ?? themeLocale.value.contributors ?? true

    if (!showContributors) return null

    return page.value.git?.contributors ?? null
  })
}
