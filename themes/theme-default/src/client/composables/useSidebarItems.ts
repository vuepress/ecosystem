import { computed, inject, provide } from 'vue'
import type { ComputedRef, InjectionKey } from 'vue'
import { usePageData, usePageFrontmatter, useRoute } from 'vuepress/client'
import type { PageData, PageHeader } from 'vuepress/client'
import { isPlainObject, isString, resolveLocalePath } from 'vuepress/shared'
import type {
  DefaultThemeData,
  DefaultThemeNormalPageFrontmatter,
  ResolvedSidebarItem,
  SidebarConfigArray,
  SidebarConfigObject,
  SidebarItem,
} from '../../shared/index.js'
import { getNavLink } from '../utils/index.js'
import { useThemeLocaleData } from './useThemeData.js'

export type SidebarItemsRef = ComputedRef<ResolvedSidebarItem[]>

export const sidebarItemsSymbol: InjectionKey<SidebarItemsRef> =
  Symbol('sidebarItems')

/**
 * Inject sidebar items global computed
 */
export const useSidebarItems = (): SidebarItemsRef => {
  const sidebarItems = inject(sidebarItemsSymbol)
  if (!sidebarItems) {
    throw new Error('useSidebarItems() is called without provider.')
  }
  return sidebarItems
}

/**
 * Create sidebar items ref and provide as global computed in setup
 */
export const setupSidebarItems = (): void => {
  const themeLocale = useThemeLocaleData()
  const frontmatter = usePageFrontmatter<DefaultThemeNormalPageFrontmatter>()
  const page = usePageData()
  const route = useRoute()

  const sidebarItems = computed(() =>
    resolveSidebarItems(
      frontmatter.value,
      themeLocale.value,
      page.value,
      route.path,
    ),
  )
  provide(sidebarItemsSymbol, sidebarItems)
}

/**
 * Resolve sidebar items global computed
 *
 * It should only be resolved and provided once
 */
export const resolveSidebarItems = (
  frontmatter: DefaultThemeNormalPageFrontmatter,
  themeLocale: DefaultThemeData,
  page: PageData,
  path: string,
): ResolvedSidebarItem[] => {
  // get sidebar config from frontmatter > theme data
  const sidebarConfig = frontmatter.sidebar ?? themeLocale.sidebar ?? 'auto'
  const sidebarDepth = frontmatter.sidebarDepth ?? themeLocale.sidebarDepth ?? 2

  // resolve sidebar items according to the config
  if (frontmatter.home || sidebarConfig === false) {
    return []
  }

  if (sidebarConfig === 'auto') {
    return resolveAutoSidebarItems(page, sidebarDepth)
  }

  if (Array.isArray(sidebarConfig)) {
    return resolveArraySidebarItems(page, path, sidebarConfig, sidebarDepth)
  }

  if (isPlainObject(sidebarConfig)) {
    return resolveMultiSidebarItems(page, path, sidebarConfig, sidebarDepth)
  }

  return []
}

/**
 * Util to transform page header to sidebar item
 */
export const headerToSidebarItem = (
  header: PageHeader,
  sidebarDepth: number,
): ResolvedSidebarItem => ({
  text: header.title,
  link: header.link,
  children: headersToSidebarItemChildren(header.children, sidebarDepth),
})

export const headersToSidebarItemChildren = (
  headers: PageHeader[],
  sidebarDepth: number,
): ResolvedSidebarItem[] =>
  sidebarDepth > 0
    ? headers.map((header) => headerToSidebarItem(header, sidebarDepth - 1))
    : []

/**
 * Resolve sidebar items if the config is `auto`
 */
export const resolveAutoSidebarItems = (
  page: PageData,
  sidebarDepth: number,
): ResolvedSidebarItem[] => {
  return [
    {
      text: page.title,
      children: headersToSidebarItemChildren(page.headers, sidebarDepth),
    },
  ]
}

/**
 * Resolve sidebar items if the config is an array
 */
export const resolveArraySidebarItems = (
  page: PageData,
  path: string,
  sidebarConfig: SidebarConfigArray,
  sidebarDepth: number,
): ResolvedSidebarItem[] => {
  const handleChildItem = (
    item: ResolvedSidebarItem | SidebarItem | string,
  ): ResolvedSidebarItem => {
    let childItem: ResolvedSidebarItem
    if (isString(item)) {
      childItem = getNavLink(item)
    } else {
      childItem = item as ResolvedSidebarItem
    }

    if (childItem.children) {
      return {
        ...childItem,
        children: childItem.children.map((item) => handleChildItem(item)),
      }
    }

    // if the sidebar item is current page and children is not set
    // use headers of current page as children
    if (childItem.link === path) {
      // skip h1 header
      const headers =
        page.headers[0]?.level === 1 ? page.headers[0].children : page.headers
      return {
        ...childItem,
        children: headersToSidebarItemChildren(headers, sidebarDepth),
      }
    }

    return childItem
  }

  return sidebarConfig.map((item) => handleChildItem(item))
}

/**
 * Resolve sidebar items if the config is a key -> value (path-prefix -> array) object
 */
export const resolveMultiSidebarItems = (
  page: PageData,
  path: string,
  sidebarConfig: SidebarConfigObject,
  sidebarDepth: number,
): ResolvedSidebarItem[] => {
  const sidebarPath = resolveLocalePath(sidebarConfig, path)
  const matchedSidebarConfig = sidebarConfig[sidebarPath] ?? []

  if (matchedSidebarConfig === 'heading') {
    return resolveAutoSidebarItems(page, sidebarDepth)
  }
  return resolveArraySidebarItems(
    page,
    path,
    matchedSidebarConfig,
    sidebarDepth,
  )
}
