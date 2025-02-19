import { useData } from '@theme/useData'
import type { ComputedRef } from 'vue'
import { computed } from 'vue'

export const useLastUpdated = (): ComputedRef<string | null> => {
  const { themeLocaleData, pageData, pageFrontmatter } = useData()

  return computed(() => {
    const showLastUpdated =
      pageFrontmatter.value.lastUpdated ??
      themeLocaleData.value.lastUpdated ??
      true

    if (!showLastUpdated) return null

    if (!pageData.value.git?.updatedTime) return null

    const updatedDate = new Date(pageData.value.git.updatedTime)

    return updatedDate.toLocaleString()
  })
}
