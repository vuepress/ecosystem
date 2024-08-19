import type { App } from 'vuepress/core'
import type { ExtendPage } from '../typings/index.js'
import {
  addOGP,
  appendAlternate,
  appendCanonical,
  appendJSONLD,
} from './appendHead.js'
import { getJSONLDInfo } from './getJSONLDInfo.js'
import { getOGPInfo } from './getOGPInfo.js'
import type { SeoPluginOptions } from './options.js'
import { getAlternateLinks, getCanonicalLink, logger } from './utils/index.js'

export const appendSEO = (
  app: App,
  {
    author,
    canonical,
    fallBackImage = '',
    hostname,
    isArticle = (articlePage): boolean =>
      Boolean(articlePage.filePathRelative && !articlePage.frontmatter.home),
    customHead,
    ogp,
    jsonLd,
    ...rest
  }: SeoPluginOptions,
): void => {
  app.pages.forEach((page: ExtendPage) => {
    const head = page.frontmatter.head ?? []

    const canonicalLink = getCanonicalLink(page, canonical)
    const alternateLinks = getAlternateLinks(app, page, hostname)

    appendCanonical(head, canonicalLink)
    appendAlternate(head, alternateLinks)

    if (page.frontmatter.seo !== false) {
      const defaultOGP = getOGPInfo(page, app, {
        isArticle,
        fallBackImage,
        hostname,
        ...rest,
      })
      const defaultJSONLD = getJSONLDInfo(page, app, {
        isArticle,
        hostname,
        author,
        fallBackImage,
      })

      const ogpContent = ogp ? ogp(defaultOGP, page, app) : defaultOGP

      const jsonLDContent = jsonLd
        ? jsonLd(defaultJSONLD, page, app)
        : defaultJSONLD

      if (app.env.isDebug) {
        logger.info(`OGP of ${page.path}:`, ogpContent)
        logger.info(`JSON-LD of ${page.path}:`, ogpContent)
      }

      addOGP(head, ogpContent)
      appendJSONLD(head, jsonLDContent)

      if (customHead) customHead(head, page, app)
    }

    page.frontmatter.head = head
  })
}
