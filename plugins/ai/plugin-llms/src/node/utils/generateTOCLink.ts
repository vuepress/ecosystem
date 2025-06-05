import type { LLMPage, LLMState } from '../types.js'
import { generateLink } from './generateLink.js'

/**
 * Generate a Markdown-formatted table of contents link for a page
 *
 * @param page - The LLM page to generate link for
 * @param state - State object containing generation options
 * @returns Formatted TOC entry as Markdown list item
 */
export const generateTOCLink = (page: LLMPage, state: LLMState): string => {
  const { description } = page.frontmatter
  const { autoDesc } = page.data
  const path = generateLink(page.htmlFilePathRelative, state)

  return `- [${page.title}](${path})${description && !autoDesc ? `: ${description.trim()}` : ''}\n`
}
