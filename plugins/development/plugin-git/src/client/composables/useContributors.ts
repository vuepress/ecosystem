import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import { usePageData, usePageFrontmatter } from 'vuepress/client'
import type {
  GitContributorInfo,
  GitPluginFrontmatter,
  GitPluginPageData,
} from '../../shared/index.js'

declare const __GIT_CONTRIBUTORS__: boolean

export const useContributors =
  typeof __GIT_CONTRIBUTORS__ === 'boolean' && __GIT_CONTRIBUTORS__
    ? (): ComputedRef<GitContributorInfo[]> => {
        const frontmatter = usePageFrontmatter<GitPluginFrontmatter>()
        const page = usePageData<GitPluginPageData>()

        return computed(() => {
          if (frontmatter.value.contributors === false) return []

          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          return page.value.git?.contributors ?? []
        })
      }
    : (): ComputedRef<GitContributorInfo[]> => computed(() => [])
