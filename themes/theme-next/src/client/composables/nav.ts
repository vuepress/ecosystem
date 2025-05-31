import { useData } from '@theme/data'
import { getNavLink, normalizeLink } from '@theme/getNavLink'
import type { Ref } from 'vue'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vuepress/client'
import type {
  NavItem,
  ResolvedNavItem,
  ResolvedNavItemWithLink,
} from '../../shared/index.js'

const resolveNavbar = (navbar: NavItem[], _prefix = ''): ResolvedNavItem[] => {
  const resolved: ResolvedNavItem[] = []
  navbar.forEach((item) => {
    if (typeof item === 'string') {
      resolved.push(getNavLink(normalizeLink(_prefix, item)))
    } else {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      const { items, children, prefix, ...args } = item
      const list = items?.length ? items : children
      const res = { ...args } as ResolvedNavItem
      if ('link' in res) {
        res.link = normalizeLink(_prefix, res.link)
      }
      if (list?.length) {
        res.items = resolveNavbar(
          list,
          normalizeLink(_prefix, prefix),
        ) as ResolvedNavItemWithLink[]
      }
      resolved.push(res)
    }
  })
  return resolved
}

export const useNavbarData = (): Ref<ResolvedNavItem[]> => {
  const { themeLocale } = useData()

  return computed(() => resolveNavbar(themeLocale.value.navbar ?? []))
}

export interface UseNavReturn {
  isScreenOpen: Ref<boolean>
  openScreen: () => void
  closeScreen: () => void
  toggleScreen: () => void
}

export const useNav = (): UseNavReturn => {
  const isScreenOpen = ref(false)

  /**
   * Close screen when the user resizes the window wider than tablet size.
   */
  const closeScreenOnTabletWindow = (): void => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    if (window.outerWidth >= 768) closeScreen()
  }

  const openScreen = (): void => {
    isScreenOpen.value = true
    window.addEventListener('resize', closeScreenOnTabletWindow)
  }

  const closeScreen = (): void => {
    isScreenOpen.value = false
    window.removeEventListener('resize', closeScreenOnTabletWindow)
  }

  const toggleScreen = (): void => {
    if (isScreenOpen.value) {
      closeScreen()
    } else {
      openScreen()
    }
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
