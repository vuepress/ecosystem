import type { PageFrontmatter } from 'vuepress'

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
 */
export type LinksExtension = LiteralUnion<'.html' | '.md'>

interface TemplateVariables {
  /**
   * The title extracted from the frontmatter or the first h1 heading in the main document (`index.md`).
   *
   * @example 'Awesome tool'
   */
  title?: string

  /**
   * The description.
   *
   * @example 'Blazing fast build tool'
   */
  description?: string

  /**
   * The details.
   *
   * @example 'A multi-user version of the notebook designed for companies, classrooms and research labs'
   */
  details?: string

  /**
   * An automatically generated **T**able **O**f **C**ontents.
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
   * llmstxt({ domain: 'https://example.com' })
   * ```
   */
  domain?: string

  /**
   * Indicates whether to generate the `llms.txt` file, which contains a list of sections with corresponding links.
   *
   * @default true
   */
  generateLLMsTxt?: boolean

  /**
   * Determines whether to generate the `llms-full.txt` which contains all the documentation in one file.
   *
   * @default true
   */
  generateLLMsFullTxt?: boolean

  /**
   * Determines whether to generate an LLM-friendly version of the documentation for each page on the website.
   *
   * @default true
   */
  generateLLMFriendlyDocsForEachPage?: boolean

  /**
   * Whether to strip HTML tags from Markdown files
   *
   * @default true
   */
  stripHTML?: boolean

  /**
   * The directory from which files will be processed.
   *
   * This is useful for configuring the plugin to generate documentation for LLMs in a specific language.
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
   * An array of file path patterns to be ignored during processing.
   *
   * This is useful for excluding certain files from LLMs, such as those not related to documentation (e.g., sponsors, team, etc.).
   *
   * @example
   * ```typescript
   * llmstxtPlugin({
   *     ignoreFiles: [
   *         'about/team/*',
   *         'sponsor/*'
   *         // ...
   *     ]
   * })
   * ```
   *
   * @default []
   */
  ignoreFiles?: string[]

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
   * @example
   * ```typescript
   * llmstxt({
   *     customTemplateVariables: {
   *         title: 'Very custom title',
   *     }
   * })
   * ```
   *
   * You can also combine this with a custom template:
   *
   * @example
   * ```typescript
   * llmstxt({
   *     customLLMsTxtTemplate: '# {title}\n\n{foo}',
   *     customTemplateVariables: {
   *         foo: 'Very custom title',
   *     }
   * })
   * ```
   */
  customTemplateVariables?: CustomTemplateVariables
}

/**
 * Represents a prepared page, including its title and path.
 */
export interface PreparedPage {
  /**
   * The title of the file.
   *
   * @example 'Guide'
   */
  title: string

  /**
   * The absolute path to the file.
   *
   * @example 'guide/getting-started.md'
   */
  path: string

  /**
   * The frontmatter of the file.
   *
   * @example `{ title: 'Guide', description: 'A guide' }`
   */
  frontmatter: PageFrontmatter

  /**
   * The content of the markdown file.
   *
   * @example '# Guide\n\nA guide'
   */
  content: string
}
