import type { ThemeData } from '@vuepress/plugin-theme-data'
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/client'
import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import type { AutoLinkConfig } from 'vuepress/client'
import { usePageData, usePageFrontmatter } from 'vuepress/client'

import type {
  EditLinkFrontmatter,
  EditLinkPageData,
  EditLinkThemeData,
} from '../../shared/index.js'
import { resolveEditLink } from '../utils/index.js'

/**
 * Get the edit link of the current page
 *
 * It reads the edit link options from the theme locale data, the page
 * frontmatter overrides the theme options.
 *
 * 获取当前页面的编辑链接
 *
 * 它会从主题多语言数据中读取编辑链接选项，页面 frontmatter 会覆盖主题选项。
 *
 * @returns The edit link config, or `null` if the edit link is disabled or
 *   cannot be resolved / 编辑链接配置，编辑链接被禁用或无法解析时为 `null`
 */
export const useEditLink = (): ComputedRef<AutoLinkConfig | null> => {
  const theme = useThemeLocaleData<ThemeData & EditLinkThemeData>()
  const frontmatter = usePageFrontmatter<
    EditLinkFrontmatter & Record<string, unknown>
  >()
  const page = usePageData<EditLinkPageData & Record<string, unknown>>()

  return computed(() => {
    const showEditLink =
      frontmatter.value.editLink ?? theme.value.editLink ?? true
    if (!showEditLink) return null

    const {
      repo,
      docsRepo = repo,
      docsBranch = 'main',
      docsDir = '',
      editLinkText,
    } = theme.value

    if (!docsRepo) return null

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
