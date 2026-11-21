import { useThemeLocaleData } from '@vuepress/plugin-theme-data/client'
import { useMediaQuery } from '@vueuse/core'
import {
  computed,
  shallowReadonly,
  shallowRef,
  watch,
  type ComputedRef,
  type InjectionKey,
} from 'vue'
import { onContentUpdated, useRoute } from 'vuepress/client'

import {
  usePageRelativePath,
  useThemePageFrontmatter,
} from '../../composables/page.js'
import type { DefaultTheme } from '../shared.js'
import { getSidebar, getSidebarGroups } from '../support/sidebar.js'
import { getHeaders } from './outline.js'
import { useCloseSidebarOnEscape } from './sidebar.js'

const headers = shallowRef<DefaultTheme.OutlineItem[]>([])
const sidebar = shallowRef<DefaultTheme.SidebarItem[]>([])

const isDesktop = useMediaQuery('(min-width: 60rem)')

export function useLayout(): DefaultTheme.Layout {
  const frontmatter = useThemePageFrontmatter()
  const theme = useThemeLocaleData<DefaultTheme.Config>()

  const isHome = computed(
    () => frontmatter.value.isHome ?? frontmatter.value.layout === 'home',
  )

  const hasSidebar = computed(() => {
    return (
      frontmatter.value.sidebar !== false &&
      sidebar.value.length > 0 &&
      !isHome.value
    )
  })

  const isSidebarEnabled = computed(() => hasSidebar.value && isDesktop.value)

  const sidebarGroups = computed(() => {
    return hasSidebar.value ? getSidebarGroups(sidebar.value) : []
  })

  const hasAside = computed(() => {
    if (isHome.value) return false
    if (frontmatter.value.aside != null) return Boolean(frontmatter.value.aside)
    return theme.value.aside !== false
  })

  const leftAside = computed(() => {
    if (!hasAside.value) return false
    return frontmatter.value.aside == null
      ? theme.value.aside === 'left'
      : frontmatter.value.aside === 'left'
  })

  const hasLocalNav = computed(() => {
    return headers.value.length > 0
  })

  return {
    isHome,
    sidebar: shallowReadonly(sidebar),
    sidebarGroups,
    hasSidebar,
    isSidebarEnabled,
    hasAside,
    leftAside,
    headers: shallowReadonly(headers),
    hasLocalNav,
  }
}

interface RegisterWatchersOptions {
  closeSidebar: () => void
}

export function registerWatchers({ closeSidebar }: RegisterWatchersOptions) {
  const frontmatter = useThemePageFrontmatter()
  const theme = useThemeLocaleData<DefaultTheme.Config>()
  const relativePath = usePageRelativePath()

  watch(
    () => [relativePath.value, theme.value.sidebar] as const,
    ([currentRelativePath, sidebarConfig]) => {
      const newSidebar = sidebarConfig
        ? getSidebar(sidebarConfig, currentRelativePath)
        : []
      if (JSON.stringify(newSidebar) !== JSON.stringify(sidebar.value)) {
        sidebar.value = newSidebar
      }
    },
    { immediate: true, deep: true, flush: 'sync' },
  )

  onContentUpdated(() => {
    headers.value = getHeaders(frontmatter.value.outline ?? theme.value.outline)
  })

  const route = useRoute()
  watch(() => route.path, closeSidebar)

  watch(isDesktop, closeSidebar)
  useCloseSidebarOnEscape(closeSidebar)
}

export interface LayoutInfo {
  heroImageSlotExists: ComputedRef<boolean>
}

export const layoutInfoInjectionKey: InjectionKey<LayoutInfo> =
  Symbol('layout-info')
