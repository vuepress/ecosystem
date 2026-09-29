import {
  resolveThemeLocaleData,
  useThemeData,
  useThemeLocaleData,
} from '@vuepress/plugin-theme-data/client'
import { createTestClient, renderVuePress } from '@vuepress/test-utils/client'
import { describe, expect, it } from 'vitest'
import type { VNode } from 'vue'
import { defineComponent, getCurrentInstance, h } from 'vue'

import themeDataClientConfig from '../../src/client/config.js'

const ThemeProbe = defineComponent({
  name: 'ThemeProbe',
  setup() {
    const theme = useThemeData<{ title: string }>()

    return (): VNode => h('span', { class: 'theme' }, theme.value.title)
  },
})

const LocaleProbe = defineComponent({
  name: 'LocaleProbe',
  setup() {
    const locale = useThemeLocaleData<{ title: string }>()

    return (): VNode => h('span', { class: 'locale' }, locale.value.title)
  },
})

const GlobalProbe = defineComponent({
  name: 'GlobalProbe',
  setup() {
    const instance = getCurrentInstance()!
    const globals = instance.appContext.config.globalProperties as unknown as {
      $theme: { title: string }
      $themeLocale: { title: string }
    }

    return (): VNode =>
      h('div', { class: 'probe' }, [
        h('span', { class: 'theme' }, globals.$theme.title),
        h('span', { class: 'locale' }, globals.$themeLocale.title),
      ])
  },
})

describe(resolveThemeLocaleData, () => {
  it('should merge the locale data over the root data', () => {
    const theme = {
      title: 'Root',
      locales: {
        '/': { title: 'Home' },
        '/zh/': { title: '首页', extra: true },
      },
    }

    expect(resolveThemeLocaleData(theme, '/zh/')).toStrictEqual({
      title: '首页',
      extra: true,
    })
  })

  it('should keep the root data when the locale is missing', () => {
    const theme = {
      title: 'Root',
      locales: { '/': { title: 'Home' } },
    }

    expect(resolveThemeLocaleData(theme, '/fr/')).toStrictEqual({
      title: 'Root',
    })
  })

  it('should not expose the locales field in the result', () => {
    const theme = {
      title: 'Root',
      locales: { '/': { title: 'Home' } },
    }

    expect(resolveThemeLocaleData(theme, '/')).not.toHaveProperty('locales')
  })
})

describe('theme data composables', () => {
  it('should expose the configured theme data', async () => {
    const html = await renderVuePress({
      rootComponent: ThemeProbe,
      themeData: { title: 'My Theme' },
    })

    expect(html).toContain('<span class="theme">My Theme</span>')
  })

  it('should merge the theme locale data for the current route', async () => {
    const html = await renderVuePress({
      clientConfigs: [themeDataClientConfig],
      page: { path: '/zh/' },
      rootComponent: LocaleProbe,
      site: {
        locales: {
          '/': { lang: 'en-US' },
          '/zh/': { lang: 'zh-CN' },
        },
      },
      themeData: {
        locales: {
          '/': { title: 'Home' },
          '/zh/': { title: '首页' },
        },
        title: 'Root',
      },
    })

    expect(html).toContain('<span class="locale">首页</span>')
  })

  it('should fall back to the root data when the route locale is missing', async () => {
    const html = await renderVuePress({
      clientConfigs: [themeDataClientConfig],
      page: { path: '/fr/' },
      rootComponent: LocaleProbe,
      site: {
        locales: {
          '/': { lang: 'en-US' },
          '/fr/': { lang: 'fr-FR' },
        },
      },
      themeData: {
        locales: { '/': { title: 'Home' } },
        title: 'Root',
      },
    })

    expect(html).toContain('<span class="locale">Root</span>')
  })

  it('should throw when the locale data is used without the provider', async () => {
    await expect(
      renderVuePress({ rootComponent: LocaleProbe }),
    ).rejects.toThrow('useThemeLocaleData() is called without provider.')
  })

  it('should install the $theme and $themeLocale global properties', async () => {
    const html = await renderVuePress({
      clientConfigs: [themeDataClientConfig],
      page: { path: '/zh/' },
      rootComponent: GlobalProbe,
      site: {
        locales: {
          '/': { lang: 'en-US' },
          '/zh/': { lang: 'zh-CN' },
        },
      },
      themeData: {
        locales: {
          '/': { title: 'Home' },
          '/zh/': { title: '首页' },
        },
        title: 'Root',
      },
    })

    expect(html).toContain('<span class="theme">Root</span>')
    expect(html).toContain('<span class="locale">首页</span>')
  })

  it('should update the theme locale data on navigation', async () => {
    const client = await createTestClient({
      clientConfigs: [themeDataClientConfig],
      content: LocaleProbe,
      page: { path: '/' },
      routes: {
        '/zh/': { component: LocaleProbe, pageData: { path: '/zh/' } },
      },
      site: {
        locales: {
          '/': { lang: 'en-US' },
          '/zh/': { lang: 'zh-CN' },
        },
      },
      themeData: {
        locales: {
          '/': { title: 'Home' },
          '/zh/': { title: '首页' },
        },
        title: 'Root',
      },
    })

    await expect(client.renderToString()).resolves.toContain(
      '<span class="locale">Home</span>',
    )

    await client.router.push('/zh/')

    await expect(client.renderToString()).resolves.toContain(
      '<span class="locale">首页</span>',
    )
  })
})
