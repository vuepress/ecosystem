import { removeEndingSlash } from 'vuepress/shared'

export const withBase = (link: string, base?: string): string => {
  if (!base) return link
  return link.startsWith(base) ? link : `${removeEndingSlash(base)}${link}`
}
