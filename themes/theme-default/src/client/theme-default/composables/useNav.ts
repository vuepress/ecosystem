import { useThemeData } from '@vuepress/plugin-theme-data/client'
import { useMediaQuery, whenever } from '@vueuse/core'
import {
  computed,
  ref,
  shallowRef,
  toValue,
  watch,
  type InjectionKey,
  type MaybeRefOrGetter,
} from 'vue'
import { useRoute } from 'vuepress/client'

import { inBrowser } from '../../composables/inBrowser.js'
import { isFixedAppearance } from '../../composables/useDarkMode.js'
import { useThemePageData } from '../../composables/useThemePageData.js'
import type { DefaultTheme, ThemeConfig } from '../shared.js'
import { isActive, isLinkActive } from '../shared.js'

// module-scoped so Layout.vue can render the rest of the app inert while the
// screen (mobile drawer) is open, without threading props through VPNav
const isScreenOpen = ref(false)

// the button that toggles the screen — focus returns to it when the screen
// is closed with Escape
const screenTriggerEl = shallowRef<HTMLButtonElement | null>(null)

function openScreen() {
  isScreenOpen.value = true
}

function closeScreen() {
  isScreenOpen.value = false
}

function toggleScreen() {
  if (isScreenOpen.value) {
    closeScreen()
  } else {
    openScreen()
  }
}

let watchersRegistered = false

export function useNav() {
  // the auto-close watchers are app-wide, so guard against VPNav being
  // mounted more than once (the flag persists across SSG renders, hence the
  // inBrowser check — the watchers are meaningless during SSR anyway)
  if (inBrowser && !watchersRegistered) {
    watchersRegistered = true

    // Close screen when the user resizes the window wider than tablet size.
    const isTablet = useMediaQuery('(min-width: 48rem)')
    whenever(isTablet, closeScreen)

    const route = useRoute()
    watch(() => route.path, closeScreen)
  }

  return {
    isScreenOpen,
    screenTriggerEl,
    openScreen,
    closeScreen,
    toggleScreen,
  }
}

// whether the theme shows a light/dark switch (guard shared by the inline
// switch, the `⋯` menu and the nav screen)
export function useAppearanceSwitch() {
  // VitePress falls back to `true` when the appearance option is not
  // configured, so the raw theme data is used instead of the merged theme
  // locale data (which does not include the default value).
  const themeData = useThemeData<{
    appearance?: ThemeConfig['appearance']
  }>()
  return computed(() => !isFixedAppearance(themeData.value.appearance ?? true))
}

export function useNavItemLink(
  item: MaybeRefOrGetter<DefaultTheme.NavItemWithLink>,
) {
  const route = useRoute()
  const page = useThemePageData()

  const href = computed(() => {
    const { link } = toValue(item)
    // the callback receives the native VuePress page data of the current page
    return typeof link === 'function' ? link(page.value) : link
  })

  const isActiveLink = computed(() => {
    const { activeMatch, exact } = toValue(item)

    return isLinkActive(
      page.value.filePathRelative ?? '',
      route.hash,
      href.value,
      {
        activeMatch,
        exact,
      },
    )
  })

  // exact match only — a broad activeMatch keeps the visual active state
  // without claiming aria-current
  const isCurrentLink = computed(() => {
    return isActive(page.value.filePathRelative ?? '', route.hash, href.value)
  })

  return { href, isActiveLink, isCurrentLink }
}

export interface NavExposedMethods {
  closeScreen: () => void
}

export const navInjectionKey: InjectionKey<NavExposedMethods> = Symbol('nav')

// true within the VPNavScreen subtree — shared components (VPMenuLink,
// VPMenuGroup, …) restyle themselves and close the screen on navigation
export const navScreenInjectionKey: InjectionKey<boolean> = Symbol('nav-screen')
