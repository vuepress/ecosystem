import { removeEndingSlash } from '@vuepress/helper'
import type { LinksExtension } from '../types.js'
import { stripExt } from './stripExt.js'
import { withBase } from './withBase.js'

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
  base: string,
  domain = '',
  extension?: LinksExtension,
): string => {
  const pagePath = withBase(`${stripExt(path)}${extension ?? '.md'}`, base)

  return `${removeEndingSlash(domain)}${pagePath}`
}
