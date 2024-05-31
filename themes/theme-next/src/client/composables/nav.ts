import { computed, ref, watch } from 'vue'
import type { Ref } from 'vue'
import { useRoute } from 'vuepress/client'
import type { NavItem } from '../../shared/index.js'
import type {
  ResolvedNavItem,
  ResolvedNavItemWithLink,
} from '../../shared/resolved/navbar.js'
import { getNavLink, normalizeLink } from '../utils/index.js'
import { useData } from './data.js'

export const useNavbarData = (): Ref<ResolvedNavItem[]> => {
  const { theme } = useData()

  return computed(() => resolveNavbar(theme.value.navbar || []))
}

const resolveNavbar = (navbar: NavItem[], _prefix = ''): ResolvedNavItem[] => {
  const resolved: ResolvedNavItem[] = []
  navbar.forEach((item) => {
    if (typeof item === 'string') {
      resolved.push(getNavLink(normalizeLink(_prefix, item)))
    } else {
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

export interface UseNavReturn {
  isScreenOpen: Ref<boolean>
  openScreen: () => void
  closeScreen: () => void
  toggleScreen: () => void
}

export const useNav = (): UseNavReturn => {
  const isScreenOpen = ref(false)

  const openScreen = (): void => {
    isScreenOpen.value = true
    window.addEventListener('resize', closeScreenOnTabletWindow)
  }

  const closeScreen = (): void => {
    isScreenOpen.value = false
    window.removeEventListener('resize', closeScreenOnTabletWindow)
  }

  const toggleScreen = (): void => {
    isScreenOpen.value ? closeScreen() : openScreen()
  }

  /**
   * Close screen when the user resizes the window wider than tablet size.
   */
  const closeScreenOnTabletWindow = (): void => {
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
