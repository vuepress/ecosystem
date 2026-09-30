import { getSearchClientConfig } from '@vuepress/search-helper/client'
import {
  collectClientDefines,
  createTestApp,
  stubClientDefines,
} from '@vuepress/test-utils'
import type { TestApp } from '@vuepress/test-utils'
import { renderVuePress } from '@vuepress/test-utils/client'
import { describe, expect, it, vi } from 'vitest'
import type { Component, VNode } from 'vue'
import { defineComponent, h, resolveComponent } from 'vue'
import type { ClientConfig } from 'vuepress/client'

import { slimsearchPlugin } from '../../src/node/index.js'

// The store is a generated module of the site, which does not exist in a test
// oxlint-disable-next-line vitest/prefer-import-in-mock
vi.mock('@temp/slimsearch/store.js', () => ({ store: { 0: '/guide/' } }))

/** Host that renders the `SearchBox` component registered by the config */
const SearchBoxHost: Component = defineComponent({
  name: 'SearchBoxHost',
  setup: (): (() => VNode) => () => h(resolveComponent('SearchBox')),
})

const setup = async (): Promise<{
  app: TestApp
  clientConfig: ClientConfig
  defines: Record<string, unknown>
  restore: () => void
}> => {
  const app = await createTestApp({
    plugins: [
      slimsearchPlugin({
        customFields: [
          { formatter: 'Author: $content', getter: (): string => 'mr-hope' },
        ],
        hotKeys: [{ ctrl: true, key: 'k' }],
        locales: {
          '/': { placeholder: 'Custom search', search: 'Custom search' },
        },
        searchDelay: 300,
        suggestion: false,
        worker: 'custom.worker.js',
      }),
    ],
  })
  const defines = await collectClientDefines(app)
  const restore = stubClientDefines(defines)

  // The client config reads the defines at module scope, so it must be
  // imported after the defines are stubbed.
  const clientConfig = (await import('../../src/client/config.js')).default

  return { app, clientConfig, defines, restore }
}

describe('slimsearch client config', () => {
  it('should inject the options defined in Node', async () => {
    const { app, defines, restore } = await setup()

    try {
      expect(defines.__SLIMSEARCH_OPTIONS__).toMatchObject({
        hotKeys: [{ ctrl: true, key: 'k' }],
        searchDelay: 300,
        suggestion: false,
        worker: 'custom.worker.js',
      })
      expect(defines.__SLIMSEARCH_CUSTOM_FIELDS__).toStrictEqual({
        0: 'Author: $content',
      })
      expect(defines.__SLIMSEARCH_LOCALES__).toMatchObject({
        '/': { placeholder: 'Custom search' },
      })
    } finally {
      restore()
      app.cleanup()
    }
  })

  it('should resolve the client config from the Node options', async () => {
    const { app, clientConfig, restore } = await setup()

    try {
      const config = getSearchClientConfig()

      expect(config.options.worker).toBe('custom.worker.js')
      expect(config.customFieldConfig).toStrictEqual({
        0: 'Author: $content',
      })
      expect(config.store).toStrictEqual({ 0: '/guide/' })
      expect(clientConfig.rootComponents).toHaveLength(1)
    } finally {
      restore()
      app.cleanup()
    }
  })

  it('should enable prefix search only for languages that are not CJK', async () => {
    const { app, restore } = await setup()

    try {
      const { getLocaleSearchOptions } = getSearchClientConfig()

      expect(getLocaleSearchOptions?.('en-US')).toStrictEqual({ prefix: true })
      expect(getLocaleSearchOptions?.('zh-CN')).toStrictEqual({ prefix: false })
    } finally {
      restore()
      app.cleanup()
    }
  })

  it('should register the search box and the search modal', async () => {
    const { app, clientConfig, restore } = await setup()

    try {
      const html = await renderVuePress({
        clientConfigs: [clientConfig],
        page: { path: '/' },
        rootComponent: SearchBoxHost,
        site: { locales: { '/': { lang: 'en-US' } } },
      })

      expect(html).toContain('class="vp-search-button"')
      expect(html).toContain('Custom search')
    } finally {
      restore()
      app.cleanup()
    }
  })
})
