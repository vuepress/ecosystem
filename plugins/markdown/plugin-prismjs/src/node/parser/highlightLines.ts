import type { CodeParser } from './getCodeParser'

export type HighlightLinesRange = [start: number, end: number]

/**
 * Resolve highlight-lines ranges from token info
 *
 * 从代码标记信息中解析高亮行范围
 *
 * @param info - Token info string / 代码标记信息字符串
 * @returns Highlight ranges or null / 高亮范围或 null
 * @example
 * ```ts
 * import { getHighlightLinesRange } from '@vuepress/plugin-prismjs'
 *
 * const ranges = getHighlightLinesRange('js {1,3-5}')
 * console.log(ranges) // [[1, 1], [3, 5]]
 * ```
 */
export const getHighlightLinesRange = (
  info: string,
): HighlightLinesRange[] | null => {
  // try to match highlight-lines mark
  const match = info.match(/{([\d,-]+)}/)

  // no highlight-lines mark, return `null`
  if (match == null) return null

  // resolve lines ranges from the highlight-lines mark
  return match[1].split(',').map((item) => {
    const range = item.split('-')

    if (range.length === 1) range.push(range[0])

    return range.map((line) => Number.parseInt(line, 10)) as HighlightLinesRange
  })
}

/**
 * Check if a line number is in ranges
 *
 * 检查行号是否在范围内
 *
 * @param lineNumber - Line number to check / 要检查的行号
 * @param ranges - Highlight ranges / 高亮范围
 * @returns Whether the line number is in ranges / 行号是否在范围内
 */
const isLineHighlighted = (
  lineNumber: number,
  ranges: HighlightLinesRange[],
): boolean =>
  ranges.some(([start, end]) => lineNumber >= start && lineNumber <= end)

/**
 * Highlight code lines based on ranges
 *
 * 根据范围高亮代码行
 *
 * @param parser - Code parser instance / 代码解析器实例
 * @param ranges - Highlight ranges / 高亮范围
 * @example
 * ```ts
 * import { highlightCodeLines, getCodeParser } from '@vuepress/plugin-prismjs'
 *
 * const parser = getCodeParser('<pre><code>line1\nline2\nline3</code></pre>')
 * highlightCodeLines(parser, [[1, 1], [3, 3]])
 * ```
 */
export const highlightCodeLines = (
  parser: CodeParser,
  ranges: HighlightLinesRange[] | null,
): void => {
  if (ranges?.length) {
    parser.line((node, index) => {
      if (isLineHighlighted(index + 1, ranges))
        node.classList.push('highlighted')
    })
  }
}
