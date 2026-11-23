import type { App } from 'vuepress/core'

import type {
  SidebarSorter,
  SidebarStructureData,
  SidebarStructureItem,
} from '../shared/index.js'
import type {
  SidebarDirInfoGetter,
  SidebarPageInfoGetter,
  SidebarStructureDataOptions,
} from './getSidebarStructureData.js'
import {
  getSidebarStructureData,
  normalizeScope,
} from './getSidebarStructureData.js'
import { getSidebarStructureScopes } from './getSidebarStructureScopes.js'
import { prepareSidebarData, watchSidebarData } from './prepareSidebarData.js'

/**
 * Options of `createSidebarStructureHelper`
 *
 * `createSidebarStructureHelper` 的选项
 */
export interface SidebarStructureHelperOptions<
  Item extends { text: string } = SidebarStructureItem,
> {
  /**
   * Theme data, with the root options and the locale options
   *
   * It is used to find the route scopes whose sidebar is generated from the
   * file structure.
   *
   * 主题数据，包含根配置与多语言配置
   *
   * 它用于查找需要根据文件结构生成侧边栏的路由范围。
   */
  themeData: object

  /**
   * Getter of the route scopes, replacing the default discovery from
   * `themeData`
   *
   * 路由范围的 getter，用于替换默认从 `themeData` 中查找的方式
   */
  getScopes?: (themeData: object) => string[]

  /**
   * Key of the children field of a group item, `items` for the default theme
   * and `children` for the classic theme
   *
   * 分组条目中子项的字段名，默认主题为 `items`，经典主题为 `children`
   *
   * @default 'children'
   */
  childrenKey?: string

  /**
   * Key of the prefix field of a group item, `base` for the default theme and
   * `prefix` for the classic theme
   *
   * 分组条目中前缀的字段名，默认主题为 `base`，经典主题为 `prefix`
   *
   * @default 'prefix'
   */
  prefixKey?: string

  /**
   * Sorter of the sidebar items
   *
   * 侧边栏条目的排序器
   */
  sorter?: SidebarSorter

  /**
   * Getter of the sidebar item of a page file
   *
   * 页面文件的侧边栏条目的 getter
   */
  pageInfoGetter?: SidebarPageInfoGetter<Item>

  /**
   * Getter of the sidebar item of a directory group
   *
   * 目录分组的侧边栏条目的 getter
   */
  dirInfoGetter?: SidebarDirInfoGetter<Item>
}

/**
 * Helper which generates the sidebar data of a theme from the file structure
 *
 * 根据文件结构生成主题侧边栏数据的 helper
 */
export interface SidebarStructureHelper<
  Item extends { text: string } = SidebarStructureItem,
> {
  /**
   * The normalized route scopes of the theme data, e.g. `['/', '/guide/']`
   *
   * 主题数据中规范化后的路由范围，例如 `['/', '/guide/']`
   */
  readonly scopes: string[]

  /**
   * Generate the sidebar data without writing it
   *
   * 生成侧边栏数据，但不写入文件
   *
   * @param app - VuePress app / VuePress 应用
   * @returns The sidebar structure data / 侧边栏结构数据
   */
  getData: (app: App) => SidebarStructureData<Item>

  /**
   * Generate the sidebar data and write it to the temp directory
   *
   * The client side imports the data from `@temp/theme-helper/sidebar.js`.
   *
   * 生成侧边栏数据并写入临时目录
   *
   * 客户端从 `@temp/theme-helper/sidebar.js` 中导入数据。
   *
   * @param app - VuePress app / VuePress 应用
   */
  prepare: (app: App) => Promise<void>

  /**
   * Watch the pages and regenerate the sidebar data on changes
   *
   * Nothing is watched when the theme data has no scope.
   *
   * 监听页面变化并重新生成侧边栏数据
   *
   * 主题数据没有路由范围时不会创建监听器。
   *
   * @param app - VuePress app / VuePress 应用
   * @param watchers - Watchers of the app / 应用的监听器
   */
  watch: (app: App, watchers: { close: () => void }[]) => void
}

/**
 * Create the sidebar structure helper of a theme
 *
 * The helper owns the neutral pipeline (scope discovery, file structure, README
 * options, sorting and temp module) while the getters decide the item shape of
 * the theme.
 *
 * 创建主题的侧边栏结构 helper
 *
 * Helper 负责中立的流程（范围查找、文件结构、README 选项、排序与临时模块），getter 决定主题的条目形状。
 *
 * @example
 *   import { createSidebarStructureHelper } from '@vuepress/theme-helper'
 *
 *   const sidebarHelper = createSidebarStructureHelper({
 *     themeData: themeData,
 *     childrenKey: 'items',
 *     prefixKey: 'base',
 *   })
 *
 * @param options - Options of the function / 函数的选项
 * @returns The sidebar structure helper / 侧边栏结构 helper
 */
export const createSidebarStructureHelper = <
  Item extends { text: string } = SidebarStructureItem,
>({
  themeData,
  getScopes,
  childrenKey = 'children',
  prefixKey = 'prefix',
  sorter,
  pageInfoGetter,
  dirInfoGetter,
}: SidebarStructureHelperOptions<Item>): SidebarStructureHelper<Item> => {
  const scopes = (
    getScopes
      ? getScopes(themeData)
      : getSidebarStructureScopes({ themeData, childrenKey, prefixKey })
  ).map((scope) => normalizeScope(scope))

  const options: SidebarStructureDataOptions<Item> = {
    scopes,
    childrenKey,
    sorter,
    pageInfoGetter,
    dirInfoGetter,
  }

  return {
    scopes,

    getData: (app) => getSidebarStructureData(app, options),

    prepare: async (app): Promise<void> => {
      await prepareSidebarData(app, options)
    },

    watch: (app, watchers): void => {
      // the generated module must always exist, but a watcher is only needed
      // when some sidebar is generated from the file structure
      if (scopes.length > 0) watchSidebarData(app, watchers, options)
    },
  }
}
