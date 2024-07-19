import { useThemeLocaleData } from '@theme/useThemeData'
import { usePreferredDark, useStorage } from '@vueuse/core'
import { computed, inject, onMounted, onUnmounted, provide, watch } from 'vue'
import type { InjectionKey, WritableComputedRef } from 'vue'

export type DarkModeRef = WritableComputedRef<boolean>

export const darkModeSymbol: InjectionKey<DarkModeRef> = Symbol(
  __VUEPRESS_DEV__ ? 'darkMode' : '',
)

const applyDarkmodeToHTML = (isDarkMode: DarkModeRef): void => {
  const update = (value = isDarkMode.value): void => {
    // set `class="dark"` on `<html>` element
    const el = window!.document.documentElement

    el.classList.toggle('dark', value)
    el.dataset.theme = value ? 'dark' : 'light'
  }

  onMounted(() => {
    watch(isDarkMode, update, { immediate: true })
  })

  onUnmounted(() => update())
}

/**
 * Inject dark mode global computed
 */
export const useDarkMode = (): DarkModeRef => {
  const isDarkMode = inject(darkModeSymbol)
  if (!isDarkMode) {
    throw new Error('useDarkMode() is called without provider.')
  }
  return isDarkMode
}

/**
 * Create dark mode ref and provide as global computed in setup
 */
export const setupDarkMode = (): void => {
  const themeLocale = useThemeLocaleData()
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

  applyDarkmodeToHTML(isDarkMode)
}
