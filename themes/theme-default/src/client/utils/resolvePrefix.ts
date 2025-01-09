import { ensureEndingSlash, isLinkRelative } from '@vuepress/helper/client'

export const resolvePrefix = (prefix = '', path = ''): string =>
  isLinkRelative(path) ? `${ensureEndingSlash(prefix)}${path}` : path
