import type { Page } from 'vuepress'
import type { GenerateTOCOptions, PreparedPage, TemplateGetter } from './types'

export interface LlmstxtPluginOptions {
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
   * Custom variables for {@link LlmstxtPluginOptions.llmsTxtTemplate | `llmsTxtTemplate`}.
   *
   * {@link LlmstxtPluginOptions.llmsTxtTemplate | `llmsTxtTemplate`} 的自定义变量。
   */
  llmsTxtTemplateGetter?: TemplateGetter

  /**
   * Custom generates a Table of Contents (TOC) for the provided prepared pages.
   *
   * By default, the plugin only generates a first-level TOC. You can customize it to generate a multi-level TOC using `customGenerateTOC`.
   *
   * 自定义为提供的预备页面生成目录（TOC）。
   *
   * 插件默认仅生成一级目录，你可以通过 `customGenerateTOC` 自定义生成多级目录。
   *
   * @param preparedPages - An array of prepared pages.
   * @param options - Options for generating the TOC.
   * @returns A string representing the formatted Table of Contents.
   *
   * @example
   * ```ts
   * llmstxtPlugin({
   *     customGenerateTOC: (pages, options) => {
   *         return pages.map((page) => `- [${page.title}](${page.path})`).join('\n')
   *     }
   * })
   * ```
   */
  customGenerateTOC?: (
    pages: PreparedPage[],
    options: GenerateTOCOptions,
  ) => string
}
