import type {
  LinksExtension,
  LlmstxtPluginOptions,
  PreparedPage,
} from '../types.js'
import { generateLink } from './generateLink.js'

/**
 * Generates a Markdown-formatted table of contents (TOC) link for a given file.
 *
 * @param page - The prepared page.
 * @param domain - The base domain for the generated link.
 * @param extension - The link extension for the generated link (default is `.md`).
 * @returns The formatted TOC entry as a Markdown list item.
 */
export const generateTOCLink = (
  page: PreparedPage,
  base: string,
  domain: LlmstxtPluginOptions['domain'],
  extension?: LinksExtension,
): string => {
  const description = page.frontmatter.description!
  const path = generateLink(page.path, base, domain, extension ?? '.md')
  return `- [${page.title}](${path})${description ? `: ${description.trim()}` : ''}\n`
}

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

  /** The link extension for generated links. */
  linksExtension?: LinksExtension
}

/**
 * Generates a Table of Contents (TOC) for the provided prepared files.
 *
 * Each entry in the TOC is formatted as a markdown link to the corresponding
 * text file.
 *
 * @param preparedPages - An array of prepared pages.
 * @param options - Options for generating the TOC.
 * @returns A string representing the formatted Table of Contents.
 */
export const generateTOC = (
  preparedPages: PreparedPage[],
  options: GenerateTOCOptions,
): string => {
  const { domain, base = '/', linksExtension } = options
  let tableOfContent = ''

  if (preparedPages.length > 0) {
    const tocEntries = preparedPages.map((page) => {
      return generateTOCLink(page, base, domain, linksExtension)
    })

    tableOfContent += tocEntries.join('')
  }

  return tableOfContent
}
