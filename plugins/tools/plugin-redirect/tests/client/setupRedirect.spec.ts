import { flushPromises } from '@vue/test-utils'
import { createTestClient } from '@vuepress/test-utils/client'
import { describe, expect, it } from 'vitest'
// @vitest-environment happy-dom
import type { VNode } from 'vue'
import { defineComponent, h, nextTick } from 'vue'

import { setupRedirect } from '../../src/client/composables/setupRedirect.js'
import {
  statusLocalStorage,
  statusSessionStorage,
} from '../../src/client/utils/storage.js'
import type { RedirectBehaviorConfig } from '../../src/shared/index.js'

const config: RedirectBehaviorConfig = {
  autoLocale: false,
  config: { '/': ['en-US'], '/zh/': ['zh-CN'] },
  defaultBehavior: 'defaultLocale',
  defaultLocale: '/',
  localeFallback: true,
}

const site = {
  locales: {
    '/': { lang: 'en-US', title: 'My Site' },
    '/zh/': { lang: 'zh-CN', title: '我的站点' },
  },
  title: 'My Site',
}

const routes = {
  '/': { pageData: { path: '/', title: 'Home' } },
  '/zh/': { pageData: { path: '/zh/', title: '首页' } },
}

const Page = defineComponent({
  name: 'Page',
  setup: (): (() => VNode) => () => h('div', { class: 'page' }, 'Page'),
})

const resetRedirectState = async (languages: string[]): Promise<void> => {
  localStorage.clear()
  sessionStorage.clear()

  Object.defineProperty(navigator, 'languages', {
    configurable: true,
    value: languages,
  })

  statusLocalStorage.value = {}
  statusSessionStorage.value = {}
  await nextTick()
  localStorage.clear()
  sessionStorage.clear()
}

const createDirectClient = async (): Promise<
  Awaited<ReturnType<typeof createTestClient>>
> => {
  const client = await createTestClient({
    clientConfigs: [{ setup: (): void => setupRedirect(config) }],
    content: Page,
    page: { path: '/zh/' },
    route: '/zh/',
    routes,
    site,
  })

  await client.mount()
  await flushPromises()
  await client.router.isReady()

  return client
}

describe('direct locale redirect', () => {
  it('redirects to the preferred locale immediately', async () => {
    await resetRedirectState(['en-US', 'en'])

    const client = await createDirectClient()

    expect(client.router.currentRoute.value.path).toBe('/')
  })

  it('remembers the redirect in the session storage', async () => {
    await resetRedirectState(['en-US', 'en'])

    await createDirectClient()

    expect(statusSessionStorage.value['/zh/']).toBe(true)
  })

  it('does not redirect again within the same session', async () => {
    await resetRedirectState(['en-US', 'en'])

    statusSessionStorage.value = { '/zh/': true }
    await nextTick()

    const client = await createDirectClient()

    expect(client.router.currentRoute.value.path).toBe('/zh/')
  })

  it('does not redirect when the preferred language is the current locale', async () => {
    await resetRedirectState(['zh-CN'])

    const client = await createDirectClient()

    expect(client.router.currentRoute.value.path).toBe('/zh/')
  })
})
