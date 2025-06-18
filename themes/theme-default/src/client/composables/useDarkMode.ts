import { useData } from '@theme/useData'
import { darkModeSymbol } from '@vuepress/helper/client'
import { usePreferredDark, useStorage, watchImmediate } from '@vueuse/core'
import type { WritableComputedRef } from 'vue'
import { computed, inject, onMounted, onUnmounted, provide } from 'vue'

export type DarkModeRef = WritableComputedRef<boolean>

const applyDarkModeToHTML = (isDarkMode: DarkModeRef): void => {
  const update = (value = isDarkMode.value): void => {
    // set `class="dark"` on `<html>` element
    const el = window.document.documentElement

    // set `data-theme="light|dark"` on `<html>` element
    el.dataset.theme = value ? 'dark' : 'light'
  }

  onMounted(() => {
    watchImmediate(isDarkMode, update)
  })

  onUnmounted(() => {
    update()
  })
}

/**
 * Inject dark mode global computed
 */
export const useDarkMode = (): DarkModeRef => {
  const isDarkMode = inject<WritableComputedRef<boolean>>(darkModeSymbol)
  if (!isDarkMode) {
    throw new Error('useDarkMode() is called without provider.')
  }
  return isDarkMode
}

/**
 * Create dark mode ref and provide as global computed in setup
 */
export const setupDarkMode = (): void => {
  const { themeLocale } = useData()
  const isDarkPreferred = usePreferredDark()
  const darkStorage = useStorage(
    'vuepress-color-scheme',
    themeLocale.value.colorMode,
  )

  const isDarkMode = computed<boolean>({
    get() {
      // disable color mode switching
      if (!themeLocale.value.colorModeSwitch) {
        return themeLocale.value.colorMode === 'dark'
      }
      // auto detected from prefers-color-scheme
      if (darkStorage.value === 'auto') {
        return isDarkPreferred.value
      }
      // storage value
      return darkStorage.value === 'dark'
    },
    set(val) {
      if (val === isDarkPreferred.value) {
        darkStorage.value = 'auto'
      } else {
        darkStorage.value = val ? 'dark' : 'light'
      }
    },
  })
  provide(darkModeSymbol, isDarkMode)

  applyDarkModeToHTML(isDarkMode)
}
