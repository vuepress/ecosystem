import { ensureEndingSlash, removeLeadingSlash } from '@vuepress/helper'
import type { App } from 'vuepress/core'

import type {
  SidebarInfo,
  SidebarSorter,
  SidebarStructureData,
  SidebarStructureItem,
} from '../shared/index.js'
import { getSidebarInfo } from './getSidebarInfo.js'
import { getSidebarSorter } from './getSidebarSorter.js'

/**
 * Options of `getSidebarStructureData`
 *
 * `getSidebarStructureData` 的选项
 */
export interface SidebarStructureDataOptions {
  /**
   * Route scopes to generate sidebar data for, e.g. `['/', '/guide/']`
   *
   * 生成侧边栏数据的路由范围，例如 `['/', '/guide/']`
   */
  scopes: string[]

  /**
   * Sorter of the sidebar items
   *
   * 侧边栏条目的排序器
   */
  sorter?: SidebarSorter
}

const normalizeScope = (scope: string): string =>
  ensureEndingSlash(scope.startsWith('/') ? scope : `/${scope}`)

const getStructureItem = (info: SidebarInfo): SidebarStructureItem => {
  if (info.type === 'file') {
    const { icon } = info.frontmatter

    return {
      text: info.title,
      link: info.path,
      ...(icon ? { icon } : {}),
    }
  }

  const { collapsible, expanded, icon, link } = info.groupInfo

  return {
    text: info.title,
    ...(link ? { link } : {}),
    ...(icon ? { icon } : {}),
    ...(collapsible == null ? {} : { collapsible }),
    ...(expanded ? { expanded } : {}),
    children: info.children.map(getStructureItem),
  }
}

/**
 * Get the sidebar structure data for route scopes from the file structure
 *
 * The data is keyed by the normalized route scopes, e.g. `/` and `/guide/`.
 *
 * 根据文件结构获取路由范围的侧边栏结构数据
 *
 * 数据以规范化后的路由范围为键，例如 `/` 和 `/guide/`。
 *
 * @param app - VuePress app / VuePress 应用
 * @param options - Options of the function / 函数的选项
 * @returns The sidebar structure data / 侧边栏结构数据
 */
export const getSidebarStructureData = (
  app: App,
  { scopes, sorter }: SidebarStructureDataOptions,
): SidebarStructureData => {
  const sorters = getSidebarSorter(sorter)
  const structureData: SidebarStructureData = {}

  for (const scope of scopes) {
    const normalizedScope = normalizeScope(scope)

    structureData[normalizedScope] = getSidebarInfo({
      pages: app.pages,
      sorters,
      scope: removeLeadingSlash(normalizedScope),
    }).map((info) => getStructureItem(info))
  }

  return structureData
}
