// @vitest-environment happy-dom
import type { RestoreColorMode } from '@vuepress/test-utils/client'
import { setColorMode } from '@vuepress/test-utils/client'
import { describe, expect, it, onTestFinished, vi } from 'vitest'
import { nextTick } from 'vue'

import {
  COLOR_MODE_STORAGE_KEY,
  createDarkModeRef,
  isFixedAppearance,
} from '../../src/client/composables/useDarkMode.js'

const createColorMode = (
  colorMode: 'light' | 'dark',
  options?: Parameters<typeof setColorMode>[1],
): RestoreColorMode => {
  localStorage.clear()
  const restore = setColorMode(colorMode, options)

  onTestFinished(() => {
    restore()
    localStorage.clear()
    document.documentElement.classList.remove('vp-theme-transition')
  })

  return restore
}

describe(isFixedAppearance, () => {
  it('should detect the fixed appearances', () => {
    expect(isFixedAppearance(false)).toBe(true)
    expect(isFixedAppearance('force-dark')).toBe(true)
    expect(isFixedAppearance('force-auto')).toBe(true)
    expect(isFixedAppearance(undefined)).toBe(false)
    expect(isFixedAppearance(true)).toBe(false)
    expect(isFixedAppearance('dark')).toBe(false)
  })
})

describe(createDarkModeRef, () => {
  it('should follow the preferred color scheme in auto mode', () => {
    createColorMode('dark')
    expect(createDarkModeRef(true).value).toBe(true)

    createColorMode('light')
    expect(createDarkModeRef(undefined).value).toBe(false)
  })

  it('should follow the stored color mode', () => {
    createColorMode('light', { storage: 'dark' })
    expect(createDarkModeRef(true).value).toBe(true)

    createColorMode('dark', { storage: 'light' })
    expect(createDarkModeRef(true).value).toBe(false)
  })

  it('should follow the preferred color scheme when the stored mode is auto', () => {
    createColorMode('dark', { storage: 'auto' })
    expect(createDarkModeRef(true).value).toBe(true)

    createColorMode('light', { storage: 'auto' })
    expect(createDarkModeRef(true).value).toBe(false)
  })

  it('should force the dark mode', () => {
    createColorMode('light')
    expect(createDarkModeRef('force-dark').value).toBe(true)
  })

  it('should follow the preferred color scheme with force-auto', () => {
    createColorMode('dark')
    expect(createDarkModeRef('force-auto').value).toBe(true)

    createColorMode('light')
    expect(createDarkModeRef('force-auto').value).toBe(false)
  })

  it('should disable the dark mode with appearance false', () => {
    const isDark = createDarkModeRef(false)
    // `useStorage` writes the initial value
    const initialStored = localStorage.getItem(COLOR_MODE_STORAGE_KEY)

    expect(isDark.value).toBe(false)
    isDark.value = true
    expect(isDark.value).toBe(false)
    expect(localStorage.getItem(COLOR_MODE_STORAGE_KEY)).toBe(initialStored)
  })

  it('should persist the switched mode', async () => {
    createColorMode('light')
    const isDark = createDarkModeRef(true)

    isDark.value = true
    await nextTick()
    expect(isDark.value).toBe(true)
    expect(localStorage.getItem(COLOR_MODE_STORAGE_KEY)).toBe('dark')

    isDark.value = false
    await nextTick()
    expect(isDark.value).toBe(false)
    expect(localStorage.getItem(COLOR_MODE_STORAGE_KEY)).toBe('auto')
  })

  it('should enable the transition class only while switching', () => {
    vi.useFakeTimers()
    onTestFinished(() => {
      vi.useRealTimers()
    })
    createColorMode('light')
    const isDark = createDarkModeRef(true)
    const { documentElement } = document

    expect(documentElement.classList.contains('vp-theme-transition')).toBe(
      false,
    )

    isDark.value = true
    expect(documentElement.classList.contains('vp-theme-transition')).toBe(true)

    vi.advanceTimersByTime(300)
    expect(documentElement.classList.contains('vp-theme-transition')).toBe(
      false,
    )
  })
})
