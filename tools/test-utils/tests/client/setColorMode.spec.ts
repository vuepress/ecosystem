// @vitest-environment happy-dom
import { describe, expect, it } from 'vitest'

import { setColorMode } from '../../src/client/setColorMode.js'

const DARK_QUERY = '(prefers-color-scheme: dark)'
const STORAGE_KEY = 'vuepress-color-scheme'

describe(setColorMode, () => {
  it('should stub the dark color mode', () => {
    const originalMatchMedia = window.matchMedia
    const restore = setColorMode('dark')

    try {
      expect(window.matchMedia(DARK_QUERY).matches).toBe(true)
      expect(localStorage.getItem(STORAGE_KEY)).toBe('dark')
      expect(document.documentElement.dataset.theme).toBe('dark')
    } finally {
      restore()
    }

    expect(window.matchMedia).toBe(originalMatchMedia)
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
    expect(document.documentElement.dataset.theme).toBeUndefined()
  })

  it('should stub the light color mode with an `auto` stored value', () => {
    const restore = setColorMode('light', { storage: 'auto' })

    try {
      expect(window.matchMedia(DARK_QUERY).matches).toBe(false)
      expect(localStorage.getItem(STORAGE_KEY)).toBe('auto')
    } finally {
      restore()
    }
  })

  it('should support a custom storage key', () => {
    const restore = setColorMode('dark', { storageKey: 'my-color-scheme' })

    try {
      expect(localStorage.getItem('my-color-scheme')).toBe('dark')
      expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
    } finally {
      restore()
    }
  })

  it('should forward the other media queries', () => {
    const restore = setColorMode('dark')

    try {
      expect(window.matchMedia('(min-width: 1px)').media).toBe(
        '(min-width: 1px)',
      )
    } finally {
      restore()
    }
  })

  it('should restore the previous storage value', () => {
    localStorage.setItem(STORAGE_KEY, 'light')

    const restore = setColorMode('dark')

    restore()

    expect(localStorage.getItem(STORAGE_KEY)).toBe('light')

    localStorage.removeItem(STORAGE_KEY)
  })
})
