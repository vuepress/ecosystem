import {
  Logger,
  endsWith,
  ensureEndingSlash,
  isArray,
  isLinkAbsolute,
  isLinkHttp,
  isString,
} from '@vuepress/helper'
import { getDirname, path } from 'vuepress/utils'

import type { IconType } from '../shared/index.js'
import type { IconAsset } from './options.js'

const __dirname = getDirname(import.meta.url)

export const CLIENT_FOLDER = ensureEndingSlash(
  path.resolve(__dirname, '../client'),
)

export const PLUGIN_NAME = '@vuepress/plugin-icon'

export const logger = new Logger(PLUGIN_NAME)

export interface LinkInfo {
  type: 'script' | 'style'
  content: string
}

export const FONT_AWESOME_PREFIX = 'fas fa-'

export const ICON_FONT_PREFIX = 'iconfont icon-'

const isIconifyLink = (link: string): boolean =>
  /\/iconify-icon(?:[@/]|$)/.test(link)

const isFontAwesomeLink = (link: string): boolean =>
  /^(?:https:)?\/\/kit\.fontawesome\.com\//.test(link) ||
  /\/fontawesome(?:[@/-]|$)/.test(link)

const isIconFontLink = (link: string): boolean =>
  /^(?:https:)?\/\/at\.alicdn\.com\/t\//.test(link)

export const isFontAwesomeAssets = (assets: IconAsset): boolean =>
  isArray(assets)
    ? assets.every(isFontAwesomeLink)
    : assets === 'fontawesome' ||
      assets === 'fontawesome-with-brands' ||
      isFontAwesomeLink(assets)

export const isIconFontAssets = (assets: IconAsset): boolean =>
  isArray(assets) ? assets.every(isIconFontLink) : isIconFontLink(assets)

export const isIconifyAssets = (assets: IconAsset): boolean =>
  isString(assets) && (isIconifyLink(assets) || assets === 'iconify')

export const getIconInfo = (
  assets: IconAsset,
  prefix?: string,
): {
  iconType: IconType
  iconPrefix: string
} => {
  if (isFontAwesomeAssets(assets))
    return {
      iconType: 'fontawesome',
      iconPrefix: prefix ?? FONT_AWESOME_PREFIX,
    }
  if (isIconFontAssets(assets))
    return { iconType: 'iconfont', iconPrefix: prefix ?? ICON_FONT_PREFIX }
  if (isIconifyAssets(assets))
    return { iconType: 'iconify', iconPrefix: prefix ?? '' }

  return { iconType: 'custom', iconPrefix: prefix ?? '' }
}

const getFontAwesomeCDNLink = (type: string): string =>
  `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6/js/${type}.min.js`

const getFontAwesomeLink = (link: string): LinkInfo => ({
  type: 'script',
  content: `\
useScriptTag(
  \`${link}\`,
  () => {},
  { attrs: { "data-auto-replace-svg": "nest" } }
);
`,
})

const getIconLink = (asset?: string): LinkInfo[] => {
  if (isString(asset)) {
    if (asset === 'fontawesome')
      return ['solid', 'fontawesome']
        .map(getFontAwesomeCDNLink)
        .map(getFontAwesomeLink)

    if (asset === 'fontawesome-with-brands')
      return ['brands', 'solid', 'fontawesome']
        .map(getFontAwesomeCDNLink)
        .map(getFontAwesomeLink)

    if (asset === 'iconify')
      return [
        {
          type: 'script',
          content: `\
useScriptTag(\`https://cdn.jsdelivr.net/npm/iconify-icon@1\`);\
`,
        },
      ]

    const actualLink = isLinkHttp(asset)
      ? asset
      : isLinkAbsolute(asset)
        ? asset
        : `//${asset}`

    if (endsWith(actualLink, '.css'))
      return [
        {
          type: 'style',
          content: `\
useStyleTag(\`\\
@import url("${actualLink}");
\`);\
`,
        },
      ]

    if (endsWith(actualLink, '.js'))
      return isFontAwesomeLink(actualLink)
        ? [getFontAwesomeLink(actualLink)]
        : [
            {
              type: 'script',
              content: `\
useScriptTag(\`${actualLink}\`);\
`,
            },
          ]

    logger.error(`Can not recognize icon link: "${asset}"`)
  }

  return []
}

export const getIconLinks = (iconAssets?: IconAsset): LinkInfo[] =>
  (isArray(iconAssets) ? iconAssets : [iconAssets])
    .map((asset) => getIconLink(asset))
    .flat()
