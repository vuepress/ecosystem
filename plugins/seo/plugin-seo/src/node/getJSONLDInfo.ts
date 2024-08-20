import { getDate } from '@vuepress/helper'
import type { App } from 'vuepress/core'
import type {
  ArticleSchema,
  BlogPostingSchema,
  ExtendPage,
  WebPageSchema,
} from '../typings/index.js'
import type { SeoPluginOptions } from './options.js'
import { getCover, getImages, getSEOAuthor } from './utils/index.js'

export const getJSONLDInfo = (
  page: ExtendPage,
  app: App,
  {
    isArticle,
    author: globalAuthor,
    fallBackImage,
    hostname,
  }: {
    isArticle: Exclude<SeoPluginOptions['isArticle'], undefined>
    author?: SeoPluginOptions['author']
    hostname: SeoPluginOptions['hostname']
    fallBackImage: Exclude<SeoPluginOptions['fallBackImage'], undefined>
  },
): ArticleSchema | BlogPostingSchema | WebPageSchema => {
  const {
    title,
    frontmatter: { author: pageAuthor, description, time, date = time },
    data: { git = {} },
  } = page

  const author = getSEOAuthor(pageAuthor || globalAuthor)
  const datePublished = getDate(date)?.toISOString()
  const dateModified = git.updatedTime
    ? new Date(git.updatedTime).toISOString()
    : null
  const cover = getCover(page, app, hostname)
  const images = getImages(page, app, hostname)

  return isArticle(page)
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': title,
        'image': images.length ? images : [cover || fallBackImage],
        datePublished,
        dateModified,
        'author': author.map((item) => ({ '@type': 'Person', ...item })),
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'name': title,
        ...(description ? { description } : {}),
      }
}
