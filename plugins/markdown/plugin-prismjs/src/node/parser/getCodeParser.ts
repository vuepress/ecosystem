/**
 * This module processes the output of prismjs by wrapping each line of code
 * with a `<span class="line">` and provides simple operations for the line node.
 */

const PRE_OPEN_TAG_RE = /^(<pre[^]*?>)/
const CODE_OPEN_TAG_RE = /^(<code[^]*?>)/
const FENCE_CLOSE_TAG_RE = /(<\/code><\/pre>(\r?\n))?$/
const NEWLINE_RE = /(\r?\n)/g
const CLASS_RE = /class="([^]*)"/
const CODE_ESCAPE_RE = /\[\\!code/g

const uniq = <T>(array: T[]): T[] => [...new Set(array)]

export interface OpenTag {
  /**
   * @example <tag
   */
  before: string
  classList: string[]
  /**
   * @example >
   */
  after: string
  content: string

  toString(): string
}

type LineHandler = (node: OpenTag, index: number) => void

export interface CodeParser {
  lang: string
  pre: OpenTag
  code: OpenTag
  lines: OpenTag[]
  /**
   * Add a handler for each the line `<span class="line">`
   */
  line: (handler: LineHandler) => void
  /**
   * Get the string representation of the parsed code
   */
  stringify: () => string
}

const splitLines = (code: string): string[] => {
  const parts = code.split(NEWLINE_RE)
  const lines: string[] = []

  for (let i = 0; i < parts.length; i += 2) {
    lines.push(parts[i])
  }

  return lines
}

const createOpenTag = (
  snippet: string,
  content = '',
  classList: string[] = [],
): OpenTag => {
  const match = snippet.match(CLASS_RE)

  if (!match) {
    const hashHtml = snippet.length > 1

    return {
      before: hashHtml ? snippet.slice(0, -1) : '',
      classList,
      after: hashHtml ? snippet.slice(-1) : '',
      content,
      toString() {
        // oxlint-disable-next-line no-shadow
        const { before, after, classList, content } = this
        const className = uniq(classList).join(' ')

        return `${before}${className && before ? ` class="${className}"` : ''}${after}${content}`
      },
    }
  }

  return {
    before: snippet.slice(0, match.index),
    classList: [...classList, ...match[1].split(' ')],
    after: snippet.slice(match.index! + match[0].length),
    content,
    toString() {
      // oxlint-disable-next-line no-shadow
      const { before, after, classList, content } = this
      const className = uniq(classList).join(' ')

      return `${before}${className && before ? ` class="${className}"` : ''}${after}${content}`
    },
  }
}

/**
 * Parse highlighted code and create code parser
 *
 * 解析高亮代码并创建代码解析器
 *
 * @param html - Highlighted HTML content / 高亮 HTML 内容
 * @param lang - Code language / 代码语言
 * @returns Code parser instance / 代码解析器实例
 * @example
 * ```ts
 * import { getCodeParser } from '@vuepress/plugin-prismjs'
 *
 * const html = '<pre><code>console.log("hello")</code></pre>'
 * const parser = getCodeParser(html)
 * parser.line((node, index) => {
 *   if (index === 1) node.classList.push('highlighted')
 * })
 * ```
 */
export const getCodeParser = (html: string, lang = ''): CodeParser => {
  let content = html
  const preOpen = html.match(PRE_OPEN_TAG_RE)?.[1] ?? ''

  content = content.slice(preOpen.length)

  const code = content.match(CODE_OPEN_TAG_RE)?.[1] ?? ''
  const endLine = content.match(FENCE_CLOSE_TAG_RE)?.[1] ?? ''

  content = content.slice(
    code.length,
    endLine.length ? -endLine.length : content.length,
  )

  const preOpenTag = createOpenTag(preOpen)
  const codeOpenTag = createOpenTag(code)
  const lineNodeList = splitLines(content).map((line) =>
    createOpenTag('<span>', line, ['line']),
  )

  const lineNodeHandlers: LineHandler[] = []

  const addLineNodeHandler = (handler: LineHandler): void => {
    lineNodeHandlers.push(handler)
  }

  const stringify = (): string => {
    const linesContent = lineNodeList.map((line, index) => {
      lineNodeHandlers.forEach((handler) => {
        handler(line, index)
      })
      line.content = line.content.replace(CODE_ESCAPE_RE, '[!code')

      return `${line.toString()}</span>`
    })

    return [
      preOpenTag.toString(),
      codeOpenTag.toString(),
      linesContent.join('\n'),
      endLine,
    ].join('')
  }

  return {
    lang,
    pre: preOpenTag,
    code: codeOpenTag,
    lines: lineNodeList,
    line: addLineNodeHandler,
    stringify,
  }
}
