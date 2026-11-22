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

  it('should render the contributors in the doc footer', async () => {
    const contributors = [
      {
        name: 'Alice',
        email: 'alice@example.com',
        url: 'https://example.com/alice',
      },
      { name: 'Bob', email: 'bob@example.com' },
    ]

    const html = await renderVuePress({
      clientConfigs: await createClientConfigs(),
      content: '<h1 id="hello">Hello</h1>',
      page: {
        path: '/guide/',
        title: 'Guide',
        data: { filePathRelative: 'guide/index.md', git: { contributors } },
      },
      site: { title: 'My Site' },
      themeData: {},
    })

    expect(html).toContain('class="vp-doc-footer-contributors"')
    expect(html).toContain('Contributors')
    expect(html).toContain('href="https://example.com/alice"')
    expect(html).toContain('Bob')

    const disabledHtml = await renderVuePress({
      clientConfigs: await createClientConfigs(),
      content: '<h1 id="hello">Hello</h1>',
      page: {
        path: '/guide/',
        title: 'Guide',
        frontmatter: { contributors: false },
        data: { filePathRelative: 'guide/index.md', git: { contributors } },
      },
      site: { title: 'My Site' },
      themeData: {},
    })

    expect(disabledHtml).not.toContain('class="vp-doc-footer-contributors"')
  })

  it('should hide the last updated time when disabled', async () => {
    const updatedTime = 1_700_000_000_000

    const enabledHtml = await renderVuePress({
      clientConfigs: await createClientConfigs(),
      content: '<h1 id="hello">Hello</h1>',
      page: {
        path: '/guide/',
        title: 'Guide',
        data: { filePathRelative: 'guide/index.md', git: { updatedTime } },
      },
      site: { title: 'My Site' },
      themeData: {},
    })

    expect(enabledHtml).toContain('class="vp-last-updated"')

    // `lastUpdated: false` in the page frontmatter wins over the git data
    const pageDisabledHtml = await renderVuePress({
      clientConfigs: await createClientConfigs(),
      content: '<h1 id="hello">Hello</h1>',
      page: {
        path: '/guide/',
        title: 'Guide',
        frontmatter: { lastUpdated: false },
        data: { filePathRelative: 'guide/index.md', git: { updatedTime } },
      },
      site: { title: 'My Site' },
      themeData: {},
    })

    expect(pageDisabledHtml).not.toContain('class="vp-last-updated"')

    // the theme-level option works as well
    const themeDisabledHtml = await renderVuePress({
      clientConfigs: await createClientConfigs(),
      content: '<h1 id="hello">Hello</h1>',
      page: {
        path: '/guide/',
        title: 'Guide',
        data: { filePathRelative: 'guide/index.md', git: { updatedTime } },
      },
      site: { title: 'My Site' },
      themeData: { lastUpdated: false },
    })

    expect(themeDisabledHtml).not.toContain('class="vp-last-updated"')
  })

  it('should render the content without the layout shell for the content type', async () => {
    const html = await renderVuePress({
      clientConfigs: await createClientConfigs(),
      content: '<p>Raw content</p>',
      page: { path: '/raw/', title: 'Raw', frontmatter: { type: 'content' } },
      site: { title: 'My Site' },
      themeData: {},
    })

    expect(html).toContain('Raw content')
    expect(html).not.toContain('class="vp-theme-container"')
  })
})
