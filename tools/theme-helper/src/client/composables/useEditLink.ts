import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import type { AutoLinkConfig } from 'vuepress/client'
import type {
  EditLinkFrontmatter,
  EditLinkPageData,
  EditLinkThemeData,
} from '../../shared/index.js'
import { resolveEditLink } from '../utils/index.js'
import { useData } from './useData.js'

export const useEditLink = (): ComputedRef<AutoLinkConfig | null> => {
  const { page, frontmatter, theme } = useData<
    EditLinkThemeData,
    EditLinkFrontmatter,
    EditLinkPageData
  >()

  return computed(() => {
    const showEditLink =
      frontmatter.value.editLink ?? theme.value.editLink ?? true

    if (!showEditLink) {
      return null
    }

    const {
      repo,
      docsRepo = repo,
      docsBranch = 'main',
      docsDir = '',
      editLinkText,
    } = theme.value

    if (!docsRepo) {
      return null
    }

    const editLink = resolveEditLink({
      docsRepo,
      docsBranch,
      docsDir,
      filePathRelative: page.value.filePathRelative,
      editLinkPattern:
        frontmatter.value.editLinkPattern ?? theme.value.editLinkPattern,
    })

    if (!editLink) return null

    return {
      text: editLinkText ?? 'Edit this page',
      link: editLink,
    }
  })
}
