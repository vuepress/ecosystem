import { isAbsoluteUrl, isUrl } from '@vuepress/helper/node'
import type { App } from 'vuepress/core'
import type { ExtendPage } from '../../typings/index.js'
import type { SeoPluginOptions } from '../options.js'
import { getUrl } from './getUrl.js'

export const getImages = (
  { content }: ExtendPage,
  { options: { base } }: App,
  { hostname }: SeoPluginOptions,
): string[] => {
  const result = /!\[.*?\]\((.*?)\)/giu.exec(content)

  if (result)
    return result
      .map(([, link]) => {
        if (isAbsoluteUrl(link)) return getUrl(hostname, base, link)

        if (isUrl(link)) return link

        return null
      })
      .filter((item): item is string => item !== null)

  return []
}
