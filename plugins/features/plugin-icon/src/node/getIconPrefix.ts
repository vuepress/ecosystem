import type { IconType } from '../shared/index.js'

const FONT_AWESOME_PREFIX = 'fas fa-'
const ICON_FONT_PREFIX = 'iconfont icon-'

export const getIconPrefix = (iconType: IconType, prefix?: string): string =>
  prefix ??
  (iconType === 'fontawesome'
    ? FONT_AWESOME_PREFIX
    : iconType === 'iconfont'
      ? ICON_FONT_PREFIX
      : '')
