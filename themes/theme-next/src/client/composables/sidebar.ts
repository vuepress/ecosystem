import { sidebarData as structureSidebarDataRaw } from '@internal/sidebar'
import { useData } from '@theme/data'
import { getNavLink, normalizeLink, normalizePrefix } from '@theme/getNavLink'
import { isActive } from '@theme/isActive'
import {
  ensureLeadingSlash,
  isArray,
  isPlainObject,
  isString,
} from '@vuepress/helper/client'
import { useMediaQuery } from '@vueuse/core'
import type { ComputedRef, InjectionKey, Ref } from 'vue'
import {
  computed,
  inject,
  onMounted,
  provide,
  ref,
  watch,
  watchEffect,
  watchPostEffect,
} from 'vue'
import { resolveRouteFullPath, useRoute, useRouteLocale } from 'vuepress/client'
import type {
  ResolvedSidebarItem,
  Sidebar,
  SidebarItem,
} from '../../shared/index.js'

export type StructureSidebarDataRef = Ref<Record<string, ResolvedSidebarItem[]>>

const structureSidebarData: StructureSidebarDataRef = ref(
  structureSidebarDataRaw,
)

const sidebarSymbol: InjectionKey<Ref<ResolvedSidebarItem[]>> = Symbol(
  __VUEPRESS_DEV__ ? 'sidebar' : '',
)

export const setupSidebarData = (): void => {
  const { frontmatter, page, themeLocale } = useData()
  const routeLocale = useRouteLocale()

  const hasSidebar = computed(
    () =>
      frontmatter.value.sidebar !== false &&
      frontmatter.value.layout !== 'home' &&
      frontmatter.value.pageLayout !== 'home',
  )

  const sidebar = computed(() =>
    hasSidebar.value
      ? // eslint-disable-next-line @typescript-eslint/no-use-before-define
        getSidebar(
          themeLocale.value.sidebar,
          page.value.path,
          routeLocale.value,
        )
      : [],
  )

  provide(sidebarSymbol, sidebar)
}

export const useSidebarData = (): Ref<ResolvedSidebarItem[]> => {
  const sidebarData = inject(sidebarSymbol)
  if (!sidebarData) {
    throw new Error('useSidebarData() is called without provider.')
  }
  return sidebarData
}

/**
 * Check if the given sidebar item contains any active link.
 */
export const hasActiveLink = (
  path: string,
  items: ResolvedSidebarItem | ResolvedSidebarItem[],
): boolean => {
  if (Array.isArray(items)) {
    return items.some((item) => hasActiveLink(path, item))
  }

  return isActive(
    path,
    items.link ? resolveRouteFullPath(items.link) : undefined,
  )
    ? true
    : items.items
      ? hasActiveLink(path, items.items)
      : false
}

if (__VUEPRESS_DEV__ && (import.meta.webpackHot || import.meta.hot)) {
  __VUE_HMR_RUNTIME__.updateSidebarData = (
    data: Record<string, ResolvedSidebarItem[]>,
  ) => {
    structureSidebarData.value = data
  }
}

export interface SidebarLink {
  text: string
  link: string
  docFooterText?: string
}

export interface SidebarControl {
  collapsed: Ref<boolean>
  collapsible: ComputedRef<boolean>
  isLink: ComputedRef<boolean>
  isActiveLink: Ref<boolean>
  hasActiveLink: ComputedRef<boolean>
  hasChildren: ComputedRef<boolean>
  toggle: () => void
}

export interface UseSidebarReturn {
  isOpen: Ref<boolean>
  sidebar: Ref<ResolvedSidebarItem[]>
  sidebarGroups: Ref<ResolvedSidebarItem[]>
  hasSidebar: ComputedRef<boolean>
  hasAside: ComputedRef<boolean>
  leftAside: ComputedRef<boolean>
  isSidebarEnabled: ComputedRef<boolean>
  open: () => void
  close: () => void
  toggle: () => void
}

const containsActiveLink = hasActiveLink

export const useSidebar = (): UseSidebarReturn => {
  const { themeLocale, frontmatter } = useData()
  const is960 = useMediaQuery('(min-width: 960px)')

  const isOpen = ref(false)

  const sidebar = useSidebarData()

  const hasSidebar = computed(
    () =>
      frontmatter.value.sidebar !== false &&
      sidebar.value.length > 0 &&
      frontmatter.value.pageLayout !== 'home',
  )

  const hasAside = computed(() => {
    if (frontmatter.value.pageLayout === 'home' || frontmatter.value.home)
      return false
    if (frontmatter.value.aside != null) return !!frontmatter.value.aside
    return themeLocale.value.aside !== false
  })

  const leftAside = computed(() => {
    if (hasAside.value)
      return frontmatter.value.aside == null
        ? themeLocale.value.aside === 'left'
        : frontmatter.value.aside === 'left'
    return false
  })

  const isSidebarEnabled = computed(() => hasSidebar.value && is960.value)

  const sidebarGroups = computed(() =>
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    hasSidebar.value ? getSidebarGroups(sidebar.value) : [],
  )

  const open = (): void => {
    isOpen.value = true
  }

  const close = (): void => {
    isOpen.value = false
  }

  const toggle = (): void => {
    if (isOpen.value) {
      close()
    } else {
      open()
    }
  }

  return {
    isOpen,
    sidebar,
    sidebarGroups,
    hasSidebar,
    hasAside,
    leftAside,
    isSidebarEnabled,
    open,
    close,
    toggle,
  }
}

