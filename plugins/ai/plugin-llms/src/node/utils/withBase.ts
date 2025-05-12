import { ensureLeadingSlash, removeLeadingSlash } from 'vuepress/shared'

export const withBase = (link: string, base?: string): string => {
  if (!base) return ensureLeadingSlash(link)

  return link.startsWith(base) ? link : `${base}${removeLeadingSlash(link)}`
}
