import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  watch,
  watchEffect,
  type ComputedRef,
} from 'vue'
import { useRoute } from 'vuepress/client'

import { useThemePageData } from '../../composables/useThemePageData.js'
import type { DefaultTheme } from '../shared.js'
import { isActive, isLinkActive } from '../shared.js'
import { hasActiveLink as containsActiveLink } from '../support/sidebar.js'

const isOpen = ref(false)

/**
 * A11y: cache the element that opened the Sidebar (the menu button) then focus
 * that button again when Menu is closed with Escape key.
 */
export function useCloseSidebarOnEscape(close: () => void) {
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

  function onEscape(e: KeyboardEvent) {
    if (e.key === 'Escape' && isOpen.value) {
      close()
      triggerElement?.focus()
    }
  }
}

export function useSidebarControl() {
  function open() {
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  function toggle() {
    if (isOpen.value) {
      close()
    } else {
      open()
    }
  }

  return {
    isOpen,
    open,
    close,
    toggle,
  }
}

export function useSidebarItemControl(
  item: ComputedRef<DefaultTheme.SidebarItem>,
) {
  const route = useRoute()
  const page = useThemePageData()

  const collapsed = ref(false)

  const collapsible = computed(() =>
    Boolean(item.value.collapsible && item.value.items?.length),
  )

  const isLink = computed(() => {
    return Boolean(item.value.link)
  })

  const isActiveLink = ref(false)
  const hasActiveLink = ref(false)

  function updateActiveLink(skipHashCheck = false): void {
    if (item.value.link) {
      isActiveLink.value = isLinkActive(
        page.value.filePathRelative ?? '',
        route.hash,
        item.value.link,
        {
          activeMatch: item.value.activeMatch,
          // sidebar links are exact by default, sub paths are active only when
          // `exact: false` is set explicitly
          exact: item.value.exact ?? true,
          skipHashCheck,
        },
      )
    } else {
      isActiveLink.value = false
    }
    if (isActiveLink.value) {
      hasActiveLink.value = true
      void nextTick(() => (collapsed.value = false))
      return
    }
    if (!item.value.items) {
      hasActiveLink.value = false
      return
    }
    hasActiveLink.value = containsActiveLink(
      page.value.filePathRelative ?? '',
      route.hash,
      item.value.items,
      skipHashCheck,
    )
    if (hasActiveLink.value) {
      void nextTick(() => (collapsed.value = false))
    }
  }

  // runs during setup so active classes render in SSR output too; the hash
  // isn't known on the server (and may differ at hydration), so it's skipped
  // until mounted
  updateActiveLink(true)

  watch([item, route], () => updateActiveLink())
  onMounted(() => updateActiveLink())

  // exact match only, unlike isActiveLink which skips the hash check before
  // mount — links that differ only in hash must not claim aria-current in
  // SSR output
  const isCurrentLink = computed(() => {
    if (!item.value.link) return false

    return item.value.link.startsWith('#')
      ? route.hash === item.value.link
      : isActive(page.value.filePathRelative ?? '', route.hash, item.value.link)
  })

  const hasChildren = computed(() => {
    return Boolean(item.value.items && item.value.items.length)
  })

  watchEffect(() => {
    collapsed.value = collapsible.value && !item.value.expanded
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
    isActiveLink: isActiveLink as ComputedRef<boolean>,
    isCurrentLink,
    hasActiveLink: hasActiveLink as ComputedRef<boolean>,
    hasChildren,
    toggle,
  }
}
