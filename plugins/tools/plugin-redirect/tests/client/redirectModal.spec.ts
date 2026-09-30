// @vitest-environment happy-dom
import type { VueWrapper } from '@vue/test-utils'
import { flushPromises } from '@vue/test-utils'
import { createTestClient } from '@vuepress/test-utils/client'
import { describe, expect, it, vi } from 'vitest'
import type { VNode } from 'vue'
import { defineComponent, h, nextTick } from 'vue'

import RedirectModal from '../../src/client/components/RedirectModal.js'
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

const ModalHost = defineComponent({
  name: 'ModalHost',
  setup: (): (() => VNode) => () => h(RedirectModal, { config, locales }),
})

interface ModalFixture {
  client: Awaited<ReturnType<typeof createTestClient>>
  wrapper: VueWrapper
}

const resetModalState = async (languages: string[]): Promise<void> => {
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

const createModal = async (): Promise<ModalFixture> => {
  const client = await createTestClient({
    page: { path: '/zh/' },
    rootComponent: ModalHost,
    route: '/zh/',
    routes,
    site,
  })
  const wrapper = await client.mount()

  await flushPromises()

  return { client, wrapper }
}

describe('redirect modal', () => {
  it('shows the hint of both locales and the localized actions', async () => {
    await resetModalState(['en-US', 'en'])
    const { wrapper } = await createModal()

    expect(wrapper.find('.redirect-modal-mask').exists()).toBe(true)
    expect(
      wrapper.findAll('.redirect-modal-content p').map((p) => p.text()),
    ).toStrictEqual([
      'Your primary language is en-US, do you want to switch to it?',
      '你的首选语言是 en-US，是否切换到该语言？',
    ])
    expect(wrapper.find('.redirect-modal-action.primary').text()).toBe(
      'Switch to English',
    )
    expect(wrapper.findAll('.redirect-modal-action')[1].text()).toBe('取消')
  })

  it('navigates to the target locale when the switch action is confirmed', async () => {
    await resetModalState(['en-US', 'en'])
    const { client, wrapper } = await createModal()

    await wrapper.find('.redirect-modal-action.primary').trigger('click')
    await flushPromises()
    await nextTick()

    expect(client.router.currentRoute.value.path).toBe('/')
    expect(wrapper.find('.redirect-modal-mask').exists()).toBe(false)
    expect(statusSessionStorage.value['/zh/']).toBe(true)
  })

  it('closes the modal without navigating when it is dismissed', async () => {
    await resetModalState(['en-US', 'en'])
    const { client, wrapper } = await createModal()

    await wrapper.findAll('.redirect-modal-action')[1].trigger('click')
    await nextTick()

    expect(client.router.currentRoute.value.path).toBe('/zh/')
    expect(wrapper.find('.redirect-modal-mask').exists()).toBe(false)
    expect(statusSessionStorage.value['/zh/']).toBe(true)
    expect(statusLocalStorage.value['/zh/']).toBeUndefined()
  })

  it('persists the dismissal to localStorage when remember is checked', async () => {
    await resetModalState(['en-US', 'en'])
    const { wrapper } = await createModal()

    await wrapper.find('input#remember-redirect').setValue(true)
    await wrapper.findAll('.redirect-modal-action')[1].trigger('click')
    await nextTick()

    expect(statusLocalStorage.value['/zh/']).toBe(true)
  })
})
