import {
  ensureEndingSlash,
  ensureLeadingSlash,
  isLinkAbsolute,
  isLinkWithProtocol,
} from '@vuepress/helper/client'
import type { ResolvedNavItemWithLink } from '@vuepress/theme-default/client'
import { resolveRoute } from 'vuepress/client'

export const getNavLink = (filepath: string): ResolvedNavItemWithLink => {
  const { notFound, path, meta } = resolveRoute<{
    title?: string
    icon?: string
  }>(filepath)
  if (notFound) {
    return { text: path, link: path }
  }
  return { text: meta.title || path, link: path, icon: meta.icon }
}

export const normalizeLink = (base = '', link = ''): string =>
  isLinkAbsolute(link) || isLinkWithProtocol(link)
    ? link
    : ensureLeadingSlash(`${base}/${link}`.replace(/\/+/g, '/'))

export const normalizePrefix = (base: string, link = ''): string =>
  ensureEndingSlash(normalizeLink(base, link))
