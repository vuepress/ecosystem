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
 * Encode a character as a percent escape
 *
 * 将字符编码为百分号转义
 *
 * @param char - Character to encode / 要编码的字符
 * @returns Encoded character / 编码后的字符
 */
const encodeChar = (char: string): string =>
  `%${char.charCodeAt(0).toString(16).toUpperCase()}`

/**
 * Encode a file path for being transported to the rendered code block title
 *
 * Only the characters that would really break the pipeline are encoded, so that
 * an ordinary file name, including CJK characters and inner spaces, is kept as
 * it is:
 *
 * - `"`, `` ` ``, `<` and `>` break the code block title rendered by the
 *   highlighter, which interpolates its content without escaping it
 * - `\` starts a markdown escape sequence, and `&` starts a HTML entity, both of
 *   which are decoded by the highlighter before the title is read
 * - Leading and trailing whitespace is trimmed by the highlighter
 *
 * 编码文件路径，以便传递到渲染后的代码块标题
 *
 * 只会编码真正会破坏流程的字符，因此常规文件名（包括中日韩字符与中间的空格）会原样保留：
 *
 * - `"`、`` ` ``、`<` 与 `>` 会破坏由高亮器渲染的代码块标题，因为高亮器不会转义其内容
 * - `\` 会开始一段 Markdown 转义序列，`&` 会开始一个 HTML 实体，两者都会在读取标题前被高亮器解码
 * - 首尾空白会被高亮器去除
 *
 * @param filePath - File path / 文件路径
 * @returns Encoded file path / 编码后的文件路径
 */
export const sanitizeFilePath = (filePath: string): string =>
  filePath
    // Characters that break the attribute, or the info string of the code fence
    .replaceAll(/["`<>\\]/gu, (char) => encodeChar(char))
    // An entity is decoded by the highlighter, which may produce a quote
    .replaceAll(/&(?=[a-z#][a-z0-9]{1,31};)/giu, (char) => encodeChar(char))
    // The highlighter trims the title
    .replaceAll(/^\s+|\s+$/gu, (match) =>
      match.replaceAll(/\s/gu, (char) => encodeChar(char)),
    )
