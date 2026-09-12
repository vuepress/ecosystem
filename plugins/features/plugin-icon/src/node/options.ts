import type { IconType } from '../shared/index.js'

/**
 * Built-in icon types
 *
 * 内置图标类型
 */
export type BuiltInIcon = 'fontawesome-with-brands' | 'fontawesome' | 'iconify'

/**
 * Icon link type
 *
 * 图标链接类型
 */
export type IconLink =
  | `/${string}` // including `//${string}`
  | `http://${string}`
  | `https://${string}`

/**
 * FontAwesome icon style
 *
 * FontAwesome 图标样式
 */
export type FontAwesomeStyle = 'brands' | 'regular' | 'solid'

/**
 * FontAwesome icons to bundle locally, grouped by style
 *
 * 需要本地打包的 FontAwesome 图标，按样式分组
 */
export type FontAwesomeOffline = Partial<Record<FontAwesomeStyle, string[]>>

/**
 * Icon asset type
 *
 * 图标资源类型
 */
export type IconAsset = (BuiltInIcon | IconLink)[] | BuiltInIcon | IconLink

/**
 * Options for icon plugin
 *
 * 图标插件选项
 */
export interface IconPluginOptions {
  /**
   * Link of font icon asset
   *
   * 字体图标资源链接
   *
   * `"iconify"`, `"fontawesome"` and `"fontawesome-with-brands"` keywords are
   * supported
   *
   * @default 'iconify'
   */
  assets?: IconAsset

  /**
   * Class prefix of font icon
   *
   * 字体图标的 Class 前缀
   *
   * @default ''
   */
  prefix?: string

  /**
   * Icon type, inferred from `assets` by default
   *
   * 图标类型，默认从 `assets` 推断
   */
  type?: IconType

  /**
   * Component name of icon
   *
   * 图标的组件名称
   *
   * @default 'VPIcon'
   */
  component?: string

  /**
   * Enable markdown syntax
   *
   * 启用 Markdown 语法
   *
   * @default true
   */
  markdown?: boolean

  /**
   * Bundle FontAwesome icons locally instead of loading them from CDN
   *
   * 本地打包 FontAwesome 图标，而非从 CDN 加载
   *
   * Useful when the site is deployed privately without internet access.
   *
   * - `true`: bundle every FontAwesome free icon
   * - Object: bundle only the icons listed for each style
   *
   * Requires `@fortawesome/fontawesome-svg-core` and the matching
   * `@fortawesome/free-*-svg-icons` packages to be installed.
   *
   * 适用于无法访问外网时的私有部署。
   *
   * - `true`：打包全部 FontAwesome 免费图标
   * - 传入对象：仅打包对应样式中列出的图标
   *
   * 需要安装 `@fortawesome/fontawesome-svg-core` 及对应的
   * `@fortawesome/free-*-svg-icons` 包。
   *
   * @example
   *   // Bundle every icon
   *   iconPlugin({ fontawesome: true })
   *
   *   // Bundle only the icons in use
   *   iconPlugin({
   *     fontawesome: { solid: ['house', 'user'], brands: ['apple'] },
   *   })
   *
   * @default false
   */
  fontawesome?: boolean | FontAwesomeOffline
}
