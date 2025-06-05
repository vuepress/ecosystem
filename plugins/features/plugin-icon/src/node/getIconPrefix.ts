import type { IconType } from '../shared/index.js'

const ICON_FONT_PREFIX = 'iconfont icon-'

/**
 * Get icon prefix
 *
 * 获取图标前缀
 *
 * @param iconType - Icon type / 图标类型
 * @param prefix - Custom prefix / 自定义前缀
 * @returns Icon prefix / 图标前缀
 */
export const getIconPrefix = (iconType: IconType, prefix?: string): string =>
  prefix ?? (iconType === 'iconfont' ? ICON_FONT_PREFIX : '')
