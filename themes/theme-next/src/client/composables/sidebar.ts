import { sidebarData as sidebarDataRaw } from '@internal/sidebar'
import { useMediaQuery } from '@vueuse/core'
import {
  computed,
  onMounted,
  onUnmounted,
  ref,
  watch,
  watchEffect,
  watchPostEffect,
} from 'vue'
import type { ComputedRef, Ref } from 'vue'
import { resolveRoutePath } from 'vuepress/client'
import type { ResolvedSidebarItem } from '../../shared/resolved/sidebar.js'
import { ensureStartingSlash, isActive } from '../utils/index.js'
import { useData } from './data.js'

export type SidebarDataRef = Ref<Record<string, ResolvedSidebarItem[]>>

const sidebarData: SidebarDataRef = ref(sidebarDataRaw)

export const useSidebarData = (): SidebarDataRef => sidebarData

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
  toggle(): void
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

export function useSidebar(): UseSidebarReturn {
  const { theme, page, frontmatter } = useData()
  const is960 = useMediaQuery('(min-width: 960px)')

  const isOpen = ref(false)

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const _sidebar = computed(() => {
    const relativePath = page.value.filePathRelative || ''
    return getSidebar(relativePath)
  })

  const sidebar = ref(_sidebar.value)

  watch(_sidebar, (next, prev) => {
    if (JSON.stringify(next) !== JSON.stringify(prev))
      sidebar.value = _sidebar.value
  })

  const hasSidebar = computed(() => {
    return (
      frontmatter.value.sidebar !== false &&
      sidebar.value.length > 0 &&
      frontmatter.value.layout !== 'home'
    )
  })

  const leftAside = computed(() => {
    if (hasAside.value)
      return frontmatter.value.aside == null
        ? theme.value.aside === 'left'
        : frontmatter.value.aside === 'left'
    return false
  })

  const hasAside = computed(() => {
    if (frontmatter.value.layout === 'home') return false
    if (frontmatter.value.aside != null) return !!frontmatter.value.aside
    return theme.value.aside !== false
  })

  const isSidebarEnabled = computed(() => hasSidebar.value && is960.value)

  const sidebarGroups = computed(() => {
    return hasSidebar.value ? getSidebarGroups(sidebar.value) : []
  })

  function open(): void {
    isOpen.value = true
  }

  function close(): void {
    isOpen.value = false
  }

  function toggle(): void {
    isOpen.value ? close() : open()
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

/**
 * a11y: cache the element that opened the Sidebar (the menu button) then
 * focus that button again when Menu is closed with Escape key.
 */
export function useCloseSidebarOnEscape(
  isOpen: Ref<boolean>,
  close: () => void,
): void {
  let triggerElement: HTMLButtonElement | undefined

  watchEffect(() => {
    triggerElement = isOpen.value
      ? (document.activeElement as HTMLButtonElement)
      : undefined
  })

  onMounted(() => {
    window.addEventListener('keyup', onEscape)
  })

  onUnmounted(() => {
    window.removeEventListener('keyup', onEscape)
  })

  function onEscape(e: KeyboardEvent): void {
    if (e.key === 'Escape' && isOpen.value) {
      close()
      triggerElement?.focus()
    }
  }
}

export function useSidebarControl(
  item: ComputedRef<ResolvedSidebarItem>,
): SidebarControl {
  const { page, hash } = useData()

  const collapsed = ref(false)

  const collapsible = computed(() => {
    return item.value.collapsed != null
  })

  const isLink = computed(() => {
    return !!item.value.link
  })

  const isActiveLink = ref(false)
  const updateIsActiveLink = (): void => {
    isActiveLink.value = isActive(
      page.value.path,
      item.value.link ? resolveRoutePath(item.value.link) : undefined,
    )
  }

  watch([page, item, hash], updateIsActiveLink)
  onMounted(updateIsActiveLink)

  const hasActiveLink = computed(() => {
    if (isActiveLink.value) {
      return true
    }

    return item.value.items
      ? containsActiveLink(page.value.filePathRelative || '', item.value.items)
      : false
  })

  const hasChildren = computed(() => {
    return !!(item.value.items && item.value.items.length)
  })

  watchEffect(() => {
    collapsed.value = !!(collapsible.value && item.value.collapsed)
  })

  watchPostEffect(() => {
    ;(isActiveLink.value || hasActiveLink.value) && (collapsed.value = false)
  })

  function toggle(): void {
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

/**
 * Get the `Sidebar` from sidebar option. This method will ensure to get correct
 * sidebar config from `MultiSideBarConfig` with various path combinations such
 * as matching `guide/` and `/guide/`. If no matching config was found, it will
 * return empty array.
 */
export function getSidebar(path: string): ResolvedSidebarItem[] {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const _sidebar = sidebarData.value
  if (Array.isArray(_sidebar)) return _sidebar
  if (_sidebar == null) return []

  path = ensureStartingSlash(path)

  const dir = Object.keys(_sidebar)
    .sort((a, b) => {
      return b.split('/').length - a.split('/').length
    })
    .find((dir) => {
      // make sure the multi sidebar key starts with slash too
      return path.startsWith(ensureStartingSlash(dir))
    })

  const sidebar = dir ? _sidebar[dir] : []
  return sidebar as ResolvedSidebarItem[]
}

/**
 * Get or generate sidebar group from the given sidebar items.
 */
export function getSidebarGroups(
  sidebar: ResolvedSidebarItem[],
): ResolvedSidebarItem[] {
  const groups: ResolvedSidebarItem[] = []

  let lastGroupIndex = 0

  for (const index in sidebar) {
    const item = sidebar[index]

    if (item.items) {
      lastGroupIndex = groups.push(item)
      continue
    }

    if (!groups[lastGroupIndex]) {
      groups.push({ items: [] })
    }

    groups[lastGroupIndex]!.items!.push(item)
  }

  return groups
}

export function getFlatSideBarLinks(
  sidebar: ResolvedSidebarItem[],
): SidebarLink[] {
  const links: SidebarLink[] = []

  function recursivelyExtractLinks(items: ResolvedSidebarItem[]): void {
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

/**
 * Check if the given sidebar item contains any active link.
 */
export function hasActiveLink(
  path: string,
  items: ResolvedSidebarItem | ResolvedSidebarItem[],
): boolean {
  if (Array.isArray(items)) {
    return items.some((item) => hasActiveLink(path, item))
  }

  return isActive(path, items.link ? resolveRoutePath(items.link) : undefined)
    ? true
    : items.items
      ? hasActiveLink(path, items.items)
      : false
}

if (__VUEPRESS_DEV__ && (import.meta.webpackHot || import.meta.hot)) {
  __VUE_HMR_RUNTIME__.updateSidebarData = (
    data: Record<string, ResolvedSidebarItem[]>,
  ) => {
    sidebarData.value = data
  }
}
