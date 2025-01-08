import { isArray } from '@vuepress/helper'
import type { App } from 'vuepress/core'
import { isLinkHttp } from 'vuepress/shared'
import type { FeedChannelOptions, FeedPluginOptions } from '../typings/index.js'
import { getUrl } from './utils/index.js'

export const getFeedChannelOptions = (
  app: App,
  options: FeedPluginOptions,
  localePath = '',
): FeedChannelOptions => {
  const { base, title, description, lang, locales } = app.siteData
  const {
    channel: { icon: channelIcon, image: channelImage, ...channel } = {},
    hostname,
    icon,
    image,
  } = options
  const authorName = isArray(options.channel?.author)
    ? options.channel.author[0]?.name
    : options.channel?.author?.name

  const defaultChannelOption: FeedChannelOptions = {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    title: locales[localePath]?.title || title || locales['/']?.title || '',
    link: getUrl(hostname, base, localePath),
    description:
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      locales[localePath]?.description ||
      description ||
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      locales['/']?.description ||
      '',
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    language: locales[localePath]?.lang || lang,
    copyright: authorName ? `Copyright by ${authorName}` : '',
    pubDate: new Date(),
    lastUpdated: new Date(),
    ...(icon
      ? { icon: isLinkHttp(icon) ? icon : getUrl(hostname, base, icon) }
      : {}),
    ...(image
      ? { image: isLinkHttp(image) ? image : getUrl(hostname, base, image) }
      : {}),
  }

  return {
    ...defaultChannelOption,
    ...channel,
    ...(channelIcon
      ? {
          icon: isLinkHttp(channelIcon)
            ? channelIcon
            : getUrl(hostname, base, channelIcon),
        }
      : {}),
    ...(channelImage
      ? {
          image: isLinkHttp(channelImage)
            ? channelImage
            : getUrl(hostname, base, channelImage),
        }
      : {}),
  }
}
