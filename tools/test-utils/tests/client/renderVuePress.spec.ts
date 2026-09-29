import { describe, expect, it } from 'vitest'
import type { VNode } from 'vue'
import { defineComponent, h } from 'vue'
import {
  RouteLink,
  usePageData,
  useRouteLocale,
  useSiteLocaleData,
  useUpdateHead,
  withBase,
} from 'vuepress/client'

import { createTestClient } from '../../src/client/createTestClient.js'
import { renderVuePress } from '../../src/client/renderVuePress.js'

const Probe = defineComponent({
  name: 'Probe',
  setup() {
    const page = usePageData()
    const routeLocale = useRouteLocale()
    const siteLocale = useSiteLocaleData()

    return (): VNode =>
      h('div', { class: 'probe' }, [
        h('span', { class: 'title' }, page.value.title),
        h('span', { class: 'locale' }, routeLocale.value),
        h('span', { class: 'site' }, siteLocale.value.title),
        h('span', { class: 'base' }, withBase('/foo/')),
      ])
  },
})

describe(renderVuePress, () => {
  it('should render the component with client data', async () => {
    const html = await renderVuePress({
      content: Probe,
      page: { path: '/', title: 'Home' },
      site: { title: 'My Site' },
    })

    expect(html).toContain('<span class="title">Home</span>')
    expect(html).toContain('<span class="site">My Site</span>')
  })

  it('should apply the vuepress defines', async () => {
    const html = await renderVuePress({ content: Probe })

    expect(html).toContain('<span class="base">/foo/</span>')
  })

  it('should resolve the locale from the route path', async () => {
    const html = await renderVuePress({
      content: Probe,
      page: { path: '/zh/', title: '首页' },
      site: {
        locales: {
          '/': { lang: 'en-US', title: 'My Site' },
          '/zh/': { lang: 'zh-CN', title: '我的站点' },
        },
        title: 'My Site',
      },
    })

    expect(html).toContain('<span class="locale">/zh/</span>')
    expect(html).toContain('<span class="site">我的站点</span>')
  })

  it('should render string content as HTML', async () => {
    const html = await renderVuePress({ content: '<h1>Content</h1>' })

    expect(html).toContain('<h1>Content</h1>')
  })

  it('should render the given root component directly', async () => {
    const Root = defineComponent({
      name: 'Root',
      setup: (): (() => VNode) => () => h('p', { class: 'root' }, 'Root'),
    })

    const html = await renderVuePress({
      content: '<p>page</p>',
      rootComponent: Root,
    })

    expect(html).toContain('<p class="root">Root</p>')
    expect(html).not.toContain('<p>page</p>')
  })

  it('should render the layout', async () => {
    const Layout = defineComponent({
      name: 'Layout',
      setup: (): (() => VNode) => () =>
        h('div', { class: 'my-layout' }, 'Layout'),
    })

    const html = await renderVuePress({
      content: Probe,
      layouts: { Layout },
    })

    expect(html).toContain('<div class="my-layout">Layout</div>')
  })

  it('should apply the client configs', async () => {
    const setup = (): void => {}

    const RootComponent = defineComponent({
      name: 'RootComponent',
      setup: (): (() => VNode) => () =>
        h('div', { class: 'root-component' }, 'RootComponent'),
    })

    const html = await renderVuePress({
      clientConfigs: [{ rootComponents: [RootComponent], setup }],
      content: Probe,
    })

    expect(html).toContain('<div class="root-component">RootComponent</div>')
  })

  it('should register the enhanced components of the client configs', async () => {
    const Enhanced = defineComponent({
      name: 'Enhanced',
      setup: (): (() => VNode) => () =>
        h('span', { class: 'enhanced' }, 'Enhanced'),
    })

    const Layout = defineComponent({
      name: 'Layout',
      setup: (): (() => VNode) => () =>
        h('div', { class: 'my-layout' }, [h(Enhanced)]),
    })

    const html = await renderVuePress({
      clientConfigs: [
        {
          enhance: ({ app }): void => {
            app.component('Enhanced', Enhanced)
          },
        },
      ],
      content: Probe,
      layouts: { Layout },
    })

    expect(html).toContain('<span class="enhanced">Enhanced</span>')
  })

  it('should provide a working RouteLink', async () => {
    const Link = defineComponent({
      name: 'Link',
      setup: (): (() => VNode) => () =>
        h(RouteLink, { to: '/other/' }, () => 'Other'),
    })

    const html = await renderVuePress({ content: Link })

    expect(html).toContain('href="/other/"')
  })
})

describe(createTestClient, () => {
  it('should update the page data on navigation', async () => {
    const client = await createTestClient({
      content: Probe,
      page: { path: '/', title: 'Home' },
      routes: {
        '/other/': { component: Probe, pageData: { title: 'Other' } },
      },
    })

    await expect(client.renderToString()).resolves.toContain(
      '<span class="title">Home</span>',
    )

    await client.router.push('/other/')

    await expect(client.renderToString()).resolves.toContain(
      '<span class="title">Other</span>',
    )
  })

  it('should collect the head updates', async () => {
    const HeadProbe = defineComponent({
      name: 'HeadProbe',
      setup() {
        const updateHead = useUpdateHead()

        return (): VNode => h('button', { onClick: updateHead }, 'update')
      },
    })

    const client = await createTestClient({
      content: HeadProbe,
      page: {
        frontmatter: { description: 'A page' },
        path: '/',
        title: 'Home',
      },
    })

    expect(client.headUpdates).toHaveLength(0)

    client.updateHead()

    expect(client.headUpdates).toHaveLength(1)
    expect(JSON.stringify(client.headUpdates[0])).toContain('A page')
  })
})
