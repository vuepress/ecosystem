// @vitest-environment happy-dom
import { flushPromises } from '@vue/test-utils'
import {
  collectClientDefines,
  createTestApp,
  stubClientDefines,
} from '@vuepress/test-utils'
import type { TestApp } from '@vuepress/test-utils'
import { mountVuePress } from '@vuepress/test-utils/client'
import { describe, expect, it, vi } from 'vitest'
import type { Component, Ref, VNode } from 'vue'
import { defineComponent, h, resolveComponent } from 'vue'
import type { ClientConfig } from 'vuepress/client'

import { searchPlugin } from '../../src/node/index.js'
import type { SearchIndex } from '../../src/shared/index.js'

vi.mock(
  import('../../src/client/composables/useSearchIndex.js'),
  async (): Promise<{ useSearchIndex: () => Ref<SearchIndex> }> => {
    const { ref } = await import('vue')

    return {
      useSearchIndex: (): Ref<SearchIndex> =>
        ref(
          ['Guide', 'Getting Started', 'Gatsby'].map((title, index) => ({
            extraFields: [],
            headers: [],
            path: `/${index}/`,
            pathLocale: '/',
            title,
          })),
        ),
    }
  },
)

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
      searchPlugin({
        hotKeys: ['/'],
        locales: { '/': { placeholder: 'Custom search' } },
        maxSuggestions: 2,
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

describe('search client config', () => {
  it('should inject the options defined in Node', async () => {
    const { app, defines, restore } = await setup()

    try {
      expect(defines.__SEARCH_HOT_KEYS__).toStrictEqual(['/'])
      expect(defines.__SEARCH_MAX_SUGGESTIONS__).toBe(2)
      expect(defines.__SEARCH_LOCALES__).toMatchObject({
        '/': { placeholder: 'Custom search' },
      })
    } finally {
      restore()
      app.cleanup()
    }
  })

  it('should register the search box with the Node options', async () => {
    const { app, clientConfig, restore } = await setup()

    try {
      const wrapper = await mountVuePress({
        clientConfigs: [clientConfig],
        page: { path: '/' },
        rootComponent: SearchBoxHost,
        site: { locales: { '/': { lang: 'en-US' } } },
      })

      expect(
        wrapper.find('input[type="search"]').attributes('placeholder'),
      ).toBe('Custom search')
    } finally {
      restore()
      app.cleanup()
    }
  })

  it('should limit the suggestions with the Node maxSuggestions', async () => {
    const { app, clientConfig, restore } = await setup()

    try {
      const wrapper = await mountVuePress({
        clientConfigs: [clientConfig],
        page: { path: '/' },
        rootComponent: SearchBoxHost,
        site: { locales: { '/': { lang: 'en-US' } } },
      })
      const input = wrapper.find('input')

      await input.trigger('focus')
      // `g` matches the three pages of the index
      await input.setValue('g')
      await flushPromises()

      expect(wrapper.findAll('.suggestion')).toHaveLength(2)
    } finally {
      restore()
      app.cleanup()
    }
  })
})
