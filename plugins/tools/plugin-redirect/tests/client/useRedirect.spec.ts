// @vitest-environment happy-dom
import type { VueWrapper } from '@vue/test-utils'
import { flushPromises } from '@vue/test-utils'
import { createTestClient } from '@vuepress/test-utils/client'
import { describe, expect, it } from 'vitest'
import type { VNode } from 'vue'
import { defineComponent, h, nextTick } from 'vue'

import { useRedirect } from '../../src/client/composables/useRedirect.js'
import type { RedirectPluginLocaleConfig } from '../../src/client/types.js'
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

const RedirectProbe = defineComponent({
  name: 'RedirectProbe',
  setup() {
    const { showComponent, shouldRemember, locale, persistUserAction } =
      useRedirect({ config, locales })

    return (): VNode =>
      h('div', { class: 'probe' }, [
        h('span', { class: 'show' }, String(showComponent.value)),
        h('span', { class: 'remember' }, String(shouldRemember.value)),
        h('span', { class: 'locale' }, JSON.stringify(locale.value)),
        h(
          'button',
          {
            class: 'persist',
            onClick: (): void => {
              shouldRemember.value = true
              persistUserAction()
            },
          },
          'persist',
        ),
      ])
  },
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

const createProbe = async (): Promise<{
  client: Awaited<ReturnType<typeof createTestClient>>
  wrapper: VueWrapper
}> => {
  const client = await createTestClient({
    page: { path: '/zh/' },
    rootComponent: RedirectProbe,
    route: '/zh/',
    routes,
    site,
  })
  const wrapper = await client.mount()

  await flushPromises()
  await client.router.isReady()

  return { client, wrapper }
}

describe('redirect composable', () => {
  it('shows the component when the preferred locale differs from the current one', async () => {
    await resetRedirectState(['en-US', 'en'])

    const { client, wrapper } = await createProbe()

    expect(client.router.currentRoute.value.path).toBe('/zh/')
    expect(wrapper.find('.show').text()).toBe('true')
    expect(JSON.parse(wrapper.find('.locale').text())).toStrictEqual({
      hint: [
        'Your primary language is en-US, do you want to switch to it?',
        '你的首选语言是 en-US，是否切换到该语言？',
      ],
      switch: 'Switch to English',
      cancel: '取消',
      remember: 'Remember my choice',
    })
  })

  it('hides the component when the route changes', async () => {
    await resetRedirectState(['en-US', 'en'])

    const { client, wrapper } = await createProbe()

    expect(wrapper.find('.show').text()).toBe('true')

    await client.router.push('/')
    await flushPromises()
    await nextTick()

    expect(wrapper.find('.show').text()).toBe('false')
  })

  it('remembers the user action in the storages', async () => {
    await resetRedirectState(['en-US', 'en'])

    const { wrapper } = await createProbe()

    await wrapper.find('.persist').trigger('click')
    await nextTick()

    expect(statusSessionStorage.value['/zh/']).toBe(true)
    expect(statusLocalStorage.value['/zh/']).toBe(true)
    expect(wrapper.find('.show').text()).toBe('false')
  })
})
