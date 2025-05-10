import type { PageFrontmatter } from 'vuepress'

/**
 * A literal type that supports custom further strings but preserves autocompletion in IDEs.
 *
 * @see {@link https://github.com/microsoft/TypeScript/issues/29729#issuecomment-471566609 | copied from issue}
 */
export type LiteralUnion<Union extends Base, Base = string> =
  | Union
  | (Base & { IGNORE_ME?: never })

/**
 * Represents the link extension options for generated links.
 *
 * 表示生成链接的链接扩展选项
 */
export type LinksExtension = LiteralUnion<'.html' | '.md'>

/**
 * Options for generating a Table of Contents (TOC).
 */
export interface GenerateTOCOptions {
  /**
   * Optional domain to prefix URLs with.
   */
  domain?: string

  /**
   * Optional base URL to prefix URLs with.
   */
  base: string

  /**
   * The link extension for generated links.
   */
  linkExtension?: LinksExtension
}

export interface TemplateGetter {
  /**
   * The title
   *
   * @description Extracted from the frontmatter or the first h1 heading in the main document (`README.md`) by default
   *
   * 标题
   *
   * @description 默认从 frontmatter 部分或主文档（`README.md`）中第一个 h1 标题提取的标题。
   *
   * @example 'Awesome tool'
   */
  title?: string

  /**
   * Project description.
   *
   * 项目描述。
   *
   * @example 'Blazing fast build tool'
   */
  description?: string

  /**
   * The details.
   *
   * 详情。
   *
   * @example 'A multi-user version of the notebook designed for companies, classrooms and research labs'
   */
  details?: string

  /**
   * An automatically generated **T**able **O**f **C**ontents.
   *
   * 自动生成的**T**oc**O**c**C**nts。
   *
   * @example
   * ```md
   * - [Title](/foo.md): Lorem ipsum dolor sit amet, consectetur adipiscing elit.
   * - [Title 2](/bar/baz.md): Cras vel nibh id ipsum pharetra efficitur.
   * ```
   */
  toc?: string

  /** Any custom variable */
  [key: string]: string | undefined
}

/**
 * Represents a prepared page, including its title and path.
 *
 * 表示一个已准备好的页面，包括其标题和路径。
 */
export interface PreparedPage {
  /**
   * The title of the page.
   *
   * 页面标题
   *
   * @example 'Guide'
   */
  title: string

  /**
   * The permalink path to the page.
   *
   * 页面的永久访问地址
   *
   * @example '/guide/getting-started.html'
   */
  path: string

  /**
   * The frontmatter of the page.
   *
   * 页面 frontmatter
   *
   * @example `{ title: 'Guide', description: 'A guide' }`
   */
  frontmatter: PageFrontmatter

  /**
   * The content of the markdown file.
   *
   * 页面的 markdown 内容
   *
   * @example '# Guide\n\nA guide'
   */
  content: string
}
