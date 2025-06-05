import type { LiteralUnion } from '@vuepress/helper'
import type { Page } from 'vuepress'
import type { TemplateGetterOptions } from './types'

export interface LlmsPluginOptions {
  /**
   * Domain to prepend to file links
   *
   * 添加到文件链接前的域名
   *
   * @example 'https://example.com'
   */
  domain?: string

  /**
   * Whether to generate the `llms.txt` file with site TOC
   *
   * 是否生成包含站点目录的 `llms.txt` 文件
   *
   * @default true
   */
  llmsTxt?: boolean

  /**
   * Whether to generate the `llms-full.txt` file with all content
   *
   * 是否生成包含所有内容的 `llms-full.txt` 文件
   *
   * @default true
   */
  llmsFullTxt?: boolean

  /**
   * Whether to generate LLM-friendly text for each page
   *
   * 是否为每个页面生成 LLM 友好的文本
   *
   * @default true
   */
  llmsPageTxt?: boolean

  /**
   * Whether to strip HTML tags from Markdown files
   *
   * 是否从 Markdown 文件中剥离 HTML 标签
   *
   * @default true
   */
  stripHTML?: boolean

  /**
   * Locale to process, use `'all'` for all locales
   *
   * Defaults to root locale if not set
   *
   * 要处理的语言环境，使用 `'all'` 处理所有语言环境
   *
   * 如果未设置，将使用根语言环境
   *
   * @default '/'
   */
  locale?: LiteralUnion<'all'>

  /**
   * Page filter function
   *
   * 页面过滤函数
   *
   * @default () => true
   */
  filter?: (page: Page) => boolean

  /**
   * Custom template for `llms.txt` file
   *
   * `llms.txt` 文件的自定义模板
   *
   * @default
   * ```md
   * # {title}
   *
   * > {description}
   *
   * {details}
   *
   * ## Table of Contents
   *
   * {toc}
   * ```
   */
  llmsTxtTemplate?: string

  /**
   * Custom variables for {@link LlmsPluginOptions.llmsTxtTemplate | `llmsTxtTemplate`}
   *
   * {@link LlmsPluginOptions.llmsTxtTemplate | `llmsTxtTemplate`} 的自定义变量
   */
  llmsTxtTemplateGetter?: TemplateGetterOptions
}
