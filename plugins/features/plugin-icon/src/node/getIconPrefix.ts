import type { IconType } from '../shared/index.js'

const ICON_FONT_PREFIX = 'iconfont icon-'

export const getIconPrefix = (iconType: IconType, prefix?: string): string =>
  prefix ?? (iconType === 'iconfont' ? ICON_FONT_PREFIX : '')
