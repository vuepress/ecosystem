import { isLinkExternal, isLinkWithProtocol } from 'vuepress/shared'
import { startsWith } from './helper.js'

export { isLinkExternal, isLinkHttp, isLinkWithProtocol } from 'vuepress/shared'

/**
 * Check if a value is a valid absolute url
 */
export const isLinkAbsolute = (test: unknown): boolean =>
  startsWith(test, '/') && (test as string)[1] !== '/'

export const isLinkRelative = (link: string): boolean =>
  !isLinkExternal(link) && !isLinkWithProtocol(link)
