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
