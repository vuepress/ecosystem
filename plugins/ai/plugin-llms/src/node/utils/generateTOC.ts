import type { GenerateTOCOptions, PreparedPage } from '../types.js'
import { generateLink } from './generateLink.js'

/**
 * Generates a Markdown-formatted table of contents (TOC) link for a given file.
 *
 * @param page - The prepared page.
 * @param options - Options for generating the TOC link.
 * @returns The formatted TOC entry as a Markdown list item.
 */
export const generateTOCLink = (
  page: PreparedPage,
  { base = '/', domain, linksExtension }: GenerateTOCOptions,
): string => {
  const description = page.frontmatter.description!
  const path = generateLink(page.path, base, domain, linksExtension ?? '.md')
  return `- [${page.title}](${path})${description ? `: ${description.trim()}` : ''}\n`
}

/**
 * Generates a Table of Contents (TOC) for the provided prepared pages.
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
  let tableOfContent = ''

  if (preparedPages.length > 0) {
    const tocEntries = preparedPages.map((page) => {
      return generateTOCLink(page, options)
    })

    tableOfContent += tocEntries.join('')
  }

  return tableOfContent
}
