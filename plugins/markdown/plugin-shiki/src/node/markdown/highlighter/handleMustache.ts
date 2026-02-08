import { nanoid } from '../../utils.js'

const MUSTACHE_REG = /\{\{[^]*?\}\}/g

type MustacheStore = Map<string, string>

/**
 * Replace mustache with unique markers
 *
 * @param content original code content
 * @param store mustache store
 * @returns content with mustache replaced by unique markers
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
 * @param content content with unique markers
 * @param store mustache store
 * @returns content with unique markers replaced by original mustache
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
 * @description
 * Mustache in code blocks will be replaced with unique markers before highlighting, and restored after highlighting.
 * This is to prevent mustache from being highlighted as code, which may cause issues in some cases.
 *
 * @param content content of code block
 * @param highlight function to highlight content
 * @returns highlighted content with mustache handled
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
