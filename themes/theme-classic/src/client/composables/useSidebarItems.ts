import { isLinkRelative, keys, startsWith } from '@vuepress/helper/client'
import { getSidebarStructure } from '@vuepress/theme-helper/client'
import type { SidebarStructureItem } from '@vuepress/theme-helper/client'
import type { ComputedRef, InjectionKey } from 'vue'
import { computed, inject, provide } from 'vue'
import type { PageData, PageHeader } from 'vuepress/client'
import { useRoutePath } from 'vuepress/client'
import { isPlainObject, isString } from 'vuepress/shared'

import { resolveAutoLink } from '@theme/resolveAutoLink'
import { resolveLinkItem } from '@theme/resolveLinkItem'
import { resolvePrefix } from '@theme/resolvePrefix'
import { useData } from '@theme/useData'
import { useHeaders } from '@theme/useHeaders'

import type {
  ClassicThemeHomePageFrontmatter,
  ClassicThemeNormalPageFrontmatter,
  SidebarArrayOptions,
  SidebarItemOptions,
  SidebarObjectOptions,
  SidebarOptions,
  SidebarStructureOptions,
} from '../../shared/index.js'
import type {
  SidebarGroupItem,
  SidebarHeaderItem,
  SidebarItem,
  SidebarLinkItem,
} from '../typings.js'

/**
 * Util to transform page header to sidebar item
 *
 * @param header Page header
 * @returns Sidebar item from header
 */
export const resolveSidebarPageHeader = (
  header: PageHeader,
): SidebarHeaderItem => ({
  text: header.title,
  link: header.link,
  // oxlint-disable-next-line no-use-before-define
  children: resolveSidebarPageHeaders(header.children),
})

/**
 * Get sidebar header items from page headers
 *
 * @param headers Page headers
 * @returns Sidebar header items
 */
export const resolveSidebarPageHeaders = (
  headers?: PageHeader[],
): SidebarHeaderItem[] =>
  headers ? headers.map((header) => resolveSidebarPageHeader(header)) : []

/**
 * Resolve current page and its header to sidebar items if the config is
 * `heading`
 *
 * @param page Current page data
 * @param headers Current page headers
 * @returns Sidebar items
 */
export const resolveSidebarHeadingItem = (
  page: PageData,
  headers: PageHeader[],
): SidebarItem[] => [
  {
    text: page.title,
    children: resolveSidebarPageHeaders(headers),
  },
]

/**
 * Convert the sidebar structure items to the sidebar items of the classic theme
 *
 * When an item points to the current page and has no children, the headers of
 * the current page are used as its children.
 *
 * 将侧边栏结构条目转换为经典主题的侧边栏条目
 *
 * 当条目指向当前页面且没有子项时，当前页面的标题会作为它的子项。
 *
 * @param items - The sidebar structure items / 侧边栏结构条目
 * @param path - Current page path / 当前页面路径
 * @param headers - Current page headers / 当前页面的标题列表
 * @returns The resolved sidebar items / 解析后的侧边栏条目
 */
const resolveStructureItems = (
  items: SidebarStructureItem[],
  path: string,
  headers: PageHeader[],
): SidebarItem[] =>
  items.map((item) => {
    const children = item.children
      ? resolveStructureItems(item.children, path, headers)
      : []

    // use the headers of the current page as children when the item points to
    // the current page and has no children
    const itemChildren =
      children.length === 0 && item.link === path
        ? resolveSidebarPageHeaders(
            headers[0]?.level === 1 ? headers[0].children : headers,
          )
        : children

    if (itemChildren.length > 0 || !item.link) {
      return {
        text: item.text,
        ...(item.link ? { link: item.link } : {}),
        collapsible: item.collapsible !== false,
        children: itemChildren,
      }
    }

    return { text: item.text, link: item.link }
  })

/**
 * Get the sidebar items generated from the file structure of a route scope
 *
 * 获取根据路由范围的文件结构生成的侧边栏条目
 *
 * @param scope - The route scope / 路由范围
 * @param path - Current page path / 当前页面路径
 * @param headers - Current page headers / 当前页面的标题列表
 * @returns The resolved sidebar items / 解析后的侧边栏条目
 */
const resolveStructureSidebarItems = (
  scope: string,
  path: string,
  headers: PageHeader[],
): SidebarItem[] =>
  resolveStructureItems(getSidebarStructure(scope), path, headers)

/**
 * Resolve sidebar items if the config is an array
 *
 * @param sidebarConfig Sidebar config array
 * @param headers Current page headers
 * @param path Current page path
 * @param prefix Path prefix
 * @returns Resolved sidebar items
 */
