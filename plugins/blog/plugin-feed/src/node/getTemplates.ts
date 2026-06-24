import { entries } from '@vuepress/helper'
import { ensureEndingSlash } from 'vuepress/shared'
import { fs, getDirname, path } from 'vuepress/utils'

import type { FeedConfig } from '../typings/index.js'
import { getFeedFilenames } from './getFeedFilenames.js'
import type { ResolvedFeedOptionsMap } from './getFeedOptions.js'

const __dirname = import.meta.dirname || getDirname(import.meta.url)

const TEMPLATE_FOLDER = ensureEndingSlash(
  path.resolve(__dirname, '../../templates'),
)

let defaultAtomXmlTemplate: string
let defaultRssXmlTemplate: string

export const getAtomTemplates = async (
  options: ResolvedFeedOptionsMap,
): Promise<FeedConfig[]> => {
  const enabledLocales = entries(options).filter(([, { atom }]) => atom)

  if (
    defaultAtomXmlTemplate === undefined &&
    enabledLocales.some(([, { atomXslTemplate }]) => !atomXslTemplate)
  ) {
    defaultAtomXmlTemplate = await fs.readFile(
      `${TEMPLATE_FOLDER}atom.xsl`,
      'utf-8',
    )
  }

  return enabledLocales.map(([localePath, localeOptions]) => {
    const { atomXslTemplate = defaultAtomXmlTemplate ?? '' } = localeOptions
    const { atomXslFilename } = getFeedFilenames(localeOptions, localePath)

    return [atomXslFilename, atomXslTemplate]
  })
}

export const getRSSTemplates = async (
  options: ResolvedFeedOptionsMap,
): Promise<FeedConfig[]> => {
  const enabledLocales = entries(options).filter(([, { rss }]) => rss)

  if (
    defaultRssXmlTemplate === undefined &&
    enabledLocales.some(([, { rssXslTemplate }]) => !rssXslTemplate)
  ) {
    defaultRssXmlTemplate = await fs.readFile(
      `${TEMPLATE_FOLDER}rss.xsl`,
      'utf-8',
    )
  }

  return enabledLocales.map(([localePath, localeOptions]) => {
    const { rssXslTemplate = defaultRssXmlTemplate ?? '' } = localeOptions
    const { rssXslFilename } = getFeedFilenames(localeOptions, localePath)

    return [rssXslFilename, rssXslTemplate]
  })
}
