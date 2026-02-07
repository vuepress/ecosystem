import { isLinkAbsolute, isLinkWithProtocol } from '@vuepress/helper'
import type { App } from 'vuepress/core'
import type { ExtendPage } from '../../typings/index.js'
import { getUrl } from './getUrl.js'

const IMAGE_REG_EXP = /!\[.*?\]\((.*?)\)/gu

export const getImages = (
  { content }: ExtendPage,
  { options: { base } }: App,
  hostname: string,
): string[] =>
  Array.from(content.matchAll(IMAGE_REG_EXP), ([, src]) => {
    if (isLinkAbsolute(src)) return getUrl(hostname, base, src)
    if (isLinkWithProtocol(src)) return src

    return null
  }).filter((item): item is string => item != null)
