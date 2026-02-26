import type { WhitespacePosition } from '@vuepress/highlighter-helper'
import { resolveWhitespacePosition } from '@vuepress/highlighter-helper'
import type { CodeParser, OpenTag } from './getCodeParser.js'

const SPLIT_REGEXP = /(<[^>]+>)/
const SPACE_REGEXP = /[\s\t]/g

const classMap: Record<string, string> = {
  ' ': 'space',
  '\t': 'tab',
}

const isSpace = (char: string): boolean => char === ' ' || char === '\t'

const renderSpace = (text: string): string =>
  text.replaceAll(
    SPACE_REGEXP,
    (space) => `<span class="${classMap[space]}">${space}</span>`,
  )

/**
 * Render whitespace in a line based on position
 *
 * 根据位置在行中渲染空白字符
 *
 * @param node - Line node / 行节点
 * @param position - Whitespace position / 空白字符位置
 *
 * @example
 * ```ts
 * import { renderWhitespaceInLine } from '@vuepress/plugin-prismjs'
 *
 * renderWhitespaceInLine(lineNode, 'all')
 * ```
 */
// oxlint-disable-next-line complexity
export const renderWhitespaceInLine = (
  node: OpenTag,
  position: WhitespacePosition,
): void => {
  let snippets = node.content.split(SPLIT_REGEXP)

  // match all whitespace
  if (position === 'all') {
    snippets = snippets.map((text) =>
      !text || text.startsWith('<') ? text : renderSpace(text),
    )
  }
  // match whitespace at the beginning of the line
  if (position === 'boundary') {
    let has = true
    for (let i = 0; i < snippets.length; i++) {
      const snippet = snippets[i]

      if (snippet && !snippet.startsWith('<')) {
        let j = 0

        while (snippet[j] && j < snippet.length) {
          // oxlint-disable-next-line max-depth
          if (!isSpace(snippet[j])) {
            has = false
            break
          }
          j++
        }
        snippets[i] = renderSpace(snippet.slice(0, j)) + snippet.slice(j)
      }
      if (!has) break
    }
  }

  // match whitespace at the end of the line
  if (position === 'boundary' || position === 'trailing') {
    let has = true
    for (let i = snippets.length - 1; i >= 0; i--) {
      const snippet = snippets[i]
      let j = snippet.length - 1

      if (snippet && snippet[j] !== '>') {
        while (snippet[j] && j >= 0) {
          // oxlint-disable-next-line max-depth
          if (!isSpace(snippet[j])) {
            has = false
            break
          }
          j--
        }
        snippets[i] =
          j === snippet.length - 1
            ? snippet
            : j > 0
              ? snippet.slice(0, j) + renderSpace(snippet.slice(j))
              : renderSpace(snippet)
      }
      if (!has) break
    }
  }

  node.content = snippets.join('')
}

/**
 * Handle whitespace rendering based on meta string
 *
 * 基于元字符串处理空白字符渲染
 *
 * `` ```js :whitespace[=all|boundary|trailing] ``
 *
 * @param parser - Code parser instance / 代码解析器实例
 * @param meta - Meta string / 元字符串
 * @param globalOption - Global whitespace option / 全局空白字符选项
 *
 * @example
 * ```ts
 * import { metaWhitespace } from '@vuepress/plugin-prismjs'
 *
 * metaWhitespace(parser, ':whitespace=all', true)
 * ```
 */
export const metaWhitespace = (
  parser: CodeParser,
  meta: string,
  globalOption: WhitespacePosition | true = true,
): void => {
  const position = resolveWhitespacePosition(meta, globalOption)

  if (!position) return

  parser.line((line) => {
    renderWhitespaceInLine(line, position)
  })
}
