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
 * Scanner of the icons used by the site
 *
 * 站点所用图标的扫描器
 *
 * The icons are detected from the page content, the front matter and the
 * component props automatically, so a scanner is only needed for the icons that
 * cannot be detected, e.g. icons used by the theme config or by a component
 * that computes them.
 *
 * The returned icons use the same syntax as in markdown. For FontAwesome they
 * are `house`, `solid:house`, `fa-solid fa-house` or `brands:apple`, where the
 * style is `solid` when it is not specified. For Iconify they are `mdi:home`,
 * where the `prefix` option is used when the icon does not have a prefix.
 *
 * 图标会从页面内容、front matter 与组件属性中自动检测，因此扫描器只需要返回无法被检测的图标，例如主题配置中使用的图标，或由组件计算得出的图标。
 *
 * 返回的图标使用与 Markdown 中一致的语法。FontAwesome 为 `house`、`solid:house`、 `fa-solid
 * fa-house` 或 `brands:apple`，未指定样式时样式为 `solid`。Iconify 为 `mdi:home`，图标没有前缀时会使用
 * `prefix` 选项。
 *
 * @param app - VuePress app / VuePress 应用
 * @returns Icons to bundle / 需要打包的图标
 */
export type IconScanner = (app: App) => Promise<string[]> | string[]

/**
 * Fields to scan for the icons
 *
 * 需要扫描图标的字段
 *
 * The front matter field paths and the component prop paths are read with the
 * field access and the array index, where `[*]` matches every element of an
 * array, e.g. `features[*].name` or `files[0]`. A field that does not exist is
 * skipped silently.
 *
 * Front matter 字段路径与组件属性路径支持字段访问与数组下标，其中 `[*]` 匹配数组的每个元素，例如 `features[*].name`
 * 或 `files[0]`。不存在的字段会被静默跳过。
 *
 * @example
 *   // Scan the `icon` field of the front matter and the `icon` prop of VPCustom
 *   iconPlugin({
 *     scan: {
 *       frontmatter: ['icon', 'features[*].name'],
 *       components: ['VPCustom.icon', 'VPTest.files[*]'],
 *     },
 *   })
 */
export interface IconScan {
  /**
   * Front matter fields of the pages
   *
   * 页面的 front matter 字段
   *
   * @default ['icon']
   */
  frontmatter?: string[]
  /**
   * Props of the components used in the pages
   *
   * 页面中使用的组件的属性
   *
   * A prop that is bound with `:prop` or `v-bind` is reported when its value
   * cannot be parsed as JSON, as its icons cannot be bundled then.
   *
   * 用 `:prop` 或 `v-bind` 绑定的属性在值无法解析为 JSON 时会给出警告，因为此时其图标无法 被打包。
   */
  components?: string[]
  /**
   * Extra scanner for the icons that cannot be detected
   *
   * 用于获取无法被检测到的图标的额外扫描器
   *
   * @example
   *   scanner: (app) => app.options.head
   *   .flatMap(([tag, attrs]) => ...)
   */
  scanner?: IconScanner
}

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
   * Bundle the icons locally instead of loading them from a CDN or the Iconify
   * API
   *
   * 本地打包图标，而非从 CDN 或 Iconify API 加载
   *
   * Useful when the site is deployed privately without internet access. The
   * icons are bundled for the icon type of the site, so the type is not
   * affected by this option.
   *
   * - `true`: bundle the icons used by the site, which are detected from the page
   *   content, the front matter and the component props, see the `scan` option
   * - `"all"`: bundle every icon of the icon type, which is only supported by
   *   `fontawesome`, as an Iconify icon set may contain thousands of icons
   *
   * For `fontawesome`, `@fortawesome/fontawesome-svg-core` is always required,
   * and each icon style needs its own package:
   * `@fortawesome/free-solid-svg-icons`, `@fortawesome/free-regular-svg-icons`
   * and `@fortawesome/free-brands-svg-icons`. Only the styles that provide an
   * icon are required, except for `"all"`, which imports every style as a
   * whole.
   *
   * For `iconify`, `iconify-icon` and the `@iconify-json/<prefix>` package of
   * every icon set in use are required. The icon sets are reduced to the icons
   * used by the site, so the bundle only contains the icons in use. The Iconify
   * API is blocked in the dev server, so that an icon that is missing from the
   * bundle is visible instead of being loaded from the API.
   *
   * 适用于无法访问外网时的私有部署。图标按站点的图标类型打包，因此该选项不会影响图标类型。
   *
   * - `true`：打包站点用到的图标，会从页面内容、front matter 与组件属性中检测，见 `scan` 选项
   * - `"all"`：打包该图标类型的全部图标，仅 `fontawesome` 支持，因为一个 Iconify 图标集 可能包含数千个图标
   *
   * `fontawesome` 需要 `@fortawesome/fontawesome-svg-core` 及每种图标样式各自的包：
   * `@fortawesome/free-solid-svg-icons`、`@fortawesome/free-regular-svg-icons` 与
   * `@fortawesome/free-brands-svg-icons`。除 `"all"` 外，只需要用到的样式对应的包， `"all"`
   * 会整体导入每个样式。
   *
   * `iconify` 需要 `iconify-icon` 与使用到的每个图标集对应的 `@iconify-json/<prefix>`
   * 包。图标集会裁剪为站点用到的图标，因此产物中只包含使用中的图标。开发服务器中会拦截 Iconify API，以便发现未被打包的图标，而非从 API
   * 加载它们。
   *
   * @example
   *   // Bundle the icons used by the site, for the icon type of the site
   *   iconPlugin({ offline: true })
   *
   *   // Bundle every FontAwesome free icon
   *   iconPlugin({ assets: 'fontawesome', offline: 'all' })
   *
   * @default false
   */
  offline?: 'all' | boolean

  /**
   * Fields to scan for the icons
   *
   * 需要扫描图标的字段
   *
   * The icons are scanned from the front matter and the component props of the
   * pages, which is used by the `offline` option. It has no effect when the
   * offline mode is not enabled.
   *
   * 图标会从页面的 front matter 与组件属性中扫描，供 `offline` 选项使用。未启用离线模式时该选项无效。
   *
   * @example
   *   iconPlugin({
   *     offline: true,
   *     scan: {
   *       frontmatter: ['icon', 'features[*].name'],
   *       components: ['VPCustom.icon'],
   *     },
   *   })
   */
  scan?: IconScan
}
