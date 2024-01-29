import { isAbsoluteUrl, isUrl } from '@vuepress/helper/node'
import type { App } from 'vuepress/core'
import type { SeoOptions } from '../options.js'
import type { ExtendPage } from '../typings/index.js'
import { getUrl } from './getUrl.js'

export const getCover = (
  { frontmatter }: ExtendPage,
  { options: { base } }: App,
  { hostname }: SeoOptions,
): string | null => {
  const { banner, cover } = frontmatter

  if (banner) {
    if (isAbsoluteUrl(banner)) return getUrl(hostname, base, banner)

    if (isUrl(banner)) return banner
  }

  if (cover) {
    if (isAbsoluteUrl(cover)) return getUrl(hostname, base, cover)

    if (isUrl(cover)) return cover
  }

  return null
}
