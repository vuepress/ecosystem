import type { ComputedRef, MaybeRefOrGetter } from 'vue'
import { computed, toValue } from 'vue'
import { useData } from 'vuepress/client'
import type {
  GitContributorInfo,
  GitPluginFrontmatter,
  GitPluginPageData,
} from '../../shared/index.js'

declare const __GIT_CONTRIBUTORS__: boolean

/**
 * Contributors composable
 *
 * 贡献者组合式函数
 *
 * @param enabled - Whether to enable contributors
 *
 * 是否启用贡献者
 *
 * @default true
 */
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
