/**
 * Resolve attribute value from code block info string
 *
 * 从代码块信息字符串中解析属性值
 *
 * @param info - Code block info string / 代码块信息字符串
 * @param attr - Attribute name to resolve / 要解析的属性名
 * @returns The attribute value or null if not found / 属性值，如果未找到则返回 null
 *
 * @example
 * ```ts
 * resolveAttr('js title="example.js"', 'title') // 'example.js'
 * resolveAttr('js title=\'example.js\'', 'title') // 'example.js'
 * resolveAttr('js', 'title') // null
 * ```
 */
export const resolveAttr = (info: string, attr: string): string | null => {
  // try to match specified attr mark
  const pattern = `\\b${attr}\\s*=\\s*(?<quote>['"])(?<content>.+?)\\k<quote>(\\s|$)`
  const regex = new RegExp(pattern, 'i')
  const match = info.match(regex)

  // return content if matched, null if not specified
  return match?.groups?.content ?? null
}
