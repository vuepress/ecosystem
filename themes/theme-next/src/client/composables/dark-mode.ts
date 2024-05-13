import { useDark } from '@vueuse/core'
import { inject, provide, ref } from 'vue'
import type { InjectionKey, Ref } from 'vue'
import { useThemeData } from './theme-data.js'

type DarkModeRef = Ref<boolean>

export const darkModeSymbol: InjectionKey<DarkModeRef> = Symbol(
  __VUEPRESS_DEV__ ? 'darkMode' : '',
)

export const setupDarkMode = (): void => {
  const themeLocale = useThemeData()

  const appearance = themeLocale.value.appearance
  const isDark =
    appearance === 'force-dark'
      ? ref(true)
      : appearance
        ? useDark({
            storageKey: 'vuepress-color-scheme',
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
