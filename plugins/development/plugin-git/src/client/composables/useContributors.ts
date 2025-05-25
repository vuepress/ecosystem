import type { ComputedRef, MaybeRefOrGetter } from 'vue'
import { computed, toValue } from 'vue'
import { useData } from 'vuepress/client'
import type {
  GitContributorInfo,
  GitPluginFrontmatter,
  GitPluginPageData,
} from '../../shared/index.js'

declare const __GIT_CONTRIBUTORS__: boolean

export const useContributors =
  typeof __GIT_CONTRIBUTORS__ === 'boolean' && __GIT_CONTRIBUTORS__
    ? (
        enabled: MaybeRefOrGetter<boolean> = true,
      ): ComputedRef<GitContributorInfo[]> => {
        const { frontmatter, page } = useData<
          GitPluginFrontmatter,
          GitPluginPageData
        >()

        return computed(() => {
          if (frontmatter.value.contributors === false || !toValue(enabled))
            return []

          return page.value.git.contributors ?? []
        })
      }
    : (): ComputedRef<GitContributorInfo[]> => computed(() => [])
