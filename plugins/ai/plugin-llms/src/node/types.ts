import type { App, Page } from 'vuepress/core'
import type { SiteLocaleData } from 'vuepress/shared'

/**
 * Represents the link extension options for generated links.
 *
 * 表示生成链接的链接扩展选项
 */
export type LinkExtension = '.html' | '.md'

/**
 * Represents a prepared page, including its title and path.
 *
 * 表示一个已准备好的页面，包括其标题和路径。
 */
export interface LLMPage extends Page {
  /**
   * The content of the markdown file.
   *
   * 页面的 markdown 内容
   *
   * @example '# Guide\n\nA guide'
   */
  markdown: string

  /**
   * The excerpt of the page.
   *
   * 页面的摘要
   *
   * @example 'Introduction to the guide'
   */
  excerpt: string
}

/**
 * LLM state
 */
export interface LLMState {
  /**
   * The VuePress app instance.
   *
   * VuePress 应用实例
   */
  app: App

  /**
   * Base URL
   *
   * 基本 URL
   */
  base: string

  /**
   * Optional domain to prefix URLs with.
   *
   * 可选的域名，用于在 URL 前缀
   */
  domain?: string

  /**
   * The link extension for generated links.
   *
   * 生成链接的链接扩展
   */
  linkExtension?: LinkExtension

  /**
   * The path of the current locale.
   *
   * 当前语言环境的路径
   */
  currentLocale: string

  /**
   * Current site locale data
   *
   * 当前站点语言环境数据
   */
  siteLocale: SiteLocaleData

  /**
   * Whether to generate llms.txt files for all locales.
   *
   * 是否为所有语言环境生成 llms.txt 文件
   */
  allLocales: boolean
}

export type TemplateGetter = (pages: LLMPage[], state: LLMState) => string

export interface TemplateGetterOptions {
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
  title?: TemplateGetter | string

  /**
   * Project description.
   *
   * 项目描述。
   *
   * @example 'Blazing fast build tool'
   */
  description?: TemplateGetter | string

  /**
   * The details.
   *
   * 详情。
   *
   * @example 'A multi-user version of the notebook designed for companies, classrooms and research labs'
   */
  details?: TemplateGetter | string

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
  toc?: TemplateGetter | string

  /** Any custom variable */
  [key: string]: TemplateGetter | string | undefined
}
