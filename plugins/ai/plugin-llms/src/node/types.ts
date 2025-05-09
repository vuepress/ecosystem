import type { Page, PageFrontmatter } from 'vuepress'

/**
 * A literal type that supports custom further strings but preserves autocompletion in IDEs.
 *
 * @see {@link https://github.com/microsoft/TypeScript/issues/29729#issuecomment-471566609 | copied from issue}
 */
export type LiteralUnion<Union extends Base, Base = string> =
  | Union
  | (Base & { zz_IGNORE_ME?: never })

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
  domain?: LlmstxtPluginOptions['domain']

  /**
   * Optional base URL to prefix URLs with.
   */
  base?: string

  /**
   * The link extension for generated links.
   */
  linksExtension?: LinksExtension
}

interface TemplateVariables {
  /**
   * The title extracted from the frontmatter or the first h1 heading in the main document (`README.md`).
   *
   * 从 frontmatter 部分或主文档（`README.md`）中第一个h1标题提取的标题。
   *
   * @example 'Awesome tool'
   */
  title?: string

  /**
   * The description.
   *
   * 描述。
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
   * ```markdown
   * - [Title](/foo.md): Lorem ipsum dolor sit amet, consectetur adipiscing elit.
   * - [Title 2](/bar/baz.md): Cras vel nibh id ipsum pharetra efficitur.
   * ```
   */
  toc?: string
}

export interface CustomTemplateVariables extends TemplateVariables {
  /** Any custom variable */
  [key: string]: string | undefined
}

export interface LlmstxtPluginOptions extends TemplateVariables {
  /**
   * The domain that will be appended to the beginning of URLs in `llms.txt` and in the context of other files
   *
   * Domain attachment is not yet agreed upon (since it depends on the AI whether it can resolve the relative paths that are currently there), but if you want you can add it
   *
   * ℹ️ **Note**: Domain cannot end with `/`.
   *
   * 将被附加到`llms.txt`中URL开头以及其他文件上下文中的域名
   *
   * 附加域名尚未达成一致（因为这取决于AI是否能解析当前存在的相对路径），但如果您愿意，可以添加它
   *
   * ℹ️ **注意**：域名不能以 `/` 结尾。
   *
   * Without a {@link LlmstxtSettings.domain | `domain`}:
   * ```markdown
   * - [Title](/foo/bar.md)
   * ```
   *
   * With a {@link LlmstxtSettings.domain | `domain`}:
   * ```markdown
   * - [Title](https://example.com/foo/bar.md)
   * ```
   *
   * @example
   * ```typescript
   * llmstxtPlugin({ domain: 'https://example.com' })
   * ```
   */
  domain?: string

  /**
   * Indicates whether to generate the `llms.txt` file, which contains a list of sections with corresponding links.
   *
   * 是否生成包含章节及其链接列表的 `llms.txt` 文件。
   *
   * @default true
   */
  generateLLMsTxt?: boolean

  /**
   * Determines whether to generate the `llms-full.txt` which contains all the documentation in one file.
   *
   * 是否生成包含所有文档的单一文件`llms-full.txt`。
   *
   * @default true
   */
  generateLLMsFullTxt?: boolean

  /**
   * Determines whether to generate an LLM-friendly version of the documentation for each page on the website.
   *
   * 是否为网站上的每个页面生成一个对LLM（大语言模型）友好的文档版本。
   *
   * @default true
   */
  generateLLMFriendlyDocsForEachPage?: boolean

  /**
   * Whether to strip HTML tags from Markdown files
   *
   * 是否需要从Markdown文件中剥离HTML标签
   *
   * @default true
   */
  stripHTML?: boolean

  /**
   * The directory from which files will be processed.
   *
   * This is useful for configuring the plugin to generate documentation for LLMs in a specific language.
   *
   * 将要处理的文件所在的目录。
   *
   * 这有助于配置插件以生成特定语言的LLM文档。
   *
   * @example
   * ```typescript
   * llmstxtPlugin({
   *     // Generate documentation for LLMs from English documentation only
   *     workDir: 'en'
   * })
   * ```
   *
   * @default vuepress source directory
   */
  workDir?: string

  /**
   * Page filter, when returns `true`, the page will be included in `llms.txt`, otherwise it will be excluded.
   *
   * 页面过滤器，当返回 `true` 时，页面将被包含在 `llms.txt` 中，否则将被排除在外。
   *
   * @example
   * ```typescript
   * llmstxtPlugin({
   *     filter: (page) => page.filePath.startsWith('/en')
   * })
   * ```
   *
   * @default () => true
   */
  filter?: (page: Page) => boolean

  /**
   * A custom template for the `llms.txt` file, allowing for a personalized order of elements.
   *
   * Available template elements include:
   *
   * - `{title}`: The title extracted from the frontmatter or the first h1 heading in the main document (`index.md`).
   * - `{description}`: The description.
   * - `{details}`: The details.
   * - `{toc}`: An automatically generated **T**able **O**f **C**ontents.
   *
   * You can also add custom variables using the {@link LlmstxtSettings.customTemplateVariables | `customTemplateVariables`} parameter
   *
   * `llms.txt` 文件的自定义模板，允许对元素进行个性化排序。
   *
   * 可用的模板元素包括：
   *
   * - `{title}`：从 frontmatter 部分或主文档（`index.md`）中第一个 h1 标题提取的标题。
   * - `{description}`：描述。
   * - `{details}`：详细信息。
   * - `{toc}`：自动生成的**目录**。
   *
   * 您还可以使用 {@link LlmstxtSettings.customTemplateVariables | `customTemplateVariables`} 参数添加自定义变量。
   *
   * @default
   * ```markdown
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
  customLLMsTxtTemplate?: string

  /**
   * Custom variables for {@link LlmstxtSettings.customLLMsTxtTemplate | `customLLMsTxtTemplate`}.
   *
   * With this option you can edit or add variables to the template.
   *
   * You can change the title in `llms.txt` without having to change the template:
   *
   * {@link LlmstxtSettings.customLLMsTxtTemplate | `customLLMsTxtTemplate`} 的自定义变量。
   *
   * 通过此选项，您可以编辑或向模板添加变量。
   *
   * 您无需更改模板即可修改 `llms.txt` 中的标题：
   *
   * @example
   * ```typescript
   * llmstxtPlugin({
   *     customTemplateVariables: {
   *         title: 'Very custom title',
   *     }
   * })
   * ```
   *
   * You can also combine this with a custom template:
   *
   * 还可以将其与自定义模板结合使用：
   *
   * @example
   * ```typescript
   * llmstxtPlugin({
   *     customLLMsTxtTemplate: '# {title}\n\n{foo}',
   *     customTemplateVariables: {
   *         foo: 'Very custom title',
   *     }
   * })
   * ```
   */
  customTemplateVariables?: CustomTemplateVariables

  /**
   * Custom generates a Table of Contents (TOC) for the provided prepared pages.
   *
   * Each entry in the TOC is formatted as a markdown link to the corresponding
   * text file.
   *
   * 自定义为提供的预备页面生成目录（TOC）。
   *
   * TOC中的每个条目格式化为指向相应文本文件的markdown链接。
   *
   * @param preparedPages - An array of prepared pages.
   * @param options - Options for generating the TOC.
   * @returns A string representing the formatted Table of Contents.
   *
   * @example
   * ```typescript
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
