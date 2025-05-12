import type { LLMPage, LLMState } from '../types.js'
import { generateLink } from './generateLink.js'

/**
 * Generates a Markdown-formatted table of contents (TOC) link for a given file.
 *
 * @param page - The prepared page.
 * @param options - Options for generating the TOC link.
 * @returns The formatted TOC entry as a Markdown list item.
 */
export const generateTOCLink = (
  page: LLMPage,
  { base = '/', domain, linkExtension }: LLMState,
): string => {
  const description = page.frontmatter.description!
  const path = generateLink(
    page.htmlFilePathRelative,
    base,
    domain,
    linkExtension ?? '.md',
  )

  return `- [${page.title}](${path})${description ? `: ${description.trim()}` : ''}\n`
}
