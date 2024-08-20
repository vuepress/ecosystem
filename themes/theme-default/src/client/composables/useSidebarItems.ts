import { useThemeLocaleData } from '@theme/useThemeData'
import type { MenuItem } from '@vuepress/helper/client'
import { getHeaders, keys, startsWith } from '@vuepress/helper/client'
import type { ComputedRef, InjectionKey, Ref } from 'vue'
import { computed, inject, onMounted, provide, ref, watch } from 'vue'
import type { PageData } from 'vuepress/client'
import {
  usePageData,
  usePageFrontmatter,
  useRoute,
  useRouteLocale,
  useRouter,
} from 'vuepress/client'
import { isPlainObject, isString } from 'vuepress/shared'
import type {
  DefaultThemeHomePageFrontmatter,
  DefaultThemeNormalPageFrontmatter,
  SidebarArrayOptions,
  SidebarItemOptions,
  SidebarObjectOptions,
  SidebarOptions,
} from '../../shared/index.js'
import type { SidebarHeaderItem, SidebarItem } from '../typings.js'
import { getAutoLink, isLinkInternal, resolvePrefix } from '../utils/index.js'

export type HeadersRef = Ref<MenuItem[]>

export const headersRef: HeadersRef = ref([])

export const setupHeaders = (): void => {
  const router = useRouter()
  const themeLocale = useThemeLocaleData()
  const frontmatter = usePageFrontmatter<DefaultThemeNormalPageFrontmatter>()
  const levels = computed(
    () => frontmatter.value.sidebarDepth ?? themeLocale.value.sidebarDepth ?? 2,
  )

  router.beforeEach((to, from) => {
    if (to.path !== from.path) {
      headersRef.value = []
    }
  })

  const updateHeaders = (): void => {
    if (levels.value <= 0) {
      headersRef.value = []
      return
    }

    headersRef.value = getHeaders({
      levels: [2, levels.value + 1],
      ignore: ['.vp-badge'],
    })
  }

  watch(levels, updateHeaders)

  onMounted(updateHeaders)
}

export const useHeaders = (): HeadersRef => headersRef

/**
 * Util to transform page header to sidebar item
 */
export const resolveSidebarHeaderItem = (
  header: MenuItem,
): SidebarHeaderItem => ({
  text: header.title,
  link: header.link,
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  children: resolveSidebarHeaderItems(header.children),
})

export const resolveSidebarHeaderItems = (
  headers?: MenuItem[],
): SidebarHeaderItem[] =>
  headers ? headers.map((header) => resolveSidebarHeaderItem(header)) : []

/**
 * Resolve current page and its header to sidebar items if the config is `heading`
 */
export const resolveSidebarHeadingItem = (
  page: PageData,
  headers: MenuItem[],
): SidebarItem[] => [
  {
    text: page.title,
    children: resolveSidebarHeaderItems(headers),
  },
]

/**
 * Resolve sidebar items if the config is an array
 */
export const resolveArraySidebarItems = (
  sidebarConfig: SidebarArrayOptions,
  headers: MenuItem[],
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
        children: resolveSidebarHeaderItems(currentHeaders),
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
  page: PageData,
  headers: MenuItem[],
  path: string,
): SidebarItem[] => {
  const sidebarRoutes = keys(sidebarConfig).sort((x, y) => y.length - x.length)

  // Find matching config
  for (const base of sidebarRoutes)
    if (startsWith(decodeURI(path), base)) {
      const matched = sidebarConfig[base]

      return matched
        ? matched === 'heading'
          ? resolveSidebarHeadingItem(page, headers)
          : resolveArraySidebarItems(matched, headers, path, base)
        : []
    }

  // eslint-disable-next-line no-console
  console.warn(`${decodeURI(path)} is missing sidebar config.`)

  return []
}

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
 * Resolve sidebar items global computed
 *
 * It should only be resolved and provided once
 */
export const resolveSidebarItems = (
  sidebarConfig: SidebarOptions | false,
  page: PageData,
  path: string,
  routeLocale: string,
  headers: MenuItem[],
): SidebarItem[] => {
  // resolve sidebar items according to the config
  if (sidebarConfig === false) {
    return []
  }

  if (sidebarConfig === 'heading') {
    return resolveSidebarHeadingItem(page, headers)
  }

  if (Array.isArray(sidebarConfig)) {
    return resolveArraySidebarItems(sidebarConfig, headers, path, routeLocale)
  }

  if (isPlainObject(sidebarConfig)) {
    return resolveMultiSidebarItems(sidebarConfig, page, headers, path)
  }

  return []
}

/**
 * Create sidebar items ref and provide as global computed in setup
 */
export const setupSidebarItems = (): void => {
  const themeLocale = useThemeLocaleData()
  const frontmatter = usePageFrontmatter<
    DefaultThemeHomePageFrontmatter | DefaultThemeNormalPageFrontmatter
  >()
  const page = usePageData()
  const route = useRoute()
  const routeLocale = useRouteLocale()
  const headers = useHeaders()

  const sidebarConfig = computed<SidebarOptions | false>(() =>
    frontmatter.value.home
      ? false
      : ((frontmatter.value as DefaultThemeNormalPageFrontmatter).sidebar ??
        themeLocale.value.sidebar ??
        'heading'),
  )

  const sidebarItems = computed(() =>
    resolveSidebarItems(
      sidebarConfig.value,
      page.value,
      route.path,
      routeLocale.value,
      headers.value,
    ),
  )
  provide(sidebarItemsSymbol, sidebarItems)
}
