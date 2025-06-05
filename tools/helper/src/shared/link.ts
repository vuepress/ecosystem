import { isLinkExternal, isLinkWithProtocol } from 'vuepress/shared'
import { startsWith } from './helper.js'

export { isLinkExternal, isLinkHttp, isLinkWithProtocol } from 'vuepress/shared'

/**
 * Check if a value is a valid absolute url
 *
 * 检查值是否为有效的绝对 URL
 *
 * @param test - The value to test / 要测试的值
 *
 * @returns Whether the value is a valid absolute url / 值是否为有效的绝对 URL
 *
 * @example
 * ```ts
 * isLinkAbsolute('/path/to/page') // true
 * isLinkAbsolute('//example.com') // false
 * isLinkAbsolute('relative/path') // false
 * ```
 */
export const isLinkAbsolute = (test: unknown): boolean =>
  startsWith(test, '/') && (test as string)[1] !== '/'

/**
 * Check if a link is relative
 *
 * 检查链接是否为相对链接
 *
 * @param link - The link to check / 要检查的链接
 *
 * @returns Whether the link is relative / 链接是否为相对链接
 *
 * @example
 * ```ts
 * isLinkRelative('path/to/page') // true
 * isLinkRelative('/absolute/path') // true
 * isLinkRelative('https://example.com') // false
 * ```
 */
export const isLinkRelative = (link: string): boolean =>
  !isLinkExternal(link) && !isLinkWithProtocol(link)
