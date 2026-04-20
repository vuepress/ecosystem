import { nanoid } from '../../utils.js'

const MUSTACHE_REG = /\{\{[^]*?\}\}/g

type MustacheStore = Map<string, string>

/**
 * Replace mustache with unique markers
 *
 * @param content Original code content
 * @param store Mustache store
 * @returns Content with mustache replaced by unique markers
 */
const removeMustache = (content: string, store: MustacheStore): string =>
  content.replace(MUSTACHE_REG, (match) => {
    let marker = store.get(match)

    if (!marker) {
      marker = nanoid()
      store.set(match, marker)
    }

    return marker
  })

/**
 * Replace mustache back from unique markers
 *
 * @param content Content with unique markers
 * @param store Mustache store
 * @returns Content with unique markers replaced by original mustache
 */
const restoreMustache = (content: string, store: MustacheStore): string => {
  let result = content

  store.forEach((marker, match) => {
    result = result.replaceAll(marker, match)
  })

  return result
}

/**
 * Handle mustache in code blocks
 *
 * Mustache in code blocks will be replaced with unique markers before
 * highlighting, and restored after highlighting. This is to prevent mustache
 * from being highlighted as code, which may cause issues in some cases.
 *
 * @param content Content of code block
 * @param highlight Function to highlight content
 * @returns Highlighted content with mustache handled
 */
export const handleMustache = (
  content: string,
  highlight: (str: string) => string,
): string => {
  const store = new Map<string, string>()

  return restoreMustache(
    highlight(removeMustache(content, store).trimEnd()),
    store,
  )
}
