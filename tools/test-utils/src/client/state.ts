import type {
  ClientConfig,
  PageChunk,
  PageData,
  Route,
  Routes,
  SiteData,
} from 'vuepress/client'

import {
  TEST_CLIENT_CONFIGS_KEY,
  TEST_ROUTES_KEY,
  TEST_SITE_DATA_KEY,
  TEST_THEME_DATA_KEY,
} from '../shared/keys.js'
import type { TestRouteOptions } from '../shared/types.js'

/**
 * Global state that replaces the generated client modules
 *
 * 用于替换生成的客户端模块的全局状态
 */
export interface TestRoutesState {
  redirects: Record<string, string>
  routes: Routes
}

const globals = globalThis as Record<string, unknown>

/**
 * Page data of the built-in 404 page
 *
 * 内置 404 页面的页面数据
 */
export const notFoundPageData: PageData = {
  frontmatter: {},
  lang: '',
  path: '/404.html',
  title: '404',
}

const createNotFoundRoute = (): Route => {
  const chunk: PageChunk = {
    _pageData: notFoundPageData,
    default: (): null => null,
  }

  return {
    loader: () => Promise.resolve(chunk),
    meta: {},
  }
}

/**
 * Create a route from the given options
 *
 * 根据给定选项创建路由
 *
 * @param path - Route path / 路由路径
 * @param options - Route options / 路由选项
 * @returns The route / 路由
 */
export const createTestRoute = (
  path: string,
  options: TestRouteOptions = {},
): Route => {
  const pageData: PageData = {
    frontmatter: {},
    lang: '',
    path,
    title: path,
    ...options.pageData,
  }
  const chunk: PageChunk = {
    _pageData: pageData,
    default: options.component ?? ((): null => null),
  }

  return {
    loader: () => Promise.resolve(chunk),
    meta: {},
  }
}

/**
 * Get the global test routes state
 *
 * 获取全局测试路由状态
 *
 * @returns The routes state / 路由状态
 */
export const getRoutesState = (): TestRoutesState =>
  (globals[TEST_ROUTES_KEY] ??= {
    redirects: {},
    routes: { '/404.html': createNotFoundRoute() },
  } as TestRoutesState) as TestRoutesState

/**
 * Set the global test routes state
 *
 * The route map is updated **in place**, because `vuepress/client` wraps it
 * into a `shallowRef` at module scope. Replacing the object would break
 * `resolveRoute()`.
 *
 * 设置全局测试路由状态
 *
 * 路由表是**原地**更新的，因为 `vuepress/client` 会在模块作用域把它包装进 `shallowRef`，替换对象会破坏
 * `resolveRoute()`。
 *
 * @example
 *   setTestRoutes({ '/guide/': { component: Guide } })
 *
 * @param routes - Routes to be registered / 需要注册的路由
 * @param redirects - Redirects to be registered / 需要注册的重定向
 */
export const setTestRoutes = (
  routes: Record<string, TestRouteOptions> = {},
  redirects: Record<string, string> = {},
): void => {
  const state = getRoutesState()

  for (const path of Object.keys(state.routes))
    if (path !== '/404.html') Reflect.deleteProperty(state.routes, path)

  for (const [path, options] of Object.entries(routes)) {
    if (path !== '/404.html')
      state.routes[path] = createTestRoute(path, options)
  }

  for (const path of Object.keys(state.redirects))
    Reflect.deleteProperty(state.redirects, path)

  Object.assign(state.redirects, redirects)
}

const DEFAULT_SITE_DATA: SiteData = {
  base: '/',
  description: '',
  head: [],
  lang: 'en-US',
  locales: {},
  title: '',
}

/**
 * Get the global test site data
 *
 * 获取全局测试站点数据
 *
 * @returns The site data / 站点数据
 */
export const getSiteData = (): SiteData =>
  (globals[TEST_SITE_DATA_KEY] ??= {
    ...DEFAULT_SITE_DATA,
  }) as SiteData

/**
 * Set the global test site data
 *
 * It resets the previous site data first, so that the data of every test is
 * independent.
 *
 * The site data object is updated **in place**, because `vuepress/client` wraps
 * it into a `shallowRef` at module scope.
 *
 * 设置全局测试站点数据
 *
 * 它会先重置之前的站点数据，因此每个测试的数据互相独立。
 *
 * 站点数据对象是**原地**更新的，因为 `vuepress/client` 会在模块作用域把它包装进 `shallowRef`。
 *
 * @param siteData - Site data to be applied / 需要应用的站点数据
 */
export const setSiteData = (siteData: Partial<SiteData> = {}): void => {
  const current = getSiteData()

  for (const key of Object.keys(current)) Reflect.deleteProperty(current, key)

  Object.assign(current, DEFAULT_SITE_DATA, siteData)
}

/**
 * Get the global test theme data
 *
 * 获取全局测试主题数据
 *
 * @returns The theme data / 主题数据
 */
export const getThemeData = (): Record<string, unknown> =>
  (globals[TEST_THEME_DATA_KEY] ??= {}) as Record<string, unknown>

/**
 * Set the global test theme data
 *
 * It resets the previous theme data first, so that the data of every test is
 * independent.
 *
 * The theme data object is updated **in place**, because
 * `@vuepress/plugin-theme-data/client` wraps it into a `ref` at module scope.
 *
 * 设置全局测试主题数据
 *
 * 它会先重置之前的主题数据，因此每个测试的数据互相独立。
 *
 * 主题数据对象是**原地**更新的，因为 `@vuepress/plugin-theme-data/client` 会在模块作用域把它包装进 `ref`。
 *
 * @param themeData - Theme data to be applied / 需要应用的主题数据
 */
export const setThemeData = (themeData: Record<string, unknown> = {}): void => {
  const current = getThemeData()

  for (const key of Object.keys(current)) Reflect.deleteProperty(current, key)

  Object.assign(current, themeData)
}

/**
 * Get the global test client configs
 *
 * 获取全局测试客户端配置
 *
 * @returns The client configs / 客户端配置
 */
export const getClientConfigs = (): ClientConfig[] =>
  (globals[TEST_CLIENT_CONFIGS_KEY] ??= []) as ClientConfig[]

/**
 * Set the global test client configs
 *
 * 设置全局测试客户端配置
 *
 * @param clientConfigs - Client configs to be applied / 需要应用的客户端配置
 */
export const setClientConfigs = (clientConfigs: ClientConfig[] = []): void => {
  const configs = getClientConfigs()

  configs.length = 0
  configs.push(...clientConfigs)
}
