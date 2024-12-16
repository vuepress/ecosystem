import {
  isLinkAbsolute,
  isLinkWithProtocol,
  isPlainObject,
  isString,
} from '@vuepress/helper'
import type { App } from 'vuepress/core'
import type { ExtendPage } from '../../typings/index.js'
import { getUrl } from './getUrl.js'

const resolveCover = (
  cover: Record<string, unknown> | string | undefined,
): string | undefined => {
  if (!cover) {
    return undefined
  }
  if (isString(cover)) {
    return cover
  }
  if (isPlainObject(cover)) {
    return (cover.url ?? cover.src) as string
  }

  return undefined
}

export const getCover = (
  { frontmatter }: ExtendPage,
  { options: { base } }: App,
  hostname: string,
): string | null => {
  const { banner, cover } = frontmatter

  const url = resolveCover(banner) ?? resolveCover(cover)

  if (url) {
    if (isLinkAbsolute(url)) return getUrl(hostname, base, url)
    if (isLinkWithProtocol(url)) return url
  }

  return null
}
