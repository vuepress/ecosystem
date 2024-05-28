import { entries, fromEntries } from '@vuepress/helper'
import type { GitData } from '@vuepress/plugin-git'
import type { App, Page } from 'vuepress/core'
import { colors } from 'vuepress/utils'
import type { FeedConfig, FeedPluginFrontmatter } from '../typings/index.js'
import { FeedItem, FeedStore } from './feed/index.js'
import { getAtomFeed } from './generator/atom/index.js'
import { getJSONFeed } from './generator/json/index.js'
import { getRssFeed } from './generator/rss/index.js'
import { getFeedFilenames } from './getFeedFilenames.js'
import type { ResolvedFeedOptionsMap } from './getFeedOptions.js'
import { logger } from './utils/index.js'

export const getFeedFiles = (
  app: App,
  options: ResolvedFeedOptionsMap,
  hostname: string,
): FeedConfig[] => {
  const localMap: Record<string, FeedStore> = fromEntries(
    entries(options).map(([localePath, localeOptions]) => [
      localePath,
      new FeedStore(app, localeOptions, localePath),
    ]),
  )

  return (
    entries(options)
      // filter enabled locales
      .filter(([, { atom, json, rss }]) => atom || json || rss)
      .map(([localePath, localeOptions]) => {
        const {
          atom,
          json,
          rss,
          count: feedCount = 100,
          filter,
          sorter,
        } = localeOptions

        const feedStore = localMap[localePath]
        const pages = app.pages
          .filter((page) => page.pathLocale === localePath)
          .filter(filter)
          .sort(sorter)

        // add feed items
        for (const page of pages) {
          const feedItem = new FeedItem(
            app,
            localeOptions,
            page as Page<{ git?: GitData }, FeedPluginFrontmatter>,
            hostname,
          )

          feedStore.add(feedItem)
          if (feedStore.items.length === feedCount) break
        }

        const count = feedStore.items.length

        logger.succeed(
          `added ${colors.cyan(
            `${count} page${count > 1 ? 's' : ''}`,
          )} as feed item${count > 1 ? 's' : ''} in locale ${colors.cyan(
            localePath,
          )}`,
        )

        const { atomOutputFilename, jsonOutputFilename, rssOutputFilename } =
          getFeedFilenames(localeOptions, localePath)
        const results: FeedConfig[] = []

        // generate feed
        if (atom)
          results.push([
            atomOutputFilename,
            getAtomFeed(feedStore),
            'application/atom+xml',
          ])
        if (json)
          results.push([
            jsonOutputFilename,
            getJSONFeed(feedStore),
            'application/json',
          ])
        if (rss)
          results.push([
            rssOutputFilename,
            getRssFeed(feedStore),
            'application/xml',
          ])

        return results
      })
      .flat()
  )
}
