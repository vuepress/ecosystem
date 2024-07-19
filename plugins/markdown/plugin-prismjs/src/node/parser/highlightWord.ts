import type { CodeParser, OpenTag } from './getCodeParser.js'

const SPLIT_REGEXP = /(<[^>]+>)/
const META_WORD_REGEXP = /\/((?:\\.|[^/])+)\//g

const WORD_BEFORE = '<span class="highlighted-word">'
const WORD_AFTER = '</span>'

export const highlightWordInLine = (
  node: OpenTag,
  pattern: string | RegExp,
): void => {
  node.content = node.content
    .split(SPLIT_REGEXP)
    .map((text) => {
      if (!text || text[0] === '<') {
        return text
      }
      return text.replaceAll(
        pattern,
        (word) => `${WORD_BEFORE}${word}${WORD_AFTER}`,
      )
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
    const pattern = new RegExp(`${words.join('|')}`, 'g')
    parser.line((line) => highlightWordInLine(line, pattern))
  }
}
