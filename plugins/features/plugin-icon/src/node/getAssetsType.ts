import { isArray } from '@vuepress/helper'

import type { IconType } from '../shared/index.js'
import type { IconAsset, IconPluginOptions } from './options.js'

export const isIconifyLink = (link: string): boolean =>
  /\/iconify-icon(?:[@/]|$)/u.test(link)

export const isFontAwesomeLink = (link: string): boolean =>
  /^(?:https:)?\/\/kit\.fontawesome\.com\//u.test(link) ||
  /\/fontawesome(?:[@/-]|$)/u.test(link)

const isIconFontLink = (link: string): boolean =>
  /^(?:https:)?\/\/at\.alicdn\.com\/t\//u.test(link)

const isFontAwesomeAsset = (asset: string): boolean =>
  asset === 'fontawesome' ||
  asset === 'fontawesome-with-brands' ||
  isFontAwesomeLink(asset)

const isIconFontAsset = (asset: string): boolean => isIconFontLink(asset)

const isIconifyAsset = (asset: string): boolean =>
  asset === 'iconify' || isIconifyLink(asset)

export const isFontAwesomeAssets = (assets: IconAsset): boolean =>
  isArray(assets)
    ? assets.every((asset) => isFontAwesomeAsset(asset))
    : isFontAwesomeAsset(assets)

export const isIconFontAssets = (assets: IconAsset): boolean =>
  isArray(assets)
    ? assets.every((asset) => isIconFontAsset(asset))
    : isIconFontAsset(assets)

export const isIconifyAssets = (assets: IconAsset): boolean =>
  isArray(assets)
    ? assets.every((asset) => isIconifyAsset(asset))
    : isIconifyAsset(assets)

export const getAssetsType = ({
  assets = 'iconify',
}: IconPluginOptions): IconType => {
  if (isFontAwesomeAssets(assets)) return 'fontawesome'
  if (isIconFontAssets(assets)) return 'iconfont'
  if (isIconifyAssets(assets)) return 'iconify'

  return 'unknown'
}
