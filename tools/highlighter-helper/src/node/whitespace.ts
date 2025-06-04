/**
 * Regular expression to match `:whitespace` directive in code block info
 *
 * 匹配代码块信息中 `:whitespace` 指令的正则表达式
 */
export const WHITESPACE_REGEXP = /:whitespace(?:=(all|boundary|trailing)?)?\b/

/**
 * Regular expression to match `:no-whitespace` directive in code block info
 *
 * 匹配代码块信息中 `:no-whitespace` 指令的正则表达式
 */
export const NO_WHITESPACE_REGEXP = /:no-whitespace\b/

/**
 * Whitespace position types
 *
 * 空白符位置类型
 */
export type WhitespacePosition = 'all' | 'boundary' | 'trailing'

const AVAILABLE_WHITESPACE_POSITIONS = ['all', 'boundary', 'trailing']

/**
 * Resolve whitespace position from code block info and global option
 *
 * 从代码块信息和全局选项中解析空白符位置
 *
 * @param info - Code block info string / 代码块信息字符串
 * @param globalOption - Global whitespace option / 全局空白符选项
 * @returns Resolved whitespace position or false if disabled / 解析的空白符位置，如果禁用则返回 false
 *
 * @example
 * ```ts
 * resolveWhitespacePosition('js :whitespace=all', 'boundary') // 'all'
 * resolveWhitespacePosition('js :no-whitespace', 'boundary') // false
 * resolveWhitespacePosition('js', 'boundary') // 'boundary'
 * ```
 */
export const resolveWhitespacePosition = (
  info: string,
  globalOption: WhitespacePosition | true,
): WhitespacePosition | false => {
  if (NO_WHITESPACE_REGEXP.test(info)) {
    return false
  }

  const defaultPosition = AVAILABLE_WHITESPACE_POSITIONS.includes(
    globalOption as WhitespacePosition,
  )
    ? (globalOption as WhitespacePosition)
    : false

  const match = info.match(WHITESPACE_REGEXP)

  if (match) {
    if (AVAILABLE_WHITESPACE_POSITIONS.includes(match[1])) {
      return match[1] as WhitespacePosition
    }

    return defaultPosition || 'all'
  }

  return defaultPosition
}
