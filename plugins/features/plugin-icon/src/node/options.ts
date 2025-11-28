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
   * @description `"iconify"`, `"fontawesome"` and `"fontawesome-with-brands"` keywords are supported
   *
   * @default "iconify"
   */
  assets?: IconAsset

  /**
   * Class prefix of font icon
   *
   * 字体图标的 Class 前缀
   *
   * @default ""
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
   * @default "VPIcon"
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
}
