import { keys } from '@vuepress/helper'
import type { App } from 'vuepress/core'
import type { HeadConfig } from 'vuepress/shared'
import { getFeedFilenames } from './getFeedFilenames.js'
import type { ResolvedFeedOptionsMap } from './getFeedOptions.js'
import { getUrl } from './utils/index.js'

export const addFeedLinks = (
  app: App,
  options: ResolvedFeedOptionsMap,
): void => {
  const { base, title, locales, head } = app.siteData
  const localePaths = keys(options)

  // there is only one language, so we append it to siteData
  if (localePaths.length === 1) {
    const { atomOutputFilename, jsonOutputFilename, rssOutputFilename } =
      getFeedFilenames(options['/'])
    const { atom, json, rss, hostname } = options['/']

    const getHeadItem = (
      name: string,
      fileName: string,
      type: string,
    ): HeadConfig => [
      'link',
      {
        rel: 'alternate',
        type,
        href: getUrl(hostname, base, fileName),
        title: `${
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          title || locales['/']?.title || ''
        } ${name} Feed`,
      },
    ]

    // add atom link
    if (atom)
      head.push(getHeadItem('Atom', atomOutputFilename, 'application/atom+xml'))

    // add json link
    if (json)
      head.push(getHeadItem('JSON', jsonOutputFilename, 'application/json'))

    // add rss link
    if (rss)
      head.push(getHeadItem('RSS', rssOutputFilename, 'application/rss+xml'))
  }
  // there are multiple languages, so we should append to page
  else {
    app.pages.forEach((page) => {
      const { pathLocale } = page
      const localeOptions = options[pathLocale]

      if (localePaths.includes(pathLocale)) {
        const { atomOutputFilename, jsonOutputFilename, rssOutputFilename } =
          getFeedFilenames(localeOptions, pathLocale)

        const getHeadItem = (
          name: string,
          fileName: string,
          type: string,
        ): HeadConfig => [
          'link',
          {
            rel: 'alternate',
            type,
            href: getUrl(localeOptions.hostname, base, fileName),
            title: `${
              // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
              locales[pathLocale]?.title ||
              title ||
              // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
              locales['/']?.title ||
              ''
            } ${name} Feed`,
          },
        ]

        // ensure head exists
        page.frontmatter.head ??= []

        // add atom link
        if (localeOptions.atom)
          page.frontmatter.head.push(
            getHeadItem('Atom', atomOutputFilename, 'application/atom+xml'),
          )

        // add json link
        if (localeOptions.json)
          page.frontmatter.head.push(
            getHeadItem('JSON', jsonOutputFilename, 'application/json'),
          )

        // add rss link
        if (localeOptions.rss)
          page.frontmatter.head.push(
            getHeadItem('RSS', rssOutputFilename, 'application/rss+xml'),
          )
      }
    })
  }
}
