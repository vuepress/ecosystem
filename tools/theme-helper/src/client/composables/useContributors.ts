import type { GitContributor, GitPluginPageData } from '@vuepress/plugin-git'
import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import type {
  ContributorFrontmatter,
  ContributorThemeData,
} from '../../shared/index.js'
import { useData } from './useData.js'

export const useContributors = (): ComputedRef<GitContributor[] | null> => {
  const { page, frontmatter, theme } = useData<
    ContributorThemeData,
    ContributorFrontmatter,
    GitPluginPageData
  >()

  return computed(() => {
    const showContributors =
      frontmatter.value.contributors ?? theme.value.contributors ?? true

    if (!showContributors) return null

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return page.value.git?.contributors ?? null
  })
}
