import { navbarData as navbarDataRaw } from '@internal/navbar'
import { computed, ref, watch } from 'vue'
import type { Ref } from 'vue'
import { useRoute, useRouteLocale } from 'vuepress/client'
import type { ResolvedNavItem } from '../../shared/resolved/navbar.js'

export type NavbarLocalesRef = Ref<Record<string, ResolvedNavItem[]>>

const navbarData: NavbarLocalesRef = ref(navbarDataRaw)

export const useNavbarData = (): Ref<ResolvedNavItem[]> => {
  const routeLocale = useRouteLocale()

  return computed(() => navbarData.value[routeLocale.value] || [])
}

export interface UseNavReturn {
  isScreenOpen: Ref<boolean>
  openScreen: () => void
  closeScreen: () => void
  toggleScreen: () => void
}

export function useNav(): UseNavReturn {
  const isScreenOpen = ref(false)

  function openScreen(): void {
    isScreenOpen.value = true
    window.addEventListener('resize', closeScreenOnTabletWindow)
  }

  function closeScreen(): void {
    isScreenOpen.value = false
    window.removeEventListener('resize', closeScreenOnTabletWindow)
  }

  function toggleScreen(): void {
    isScreenOpen.value ? closeScreen() : openScreen()
  }

  /**
   * Close screen when the user resizes the window wider than tablet size.
   */
  function closeScreenOnTabletWindow(): void {
    window.outerWidth >= 768 && closeScreen()
  }

  const route = useRoute()
  watch(() => route.path, closeScreen)

  return {
    isScreenOpen,
    openScreen,
    closeScreen,
    toggleScreen,
  }
}

if (__VUEPRESS_DEV__ && (import.meta.webpackHot || import.meta.hot)) {
  __VUE_HMR_RUNTIME__.updateNavbarData = (
    data: Record<string, ResolvedNavItem[]>,
  ) => {
    navbarData.value = data
  }
}
