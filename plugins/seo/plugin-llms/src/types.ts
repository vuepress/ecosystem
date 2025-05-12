import type { GrayMatterFile } from 'gray-matter'
import matter from 'gray-matter'

/** Template variables used in the llms.txt file template. | 在 llms.txt 文件模板中使用的模板变量。 */
interface TemplateVariables {
  /**
   * The title extracted from the frontmatter or the first h1 heading in the main document (`index.md`). | 从 frontmatter 或主文档 (`index.md`) 中的第一个 h1 标题提取的标题。
   * @example 'Awesome tool'
   */
  title?: string

  /**
   * The description. | 描述信息。
   * @example 'Blazing fast build tool'
   */
  description?: string

  /**
   * The details. | 详细信息。
   * @example 'A multi-user version of the notebook designed for companies, classrooms and research labs'
   */
  details?: string

  /**
   * An automatically generated **T**able **O**f **C**ontents. | 自动生成的**目录**。
   * @example
   * ```markdown
   * - [Title](/foo.md): Lorem ipsum dolor sit amet, consectetur adipiscing elit.
   * - [Title 2](/bar/baz.md): Cras vel nibh id ipsum pharetra efficitur.
   * ```
   */
  toc?: string | boolean
}

/** Extension of TemplateVariables that allows for custom variables. | TemplateVariables 的扩展，允许自定义变量。 */
export interface CustomTemplateVariables extends TemplateVariables {
  /** Any custom variable | 任何自定义变量 */
  [key: string]: string | boolean | undefined
}

/**
 * 从灰色物质文件中准备数据
 * Prepared data from gray matter file
 */
export interface PreparedFile {
  /**
   * 文件路径
   * File path
   */
  path: string
  /**
   * 文件标题
   * File title
   */
  title: string
  /**
   * gray-matter 文件对象
   * gray-matter file object
   */
  file: matter.GrayMatterFile<string>
}

/** Represents the link extension options for generated links. | 表示生成链接的链接扩展选项。 */
export type LinksExtension = string | '.md' | '.html'

export interface GenerateLLMsTxtOptions {
  /**
   * 源目录
   * Source directory
   */
  srcDir: string
  /**
   * index.md 文件路径
   * index.md file path
   */
  indexMd: string
  /**
   * 模板
   * Template
   */
  LLMsTxtTemplate: string
  /**
   * 模板变量
   * Template variables
   */
  templateVariables: Record<string, string | boolean | undefined>
  /**
   * 站点配置
   * Site configuration
   */
  siteConfig: {
    title: string
    description: string
  }
  /**
   * 域名
   * Domain
   */
  domain?: string
  /**
   * 链接扩展名
   * Link extension
   */
  linksExtension: string
  /**
   * 是否使用干净的 URL
   * Use clean URLs
   */
  cleanUrls: boolean
}

export interface GenerateLLMsFullTxtOptions {
  /**
   * 源目录
   * Source directory
   */
  srcDir: string
  /**
   * 是否使用干净的 URL
   * Use clean URLs
   */
  cleanUrls: boolean
  /**
   * 链接扩展名
   * Link extension
   */
  linksExtension: string
  /**
   * 域名
   * Domain
   */
  domain?: string
  /**
   * 自定义模板
   * Custom template
   */
  template?: string
}

/**
 * 插件设置
 * Plugin settings
 */
export interface LlmstxtSettings {
  /**
   * 是否生成 llms.txt
   * Whether to generate llms.txt
   * @default true
   */
  generateLLMsTxt?: boolean

  /**
   * 是否生成 llms-full.txt
   * Whether to generate llms-full.txt
   * @default true
   */
  generateLLMsFullTxt?: boolean

  /**
   * 是否从 Markdown 中删除 HTML 标签
   * Whether to strip HTML tags from Markdown
   * @default true
   */
  stripHTML?: boolean

  /**
   * 工作目录，相对于 VuePress 源目录
   * Working directory, relative to VuePress source directory
   * @default '' - 即源目录 | i.e. source directory
   */
  workDir?: string

  /**
   * 站点的主标题
   * The main title of the site
   * @default 从 VuePress 站点配置中获取 | Get from VuePress site configuration
   */
  title?: string

  /**
   * 站点描述
   * Site description
   * @default 从 VuePress 站点配置中获取 | Get from VuePress site configuration
   */
  description?: string

  /**
   * 详细说明
   * Details
   * @default 从 index.md 中提取或自动生成 | Extract from index.md or auto-generate
   */
  details?: string

  /**
   * 是否在 llms.txt 中包含目录
   * Whether to include Table of Contents in llms.txt
   * @default true
   */
  toc?: boolean

  /**
   * 自定义 llms.txt 模板
   * Custom llms.txt template
   */
  customLLMsTxtTemplate?: string

  /**
   * 自定义 llms-full.txt 模板
   * Custom llms-full.txt template
   */
  customLLMsFullTxtTemplate?: string

  /**
   * 自定义模板变量
   * Custom template variables
   */
  customTemplateVariables?: Record<string, string | boolean | undefined>

  /**
   * 自定义域名(用于生成的链接)
   * Custom domain (for generated links)
   */
  domain?: string

  /**
   * 要忽略的文件模式，使用 glob 语法
   * File patterns to ignore, using glob syntax
   * @default []
   */
  ignoreFiles?: string[]
}
