import { useData } from '@theme/useData'
import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import type { DefaultThemePageData } from '../../shared/index.js'

export const useContributors = (): ComputedRef<
  Exclude<DefaultThemePageData['git'], undefined>['contributors'] | null
> => {
  const { themeLocale, page, frontmatter } = useData()

  return computed(() => {
    const showContributors =
      frontmatter.value.contributors ?? themeLocale.value.contributors ?? true

    if (!showContributors) return null

    return page.value.git?.contributors ?? null
  })
}
