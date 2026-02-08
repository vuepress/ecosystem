/**
 * Escape special characters in a string for use in a regular expression
 *
 * 转义字符串中的特殊字符以在正则表达式中使用
 *
 * @param str - String to escape / 要转义的字符串
 * @returns Escaped string / 转义后的字符串
 * @example
 * ```ts
 * import { escapeRegExp } from '@vuepress/plugin-prismjs'
 *
 * const escaped = escapeRegExp('Hello (world)')
 * console.log(escaped) // 'Hello \\(world\\)'
 * ```
 */
export const escapeRegExp = (str: string): string =>
  str.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`)
