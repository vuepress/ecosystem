import { removeLeadingSlash } from 'vuepress/shared'
import type { LLMState } from '../types.js'
import { stripExt } from './stripExt.js'

export const withBase = (link: string, base: string): string =>
  link.startsWith(base) ? link : `${base}${removeLeadingSlash(link)}`

/**
 * Generates a complete link by combining a domain, path, and an optional extension.
 *
 * @param path - The path to append to the domain (e.g., "/guide.html").
 * @param base - The prefix base path of the link (e.g., "/").
 * @param domain - The base domain of the link (e.g., "https://example.com").
 * @param extension - An optional extension to append to the path (e.g., ".md").
 * @returns The generated link
 */
export const generateLink = (
  path: string,
  { base, domain, linkExtension }: LLMState,
): string => {
  const pagePath = withBase(`${stripExt(path)}${linkExtension}`, base)

  return `${domain ?? ''}${pagePath}`
}
