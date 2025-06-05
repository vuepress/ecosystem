import type { CodeParser, OpenTag } from './getCodeParser.js'

const SPLIT_REGEXP = /(<[^>]+>)/
const META_WORD_REGEXP = /\/((?:\\.|[^/])+)\//g

const WORD_BEFORE = '<span class="highlighted-word">'
const WORD_AFTER = '</span>'

/**
 * Highlight specific word in a line
 *
 * 在行中高亮特定词汇
 *
 * @param node - Line node / 行节点
 * @param pattern - Pattern to match / 匹配模式
 */
export const highlightWordInLine = (
  node: OpenTag,
  pattern: RegExp | string,
): void => {
  node.content = node.content
    .split(SPLIT_REGEXP)
    .map((text) => {
      if (!text || text.startsWith('<')) {
        return text
      }
      return text.replaceAll(
        pattern,
        (word) => `${WORD_BEFORE}${word}${WORD_AFTER}`,
      )
    })
    .join('')
}

/**
 * Parse meta highlight words from meta string
 *
 * 从元字符串中解析高亮词汇
 *
 * @param meta - Meta string / 元字符串
 */
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
 * `` ```js /Hello|Hi/ ``
 *
 * Meta word highlight
 *
 * 元词汇高亮
 *
 * @param parser - Code parser instance / 代码解析器实例
 * @param meta - Meta string / 元字符串
 */
export const metaWordHighlight = (parser: CodeParser, meta: string): void => {
  const words = parseMetaHighlightWords(meta)

  if (words.length) {
    const pattern = new RegExp(words.join('|'), 'g')
    parser.line((line) => {
      highlightWordInLine(line, pattern)
    })
  }
}
