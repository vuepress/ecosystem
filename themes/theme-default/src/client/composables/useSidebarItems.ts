import { useThemeLocaleData } from '@theme/useThemeData'
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
  SidebarArrayOptions,
  SidebarItemOptions,
  SidebarObjectOptions,
  SidebarOptions,
} from '../../shared/index.js'
import type { SidebarHeaderItem, SidebarItem } from '../typings.js'
import { getAutoLink, isLinkInternal, resolvePrefix } from '../utils/index.js'

export type SidebarItemsRef = ComputedRef<SidebarItem[]>

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

  const sidebarConfig = computed<false | SidebarOptions>(() =>
    frontmatter.value.home
      ? false
      : frontmatter.value.sidebar ?? themeLocale.value.sidebar ?? 'heading',
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
  sidebarConfig: false | SidebarOptions,
  sidebarDepth: number,
  page: PageData,
  path: string,
  routeLocale: string,
): SidebarItem[] => {
  // resolve sidebar items according to the config
  if (sidebarConfig === false) {
    return []
  }

  if (sidebarConfig === 'heading') {
    return resolveSidebarHeadingItem(sidebarDepth, page)
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
export const resolveSidebarHeaderItem = (
  sidebarDepth: number,
  header: PageHeader,
): SidebarHeaderItem => ({
  text: header.title,
  link: header.link,
  children: resolveSidebarHeaderItems(sidebarDepth, header.children),
})

export const resolveSidebarHeaderItems = (
  sidebarDepth: number,
  headers: PageHeader[],
): SidebarHeaderItem[] =>
  sidebarDepth > 0
    ? headers.map((header) =>
        resolveSidebarHeaderItem(sidebarDepth - 1, header),
      )
    : []

/**
 * Resolve current page and its header to sidebar items if the config is `heading`
 */
export const resolveSidebarHeadingItem = (
  sidebarDepth: number,
  page: PageData,
): SidebarItem[] => [
  {
    text: page.title,
    children: resolveSidebarHeaderItems(sidebarDepth, page.headers),
  },
]

/**
 * Resolve sidebar items if the config is an array
 */
export const resolveArraySidebarItems = (
  sidebarConfig: SidebarArrayOptions,
  sidebarDepth: number,
  page: PageData,
  path: string,
  prefix = '',
): SidebarItem[] => {
  const handleChildItem = (
    item: SidebarItemOptions,
    pathPrefix: string,
  ): SidebarItem => {
    const childItem: SidebarItemOptions = isString(item)
      ? getAutoLink(resolvePrefix(pathPrefix, item))
      : isString(item.link)
        ? {
            ...item,
            link: isLinkInternal(item.link)
              ? getAutoLink(resolvePrefix(pathPrefix, item.link)).link
              : item.link,
          }
        : item

    if ('children' in childItem) {
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
        children: resolveSidebarHeaderItems(sidebarDepth, headers),
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
  sidebarConfig: SidebarObjectOptions,
  sidebarDepth: number,
  page: PageData,
  path: string,
): SidebarItem[] => {
  const sidebarRoutes = keys(sidebarConfig).sort((x, y) => y.length - x.length)

  // Find matching config
  for (const base of sidebarRoutes)
    if (startsWith(decodeURI(path), base)) {
      const matched = sidebarConfig[base]

      return matched
        ? matched === 'heading'
          ? resolveSidebarHeadingItem(sidebarDepth, page)
          : resolveArraySidebarItems(matched, sidebarDepth, page, path, base)
        : []
    }

  console.warn(`${decodeURI(path)} is missing sidebar config.`)

  return []
}
