import {
  ensureEndingSlash,
  ensureLeadingSlash,
  isLinkAbsolute,
  isLinkWithProtocol,
} from '@vuepress/helper/client'
import { resolveRoute } from 'vuepress/client'
import type { ResolvedNavItemWithLink } from '../../shared/resolved/navbar.js'

export function getNavLink(filepath: string): ResolvedNavItemWithLink {
  const { notFound, path, meta } = resolveRoute<{ title?: string }>(filepath)
  if (notFound) {
    return { text: path, link: path }
  }
  return { text: meta.title || path, link: path }
}

export function normalizeLink(base = '', link = ''): string {
  return isLinkAbsolute(link) || isLinkWithProtocol(link)
    ? link
    : ensureLeadingSlash(`${base}/${link}`.replace(/\/+/g, '/'))
}

export function normalizePrefix(base: string, link = ''): string {
  return ensureEndingSlash(normalizeLink(base, link))
}
