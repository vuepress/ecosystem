import { renderVuePress } from '@vuepress/test-utils/client'
import { describe, expect, it } from 'vitest'
import type { ClientConfig } from 'vuepress/client'

const createClientConfigs = async (): Promise<ClientConfig[]> => {
  const [{ default: themeDataClientConfig }, { default: themeClientConfig }] =
    await Promise.all([
      import('../../../../plugins/development/plugin-theme-data/src/client/config.js'),
      import('../../src/client/config.js'),
    ])

  return [themeDataClientConfig, themeClientConfig]
}

describe('theme layout', () => {
  it('should render the layout shell for a doc page', async () => {
    const html = await renderVuePress({
      clientConfigs: await createClientConfigs(),
      content: '<h1 id="hello">Hello</h1>',
      page: { path: '/guide/', title: 'Guide' },
      site: { title: 'My Site' },
      themeData: {
        nav: [{ text: 'Guide', link: '/guide/' }],
      },
    })

    expect(html).toContain('class="vp-theme-container"')
    expect(html).toContain('class="vp-nav"')
    expect(html).toContain('My Site')
    expect(html).toContain('Hello')
  })

  it('should render the home page without the doc aside', async () => {
    const html = await renderVuePress({
      clientConfigs: await createClientConfigs(),
      content: '<div class="vp-hero">Hero</div>',
      page: {
        path: '/',
        title: 'Home',
        // the node side normalizes the VitePress layout name to `Layout`, and
        // the client restores the original name from the page data
        frontmatter: { layout: 'Layout' },
        data: { originalLayout: 'home' },
      },
      site: { title: 'My Site' },
      themeData: {},
    })

    expect(html).toContain('class="vp-theme-container"')
    expect(html).toContain('class="vp-hero"')
    expect(html).not.toContain('class="vp-doc-aside"')
  })
})
