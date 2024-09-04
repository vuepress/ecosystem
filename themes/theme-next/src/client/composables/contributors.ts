import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import type { DefaultThemePageData } from '../../shared/index.js'
import { useData } from './data.js'

export const useContributors = (): ComputedRef<
  Required<NonNullable<DefaultThemePageData['git']>>['contributors'] | null
> => {
  const { theme, page, frontmatter } = useData()

  return computed(() => {
    const showContributors =
      frontmatter.value.contributors ?? theme.value.contributors ?? true

    if (!showContributors) return null

    return page.value.git?.contributors ?? null
  })
}
