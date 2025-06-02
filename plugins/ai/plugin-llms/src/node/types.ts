import type { App, Page } from 'vuepress/core'
import type { SiteLocaleData } from 'vuepress/shared'

/**
 * Link extension options for generated links
 *
 * 生成链接的扩展名选项
 */
export type LinkExtension = '.html' | '.md'

/**
 * Page with additional LLM-friendly content
 *
 * 包含额外 LLM 友好内容的页面
 */
export interface LLMPage extends Page {
  /**
   * The page's Markdown content
   *
   * 页面的 Markdown 内容
   *
   * @example '# Guide\n\nA guide'
   */
  markdown: string

  /**
   * The page's excerpt
   *
   * 页面摘要
   *
   * @example 'Introduction to the guide'
   */
  excerpt: string
}

/**
 * State object for LLM text generation
 *
 * LLM 文本生成的状态对象
 */
export interface LLMState {
  /**
   * VuePress app instance
   *
   * VuePress 应用实例
   */
  app: App

  /**
   * Site base URL
   *
   * 站点基础 URL
   */
  base: string

  /**
   * Optional domain to prepend to URLs
   *
   * 可选的域名前缀
   */
  domain?: string

  /**
   * Link extension for generated links
   *
   * 生成链接的扩展名
   */
  linkExtension?: LinkExtension

  /**
   * Current locale path
   *
   * 当前语言环境路径
   */
  currentLocale: string

  /**
   * Current site locale data
   *
   * 当前站点语言环境数据
   */
  siteLocale: SiteLocaleData

  /**
   * Whether to generate files for all locales
   *
   * 是否为所有语言环境生成文件
   */
  allLocales: boolean
}

export type TemplateGetter = (pages: LLMPage[], state: LLMState) => string

export interface TemplateGetterOptions {
  /**
   * Site title
   *
   * Extracted from frontmatter or first h1 heading in main document (`README.md`) by default
   *
   * 站点标题
   *
   * 默认从 frontmatter 或主文档（`README.md`）中的第一个 h1 标题提取
   *
   * @example 'Awesome Tool'
   */
  title?: TemplateGetter | string

  /**
   * Site description
   *
   * 站点描述
   *
   * @example 'Blazing fast build tool'
   */
  description?: TemplateGetter | string

  /**
   * Additional details about the site
   *
   * 站点的额外详情
   *
   * @example 'A multi-user version of the notebook designed for companies, classrooms and research labs'
   */
  details?: TemplateGetter | string

  /**
   * Automatically generated **T**able **o**f **C**ontents
   *
   * 自动生成的目录
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
