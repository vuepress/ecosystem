import {
  collectClientDefines,
  createTestApp,
  stubClientDefines,
} from '@vuepress/test-utils'
import { createTestClient, renderVuePress } from '@vuepress/test-utils/client'
import { describe, expect, it, vi } from 'vitest'
import type { VNode } from 'vue'
import { defineComponent, h, resolveComponent } from 'vue'
import type { PageHeader } from 'vuepress/client'

import { Toc } from '../../src/client/components/Toc.js'
import { tocPlugin } from '../../src/node/index.js'

const headers: PageHeader[] = [
  {
    children: [],
    level: 2,
    link: '#first',
    slug: 'first',
    title: 'First',
  },
  {
    children: [
      {
        children: [],
        level: 3,
        link: '#sub',
        slug: 'sub',
        title: 'Sub',
      },
    ],
    level: 2,
    link: '#second',
    slug: 'second',
    title: 'Second',
  },
]

const createTocProbe = (
  props: Record<string, unknown>,
): ReturnType<typeof defineComponent> =>
  defineComponent({
    name: 'TocProbe',
    setup: (): (() => VNode) => () => h(Toc, props),
  })

describe('toc component', () => {
  it('should render the given headers with their children', async () => {
    const html = await renderVuePress({
      rootComponent: createTocProbe({ headers }),
      page: { path: '/guide/', title: 'Guide' },
    })

    expect(html).toContain('<nav class="vuepress-toc">')
    expect(html).toContain('class="vuepress-toc-list"')
    expect(html).toContain('class="vuepress-toc-item"')
    expect(html).toContain('First')
    expect(html).toContain('Second')
  })

  it('should render the children in a nested list with links to the anchors', async () => {
    const html = await renderVuePress({
      rootComponent: createTocProbe({ headers }),
      page: { path: '/guide/', title: 'Guide' },
    })

    // children are rendered in a nested list
    expect(html).toContain('Sub')
    expect(html.match(/vuepress-toc-list/gu)).toHaveLength(2)
    // the links point at the header anchors
    expect(html).toContain('#first')
    expect(html).toContain('#sub')
  })

  it('should render the anchors with the configured link tag', async () => {
    const html = await renderVuePress({
      rootComponent: createTocProbe({
        headers,
        renderOptions: { linkTag: 'a' },
      }),
      page: { path: '/guide/', title: 'Guide' },
    })

    // a plain anchor is rendered instead of a route link
    expect(html).toContain('<a href="#first" class="vuepress-toc-link"')
    expect(html).not.toContain('route-link')
  })

  it('should render without the container when containerTag is emptied', async () => {
    const html = await renderVuePress({
      rootComponent: createTocProbe({
        headers,
        renderOptions: { containerTag: '', containerClass: 'my-toc' },
      }),
      page: { path: '/guide/', title: 'Guide' },
    })

    expect(html).not.toContain('<nav')
    expect(html).not.toContain('my-toc')
    expect(html).toContain('vuepress-toc-list')
  })

  it('should mark the header of the current route hash as active', async () => {
    const client = await createTestClient({
      page: { path: '/guide/', title: 'Guide' },
      rootComponent: createTocProbe({ headers }),
    })

    await client.router.push('/guide/#second')

    const html = await client.renderToString()

    expect(html).toContain('vuepress-toc-link active')
    expect(html.match(/vuepress-toc-link active/gu)).toHaveLength(1)
  })

  it('should mark a header with an active child hash as active', async () => {
    const client = await createTestClient({
      page: { path: '/guide/', title: 'Guide' },
      rootComponent: createTocProbe({ headers }),
    })

    await client.router.push('/guide/#sub')

    const html = await client.renderToString()

    // the child link and its parent are both marked as active
    expect(html.match(/active/gu)).toHaveLength(2)
    expect(html).toContain('href="#sub"')
  })

  it('should mark every ancestor of an active deeply nested header', async () => {
    const deepHeaders: PageHeader[] = [
      {
        children: [
          {
            children: [
              {
                children: [],
                level: 4,
                link: '#deep',
                slug: 'deep',
                title: 'Deep',
              },
            ],
            level: 3,
            link: '#mid',
            slug: 'mid',
            title: 'Mid',
          },
        ],
        level: 2,
        link: '#top',
        slug: 'top',
        title: 'Top',
      },
    ]

    const client = await createTestClient({
      page: { path: '/guide/', title: 'Guide' },
      rootComponent: createTocProbe({ headers: deepHeaders }),
    })

    await client.router.push('/guide/#deep')

    const html = await client.renderToString()

    // the deep link, its parent and its grandparent are all marked as active
    expect(html.match(/vuepress-toc-link active/gu)).toHaveLength(3)
  })
})

describe('toc client config', () => {
  it('should register the component with the options defined in Node', async () => {
    const app = await createTestApp({
      plugins: [
        tocPlugin({
          componentName: 'MyToc',
          renderOptions: { containerClass: 'my-toc', linkClass: 'my-link' },
        }),
      ],
    })

    try {
      const defines = await collectClientDefines(app)

      expect(defines.__TOC_COMPONENT_NAME__).toBe('MyToc')
      expect(defines.__TOC_RENDER_OPTIONS__).toStrictEqual({
        containerClass: 'my-toc',
        linkClass: 'my-link',
      })

      const restore = stubClientDefines(defines)

      try {
        // the client config reads the defines at module scope
        vi.resetModules()
        const { default: tocClientConfig } =
          await import('../../src/client/config.js')

        const Probe = defineComponent({
          name: 'TocProbe',
          setup: (): (() => VNode) => () => {
            const TocComponent = resolveComponent('MyToc')

            return h(TocComponent, { headers })
          },
        })

        const html = await renderVuePress({
          clientConfigs: [tocClientConfig],
          page: { path: '/guide/', title: 'Guide' },
          rootComponent: Probe,
        })

        expect(html).toContain('<nav class="my-toc">')
        expect(html).toContain('my-link')
        expect(html).not.toContain('class="vuepress-toc"')
      } finally {
        restore()
      }
    } finally {
      app.cleanup()
    }
  })
})
