import type { Component } from 'vue'
import type {
  ClientConfig,
  PageData,
  PageFrontmatter,
  SiteData,
} from 'vuepress/client'

/**
 * Options to define a route in the test client
 *
 * 测试客户端中定义路由的选项
 */
export interface TestRouteOptions {
  /**
   * Component of the route
   *
   * 路由的组件
   */
  component?: Component

  /**
   * Page data of the route
   *
   * 路由的页面数据
   */
  pageData?: Partial<PageData>
}

/**
 * Options to define the current page
 *
 * 定义当前页面的选项
 */
export interface TestPageOptions {
  /**
   * Route path of the page
   *
   * 页面的路由路径
   *
   * @default '/'
   */
  path?: string

  /**
   * Title of the page
   *
   * 页面的标题
   *
   * @default ''
   */
  title?: string

  /**
   * Language of the page
   *
   * 页面的语言
   *
   * @default ''
   */
  lang?: string

  /**
   * Frontmatter of the page
   *
   * 页面的 frontmatter
   *
   * @default {}
   */
  frontmatter?: PageFrontmatter

  /**
   * Extra page data
   *
   * 额外的页面数据
   */
  data?: Record<string, unknown>
}

/**
 * Options to create a test client
 *
 * 创建测试客户端的选项
 */
export interface TestClientOptions {
  /**
   * Base of the site
   *
   * 站点的 base
   *
   * @default '/'
   */
  base?: SiteData['base']

  /**
   * Site data
   *
   * 站点数据
   */
  site?: Partial<SiteData>

  /**
   * Current page
   *
   * 当前页面
   */
  page?: TestPageOptions

  /**
   * Route path of the current page
   *
   * 当前页面的路由路径
   *
   * @default '/'
   */
  route?: string

  /**
   * Layout components
   *
   * 布局组件
   */
  layouts?: Record<string, Component>

  /**
   * Content of the current page
   *
   * - A component is rendered directly
   * - A string is rendered as raw HTML
   *
   * 当前页面的内容
   *
   * - 组件会被直接渲染
   * - 字符串会作为原始 HTML 渲染
   */
  content?: Component | string

  /**
   * Routes of the site
   *
   * 站点的路由
   */
  routes?: Record<string, TestRouteOptions>

  /**
   * Redirects of the site
   *
   * 站点的重定向
   */
  redirects?: Record<string, string>

  /**
   * Client configs to be applied
   *
   * 需要应用的客户端配置
   */
  clientConfigs?: ClientConfig[]

  /**
   * Root component to be rendered
   *
   * When it is provided, the layout and the root components of the client
   * configs are skipped, and only the given component is rendered.
   *
   * 需要渲染的根组件
   *
   * 提供时会跳过布局与客户端配置的根组件，只渲染给定组件。
   */
  rootComponent?: Component

  /**
   * Theme data
   *
   * It is read by `useThemeData()` of `@vuepress/plugin-theme-data/client`.
   *
   * 主题数据
   *
   * 它会被 `@vuepress/plugin-theme-data/client` 的 `useThemeData()` 读取。
   */
  themeData?: Record<string, unknown>

  /**
   * Whether to simulate the SSR mode
   *
   * It defaults to `true` for `renderToString()`, and `false` for `mount()`.
   *
   * 是否模拟 SSR 模式
   *
   * `renderToString()` 默认 `true`，`mount()` 默认 `false`。
   */
  ssr?: boolean
}
