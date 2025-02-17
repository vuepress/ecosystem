import { useThemeLocaleData } from '@theme/useThemeData'
import { usePreferredDark, useStorage, watchImmediate } from '@vueuse/core'
import type { InjectionKey, WritableComputedRef } from 'vue'
import { computed, inject, onMounted, onUnmounted, provide } from 'vue'

export type DarkmodeRef = WritableComputedRef<boolean>

export const darkModeSymbol: InjectionKey<DarkmodeRef> = Symbol(
  __VUEPRESS_DEV__ ? 'darkMode' : '',
)

const applyDarkmodeToHTML = (isDarkmode: DarkmodeRef): void => {
  const update = (value = isDarkmode.value): void => {
    // set `class="dark"` on `<html>` element
    const el = window.document.documentElement

    // set `data-theme="light|dark"` on `<html>` element
    el.dataset.theme = value ? 'dark' : 'light'
  }

  onMounted(() => {
    watchImmediate(isDarkmode, update)
  })

  onUnmounted(() => {
    update()
  })
}

/**
 * Inject dark mode global computed
 */
export const useDarkmode = (): DarkmodeRef => {
  const isDarkmode = inject(darkModeSymbol)
  if (!isDarkmode) {
    throw new Error('useDarkmode() is called without provider.')
  }
  return isDarkmode
}

/**
 * Create dark mode ref and provide as global computed in setup
 */
export const setupDarkmode = (): void => {
  const themeLocale = useThemeLocaleData()
  const isDarkPreferred = usePreferredDark()
  const darkStorage = useStorage(
    'vuepress-color-scheme',
    themeLocale.value.colorMode,
  )

  const isDarkmode = computed<boolean>({
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
  provide(darkModeSymbol, isDarkmode)

  applyDarkmodeToHTML(isDarkmode)
}
