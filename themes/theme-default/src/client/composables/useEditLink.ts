import { resolveEditLink } from '@theme/resolveEditLink'
import { useData } from '@theme/useData'
import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import type { AutoLinkConfig } from 'vuepress/client'

export const useEditLink = (): ComputedRef<AutoLinkConfig | null> => {
  const { frontmatter, page, themeLocale } = useData()

  return computed(() => {
    const showEditLink =
      frontmatter.value.editLink ?? themeLocale.value.editLink ?? true
    if (!showEditLink) {
      return null
    }

    const {
      repo,
      docsRepo = repo,
      docsBranch = 'main',
      docsDir = '',
      editLinkText,
    } = themeLocale.value

    if (!docsRepo) return null

    const editLink = resolveEditLink({
      docsRepo,
      docsBranch,
      docsDir,
      filePathRelative: page.value.filePathRelative,
      editLinkPattern:
        frontmatter.value.editLinkPattern ?? themeLocale.value.editLinkPattern,
    })

    if (!editLink) return null

    return {
      text: editLinkText ?? 'Edit this page',
      link: editLink,
    }
  })
}
