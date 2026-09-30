// @vitest-environment happy-dom
import type { VueWrapper } from '@vue/test-utils'
import { flushPromises } from '@vue/test-utils'
import { createTestClient } from '@vuepress/test-utils/client'
import { describe, expect, it, vi } from 'vitest'
import type { VNode } from 'vue'
import { defineComponent, h, nextTick } from 'vue'

import RedirectPopup from '../../src/client/components/RedirectPopup.js'
import type { RedirectPluginLocaleConfig } from '../../src/client/types.js'
import {
  statusLocalStorage,
  statusSessionStorage,
} from '../../src/client/utils/storage.js'
import type { RedirectBehaviorConfig } from '../../src/shared/index.js'

vi.mock(
  import('../../src/client/composables/setupDevServerRedirect.js'),
  () => ({ setupDevServerRedirect: (): void => {} }),
)

const config: RedirectBehaviorConfig = {
  autoLocale: false,
  config: { '/': ['en-US'], '/zh/': ['zh-CN'] },
  defaultBehavior: 'defaultLocale',
  defaultLocale: '/',
  localeFallback: true,
}

const locales: RedirectPluginLocaleConfig = {
  '/': {
    name: 'English',
    hint: 'Your primary language is $1, do you want to switch to it?',
    switch: 'Switch to $1',
    cancel: 'Cancel',
    remember: 'Remember my choice',
  },
  '/zh/': {
    name: '简体中文',
    hint: '你的首选语言是 $1，是否切换到该语言？',
    switch: '切换到 $1',
    cancel: '取消',
    remember: '记住我的选择',
  },
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

const PopupHost = defineComponent({
  name: 'PopupHost',
  setup: (): (() => VNode) => () => h(RedirectPopup, { config, locales }),
})

interface PopupFixture {
  client: Awaited<ReturnType<typeof createTestClient>>
  wrapper: VueWrapper
}

const resetPopupState = async (languages: string[]): Promise<void> => {
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

const createPopup = async (): Promise<PopupFixture> => {
  const client = await createTestClient({
    page: { path: '/zh/' },
    rootComponent: PopupHost,
    route: '/zh/',
    routes,
    site,
  })
  const wrapper = await client.mount()

  await flushPromises()

  return { client, wrapper }
}

describe('redirect popup', () => {
  it('shows the switch button with the locale strings of both locales', async () => {
    await resetPopupState(['en-US', 'en'])
    const { wrapper } = await createPopup()

    expect(wrapper.find('.redirect-popup').exists()).toBe(true)
    expect(wrapper.find('.redirect-popup-redirect-button').text()).toBe(
      'Switch to English',
    )
    expect(wrapper.find('.redirect-popup-hint label').text()).toBe(
      'Remember my choice',
    )
    expect(
      wrapper.find('.redirect-close-button').attributes('aria-label'),
    ).toBe('取消')
  })

  it('does not show the popup when the current locale is preferred', async () => {
    await resetPopupState(['zh-CN'])
    const { wrapper } = await createPopup()

    expect(wrapper.find('.redirect-popup').exists()).toBe(false)
  })

  it('navigates to the target locale and remembers the choice on switch', async () => {
    await resetPopupState(['en-US', 'en'])
    const { client, wrapper } = await createPopup()

    await wrapper.find('.redirect-popup-redirect-button').trigger('click')
    await flushPromises()
    await nextTick()

    expect(client.router.currentRoute.value.path).toBe('/')
    expect(wrapper.find('.redirect-popup').exists()).toBe(false)
    expect(statusSessionStorage.value['/zh/']).toBe(true)
    expect(statusLocalStorage.value['/zh/']).toBeUndefined()
  })

  it('closes the popup and remembers the dismissal for the session', async () => {
    await resetPopupState(['en-US', 'en'])
    const { wrapper } = await createPopup()

    await wrapper.find('.redirect-close-button').trigger('click')
    await nextTick()

    expect(wrapper.find('.redirect-popup').exists()).toBe(false)
    expect(statusSessionStorage.value['/zh/']).toBe(true)
    expect(statusLocalStorage.value['/zh/']).toBeUndefined()
  })

  it('persists the choice to localStorage when remember is checked', async () => {
    await resetPopupState(['en-US', 'en'])
    const { wrapper } = await createPopup()

    await wrapper.find('input#remember-redirect').setValue(true)
    await wrapper.find('.redirect-close-button').trigger('click')
    await nextTick()

    expect(statusLocalStorage.value['/zh/']).toBe(true)
  })
})
