import {
  isLinkHttp,
  removeEndingSlash,
  removeLeadingSlash,
} from 'vuepress/shared'

/**
 * Options of the page edit link
 *
 * 页面编辑链接选项
 */
export interface EditLinkOptions {
  /**
   * Source repository link
   *
   * 源代码仓库链接
   */
  repo?: string | null

  /**
   * Whether to show "Edit this page" or not
   *
   * 是否显示“编辑此页面”
   *
   * @default true
   */
  editLink?: boolean

  /**
   * The text of the edit link
   *
   * 编辑链接的文本
   *
   * @default 'Edit this page'
   */
  editLinkText?: string

  /**
   * Pattern of the edit link
   *
   * 编辑链接的模式
   *
   * `:repo` is {@link docsRepo}, `:branch` is {@link docsBranch} and `:path` is
   * {@link docsDir} + page file path.
   *
   * @example
   *   ':repo/edit/:branch/:path'
   */
  editLinkPattern?: string

  /**
   * Repository of the documentation
   *
   * 文档仓库
   *
   * @default repo
   */
  docsRepo?: string

  /**
   * Branch of the documentation repository
   *
   * 文档仓库分支
   *
   * @default 'main'
   */
  docsBranch?: string

  /**
   * Directory of the documentation in the repository
   *
   * 文档在仓库中的目录
   *
   * @default ''
   */
  docsDir?: string
}

/**
 * Frontmatter of the page edit link
 *
 * 页面编辑链接的 frontmatter
 */
export type EditLinkFrontmatter = Pick<
  EditLinkOptions,
  'editLink' | 'editLinkPattern'
>

/**
 * Theme data of the page edit link
 *
 * 页面编辑链接的主题数据
 */
export type EditLinkThemeData = EditLinkOptions

/**
 * Page data of the page edit link
 *
 * 页面编辑链接的页面数据
 */
export interface EditLinkPageData {
  /**
   * Relative path of the current page
   *
   * 当前页面的相对路径
   */
  filePathRelative: string | null
}

/**
 * Type of the repository
 *
 * 仓库类型
 */
export type RepoType = 'Bitbucket' | 'Gitee' | 'GitHub' | 'GitLab' | null

/**
 * Resolve the type of the repository from its link
 *
 * A repository without a complete link is considered to be hosted on GitHub.
 *
 * 从仓库链接解析仓库类型
 *
 * 没有完整链接的仓库会被视为托管在 GitHub。
 *
 * @param repo - Repository link or `owner/repo` / 仓库链接或 `owner/repo`
 * @returns Type of the repository, or `null` if it is not recognized /
 *   仓库类型，无法识别时为 `null`
 */
export const resolveRepoType = (repo: string): RepoType => {
  if (isLinkHttp(repo) && !/^(?:https?:)?\/\/github\.com\//u.test(repo)) {
    if (/^(?:https?:)?\/\/bitbucket\.org\//u.test(repo)) return 'Bitbucket'
    if (/^(?:https?:)?\/\/gitlab\.com\//u.test(repo)) return 'GitLab'
    if (/^(?:https?:)?\/\/gitee\.com\//u.test(repo)) return 'Gitee'
    return null
  }

  return 'GitHub'
}

/**
 * Default edit link patterns of the supported repositories
 *
 * 支持的仓库的默认编辑链接模式
 */
export const EDIT_LINK_PATTERNS: Record<Exclude<RepoType, null>, string> = {
  GitHub: ':repo/edit/:branch/:path',
  GitLab: ':repo/-/edit/:branch/:path',
  Gitee: ':repo/edit/:branch/:path',
  Bitbucket:
    ':repo/src/:branch/:path?mode=edit&spa=0&at=:branch&fileviewer=file-view-default',
}

/**
 * Options of {@link getEditLinkPattern}
 *
 * {@link getEditLinkPattern} 的选项
 */
export interface GetEditLinkPatternOptions {
  /** Repository link or `owner/repo` / 仓库链接或 `owner/repo` */
  repo: string

  /**
   * Branch of the repository
   *
   * 仓库分支
   *
   * @default 'main'
   */
  branch?: string

  /**
   * Directory of the documentation in the repository
   *
   * 文档在仓库中的目录
   *
   * @default ''
   */
  dir?: string
}

/**
 * Resolve the edit link pattern of a repository
 *
 * The pattern is a string template that only keeps the `:path` placeholder, so
 * it can be used by the `editLink.pattern` option of the theme. Repositories
 * other than GitHub, GitLab, Gitee and Bitbucket fall back to the `edit` path
 * of Gitea-like forges.
 *
 * 解析仓库的编辑链接模式
 *
 * 模式是只保留 `:path` 占位符的字符串模板，可直接用于主题的 `editLink.pattern` 选项。 除
 * GitHub、GitLab、Gitee、Bitbucket 之外的仓库会回退到 Gitea 类平台的 `edit` 路径。
 *
 * @example
 *   getEditLinkPattern({ repo: 'vuepress/ecosystem' })
 *   // => '<https://github.com/vuepress/ecosystem/edit/main/:path>'
 *
 * @param options - Options of the pattern / 模式的选项
 * @returns The edit link pattern / 编辑链接模式
 */
export const getEditLinkPattern = ({
  repo,
  branch = 'main',
  dir = '',
}: GetEditLinkPatternOptions): string => {
  const repoLink = isLinkHttp(repo) ? repo : `https://github.com/${repo}`
  const repoType = resolveRepoType(repo)
  const pattern = repoType
    ? EDIT_LINK_PATTERNS[repoType]
    : ':repo/edit/:branch/:path'
  const normalizedDir = dir
    ? `${removeEndingSlash(removeLeadingSlash(dir))}/`
    : ''

  return pattern
    .replaceAll(':repo', repoLink)
    .replaceAll(':branch', branch)
    .replaceAll(':path', `${normalizedDir}:path`)
}
