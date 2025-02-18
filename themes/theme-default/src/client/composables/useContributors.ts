import { useData } from '@theme/useData'
import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import type { DefaultThemePageData } from '../../shared/index.js'

export const useContributors = (): ComputedRef<
  Exclude<DefaultThemePageData['git'], undefined>['contributors'] | null
> => {
  const { themeLocaleData, pageData, pageFrontmatter } = useData()

  return computed(() => {
    const showContributors =
      pageFrontmatter.value.contributors ??
      themeLocaleData.value.contributors ??
      true

    if (!showContributors) return null

    return pageData.value.git?.contributors ?? null
  })
}
