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
import { onContentUpdated, usePageData, useRoute } from 'vuepress/client'

import {
  usePageRelativePath,
  usePageType,
  useThemePageFrontmatter,
} from '../../composables/useThemePageData.js'
import type { DefaultTheme, ThemeConfig, ThemeLayout } from '../shared.js'
import {
  getSidebar,
  getSidebarGroups,
  resolveSidebarData,
} from '../support/sidebar.js'
import { getHeaders } from './useActiveAnchor.js'
import { useCloseSidebarOnEscape } from './useSidebarControl.js'

const headers = shallowRef<DefaultTheme.OutlineItem[]>([])
const sidebar = shallowRef<DefaultTheme.SidebarItem[]>([])
const sidebarHeaders = shallowRef<DefaultTheme.OutlineItem[]>([])

const isDesktop = useMediaQuery('(min-width: 60rem)')

export function useLayout(): ThemeLayout {
  const frontmatter = useThemePageFrontmatter()
  const theme = useThemeLocaleData<ThemeConfig>()

  const pageType = usePageType()

  const isHome = computed(() => pageType.value === 'home')

  const hasSidebar = computed(() => {
    return sidebar.value.length > 0 && !isHome.value
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
  const theme = useThemeLocaleData<ThemeConfig>()
  const relativePath = usePageRelativePath()
  const page = usePageData()

  const sidebarConfig = computed(
    () => frontmatter.value.sidebar ?? theme.value.sidebar ?? 'heading',
  )

  const sidebarDepth = computed(
    () => frontmatter.value.sidebarDepth ?? theme.value.sidebarDepth ?? 2,
  )

  function updateSidebar(): void {
    const newSidebar =
      sidebarConfig.value === false
        ? []
        : resolveSidebarData(
            getSidebar(sidebarConfig.value, relativePath.value, {
              title: page.value.title,
              headers: sidebarHeaders.value,
            }),
          )

    if (JSON.stringify(newSidebar) !== JSON.stringify(sidebar.value))
      sidebar.value = newSidebar
  }

  watch(
    [sidebarConfig, sidebarDepth, relativePath, () => page.value.title],
    updateSidebar,
    { immediate: true, deep: true, flush: 'sync' },
  )

  onContentUpdated(() => {
    headers.value = getHeaders(frontmatter.value.outline ?? theme.value.outline)
    sidebarHeaders.value = getHeaders([2, sidebarDepth.value + 1] as [
      number,
      number,
    ])
    updateSidebar()
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
