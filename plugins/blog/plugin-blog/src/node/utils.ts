import { sanitizeFileName } from 'vuepress/utils'

export const getPagePath = (path: string | null): string =>
  path
    ? encodeURI(
        path
          .split('/')
          .map((str) => sanitizeFileName(str))
          .join('/'),
      )
    : ''
