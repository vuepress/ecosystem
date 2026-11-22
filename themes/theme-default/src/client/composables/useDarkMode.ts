import { usePreferredDark, useStorage } from '@vueuse/core'
import type { InjectionKey, WritableComputedRef } from 'vue'
import { computed, inject } from 'vue'

import type { AppearanceOptions } from '../../shared/types.js'

/**
 * Symbol of the writable dark mode ref of the theme
 *
 * 主题可写暗色模式引用的 Symbol
 */
export const themeDarkModeSymbol: InjectionKey<WritableComputedRef<boolean>> =
  Symbol('theme-default-dark-mode')

/**
 * Storage key of the colour mode, shared by every VuePress theme
 *
 * 颜色模式的存储键，所有 VuePress 主题共用
 */
export const COLOR_MODE_STORAGE_KEY = 'vuepress-color-scheme'

/**
 * Resolve whether the appearance option is fixed, which disables the switch
 *
 * 判断外观配置是否为固定值（此时禁用切换）
 *
 * @param appearance - Appearance option / 外观配置
 * @returns Whether the appearance is fixed / 外观是否为固定值
 */
export const isFixedAppearance = (
  appearance: AppearanceOptions | undefined,
): boolean =>
  appearance === false ||
  appearance === 'force-dark' ||
  appearance === 'force-auto'

/**
 * Create the writable dark mode ref from the `appearance` option
 *
 * 依据 `appearance` 选项创建可写的暗色模式引用
 *
 * @param appearance - Appearance option / 外观配置
 * @returns The writable dark mode ref / 可写暗色模式引用
 */
export const createDarkModeRef = (
  appearance: AppearanceOptions | undefined,
): WritableComputedRef<boolean> => {
  const isDarkPreferred = usePreferredDark()
  // `true` / object forms mean "auto" unless the object asks for `'dark'` as
  // its initial value, mirroring VitePress' `appearance` semantics
  const initialValue =
    appearance === 'dark' ||
    (typeof appearance === 'object' && appearance.initialValue === 'dark')
      ? 'dark'
      : 'auto'
  const darkStorage = useStorage(COLOR_MODE_STORAGE_KEY, initialValue)

  return computed({
    get() {
      if (appearance === false) return false
      if (appearance === 'force-dark') return true
      if (appearance === 'force-auto') return isDarkPreferred.value

      // auto detected from prefers-color-scheme
      if (darkStorage.value === 'auto') return isDarkPreferred.value

      return darkStorage.value === 'dark'
    },
    set(value: boolean) {
      if (isFixedAppearance(appearance)) return

      darkStorage.value =
        value === isDarkPreferred.value ? 'auto' : value ? 'dark' : 'light'
    },
  })
}

/**
 * Inject the dark mode ref of the theme
 *
 * 注入主题的暗色模式引用
 *
 * @returns Writable dark mode ref / 可写暗色模式引用
 */
export const useDarkMode = (): WritableComputedRef<boolean> => {
  const isDark = inject(themeDarkModeSymbol)

  if (!isDark) throw new Error('useDarkMode() is called without provider.')

  return isDark
}
