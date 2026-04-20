import { isLinkRelative, keys, startsWith } from '@vuepress/helper/client'
import type { ComputedRef, InjectionKey } from 'vue'
import { computed, inject, provide } from 'vue'
import type { PageData, PageHeader } from 'vuepress/client'
import { useRoutePath } from 'vuepress/client'
import { isPlainObject, isString } from 'vuepress/shared'

import { resolveAutoLink } from '@theme/resolveAutoLink'
import { resolvePrefix } from '@theme/resolvePrefix'
import { useData } from '@theme/useData'
import { useHeaders } from '@theme/useHeaders'

import type {
  DefaultThemeHomePageFrontmatter,
  DefaultThemeNormalPageFrontmatter,
  SidebarArrayOptions,
  SidebarItemOptions,
  SidebarObjectOptions,
  SidebarOptions,
} from '../../shared/index.js'
import type { SidebarHeaderItem, SidebarItem } from '../typings.js'

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
    item: SidebarItemOptions,
    pathPrefix: string,
  ): SidebarItem => {
    const childItem: SidebarItemOptions = isString(item)
      ? resolveAutoLink(resolvePrefix(pathPrefix, item))
      : isString(item.link)
        ? {
            ...item,
            link: isLinkRelative(item.link)
              ? resolveAutoLink(resolvePrefix(pathPrefix, item.link)).link
              : item.link,
          }
        : item

    if ('children' in childItem) {
      return {
        ...childItem,
        children: childItem.children.map((child) =>
          handleChildItem(child, resolvePrefix(pathPrefix, childItem.prefix)),
        ),
      }
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

  if (Array.isArray(sidebarConfig))
    return resolveArraySidebarItems(sidebarConfig, headers, path, routeLocale)

  if (isPlainObject(sidebarConfig))
    return resolveMultiSidebarItems(sidebarConfig, page, headers, path)

  return []
}

/** Create sidebar items ref and provide as global computed in setup */
export const setupSidebarItems = (): void => {
  const { frontmatter, page, routeLocale, themeLocale } = useData<
    DefaultThemeHomePageFrontmatter | DefaultThemeNormalPageFrontmatter
  >()
  const headers = useHeaders()
  const routePath = useRoutePath()

  const sidebarConfig = computed<SidebarOptions | false>(
    () =>
      !frontmatter.value.home &&
      ((frontmatter.value as DefaultThemeNormalPageFrontmatter).sidebar ??
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
