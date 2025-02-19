import { resolveRepoType } from '@theme/resolveRepoType'
import { useData } from '@theme/useData'
import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import { isLinkHttp } from 'vuepress/shared'
import type { NavbarItem } from '../typings.js'

/**
 * Get navbar config of repository link
 */
export const useNavbarRepo = (): ComputedRef<NavbarItem[]> => {
  const { themeLocaleData } = useData()

  const repo = computed(() => themeLocaleData.value.repo)
  const repoType = computed(() =>
    repo.value ? resolveRepoType(repo.value) : null,
  )

  const repoLink = computed(() => {
    if (repo.value && !isLinkHttp(repo.value)) {
      return `https://github.com/${repo.value}`
    }

    return repo.value
  })

  const repoLabel = computed(() => {
    if (!repoLink.value) return null
    if (themeLocaleData.value.repoLabel) return themeLocaleData.value.repoLabel
    if (repoType.value === null) return 'Source'
    return repoType.value
  })

  return computed(() => {
    if (!repoLink.value || !repoLabel.value) {
      return []
    }

    return [
      {
        text: repoLabel.value,
        link: repoLink.value,
      },
    ]
  })
}
