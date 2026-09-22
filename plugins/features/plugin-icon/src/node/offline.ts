import type { IconType } from '../shared/index.js'
import type { IconPluginOptions } from './options.js'
import { logger } from './utils.js'

/**
 * Icon types that are bundled locally
 *
 * 本地打包的图标类型
 */
export type OfflineIconType = 'fontawesome' | 'iconify'

/**
 * Get the icon type that is bundled locally
 *
 * 获取本地打包的图标类型
 *
 * The icons are bundled for the icon type of the site, so the `type` and
 * `assets` options are not affected. `"all"` is only supported by
 * `fontawesome`, as an Iconify icon set may contain thousands of icons, in
 * which case it falls back to the icons in use.
 *
 * 图标按站点的图标类型打包，因此不会影响 `type` 与 `assets` 选项。`"all"` 仅 `fontawesome` 支持，因为一个
 * Iconify 图标集可能包含数千个图标，此时会回退为打包 使用中的图标。
 *
 * @param iconType - Icon type of the site / 站点的图标类型
 * @param offline - Value of the `offline` option / `offline` 选项的值
 * @returns Icon type to bundle and whether every icon is bundled / 需要打包的图标
 *   类型与是否打包全部图标
 */
export const resolveOffline = (
  iconType: IconType,
  offline: IconPluginOptions['offline'],
): { type: OfflineIconType; all: boolean } => {
  if (iconType !== 'fontawesome' && iconType !== 'iconify') {
    throw new Error(
      `The offline mode only bundles the FontAwesome and the Iconify icons, but the icon type is "${iconType}", set the \`type\` or the \`assets\` option.`,
    )
  }

  if (offline === 'all' && iconType !== 'fontawesome') {
    logger.error(
      'The `offline: "all"` option is only supported by the FontAwesome icons, the icons used by the site are bundled instead.',
    )

    return { type: iconType, all: false }
  }

  return { type: iconType, all: offline === 'all' }
}
