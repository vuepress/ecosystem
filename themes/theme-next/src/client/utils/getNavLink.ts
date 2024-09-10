import {
  ensureEndingSlash,
  ensureLeadingSlash,
  isLinkAbsolute,
  isLinkWithProtocol,
} from '@vuepress/helper/client'
import { resolveRoute } from 'vuepress/client'
import type { ResolvedNavItemWithLink } from '../../shared/resolved/navbar.js'

export const getNavLink = (filepath: string): ResolvedNavItemWithLink => {
  const { notFound, path, meta } = resolveRoute<{ title?: string }>(filepath)
  if (notFound) {
    return { text: path, link: path }
  }
  return { text: meta.title || path, link: path }
}

export const normalizeLink = (base = '', link = ''): string =>
  isLinkAbsolute(link) || isLinkWithProtocol(link)
    ? link
    : ensureLeadingSlash(`${base}/${link}`.replace(/\/+/g, '/'))

export const normalizePrefix = (base: string, link = ''): string =>
  ensureEndingSlash(normalizeLink(base, link))