export const useSidebarControl = (
  item: ComputedRef<ResolvedSidebarItem>,
): SidebarControl => {
  const { page } = useData()
  const route = useRoute()

  const collapsed = ref(false)

  const collapsible = computed(() => item.value.collapsed != null)

  const isLink = computed(() => !!item.value.link)

  const isActiveLink = ref(false)
  const updateIsActiveLink = (): void => {
    isActiveLink.value = isActive(
      page.value.path,
      item.value.link ? resolveRouteFullPath(item.value.link) : undefined,
    )
  }

  watch([page, item, () => route.hash], updateIsActiveLink)
  onMounted(updateIsActiveLink)

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const hasActiveLink = computed(() => {
    if (isActiveLink.value) {
      return true
    }

    return item.value.items
      ? containsActiveLink(page.value.path, item.value.items)
      : false
  })

  const hasChildren = computed(() => !!item.value.items?.length)

  watchEffect(() => {
    collapsed.value = !!(collapsible.value && item.value.collapsed)
  })

  watchPostEffect(() => {
    if (isActiveLink.value || hasActiveLink.value) collapsed.value = false
  })

  const toggle = (): void => {
    if (collapsible.value) {
      collapsed.value = !collapsed.value
    }
  }

  return {
    collapsed,
    collapsible,
    isLink,
    isActiveLink,
    hasActiveLink,
    hasChildren,
    toggle,
  }
}

const resolveSidebarItems = (
  sidebarItems: (SidebarItem | string)[],
  _prefix = '',
): ResolvedSidebarItem[] => {
  const resolved: ResolvedSidebarItem[] = []
  sidebarItems.forEach((item) => {
    if (isString(item)) {
      resolved.push(getNavLink(normalizeLink(_prefix, item)))
    } else {
      const { link, items, prefix, ...args } = item
      const navLink = { ...args } as ResolvedSidebarItem
      if (link) {
        navLink.link = normalizeLink(_prefix, link)
      }
      const nextPrefix = normalizePrefix(_prefix, prefix)
      if (items === 'structure') {
        navLink.items = structureSidebarData.value[nextPrefix]
      } else {
        navLink.items = items?.length
          ? resolveSidebarItems(items, nextPrefix)
          : undefined
      }
      resolved.push(navLink)
    }
  })
  return resolved
}

/**
 * Get the `Sidebar` from sidebar option. This method will ensure to get correct
 * sidebar config from `MultiSideBarConfig` with various path combinations such
 * as matching `guide/` and `/guide/`. If no matching config was found, it will
 * return empty array.
 */
export const getSidebar = (
  _sidebar: Sidebar | undefined,
  routePath: string,
  routeLocal: string,
): ResolvedSidebarItem[] => {
  if (_sidebar === 'structure') {
    return resolveSidebarItems(structureSidebarData.value[routeLocal])
  }
  if (isArray(_sidebar)) {
    return resolveSidebarItems(_sidebar, routeLocal)
  }
  if (isPlainObject(_sidebar)) {
    const dir =
      Object.keys(_sidebar)
        .sort((a, b) => b.split('/').length - a.split('/').length)
        // eslint-disable-next-line @typescript-eslint/no-shadow
        .find((dir) =>
          // make sure the multi sidebar key starts with slash too
          routePath.startsWith(ensureLeadingSlash(dir)),
        ) || ''
    const sidebar = dir ? _sidebar[dir] : undefined

    if (sidebar === 'structure') {
      return resolveSidebarItems(
        dir ? structureSidebarData.value[dir] : [],
        routeLocal,
      )
    }
    if (isArray(sidebar)) {
      return resolveSidebarItems(sidebar, dir)
    }
    if (isPlainObject(sidebar)) {
      const prefix = normalizePrefix(dir, sidebar.prefix)
      return resolveSidebarItems(
        sidebar.items === 'structure'
          ? structureSidebarData.value[prefix]
          : sidebar.items,
        prefix,
      )
    }
  }
  return []
}

/**
 * Get or generate sidebar group from the given sidebar items.
 */
export const getSidebarGroups = (
  sidebar: ResolvedSidebarItem[],
): ResolvedSidebarItem[] => {
  const groups: ResolvedSidebarItem[] = []

  let lastGroupIndex = 0

  for (const item of sidebar) {
    if (item.items) {
      lastGroupIndex = groups.push(item)
      continue
    }

    if (!groups[lastGroupIndex]) {
      groups.push({ items: [] })
    }

    groups[lastGroupIndex].items!.push(item)
  }

  return groups
}

export const getFlatSideBarLinks = (
  sidebar: ResolvedSidebarItem[],
): SidebarLink[] => {
  const links: SidebarLink[] = []

  const recursivelyExtractLinks = (items: ResolvedSidebarItem[]): void => {
    for (const item of items) {
      if (item.text && item.link) {
        links.push({
          text: item.text,
          link: item.link,
          docFooterText: item.docFooterText,
        })
      }

      if (item.items) {
        recursivelyExtractLinks(item.items)
      }
    }
  }

  recursivelyExtractLinks(sidebar)

  return links
}
