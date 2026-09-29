import { describe, expect, it } from 'vitest'

import { normalizeThemeName } from '../../src/utils/normalizeThemeName.js'

describe(normalizeThemeName, () => {
  it('should add the theme prefix to a plain name', () => {
    expect(normalizeThemeName('default')).toBe('vuepress-theme-default')
  })

  it('should keep a name that already has the theme prefix', () => {
    expect(normalizeThemeName('vuepress-theme-default')).toBe(
      'vuepress-theme-default',
    )
  })

  it('should normalize a scoped non-vuepress package', () => {
    expect(normalizeThemeName('@foo/bar')).toBe('@foo/vuepress-theme-bar')
    expect(normalizeThemeName('@foo/vuepress-theme-bar')).toBe(
      '@foo/vuepress-theme-bar',
    )
  })

  it('should normalize a scoped vuepress package', () => {
    expect(normalizeThemeName('@vuepress/default')).toBe(
      '@vuepress/theme-default',
    )
    expect(normalizeThemeName('@vuepress/theme-default')).toBe(
      '@vuepress/theme-default',
    )
  })
})
