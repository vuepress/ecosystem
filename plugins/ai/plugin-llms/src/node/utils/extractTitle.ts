const MARKDOWN_TITLE_REGEXP = /^#[^#][\s]*(?<title>.+?)#*?$/mu

/**
 * Extract title from markdown string
 *
 * Title is defined as the first line starting with a single `#` character
 *
 * @param markdown - Markdown content to extract title from
 * @returns Extracted title or undefined if not found
 */
export const extractTitle = (markdown: string): string | undefined =>
  MARKDOWN_TITLE_REGEXP.exec(markdown)?.groups?.title.trim()