export const resolveArraySidebarItems = (
  sidebarConfig: SidebarArrayOptions,
  headers: PageHeader[],
  path: string,
  prefix = '',
): SidebarItem[] => {
  const handleChildItem = (
    item: SidebarItemOptions | SidebarStructureOptions,
    pathPrefix: string,
  ): SidebarItem => {
    if (isString(item)) return resolveAutoLink(resolvePrefix(pathPrefix, item))

    if ('children' in item && item.children === 'structure') {
      const { children: _children, link: groupLink, ...group } = item

      const resolvedGroup = isString(groupLink)
        ? isLinkRelative(groupLink)
          ? resolveLinkItem(
              { ...group, link: groupLink },
              resolvePrefix(pathPrefix, groupLink),
            )
          : { ...group, link: groupLink }
        : group

      return {
        ...resolvedGroup,
        collapsible: item.collapsible !== false,
        children: resolveStructureSidebarItems(
          resolvePrefix(pathPrefix, item.prefix ?? ''),
          path,
          headers,
        ),
      }
    }

    if ('children' in item) {
      const groupItem = item as unknown as SidebarGroupItem
      const { link: groupLink } = groupItem

      const resolvedGroup =
        isString(groupLink) && isLinkRelative(groupLink)
          ? resolveLinkItem(
              { ...groupItem, link: groupLink },
              resolvePrefix(pathPrefix, groupLink),
            )
          : groupItem

      return {
        ...resolvedGroup,
        text: groupItem.text,
        children: groupItem.children.map(
          (child) =>
            handleChildItem(
              child,
              resolvePrefix(pathPrefix, groupItem.prefix),
            ) as SidebarHeaderItem | SidebarItem,
        ),
      }
    }

    let childItem: SidebarLinkItem

    if (isString(item.link)) {
      childItem = isLinkRelative(item.link)
        ? resolveLinkItem(item, resolvePrefix(pathPrefix, item.link))
        : { ...item, text: item.text || item.link }
    } else {
      childItem = item as SidebarLinkItem
    }

    // if the sidebar item is current page and children is not set
    // use headers of current page as children
    if (childItem.link === path) {
      // skip h1 header
      const currentHeaders =
        headers[0]?.level === 1 ? headers[0].children : headers

      return {
        ...childItem,
        children: resolveSidebarPageHeaders(currentHeaders),
      }
    }

    return childItem
  }

  return sidebarConfig.map((item) => handleChildItem(item, prefix))
}

/**
 * Resolve sidebar items if the config is a key -> value (path-prefix -> array)
 * object
 *
 * @param sidebarConfig Sidebar config object
 * @param page Current page data
 * @param headers Current page headers
 * @param path Current page path
 * @returns Resolved sidebar items
 */
export const resolveMultiSidebarItems = (
  sidebarConfig: SidebarObjectOptions,
  page: PageData,
  headers: PageHeader[],
  path: string,
): SidebarItem[] => {
  const sidebarRoutes = keys(sidebarConfig).sort((a, b) => b.length - a.length)

  // Find matching config
  for (const base of sidebarRoutes) {
    if (startsWith(decodeURI(path), base)) {
      const matched = sidebarConfig[base]

      return matched === false
        ? []
        : matched === 'heading'
          ? resolveSidebarHeadingItem(page, headers)
          : matched === 'structure'
            ? resolveStructureSidebarItems(base, path, headers)
            : resolveArraySidebarItems(matched, headers, path, base)
    }
  }

  // oxlint-disable-next-line no-console
  console.warn(`${decodeURI(path)} is missing sidebar config.`)

  return []
}

export type SidebarItemsRef = ComputedRef<SidebarItem[]>

export const sidebarItemsSymbol: InjectionKey<SidebarItemsRef> =
  Symbol('sidebarItems')

/**
 * Inject sidebar items global computed
 *
 * @returns Sidebar items global computed
 */
export const useSidebarItems = (): SidebarItemsRef => {
  const sidebarItems = inject(sidebarItemsSymbol)
  if (!sidebarItems)
    throw new Error('useSidebarItems() is called without provider.')

  return sidebarItems
}

/**
 * Resolve sidebar items global computed
 *
 * It should only be resolved and provided once
 *
 * @param sidebarConfig Sidebar config
 * @param page Current page data
 * @param path Current page path
 * @param routeLocale Current route locale
 * @param headers Current page headers
 * @returns Resolved sidebar items
 */

export const resolveSidebarItems = (
  sidebarConfig: SidebarOptions | false,
  page: PageData,
  path: string,
  routeLocale: string,
  headers: PageHeader[],
): SidebarItem[] => {
  // resolve sidebar items according to the config
  if (sidebarConfig === false) return []

  if (sidebarConfig === 'heading')
    return resolveSidebarHeadingItem(page, headers)

  if (sidebarConfig === 'structure')
    return resolveStructureSidebarItems(routeLocale, path, headers)

  if (Array.isArray(sidebarConfig))
    return resolveArraySidebarItems(sidebarConfig, headers, path, routeLocale)

  if (isPlainObject(sidebarConfig))
    return resolveMultiSidebarItems(sidebarConfig, page, headers, path)

  return []
}

/** Create sidebar items ref and provide as global computed in setup */
export const setupSidebarItems = (): void => {
  const { frontmatter, page, routeLocale, themeLocale } = useData<
    ClassicThemeHomePageFrontmatter | ClassicThemeNormalPageFrontmatter
  >()
  const headers = useHeaders()
  const routePath = useRoutePath()

  const sidebarConfig = computed<SidebarOptions | false>(
    () =>
      !frontmatter.value.home &&
      ((frontmatter.value as ClassicThemeNormalPageFrontmatter).sidebar ??
        themeLocale.value.sidebar ??
        'heading'),
  )

  const sidebarItems = computed(() =>
    resolveSidebarItems(
      sidebarConfig.value,
      page.value,
      routePath.value,
      routeLocale.value,
      headers.value,
    ),
  )
  provide(sidebarItemsSymbol, sidebarItems)
}
