const MARKDOWN_TITLE_REGEXP = /^#[^#][\s]*(.+?)#*?$/m

/**
 * Extract title from markdown string
 *
 * Title is defined as the first line starting with a single `#` character
 *
 * @param markdown - Markdown content to extract title from
 * @returns Extracted title or undefined if not found
 */
export const extractTitle = (markdown: string): string | undefined => {
  const matches = markdown.match(MARKDOWN_TITLE_REGEXP)
  if (matches?.length) return matches.pop()?.trim()

  return undefined
}
