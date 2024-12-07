export interface EditLinkOptions {
  /**
   * Source repo link
   *
   * 源代码仓库链接
   */
  repo?: string | null

  /**
   * @kind Page meta
   *
   * Whether to show "Edit this page" or not
   *
   * 是否显示“编辑此页面”
   *
   * @default true
   */
  editLink?: boolean

  /**
   * @kind Page meta
   *
   * The text for edit link
   *
   * 编辑链接的文本
   *
   * @default 'Edit this page'
   */
  editLinkText?: string

  /**
   * @kind Page meta
   *
   * Pattern of edit link
   *
   * 编辑链接的模式
   *
   * @description `:repo` {@link docsRepo} | `:branch` {@link docsBranch} |  `:path` {@link docsDir}
   * @example ':repo/edit/:branch/:path'
   */
  editLinkPattern?: string

  /**
   * @kind Page meta
   *
   * Docs repo link
   *
   * 文档仓库链接
   *
   * @default repo
   */
  docsRepo?: string

  /**
   * @kind Page meta
   *
   * Docs branch
   *
   * 文档分支
   *
   * @default 'main'
   */
  docsBranch?: string

  /**
   * @kind Page meta
   *
   * Docs dir
   *
   * 文档目录
   *
   * @default ''
   */
  docsDir?: string
}

export type EditLinkFrontmatter = Pick<
  EditLinkOptions,
  'editLink' | 'editLinkPattern'
>

export type EditLinkThemeData = EditLinkOptions

export interface EditLinkPageData {
  /**
   * Relative path of current page
   *
   * 当前页面的相对路径
   */
  filePathRelative: string | null
}
