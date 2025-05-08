import { removeEndingSlash, removeLeadingSlash } from '@vuepress/helper'
import type { LinksExtension } from '../types.js'

/**
 * Generates a complete link by combining a domain, path, and an optional extension.
 *
 * @param path - The path to append to the domain (e.g., "guide").
 * @param domain - The base domain of the link (e.g., "https://example.com").
 * @param extension - An optional extension to append to the path (e.g., ".md").
 * @returns The generated link
 */
export const generateLink = (
  path: string,
  domain = '',
  extension?: LinksExtension,
): string => {
  const pagePath =
    extension && !path.endsWith(extension) ? `${path}${extension}` : path

  return `${removeEndingSlash(domain)}/${removeLeadingSlash(pagePath)}`
}
