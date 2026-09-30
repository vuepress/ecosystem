import { describe, expect, it, vi } from 'vitest'

import {
  getAlias,
  getPageviewChunk,
  getProviderPackage,
  getServiceComponent,
} from '../../src/node/getProvider.js'

describe('comment provider resolution', () => {
  it('should resolve the service component of every supported provider', () => {
    for (const provider of ['Artalk', 'Giscus', 'Twikoo', 'Waline'] as const) {
      expect(getServiceComponent(provider)).toMatch(
        new RegExp(`components/${provider}Comment\\.js$`, 'u'),
      )
    }
  })

  it('should fall back to the noop module when no provider is configured', () => {
    expect(getServiceComponent()).toContain('noopModule')
    expect(getServiceComponent('None')).toContain('noopModule')
  })

  it('should fall back to the noop module for an unknown provider', () => {
    const error = vi.spyOn(console, 'error').mockReturnValue(undefined)

    try {
      expect(getServiceComponent('Unknown')).toContain('noopModule')
    } finally {
      error.mockRestore()
    }
  })

  it('should resolve the pageview chunk of the providers that support it', () => {
    expect(getPageviewChunk('Artalk')).toMatch(/pageview\/artalk\.js$/u)
    expect(getPageviewChunk('Waline')).toMatch(/pageview\/waline\.js$/u)
  })

  it('should fall back to the noop pageview chunk for other providers', () => {
    expect(getPageviewChunk('Giscus')).toMatch(/pageview\/noop\.js$/u)
    expect(getPageviewChunk('Twikoo')).toMatch(/pageview\/noop\.js$/u)
    expect(getPageviewChunk()).toMatch(/pageview\/noop\.js$/u)
  })

  it('should alias the service and the pageview of the configured provider', () => {
    const alias = getAlias({ provider: 'Waline' })

    expect(alias['@vuepress/plugin-comment/service']).toMatch(
      /components\/WalineComment\.js$/u,
    )
    expect(alias['@vuepress/plugin-comment/pageview']).toMatch(
      /pageview\/waline\.js$/u,
    )
  })

  it('should report the package of the providers that need an extra install', () => {
    expect(getProviderPackage('Artalk')).toBe('artalk')
    expect(getProviderPackage('Twikoo')).toBe('twikoo')
    expect(getProviderPackage('Waline')).toBe('@waline/client')
  })

  it('should not require an extra package for giscus or no provider', () => {
    expect(getProviderPackage('Giscus')).toBeNull()
    expect(getProviderPackage('None')).toBeNull()
    expect(getProviderPackage()).toBeNull()
  })
})
