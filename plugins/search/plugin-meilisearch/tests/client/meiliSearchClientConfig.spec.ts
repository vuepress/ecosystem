// @vitest-environment happy-dom
import { flushPromises } from '@vue/test-utils'
import {
  collectClientDefines,
  createTestApp,
  stubClientDefines,
} from '@vuepress/test-utils'
import type { mountVuePress as mountVuePressFn } from '@vuepress/test-utils/client'
import { describe, expect, it, vi } from 'vitest'
import type { Component, VNode } from 'vue'
import { defineComponent, h, resolveComponent } from 'vue'
import type { ClientConfig } from 'vuepress/client'

import { meilisearchPlugin } from '../../src/node/index.js'

const { docsearchMock } = vi.hoisted(() => ({
  docsearchMock: vi.fn<() => () => void>(() => (): void => undefined),
}))

vi.mock(import('meilisearch-docsearch'), () => ({
  default: docsearchMock,
  docsearch: docsearchMock,
}))

/** Host that renders the `SearchBox` component registered by the config */
const SearchBoxHost: Component = defineComponent({
  name: 'SearchBoxHost',
  setup: (): (() => VNode) => () => h(resolveComponent('SearchBox')),
})

const site = {
  locales: {
    '/': { lang: 'en-US' },
    '/zh/': { lang: 'zh-CN' },
  },
}

let clientConfig: ClientConfig
let mountVuePress: typeof mountVuePressFn

let setupPromise: Promise<void> | undefined

/**
 * Create the test app and load the client modules once for the suite
 *
 * @returns A promise resolved once the suite is ready
 */
const setup = async (): Promise<void> => {
  setupPromise ??= (async (): Promise<void> => {
    const app = await createTestApp({
      locales: site.locales,
      plugins: [
        meilisearchPlugin({
          apiKey: 'API_KEY',
          host: 'https://ms.example.com',
          indexUid: 'docs',
          searchParams: { filter: 'type=doc' },
          translations: { button: { buttonText: 'Root Search' } },
          locales: {
            '/zh/': {
              apiKey: 'API_KEY',
              host: 'https://ms.example.com',
              indexUid: 'docs',
              translations: { button: { buttonText: '自定义搜索' } },
            },
          },
        }),
      ],
    })

    stubClientDefines(await collectClientDefines(app))

    // The client config reads the defines at module scope, so it must be
    // imported after the defines are stubbed.
    vi.resetModules()

    const { mountVuePress: mount } = await import('@vuepress/test-utils/client')

    mountVuePress = mount
    clientConfig = (await import('../../src/client/config.js')).default
  })()

  await setupPromise
}

/** Reset the state left over by the previous test */
const resetState = (): void => {
  docsearchMock.mockClear()
  document.body.innerHTML = ''
  document.head.innerHTML = ''
}

describe('meilisearch client config', () => {
  it('should render the search button with the root translations', async () => {
    await setup()
    resetState()

    const { renderVuePress } = await import('@vuepress/test-utils/client')

    const html = await renderVuePress({
      clientConfigs: [clientConfig],
      page: { lang: 'en-US', path: '/' },
      rootComponent: SearchBoxHost,
      site,
    })

    expect(html).toContain('id="docsearch"')
    expect(html).toContain('docsearch-btn')
    expect(html).toContain('Root Search')
  })

  it('should use the locale strings defined in Node', async () => {
    await setup()
    resetState()

    const { renderVuePress } = await import('@vuepress/test-utils/client')

    const html = await renderVuePress({
      clientConfigs: [clientConfig],
      page: { lang: 'zh-CN', path: '/zh/' },
      rootComponent: SearchBoxHost,
      site,
    })

    expect(html).toContain('自定义搜索')
    expect(html).not.toContain('>Root Search<')
  })

  it('should boot the SDK with the resolved options and the lang filter', async () => {
    await setup()
    resetState()

    const wrapper = await mountVuePress({
      attachTo: document.body,
      clientConfigs: [clientConfig],
      page: { lang: 'en-US', path: '/' },
      rootComponent: SearchBoxHost,
      site,
    })

    try {
      await flushPromises()

      expect(docsearchMock).toHaveBeenCalledWith(
        expect.objectContaining({
          apiKey: 'API_KEY',
          container: '#docsearch',
          host: 'https://ms.example.com',
          indexUid: 'docs',
          searchParams: expect.objectContaining({
            filter: ['lang=en-US', 'type=doc'],
          }),
        }),
      )
    } finally {
      wrapper.unmount()
    }
  })
})
