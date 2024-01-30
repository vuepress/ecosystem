import { entries } from '@vuepress/helper/node'
import { ensureEndingSlash } from 'vuepress/shared'
import { fs, getDirname, path } from 'vuepress/utils'
import type { FeedConfig } from '../typings/index.js'
import type { ResolvedFeedOptionsMap } from './options.js'
import { getFilename } from './options.js'

const __dirname = getDirname(import.meta.url)

const TEMPLATE_FOLDER = ensureEndingSlash(
  path.resolve(__dirname, '../../templates'),
)

const DEFAULT_ATOM_XML_TEMPLATE = fs.readFileSync(
  `${TEMPLATE_FOLDER}atom.xsl`,
  'utf-8',
)

const DEFAULT_RSS_XML_TEMPLATE = fs.readFileSync(
  `${TEMPLATE_FOLDER}rss.xsl`,
  'utf-8',
)

export const getAtomTemplates = (
  options: ResolvedFeedOptionsMap,
): FeedConfig[] =>
  entries(options)
    // filter enabled locales
    .filter(([, { atom }]) => atom)
    // write template
    .map(([localePath, localeOptions]) => {
      const { atomXslTemplate = DEFAULT_ATOM_XML_TEMPLATE } = localeOptions
      const { atomXslFilename } = getFilename(localeOptions, localePath)

      return [atomXslFilename, atomXslTemplate]
    })

export const getRSSTemplates = (
  options: ResolvedFeedOptionsMap,
): FeedConfig[] =>
  entries(options)
    // filter enabled locales
    .filter(([, { rss }]) => rss)
    // write template
    .map(([localePath, localeOptions]) => {
      const { rssXslTemplate = DEFAULT_RSS_XML_TEMPLATE } = localeOptions

      const { rssXslFilename } = getFilename(localeOptions, localePath)

      return [rssXslFilename, rssXslTemplate]
    })
