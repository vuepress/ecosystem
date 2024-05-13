import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import type { DefaultThemePageData } from '../../shared/index.js'
import { useData } from './data.js'

export function useContributors(): ComputedRef<
  null | Required<DefaultThemePageData['git']>['contributors']
> {
  const { theme, page, frontmatter } = useData()

  return computed(() => {
    const showContributors =
      frontmatter.value.contributors ?? theme.value.contributors ?? true

    if (!showContributors) return null

    return page.value.git?.contributors ?? null
  })
}
