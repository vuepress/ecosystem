import type { ComputedRef, MaybeRefOrGetter } from 'vue'
import { computed, toValue } from 'vue'
import { usePageData, usePageFrontmatter, usePageLang } from 'vuepress/client'
import type {
  GitChangelogInfo,
  GitPluginFrontmatter,
  GitPluginPageData,
} from '../../shared/index.js'
import { gitOptions } from '../options.js'
import { resolveRepoLink } from '../utils/index.js'

declare const __GIT_CHANGELOG__: boolean

export interface GitChangelogItem extends GitChangelogInfo {
  date: string
}

const RE_ISSUE = /#(\d+)/g

export const useChangelog =
  typeof __GIT_CHANGELOG__ === 'boolean' && __GIT_CHANGELOG__
    ? (
        enabled: MaybeRefOrGetter<boolean> = true,
      ): ComputedRef<GitChangelogItem[]> => {
        const frontmatter = usePageFrontmatter<GitPluginFrontmatter>()
        const lang = usePageLang()
        const page = usePageData<GitPluginPageData>()

        const { pattern = {}, provider } = gitOptions
        const repo = resolveRepoLink(gitOptions.repo, provider)

        return computed(() => {
          if (frontmatter.value.changelog === false || !toValue(enabled))
            return []

          const formatter = new Intl.DateTimeFormat(lang.value, {
            dateStyle: 'short',
          })

          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          return (page.value.git?.changelog ?? []).map((item) => {
            const res: GitChangelogItem = {
              date: formatter.format(item.time),
              ...item,
            }

            if (pattern.issue && repo) {
              res.message = res.message.replace(
                RE_ISSUE,
                (matched, issue: string) => {
                  const url = pattern
                    .issue!.replace(':issue', issue)
                    .replace(':repo', repo)
                  return `<a href="${url}" target="_blank" rel="noopener noreferrer">${matched}</a>`
                },
              )
            }

            if (pattern.commit && repo) {
              res.commitUrl = pattern.commit
                .replace(':hash', res.hash)
                .replace(':repo', repo)
            }

            if (pattern.tag && repo && res.tag)
              res.tagUrl = pattern.tag
                .replace(':tag', res.tag)
                .replace(':repo', repo)

            return res
          })
        })
      }
    : (): ComputedRef<GitChangelogItem[]> => computed(() => [])
