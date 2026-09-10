/**
 * Resolve an attribute value from an info string
 *
 * 从信息字符串中解析属性值
 *
 * @example
 *   resolveAttrs('ts title="example.ts" :active', 'title') // 'example.ts'
 *   resolveAttrs('ts title="a.ts"', 'entry') // null
 *
 * @param info - Info string / 信息字符串
 * @param name - Attribute name to resolve / 要解析的属性名
 * @returns Resolved attribute value or `null` / 解析出的属性值或 `null`
 */
export const resolveAttrs = (info: string, name: string): string | null => {
  const pattern = `\\b${name}\\s*=\\s*(?<quote>["'])(?<content>.*?)\\k<quote>(\\s|$)`
  const match = new RegExp(pattern, 'iu').exec(info)

  return match?.groups?.content ?? null
}

/**
 * Whether the info string contains a boolean marker
 *
 * 信息字符串是否包含某个布尔标记
 *
 * @example
 *   hasMarker('ts title="a.ts" :active', ':active') // true
 *
 * @param info - Info string / 信息字符串
 * @param marker - Marker to check / 要检查的标记
 * @returns Whether the marker exists / 标记是否存在
 */
export const hasMarker = (info: string, marker: string): boolean =>
  new RegExp(`(^|\\s)${marker}(\\s|$)`, 'u').test(info)

/**
 * Escape a string for being used as a HTML attribute value
 *
 * 转义字符串以便用作 HTML 属性值
 *
 * @param value - Raw value / 原始值
 * @returns Escaped value / 转义后的值
 */
export const escapeAttr = (value: string): string =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
    .replaceAll('`', '&#96;')

/**
 * Sanitize a file path read from the file system
 *
 * A file path ends up both in the info string of a code fence and in the props
 * of the file tree, and the code block title rendered by the highlighter is not
 * escaped, so unsafe characters are percent encoded.
 *
 * 清洗从文件系统读取的文件路径
 *
 * 文件路径会同时出现在代码围栏的信息字符串和文件树的属性中，而高亮器渲染的代码块标题 未做转义，因此需要对其中的不安全字符进行百分号编码。
 *
 * @param filePath - File path / 文件路径
 * @returns Sanitized file path / 清洗后的文件路径
 */
export const sanitizeFilePath = (filePath: string): string =>
  filePath.replaceAll(
    /[\s"'`&<>\\]/gu,
    (char) => `%${char.charCodeAt(0).toString(16).toUpperCase()}`,
  )
