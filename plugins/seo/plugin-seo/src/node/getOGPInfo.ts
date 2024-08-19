import { getDate, isArray, isString } from '@vuepress/helper'
import type { App } from 'vuepress/core'
import type { ExtendPage, SeoContent } from '../typings/index.js'
import type { SeoPluginOptions } from './options.js'
import {
  getAlternatePaths,
  getCover,
  getImages,
  getSEOAuthor,
  getUrl,
} from './utils/index.js'

export const getOGPInfo = (
  page: ExtendPage,
  app: App,
  {
    isArticle,
    author: globalAuthor,
    hostname,
    fallBackImage,
    restrictions,
    twitterID,
  }: {
    isArticle: Exclude<SeoPluginOptions['isArticle'], undefined>
    author?: SeoPluginOptions['author']
    hostname: SeoPluginOptions['hostname']
    fallBackImage: Exclude<SeoPluginOptions['fallBackImage'], undefined>
    restrictions?: SeoPluginOptions['restrictions']
    twitterID?: SeoPluginOptions['twitterID']
  },
): SeoContent => {
  const {
    options: { base },
    siteData,
  } = app
  const {
    frontmatter: {
      author: pageAuthor,
      time,
      date = time,
      tag,
      tags = tag as string[],
    },
    data: { git = {} },
  } = page

  const title =
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    siteData.locales[page.pathLocale]?.title ||
    siteData.title ||
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    siteData.locales['/']?.title ||
    ''
  const author = getSEOAuthor(pageAuthor || globalAuthor)
  const modifiedTime = git.updatedTime
    ? new Date(git.updatedTime).toISOString()
    : null
  const articleTags = isArray(tags) ? tags : isString(tag) ? [tag] : []
  const articleTitle = page.title
  const cover = getCover(page, app, hostname)
  const images = getImages(page, app, hostname)
  const locales = getAlternatePaths(page, app)
  const publishedTime = getDate(date)?.toISOString()

  const ogImage = cover || images[0] || fallBackImage

  const defaultOGP: SeoContent = {
    'og:url': getUrl(hostname, base, page.path),
    'og:site_name': title,
    'og:title': articleTitle,
    'og:description': page.frontmatter.description || '',
    'og:type': isArticle(page) ? 'article' : 'website',
    'og:image': ogImage,
    'og:locale': page.lang,
    'og:locale:alternate': locales.map(({ lang }) => lang),
    ...(modifiedTime ? { 'og:updated_time': modifiedTime } : {}),
    ...(restrictions ? { 'og:restrictions:age': restrictions } : {}),
    ...(twitterID ? { 'twitter:creator': twitterID } : {}),
    ...(cover
      ? {
          'twitter:card': 'summary_large_image',
          'twitter:image:src': cover,
          'twitter:image:alt': articleTitle,
        }
      : {}),

    'article:author': author[0]?.name,
    'article:tag': articleTags,
    ...(publishedTime ? { 'article:published_time': publishedTime } : {}),
    ...(modifiedTime ? { 'article:modified_time': modifiedTime } : {}),
  }

  return defaultOGP
}
