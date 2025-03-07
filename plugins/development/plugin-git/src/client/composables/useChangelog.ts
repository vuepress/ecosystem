import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import { usePageData, usePageFrontmatter, usePageLang } from 'vuepress/client'
import type {
  GitChangelogInfo,
  GitPluginFrontmatter,
  GitPluginPageData,
} from '../../shared/index.js'

export interface GitChangelogItem extends GitChangelogInfo {
  date: string
}

export const useChangelog = (): ComputedRef<GitChangelogItem[]> => {
  const frontmatter = usePageFrontmatter<GitPluginFrontmatter>()
  const lang = usePageLang()
  const page = usePageData<GitPluginPageData>()

  return computed(() => {
    if (frontmatter.value.changelog === false) return []

    const formatter = new Intl.DateTimeFormat(lang.value, {
      dateStyle: 'short',
    })

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return (page.value.git?.changelog ?? []).map((item) => ({
      date: formatter.format(item.time),
      ...item,
    }))
  })
}
