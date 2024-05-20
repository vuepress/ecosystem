/**
 * This module processes the output of prismjs by wrapping each line of code
 * with a `<span class="line">` and provides simple operations for the line node.
 */

const PRE_RE = /^(<pre[^]*?>)/
const CODE_RE = /^(<code[^]*?>)/
const END_RE = /(<\/code><\/pre>(\r?\n))?$/
const SPLIT_RE = /(\r?\n)/g
const CLASS_RE = /class="([^]*)"/
const ESCAPE_RE = /\[\\!code/g

export interface NodeOpen {
  /**
   * @example <tag
   */
  before: string
  class: string[]
  /**
   * @example >
   */
  after: string
  content: string
}

type LineHandler = (node: NodeOpen, index: number) => void

export interface CodeParser {
  pre: NodeOpen
  code: NodeOpen
  lines: NodeOpen[]
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
  const parts = code.split(SPLIT_RE)
  const lines: string[] = []

  for (let i = 0; i < parts.length; i += 2) {
    lines.push(parts[i])
  }

  return lines
}

const createNodeOpen = (
  html: string,
  content = '',
  classes: string[] = [],
): NodeOpen => {
  const match = html.match(CLASS_RE)

  if (!match) {
    const hashHtml = html.length > 1

    return {
      before: hashHtml ? html.slice(0, -1) : '',
      class: [...classes],
      after: hashHtml ? html.slice(-1) : '',
      content,
    }
  }

  return {
    before: html.slice(0, match.index!),
    class: [...classes, ...match[1].split(' ')],
    after: html.slice(match.index! + match[0].length),
    content,
  }
}

const uniq = <T>(array: T[]): T[] => [...new Set(array)]

const nodeOpenStringify = (node: NodeOpen): string => {
  const classes = uniq(node.class).join(' ')
  const { before, after, content } = node

  return `${before}${classes && before ? ` class="${classes}"` : ''}${after}${content}`
}

export const getCodeParser = (html: string): CodeParser => {
  const pre = html.match(PRE_RE)?.[1] || ''
  html = html.slice(pre.length)
  const code = html.match(CODE_RE)?.[1] || ''
  const endLine = html.match(END_RE)?.[1] || ''
  html = html.slice(code.length, endLine.length ? -endLine.length : html.length)

  const preNode = createNodeOpen(pre)
  const codeNode = createNodeOpen(code)
  const lineNodeList = splitLines(html).map((line) =>
    createNodeOpen('<span>', line, ['line']),
  )

  const lineNodeHandlers: LineHandler[] = []
  const addLineNodeHandler = (handler: LineHandler): void => {
    lineNodeHandlers.push(handler)
  }

  const stringify = (): string => {
    const resolvedLines = lineNodeList.map((line, index) => {
      lineNodeHandlers.forEach((handler) => handler(line, index + 1))
      line.content = line.content.replace(ESCAPE_RE, '[!code')
      return nodeOpenStringify(line) + '</span>'
    })

    return [
      nodeOpenStringify(preNode),
      nodeOpenStringify(codeNode),
      resolvedLines.join('\n'),
      endLine,
    ].join('')
  }

  return {
    pre: preNode,
    code: codeNode,
    lines: lineNodeList,
    line: addLineNodeHandler,
    stringify,
  }
}
