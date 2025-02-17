import {
  endsWith,
  isArray,
  isLinkAbsolute,
  isLinkHttp,
  isString,
} from '@vuepress/helper'
import { isFontAwesomeLink } from './getAssetsType.js'
import type { IconAsset } from './options.js'
import { logger } from './utils.js'

export interface LinkInfo {
  type: 'script' | 'style'
  content: string
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
      return ['solid', 'regular', 'fontawesome']
        .map(getFontAwesomeCDNLink)
        .map(getFontAwesomeLink)

    if (asset === 'fontawesome-with-brands')
      return ['all'].map(getFontAwesomeCDNLink).map(getFontAwesomeLink)

    if (asset === 'iconify')
      return [
        {
          type: 'script',
          content: `\
useScriptTag(\`https://cdn.jsdelivr.net/npm/iconify-icon@2\`);\
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

    if (endsWith(actualLink, '.js')) {
      if (isFontAwesomeLink(actualLink)) return [getFontAwesomeLink(actualLink)]

      return [
        {
          type: 'script',
          content: `\
          useScriptTag(\`${actualLink}\`);\
          `,
        },
      ]
    }

    logger.error(`Can not recognize icon link: "${asset}"`)
  }

  return []
}

export const getIconLinks = (assets: IconAsset = 'iconify'): LinkInfo[] =>
  (isArray(assets) ? assets : [assets]).map(getIconLink).flat()
