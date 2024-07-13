import {
  ensureLeadingSlash,
  isLinkAbsolute,
  isLinkWithProtocol,
} from '@vuepress/helper'

export const normalizeLink = (base: string, link = ''): string => {
  return isLinkAbsolute(link) || isLinkWithProtocol(link)
    ? link
    : ensureLeadingSlash(`${base}/${link}/`.replace(/\/+/g, '/'))
}
