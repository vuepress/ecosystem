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
