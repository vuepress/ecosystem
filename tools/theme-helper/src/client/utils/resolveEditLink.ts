import {
  isLinkHttp,
  removeEndingSlash,
  removeLeadingSlash,
} from 'vuepress/shared'

import { EDIT_LINK_PATTERNS, resolveRepoType } from '../../shared/editLink.js'

export { EDIT_LINK_PATTERNS } from '../../shared/editLink.js'

const resolveEditLinkPatterns = ({
  docsRepo,
  editLinkPattern,
}: {
  docsRepo: string
  editLinkPattern?: string
}): string | null => {
  if (editLinkPattern) return editLinkPattern

  const repoType = resolveRepoType(docsRepo)
  if (repoType != null) return EDIT_LINK_PATTERNS[repoType]

  return null
}

/**
 * Resolve the edit link of a page
 *
 * The link is generated from the documentation repository, branch, directory
 * and the relative file path of the page. A custom pattern can be provided to
 * override the default pattern of the repository.
 *
 * 解析页面的编辑链接
 *
 * 链接由文档仓库、分支、目录和页面的相对文件路径生成。你可以提供自定义模式来覆盖仓库的默认模式。
 *
 * @param options - Options to resolve the edit link / 解析编辑链接的选项
 * @param options.docsRepo - Link or `owner/repo` of the documentation
 *   repository / 文档仓库链接或 `owner/repo`
 * @param options.docsBranch - Branch of the documentation repository / 文档仓库分支
 * @param options.docsDir - Directory of the documentation in the repository /
 *   文档在仓库中的目录
 * @param options.filePathRelative - Relative file path of the page / 页面的相对文件路径
 * @param options.editLinkPattern - Custom pattern of the edit link / 自定义编辑链接模式
 * @returns The edit link, or `null` if it cannot be resolved / 编辑链接，无法解析时为
 *   `null`
 */
export const resolveEditLink = ({
  docsRepo,
  docsBranch,
  docsDir,
  filePathRelative,
  editLinkPattern,
}: {
  docsRepo: string
  docsBranch: string
  docsDir: string
  filePathRelative: string | null
  editLinkPattern?: string
}): string | null => {
  if (!filePathRelative) return null

  const pattern = resolveEditLinkPatterns({ docsRepo, editLinkPattern })
  if (!pattern) return null

  return pattern
    .replaceAll(
      ':repo',
      isLinkHttp(docsRepo) ? docsRepo : `https://github.com/${docsRepo}`,
    )
    .replaceAll(':branch', docsBranch)
    .replaceAll(
      ':path',
      removeLeadingSlash(`${removeEndingSlash(docsDir)}/${filePathRelative}`),
    )
}
