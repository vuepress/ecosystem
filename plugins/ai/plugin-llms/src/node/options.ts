import type { LiteralUnion } from '@vuepress/helper'
import type { Page } from 'vuepress'
import type { TemplateGetterOptions } from './types'

export interface LlmsPluginOptions {
  /**
   * The domain being appended in file links
   *
   * 被附加到文件 URL 开头的域名
   *
   * @example 'https://example.com'
   */
  domain?: string

  /**
   * Whether to generate the `llms.txt`
   *
   * 是否生成 `llms.txt`
   *
   * @default true
   */
  llmsTxt?: boolean

  /**
   * Whether to generate `llms-full.txt`
   *
   * 是否生成 `llms-full.txt`
   *
   * @default true
   */
  llmsFullTxt?: boolean

  /**
   * Whether to generate llm-friendly text for each page
   *
   * 是否为每个页面生成适合 LLM 的文本
   *
   * @default true
   */
  llmsPageTxt?: boolean

  /**
   * Whether to strip HTML tags from Markdown files
   *
   * 是否需要从 Markdown 文件中剥离 HTML 标签
   *
   * @default true
   */
  stripHTML?: boolean

  /**
   * Locale to be processed, `'all'` for all locales
   *
   * If not set, the root locale will be used.
   *
   * 待处理的语言环境，`'all'` 表示所有语言环境
   *
   * 如果未设置，将使用根语言环境。
   *
   * @default '/'
   */
  locale?: LiteralUnion<'all'>

  /**
   * Page filter function
   *
   * 页面过滤器
   *
   * @default () => true
   */
  filter?: (page: Page) => boolean

  /**
   * Template for `llms.txt`
   *
   * `llms.txt` 的模板
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
   * Custom variables for {@link LlmsPluginOptions.llmsTxtTemplate | `llmsTxtTemplate`}.
   *
   * {@link LlmsPluginOptions.llmsTxtTemplate | `llmsTxtTemplate`} 的自定义变量。
   */
  llmsTxtTemplateGetter?: TemplateGetterOptions
}
