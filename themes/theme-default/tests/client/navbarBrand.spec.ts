import { mountVuePress, renderVuePress } from '@vuepress/test-utils/client'
// @vitest-environment happy-dom
import { describe, expect, it } from 'vitest'

import themeDataClientConfig from '../../../../plugins/development/plugin-theme-data/src/client/config.js'
import VPNavbarBrand from '../../src/client/components/VPNavbarBrand.vue'
import defaultThemeClientConfig from '../../src/client/config.js'

/**
 * The client configs that a default theme site applies
 *
 * In a real site they are injected by the plugins and the theme, and here they
 * are applied explicitly so that the `enhance` hooks of the theme data plugin
 * and the theme run before the component is rendered.
 */
const clientConfigs = [themeDataClientConfig, defaultThemeClientConfig]

describe('theme navbar brand', () => {
  it('should render the site title and the brand link', async () => {
    const html = await renderVuePress({
      clientConfigs,
      rootComponent: VPNavbarBrand,
      page: { path: '/guide/', title: 'Guide' },
      site: { title: 'My Site' },
      themeData: { home: '/home/' },
    })

    expect(html).toContain('class="vp-site-name"')
    expect(html).toContain('My Site')
    expect(html).toContain('href="/home/"')
  })

  it('should fallback the brand link to the route locale', async () => {
    const html = await renderVuePress({
      clientConfigs,
      rootComponent: VPNavbarBrand,
      page: { path: '/zh/guide/', title: '指南' },
      site: {
        locales: {
          '/': { lang: 'en-US', title: 'My Site' },
          '/zh/': { lang: 'zh-CN', title: '我的站点' },
        },
        title: 'My Site',
      },
      themeData: {},
    })

    expect(html).toContain('href="/zh/"')
    expect(html).toContain('我的站点')
  })

  it('should render the logo with the site base', async () => {
    const html = await renderVuePress({
      clientConfigs,
      rootComponent: VPNavbarBrand,
      site: { title: 'My Site' },
      themeData: { locales: { '/': { logo: '/images/logo.png' } } },
    })

    expect(html).toContain('src="/images/logo.png"')
    expect(html).toContain('alt="My Site"')
  })

  it('should use the logo alt when it is provided', async () => {
    const html = await renderVuePress({
      clientConfigs,
      rootComponent: VPNavbarBrand,
      site: { title: 'My Site' },
      themeData: { locales: { '/': { logo: '/logo.png', logoAlt: 'Logo' } } },
    })

    expect(html).toContain('alt="Logo"')
  })

  it('should hide the alternate dark mode logo in SSR', async () => {
    const html = await renderVuePress({
      clientConfigs,
      rootComponent: VPNavbarBrand,
      site: { title: 'My Site' },
      themeData: {
        locales: { '/': { logo: '/logo.png', logoDark: '/logo-dark.png' } },
      },
    })

    expect(html).not.toContain('logo-dark.png')
  })

  it('should render the light logo in the DOM when dark mode is disabled', async () => {
    const wrapper = await mountVuePress({
      clientConfigs,
      rootComponent: VPNavbarBrand,
      site: { title: 'My Site' },
      themeData: {
        locales: {
          '/': {
            logo: '/logo.png',
            logoDark: '/logo-dark.png',
            toggleColorMode: false,
          },
        },
      },
    })

    expect(wrapper.find('img.vp-site-logo').attributes('src')).toBe('/logo.png')
  })

  it('should hide the site name from screen readers when the logo alt matches it', async () => {
    const html = await renderVuePress({
      clientConfigs,
      rootComponent: VPNavbarBrand,
      site: { title: 'My Site' },
      themeData: {
        locales: { '/': { logo: '/logo.png', logoAlt: 'My Site' } },
      },
    })

    expect(html).toContain('aria-hidden="true"')
  })
})
