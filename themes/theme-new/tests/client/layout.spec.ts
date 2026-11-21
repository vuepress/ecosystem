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
      // no `type` in the frontmatter: the default page type is `doc`
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
      page: { path: '/', title: 'Home', frontmatter: { type: 'home' } },
      site: { title: 'My Site' },
      themeData: {},
    })

    expect(html).toContain('class="vp-theme-container"')
    expect(html).toContain('class="vp-hero"')
    expect(html).not.toContain('class="vp-doc-aside"')
  })

  it('should render the bare page container for the page type', async () => {
    const html = await renderVuePress({
      clientConfigs: await createClientConfigs(),
      content: '<p>Bare page</p>',
      page: { path: '/page/', title: 'Page', frontmatter: { type: 'page' } },
      site: { title: 'My Site' },
      themeData: {},
    })

    expect(html).toContain('class="vp-page"')
    expect(html).toContain('Bare page')
    expect(html).not.toContain('class="vp-doc"')
  })

  it('should render the content without the layout shell when the type is false', async () => {
    const html = await renderVuePress({
      clientConfigs: await createClientConfigs(),
      content: '<p>Raw content</p>',
      page: { path: '/raw/', title: 'Raw', frontmatter: { type: false } },
      site: { title: 'My Site' },
      themeData: {},
    })

    expect(html).toContain('Raw content')
    expect(html).not.toContain('class="vp-theme-container"')
  })
})
