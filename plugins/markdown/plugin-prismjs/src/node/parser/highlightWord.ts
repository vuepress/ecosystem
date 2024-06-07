import type { CodeParser, OpenTag } from './getCodeParser.js'

const SPLIT_REGEXP = /(<[^>]+>)/
const META_WORD_REGEXP = /\/((?:\\.|[^/])+)\//g

export const highlightWordInLine = (
  node: OpenTag,
  word: string | string[],
): void => {
  const before = '<span class="highlighted-word">'
  const after = '</span>'
  const pattern = Array.isArray(word)
    ? new RegExp(`${word.join('|')}`, 'g')
    : word
  node.content = node.content
    .split(SPLIT_REGEXP)
    .map((text) => {
      if (!text || text[0] === '<') {
        return text
      }
      return text.replaceAll(pattern, (match) => {
        return `${before}${match}${after}`
      })
    })
    .join('')
}

export const parseMetaHighlightWords = (meta: string): string[] => {
  if (!meta) return []

  const match = Array.from(meta.matchAll(META_WORD_REGEXP))

  return (
    match
      // Escape backslashes
      .map((v) => v[1].replace(/\\(.)/g, '$1'))
  )
}

/**
 * ```js /Hello|Hi/
 */
export const metaWordHighlight = (parser: CodeParser, meta: string): void => {
  const words = parseMetaHighlightWords(meta)

  if (words.length) {
    parser.line((line) => highlightWordInLine(line, words))
  }
}
