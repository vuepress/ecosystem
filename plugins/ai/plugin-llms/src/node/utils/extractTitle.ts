const MARKDOWN_TITLE_REGEXP = /^#[^#][\s]*(.+?)#*?$/m

/**
 * Extracts the title from a markdown string.
 * The title is defined as the first line that starts with a single `#` character.
 */
export const extractTitle = (markdown: string): string | undefined => {
  const matches = markdown.match(MARKDOWN_TITLE_REGEXP)
  if (matches?.length) {
    return matches.pop()?.trim()
  }
  return undefined
}
