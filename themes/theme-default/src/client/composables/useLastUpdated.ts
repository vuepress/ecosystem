import { useData } from '@theme/useData'
import type { ComputedRef } from 'vue'
import { computed } from 'vue'

export const useLastUpdated = (): ComputedRef<string | null> => {
  const { frontmatter, page, themeLocale } = useData()

  return computed(() => {
    const showLastUpdated =
      frontmatter.value.lastUpdated ?? themeLocale.value.lastUpdated ?? true

    if (!showLastUpdated) return null

    if (!page.value.git?.updatedTime) return null

    const updatedDate = new Date(page.value.git.updatedTime)

    return updatedDate.toLocaleString()
  })
}
