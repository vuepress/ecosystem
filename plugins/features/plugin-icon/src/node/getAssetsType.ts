import { isArray, isString } from '@vuepress/helper'
import type { IconType } from '../shared/index.js'
import type { IconAsset, IconPluginOptions } from './options.js'

export const isIconifyLink = (link: string): boolean =>
  /\/iconify-icon(?:[@/]|$)/.test(link)

export const isFontAwesomeLink = (link: string): boolean =>
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

export const getAssetsType = ({
  assets = 'iconify',
}: IconPluginOptions): IconType => {
  if (isFontAwesomeAssets(assets)) return 'fontawesome'
  if (isIconFontAssets(assets)) return 'iconfont'
  if (isIconifyAssets(assets)) return 'iconify'

  return 'unknown'
}
