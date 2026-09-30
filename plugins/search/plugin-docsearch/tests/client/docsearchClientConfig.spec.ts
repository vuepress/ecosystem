import type DocSearchJs from '@docsearch/js'
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

import { docsearchPlugin } from '../../src/node/index.js'

const { docsearchMock } = vi.hoisted(() => ({
  docsearchMock: vi.fn<() => void>(),
}))

type DocSearchJsModule = Partial<{ default: typeof DocSearchJs }>

vi.mock(
  import('@docsearch/js'),
  () => ({ default: docsearchMock }) as unknown as DocSearchJsModule,
)

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
let defineDocSearchConfig: (options: {
  translations?: { button?: { buttonText?: string } }
}) => void
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
        docsearchPlugin({
          apiKey: 'API_KEY',
          appId: 'APP_ID',
          indices: ['docs'],
          locales: {
            '/zh/': { translations: { button: { buttonText: '自定义搜索' } } },
          },
        }),
      ],
    })

    stubClientDefines(await collectClientDefines(app))

    // The client modules read the defines at module scope, so they must be
    // imported after the defines are stubbed.
    vi.resetModules()

    const { mountVuePress: mount } = await import('@vuepress/test-utils/client')
    const {
      DocSearch,
      defineDocSearchConfig: defineConfig,
      injectDocSearchConfig,
    } = await import('../../src/client/index.js')

    mountVuePress = mount
    defineDocSearchConfig = defineConfig

    // The generated client config registers the search box and injects the
    // options; this mirrors it without the styles.
    clientConfig = {
      enhance: ({ app: clientApp }): void => {
        injectDocSearchConfig(clientApp)
        clientApp.component('SearchBox', DocSearch)
      },
    }
  })()

  await setupPromise
}

/** Reset the state left over by the previous test */
const resetState = (): void => {
  docsearchMock.mockReset()
  document.body.innerHTML = ''
  document.head.innerHTML = ''
  defineDocSearchConfig({})
}

describe('docsearch client config', () => {
  it('should render the localized search button in SSR', async () => {
    await setup()
    resetState()

    const { renderVuePress } = await import('@vuepress/test-utils/client')

    const html = await renderVuePress({
      clientConfigs: [clientConfig],
      page: { lang: 'en-US', path: '/' },
      rootComponent: SearchBoxHost,
      site,
    })

    expect(html).toContain('class="docsearch-placeholder"')
    expect(html).toContain('id="docsearch-container"')
    expect(html).toContain('DocSearch-Button')
    expect(html).toContain('Search')
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
    expect(html).not.toContain('>Search<')
  })

  it('should boot the SDK with the resolved options when the placeholder is clicked', async () => {
    await setup()
    resetState()

    // The real DocSearch renders the modal into the body, which stops the
    // polling that opens it programmatically; rendering it before the click
    // stops the polling right away instead of leaving a timer behind
    document.body.append(
      Object.assign(document.createElement('div'), {
        className: 'DocSearch-Modal',
      }),
    )

    const wrapper = await mountVuePress({
      attachTo: document.body,
      clientConfigs: [clientConfig],
      page: { lang: 'en-US', path: '/' },
      rootComponent: SearchBoxHost,
      site,
    })

    try {
      expect(
        wrapper.find('#docsearch-container').attributes('style'),
      ).toContain('display: none')

      await wrapper.find('.docsearch-placeholder').trigger('click')
      await flushPromises()

      expect(docsearchMock).toHaveBeenCalledWith(
        expect.objectContaining({
          apiKey: 'API_KEY',
          appId: 'APP_ID',
          container: '#docsearch-container',
          indices: [
            {
              name: 'docs',
              searchParameters: { facetFilters: 'lang:en-US' },
            },
          ],
        }),
      )
    } finally {
      wrapper.unmount()
    }
  })

  it('should preconnect to Algolia on mount', async () => {
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
      await vi.waitFor(() => {
        expect(
          document.head.querySelector('#algolia-preconnect'),
        ).not.toBeNull()
      })

      expect(
        document.head
          .querySelector('#algolia-preconnect')
          ?.getAttribute('href'),
      ).toBe('https://APP_ID-dsn.algolia.net')
    } finally {
      wrapper.unmount()
    }
  })

  it('should let the client override the search button text', async () => {
    await setup()
    resetState()

    const { renderVuePress } = await import('@vuepress/test-utils/client')

    defineDocSearchConfig({
      translations: { button: { buttonText: 'Client Search' } },
    })

    const html = await renderVuePress({
      clientConfigs: [clientConfig],
      page: { lang: 'en-US', path: '/' },
      rootComponent: SearchBoxHost,
      site,
    })

    expect(html).toContain('Client Search')
  })
})
