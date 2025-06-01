import { useThemeData } from '@theme/theme-data'
import { useDark } from '@vueuse/core'
import type { InjectionKey, Ref } from 'vue'
import { inject, provide, ref } from 'vue'

type DarkModeRef = Ref<boolean>

export const darkModeSymbol: InjectionKey<DarkModeRef> = Symbol(
  __VUEPRESS_DEV__ ? 'darkMode' : '',
)

export const setupDarkMode = (): void => {
  const themeLocale = useThemeData()

  const { appearance } = themeLocale.value
  const isDark =
    appearance === 'force-dark'
      ? ref(true)
      : appearance
        ? useDark({
            storageKey: 'vuepress-color-scheme',
            attribute: 'data-theme',
            valueLight: 'light',
            valueDark: 'dark',
            initialValue: () =>
              typeof appearance === 'string' ? appearance : 'auto',
            ...(typeof appearance === 'object' ? appearance : {}),
          })
        : ref(false)

  provide(darkModeSymbol, isDark)
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
