import { resolveEditLink } from '@theme/resolveEditLink'
import { useData } from '@theme/useData'
import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import type { AutoLinkConfig } from 'vuepress/client'

export const useEditLink = (): ComputedRef<AutoLinkConfig | null> => {
  const { themeLocaleData, pageData, pageFrontmatter } = useData()

  return computed(() => {
    const showEditLink =
      pageFrontmatter.value.editLink ?? themeLocaleData.value.editLink ?? true
    if (!showEditLink) {
      return null
    }

    const {
      repo,
      docsRepo = repo,
      docsBranch = 'main',
      docsDir = '',
      editLinkText,
    } = themeLocaleData.value

    if (!docsRepo) return null

    const editLink = resolveEditLink({
      docsRepo,
      docsBranch,
      docsDir,
      filePathRelative: pageData.value.filePathRelative,
      editLinkPattern:
        pageFrontmatter.value.editLinkPattern ??
        themeLocaleData.value.editLinkPattern,
    })

    if (!editLink) return null

    return {
      text: editLinkText ?? 'Edit this page',
      link: editLink,
    }
  })
}
