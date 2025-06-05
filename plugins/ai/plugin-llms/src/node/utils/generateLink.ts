import { removeLeadingSlash } from 'vuepress/shared'
import type { LLMState } from '../types.js'
import { stripExt } from './stripExt.js'

export const withBase = (link: string, base: string): string =>
  link.startsWith(base) ? link : `${base}${removeLeadingSlash(link)}`

/**
 * Generate a complete link with domain, base, and extension
 *
 * @param path - Page path (e.g., "/guide.html")
 * @param state - State object containing base, domain, and link extension
 * @returns Generated link with all components
 */
export const generateLink = (
  path: string,
  { base, domain, linkExtension }: LLMState,
): string => {
  const pagePath = withBase(`${stripExt(path)}${linkExtension}`, base)

  return `${domain ?? ''}${pagePath}`
}
