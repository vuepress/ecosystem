import { keys, startsWith } from '@vuepress/helper/client'
import { computed, inject, provide } from 'vue'
import type { ComputedRef, InjectionKey } from 'vue'
import {
  usePageData,
  usePageFrontmatter,
  useRoute,
  useRouteLocale,
} from 'vuepress/client'
import type { PageData, PageHeader } from 'vuepress/client'
import { isPlainObject, isString } from 'vuepress/shared'
import type {
  DefaultThemeNormalPageFrontmatter,
  ResolvedSidebarItem,
  SidebarConfig,
  SidebarConfigArray,
  SidebarConfigObject,
  SidebarItem,
} from '../../shared/index.js'
import { getAutoLink, isLinkInternal, resolvePrefix } from '../utils/index.js'
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
  const routeLocale = useRouteLocale()

  const sidebarConfig = computed(() =>
    frontmatter.value.home
      ? false
      : frontmatter.value.sidebar ?? themeLocale.value.sidebar ?? 'auto',
  )

  const sidebarDepth = computed(
    () => frontmatter.value.sidebarDepth ?? themeLocale.value.sidebarDepth ?? 2,
  )

  const sidebarItems = computed(() =>
    resolveSidebarItems(
      sidebarConfig.value,
      sidebarDepth.value,
      page.value,
      route.path,
      routeLocale.value,
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
  sidebarConfig: SidebarConfig | 'auto' | false,
  sidebarDepth: number,
  page: PageData,
  path: string,
  routeLocale: string,
): ResolvedSidebarItem[] => {
  // resolve sidebar items according to the config
  if (sidebarConfig === false) {
    return []
  }

  if (sidebarConfig === 'auto') {
    return resolveAutoSidebarItems(sidebarDepth, page)
  }

  if (Array.isArray(sidebarConfig)) {
    return resolveArraySidebarItems(
      sidebarConfig,
      sidebarDepth,
      page,
      path,
      routeLocale,
    )
  }

  if (isPlainObject(sidebarConfig)) {
    return resolveMultiSidebarItems(sidebarConfig, sidebarDepth, page, path)
  }

  return []
}

/**
 * Util to transform page header to sidebar item
 */
export const headerToSidebarItem = (
  sidebarDepth: number,
  header: PageHeader,
): ResolvedSidebarItem => ({
  text: header.title,
  link: header.link,
  children: headersToSidebarItemChildren(sidebarDepth, header.children),
})

export const headersToSidebarItemChildren = (
  sidebarDepth: number,
  headers: PageHeader[],
): ResolvedSidebarItem[] =>
  sidebarDepth > 0
    ? headers.map((header) => headerToSidebarItem(sidebarDepth - 1, header))
    : []

/**
 * Resolve sidebar items if the config is `auto`
 */
export const resolveAutoSidebarItems = (
  sidebarDepth: number,
  page: PageData,
): ResolvedSidebarItem[] => [
  {
    text: page.title,
    children: headersToSidebarItemChildren(sidebarDepth, page.headers),
  },
]

/**
 * Resolve sidebar items if the config is an array
 */
export const resolveArraySidebarItems = (
  sidebarConfig: SidebarConfigArray,
  sidebarDepth: number,
  page: PageData,
  path: string,
  prefix = '',
): ResolvedSidebarItem[] => {
  const handleChildItem = (
    item: ResolvedSidebarItem | SidebarItem | string,
    pathPrefix: string,
  ): ResolvedSidebarItem => {
    const childItem: ResolvedSidebarItem = isString(item)
      ? getAutoLink(resolvePrefix(pathPrefix, item))
      : isString(item.link)
        ? {
            ...item,
            link: isLinkInternal(item.link)
              ? getAutoLink(resolvePrefix(pathPrefix, item.link)).link
              : item.link,
          }
        : item

    if (childItem.children) {
      return {
        ...childItem,
        children: childItem.children.map((item) =>
          handleChildItem(item, resolvePrefix(pathPrefix, childItem.prefix)),
        ),
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
        children: headersToSidebarItemChildren(sidebarDepth, headers),
      }
    }

    return childItem
  }

  return sidebarConfig.map((item) => handleChildItem(item, prefix))
}

/**
 * Resolve sidebar items if the config is a key -> value (path-prefix -> array) object
 */
export const resolveMultiSidebarItems = (
  sidebarConfig: SidebarConfigObject,
  sidebarDepth: number,
  page: PageData,
  path: string,
): ResolvedSidebarItem[] => {
  const sidebarRoutes = keys(sidebarConfig).sort((x, y) => y.length - x.length)

  // Find matching config
  for (const base of sidebarRoutes)
    if (startsWith(decodeURI(path), base)) {
      const matched = sidebarConfig[base]

      return matched
        ? matched === 'heading'
          ? resolveAutoSidebarItems(sidebarDepth, page)
          : resolveArraySidebarItems(matched, sidebarDepth, page, path, base)
        : []
    }

  console.warn(`${decodeURI(path)} is missing sidebar config.`)

  return []
}
