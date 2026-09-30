import { mountVuePress } from '@vuepress/test-utils/client'
import { describe, expect, it } from 'vitest'
// @vitest-environment happy-dom
import type { VNode } from 'vue'
import { defineComponent, h } from 'vue'

import { useRedirectLocation } from '../../src/client/composables/useRedirectLocation.js'
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

const LocationProbe = defineComponent({
  name: 'LocationProbe',
  setup() {
    const location = useRedirectLocation(config)

    return (): VNode =>
      h('div', { class: 'location' }, JSON.stringify(location.value))
  },
})

const stubLanguages = (languages: string[]): void => {
  Object.defineProperty(navigator, 'languages', {
    configurable: true,
    value: languages,
  })
}

const renderLocation = async (route: string): Promise<string> => {
  const wrapper = await mountVuePress({
    page: { path: route },
    rootComponent: LocationProbe,
    route,
    site,
  })

  return wrapper.find('.location').text()
}

describe('redirect location resolution', () => {
  it('resolves the locale matching the preferred language', async () => {
    stubLanguages(['en-US', 'en'])

    const html = await renderLocation('/zh/')

    expect(JSON.parse(html)).toStrictEqual({ lang: 'en-US', localePath: '/' })
  })

  it('returns null when the current locale is already preferred', async () => {
    stubLanguages(['zh-CN'])

    const html = await renderLocation('/zh/')

    expect(JSON.parse(html)).toBeNull()
  })

  it('returns null when the route is not a configured locale', async () => {
    stubLanguages(['en-US', 'en'])

    const html = await renderLocation('/about/')

    expect(html).toBe('null')
  })
})
