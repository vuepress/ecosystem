import type { App } from 'vuepress/core'

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
 * Scanner of the FontAwesome icons used by the site
 *
 * 站点所用 FontAwesome 图标的扫描器
 *
 * Icons are detected from page content automatically, a scanner is therefore
 * only needed for icons that cannot be detected, e.g. icons used by a theme
 * config or a component.
 *
 * Returned icons use the same syntax as in markdown, e.g. `house`,
 * `solid:house`, `fa-solid fa-house` and `brands:apple`. The style of an icon
 * is `solid` when it is not specified.
 *
 * 图标会从页面内容中自动检测，因此扫描器只需要返回无法被检测的图标，例如主题配置 或组件中使用的图标。
 *
 * 返回的图标使用与 Markdown 中一致的语法，例如 `house`、`solid:house`、 `fa-solid fa-house` 与
 * `brands:apple`。未指定样式时，图标样式为 `solid`。
 *
 * @param app - VuePress app / VuePress 应用
 * @returns Icons to bundle / 需要打包的图标
 */
export type FontAwesomeScanner = (app: App) => Promise<string[]> | string[]

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
   * `@fortawesome/fontawesome-svg-core` is always required, and each icon style
   * needs its own package: `@fortawesome/free-solid-svg-icons`,
   * `@fortawesome/free-regular-svg-icons` and
   * `@fortawesome/free-brands-svg-icons`. Only the styles that provide an icon
   * are required, except for `"all"`, which imports every style as a whole.
   *
   * - `true`: bundle the icons used by the site, which are detected from page
   *   content automatically
   * - `"all"`: bundle every FontAwesome free icon
   * - Function: an extra scanner returning the icons that cannot be detected,
   *   e.g. icons used by a theme config or a component
   *
   * The offline mode only supports the FontAwesome free icons, so the icon type
   * is fixed to `fontawesome`.
   *
   * 适用于无法访问外网时的私有部署。
   *
   * `@fortawesome/fontawesome-svg-core` 始终需要，每种图标样式还需要各自的包：
   * `@fortawesome/free-solid-svg-icons`、`@fortawesome/free-regular-svg-icons` 与
   * `@fortawesome/free-brands-svg-icons`。除 `"all"` 外，只需要用到的样式对应的 包，`"all"`
   * 会整体导入每个样式。
   *
   * - `true`：打包站点用到的图标，会从页面内容中自动检测
   * - `"all"`：打包全部 FontAwesome 免费图标
   * - 传入函数：额外的扫描器，返回无法被检测的图标，例如主题配置或组件中使用的图标
   *
   * 离线模式只支持 FontAwesome 免费图标，因此图标类型固定为 `fontawesome`。
   *
   * @example
   *   // Bundle the icons used by the site
   *   iconPlugin({ fontawesome: true })
   *
   *   // Bundle icons of a component, which are not detected automatically
   *   iconPlugin({ fontawesome: () => ['brands:apple', 'solid:house'] })
   *
   *   // Bundle every icon
   *   iconPlugin({ fontawesome: 'all' })
   *
   * @default false
   */
  fontawesome?: 'all' | boolean | FontAwesomeScanner
}
