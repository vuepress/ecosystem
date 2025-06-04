/**
 * Regular expression to match `:collapsed-lines` directive in code block info
 *
 * 匹配代码块信息中 `:collapsed-lines` 指令的正则表达式
 */
const COLLAPSED_LINES_REGEXP = /:collapsed-lines\b/

/**
 * Regular expression to match `:collapsed-lines=num` directive in code block info
 *
 * 匹配代码块信息中 `:collapsed-lines=num` 指令的正则表达式
 */
const COLLAPSED_LINES_START_REGEXP = /:collapsed-lines=(\d+)\b/

/**
 * Regular expression to match `:no-collapsed-lines` directive in code block info
 *
 * 匹配代码块信息中 `:no-collapsed-lines` 指令的正则表达式
 */
const NO_COLLAPSED_LINES_REGEXP = /:no-collapsed-lines\b/

/**
 * Resolve the `:collapsed-lines` `:collapsed-lines=num` / `:no-collapsed-lines` mark from token info
 *
 * 从 token 信息中解析 `:collapsed-lines` `:collapsed-lines=num` / `:no-collapsed-lines` 标记
 *
 * @param info - Code block info string / 代码块信息字符串
 * @returns Collapsed lines configuration / 折叠行配置
 *  - `number` - Start line number for collapsing / 折叠起始行号
 *  - `true` - Enable collapsed lines / 启用折叠行
 *  - `false` - Disable collapsed lines / 禁用折叠行
 *  - `null` - No configuration found / 未找到配置
 *
 * @example
 * ```ts
 * resolveCollapsedLines('js :collapsed-lines') // true
 * resolveCollapsedLines('js :collapsed-lines=20') // 20
 * resolveCollapsedLines('js :no-collapsed-lines') // false
 * resolveCollapsedLines('js') // null
 * ```
 */
export function resolveCollapsedLines(info: string): boolean | number | null {
  const lines = COLLAPSED_LINES_START_REGEXP.exec(info)?.[1]

  if (lines) {
    return Number(lines)
  }

  if (COLLAPSED_LINES_REGEXP.test(info)) {
    return true
  }

  if (NO_COLLAPSED_LINES_REGEXP.test(info)) {
    return false
  }

  return null
}
