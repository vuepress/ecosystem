import { ensureEndingSlash, removeLeadingSlash } from '@vuepress/helper'
import type { App, Page } from 'vuepress/core'
import type { PageData } from 'vuepress/shared'

import type {
  SidebarDirInfo,
  SidebarFileInfo,
  SidebarInfo,
  SidebarSorter,
  SidebarStructureData,
  SidebarStructureItem,
} from '../shared/index.js'
import { getSidebarInfo } from './getSidebarInfo.js'
import { getSidebarSorter } from './getSidebarSorter.js'

/**
 * Getter of the sidebar item of a page file
 *
 * The `defaults` argument contains the text and the link resolved by the
 * helper, the returned fields override them and the item of the theme is
 * created by merging both. Returning `null` skips the page.
 *
 * 页面文件的侧边栏条目的 getter
 *
 * `defaults` 参数包含 helper 解析出的文本与链接，返回的字段会覆盖它们，主题的条目由两者合并而成。 返回 `null` 会跳过该页面。
 */
export type SidebarPageInfoGetter<Item extends { text: string }> = (
  info: SidebarFileInfo,
  page: Page | undefined,
  defaults: Item,
) => Partial<Item> | null

/**
 * Getter of the sidebar item of a directory group
 *
 * The `readmePage` argument is `null` when the directory has no `README.md`.
 * The children of the group are attached by the helper under `childrenKey`, so
 * the getter does not need to handle them. Returning `null` skips the
 * directory.
 *
 * 目录分组的侧边栏条目的 getter
 *
 * 目录没有 `README.md` 时 `readmePage` 为 `null`。分组的子项由 helper 挂载到 `childrenKey` 下，因此
 * getter 无需处理它们。返回 `null` 会跳过该目录。
 */
export type SidebarDirInfoGetter<Item extends { text: string }> = (
  info: SidebarDirInfo,
  readmePage: Page | null,
  defaults: Item,
) => Partial<Item> | null

/**
 * Options of `getSidebarStructureData`
 *
 * `getSidebarStructureData` 的选项
 */
export interface SidebarStructureDataOptions<
  Item extends { text: string } = SidebarStructureItem,
> {
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
 * Normalize a route scope to start and end with a slash
 *
 * 将路由范围规范化为以斜线开头和结尾
 *
 * @param scope - Route scope / 路由范围
 * @returns The normalized route scope / 规范化后的路由范围
 */
export const normalizeScope = (scope: string): string =>
  ensureEndingSlash(scope.startsWith('/') ? scope : `/${scope}`)

/**
 * Get the sidebar structure data for route scopes from the file structure
 *
 * The data is keyed by the normalized route scopes, e.g. `/` and `/guide/`. The
 * shape of the items is defined by the theme through the getters.
 *
 * 根据文件结构获取路由范围的侧边栏结构数据
 *
 * 数据以规范化后的路由范围为键，例如 `/` 和 `/guide/`。条目的形状由主题通过 getter 定义。
 *
 * @param app - VuePress app / VuePress 应用
 * @param options - Options of the function / 函数的选项
 * @returns The sidebar structure data / 侧边栏结构数据
 */
export const getSidebarStructureData = <
  Item extends { text: string } = SidebarStructureItem,
>(
  app: App,
  options: SidebarStructureDataOptions<Item>,
): SidebarStructureData<Item> => {
  const {
    scopes,
    sorter,
    childrenKey = 'children',
    pageInfoGetter,
    dirInfoGetter,
  } = options
  const sorters = getSidebarSorter(sorter)

  // the page data object is shared between the page and the sidebar info, so
  // the page of an info can be found by its data
  const pageMap = new Map<PageData, Page>(
    app.pages.map((page) => [page.data, page]),
  )
  const getPage = (pageData: PageData | null): Page | undefined =>
    pageData ? pageMap.get(pageData) : undefined

  const getItem = (info: SidebarInfo): Item | null => {
    if (info.type === 'file') {
      const defaults = { text: info.title, link: info.path } as unknown as Item
      let custom: Partial<Item> | null | undefined

      if (pageInfoGetter) {
        custom = pageInfoGetter(info, getPage(info.pageData), defaults)

        if (custom == null) return null
      }

      return { ...defaults, ...custom }
    }

    const { link } = info.groupInfo
    const defaults = {
      text: info.title,
      ...(link ? { link } : {}),
    } as unknown as Item
    let custom: Partial<Item> | null | undefined

    if (dirInfoGetter) {
      custom = dirInfoGetter(info, getPage(info.pageData) ?? null, defaults)

      if (custom == null) return null
    }

    const children = info.children
      .map((child) => getItem(child))
      .filter((child): child is Item => child != null)

    return { ...defaults, ...custom, [childrenKey]: children }
  }

  const structureData: SidebarStructureData<Item> = {}

  for (const scope of scopes) {
    const normalizedScope = normalizeScope(scope)

    structureData[normalizedScope] = getSidebarInfo({
      pages: app.pages,
      sorters,
      scope: removeLeadingSlash(normalizedScope),
    })
      .map((info) => getItem(info))
      .filter((item): item is Item => item != null)
  }

  return structureData
}
