import {
  collectClientDefines,
  createTestApp,
  stubClientDefines,
} from '@vuepress/test-utils'
import type { TestClientOptions } from '@vuepress/test-utils/client'
import { createTestClient, getRoutesState } from '@vuepress/test-utils/client'
import { describe, expect, it } from 'vitest'
import type { VNode } from 'vue'
import { defineComponent, h } from 'vue'

import Catalog from '../../src/client/components/Catalog.js'
import catalogClientConfig from '../../src/client/config.js'
import { defineCatalogInfoGetter } from '../../src/client/index.js'
import { catalogPlugin } from '../../src/node/index.js'

// Render the `Catalog` component with the given props.
//
// The route meta of the generated catalog items is mutated right after the test
// client is created, because the test client's `routes` option does not accept
// route meta.
const renderCatalog = async (
  props: Record<string, unknown>,
  {
    metas = {},
    ...options
  }: TestClientOptions & { metas?: Record<string, Record<string, unknown>> },
): Promise<string> => {
  const CatalogProbe = defineComponent({
    name: 'CatalogProbe',
    setup: (): (() => VNode) => () => h(Catalog, props),
  })

  const client = await createTestClient({
    clientConfigs: [catalogClientConfig],
    rootComponent: CatalogProbe,
    ...options,
  })

  const { routes } = getRoutesState()

  for (const [path, meta] of Object.entries(metas))
    Object.assign(routes[path].meta, meta)

  return client.renderToString()
}

const site = {
  locales: {
    '/': { lang: 'en-US', title: 'My Site' },
    '/zh/': { lang: 'zh-CN', title: '我的站点' },
  },
  title: 'My Site',
}

describe('catalog component', () => {
  it('should render the catalog items of the current page', async () => {
    const app = await createTestApp({
      locales: { '/': { lang: 'en-US' } },
      plugins: [catalogPlugin({ locales: { '/': { title: 'My Catalog' } } })],
    })

    try {
      const restore = stubClientDefines(await collectClientDefines(app))

      try {
        const html = await renderCatalog(
          {},
          {
            metas: {
              '/guide/a/': { title: 'A' },
              '/guide/a/c/': { title: 'C' },
              '/guide/b/': { title: 'B' },
            },
            page: { path: '/guide/', title: 'Guide' },
            routes: { '/guide/a/': {}, '/guide/a/c/': {}, '/guide/b/': {} },
            site,
          },
        )

        // the title comes from the Node locale define
        expect(html).toContain('My Catalog')
        expect(html).toContain('class="vp-catalog"')
        expect(html).toContain('vp-catalog-list deep')
        // links point at the route path of the item
        expect(html).toContain('href="/guide/a/"')
        expect(html).toContain('href="/guide/b/"')
        // anchors point at the title id
        expect(html).toContain('href="#A"')
        // the grandchild is nested under its parent
        expect(html).toContain('href="#C"')
        expect(html).toContain('vp-child-catalogs')
      } finally {
        restore()
      }
    } finally {
      app.cleanup()
    }
  })

  it('should exclude the items of the other locales and the 404 page', async () => {
    const app = await createTestApp({
      locales: { '/': { lang: 'en-US' }, '/zh/': { lang: 'zh-CN' } },
      plugins: [catalogPlugin()],
    })

    try {
      const restore = stubClientDefines(await collectClientDefines(app))

      try {
        const html = await renderCatalog(
          {},
          {
            metas: {
              '/404.html': { title: 'Not Found' },
              '/a/': { title: 'A' },
              '/zh/': { title: 'Zh' },
            },
            page: { path: '/', title: 'Home' },
            routes: { '/a/': {}, '/zh/': {} },
            site,
          },
        )

        expect(html).toContain('href="/a/"')
        expect(html).not.toContain('href="/zh/"')
        expect(html).not.toContain('/404.html')
      } finally {
        restore()
      }
    } finally {
      app.cleanup()
    }
  })

  it('should render the locale title of the current route', async () => {
    const app = await createTestApp({
      locales: { '/': { lang: 'en-US' }, '/zh/': { lang: 'zh-CN' } },
      plugins: [catalogPlugin()],
    })

    try {
      const restore = stubClientDefines(await collectClientDefines(app))

      try {
        const html = await renderCatalog(
          {},
          {
            metas: { '/zh/guide/a/': { title: 'A' } },
            page: { path: '/zh/guide/', title: '指南' },
            routes: { '/zh/guide/a/': {} },
            site,
          },
        )

        expect(html).toContain('目录')
        expect(html).not.toContain('Catalog')
      } finally {
        restore()
      }
    } finally {
      app.cleanup()
    }
  })

  it('should show the empty hint when there is no catalog item', async () => {
    const app = await createTestApp({
      locales: { '/': { lang: 'en-US' } },
      plugins: [catalogPlugin()],
    })

    try {
      const restore = stubClientDefines(await collectClientDefines(app))

      try {
        const html = await renderCatalog(
          {},
          { page: { path: '/guide/', title: 'Guide' }, site },
        )

        expect(html).toContain('vp-empty-catalog')
        expect(html).toContain('No catalog')
      } finally {
        restore()
      }
    } finally {
      app.cleanup()
    }
  })

  it('should hide the heading when the option is enabled', async () => {
    const app = await createTestApp({
      locales: { '/': { lang: 'en-US' } },
      plugins: [catalogPlugin()],
    })

    try {
      const restore = stubClientDefines(await collectClientDefines(app))

      try {
        const html = await renderCatalog(
          { hideHeading: true },
          {
            metas: { '/guide/a/': { title: 'A' } },
            page: { path: '/guide/', title: 'Guide' },
            routes: { '/guide/a/': {} },
            site,
          },
        )

        expect(html).not.toContain('vp-catalog-main-title')
        expect(html).toContain('href="/guide/a/"')
      } finally {
        restore()
      }
    } finally {
      app.cleanup()
    }
  })

  it('should only render the items within the given base and max level', async () => {
    const app = await createTestApp({
      locales: { '/': { lang: 'en-US' } },
      plugins: [catalogPlugin()],
    })

    try {
      const restore = stubClientDefines(await collectClientDefines(app))

      try {
        const html = await renderCatalog(
          { base: '/other/', level: 1 },
          {
            metas: {
              '/other/a/': { title: 'A' },
              '/other/a/c/': { title: 'C' },
              '/guide/': { title: 'G' },
            },
            page: { path: '/guide/', title: 'Guide' },
            routes: { '/other/a/': {}, '/other/a/c/': {}, '/guide/': {} },
            site,
          },
        )

        expect(html).toContain('href="/other/a/"')
        expect(html).not.toContain('href="/guide/"')
        // level 1 excludes the grandchild
        expect(html).not.toContain('href="#C"')
      } finally {
        restore()
      }
    } finally {
      app.cleanup()
    }
  })

  it('should use the client defined info getter', async () => {
    const app = await createTestApp({
      locales: { '/': { lang: 'en-US' } },
      plugins: [catalogPlugin()],
    })

    try {
      const restore = stubClientDefines(await collectClientDefines(app))

      try {
        defineCatalogInfoGetter((meta) => ({ title: String(meta.custom) }))

        const html = await renderCatalog(
          {},
          {
            metas: { '/guide/a/': { custom: 'Custom' } },
            page: { path: '/guide/', title: 'Guide' },
            routes: { '/guide/a/': {} },
            site,
          },
        )

        // the default getter reads `meta.title`, which is absent here
        expect(html).toContain('Custom')
        expect(html).not.toContain('vp-empty-catalog')
      } finally {
        restore()
      }
    } finally {
      app.cleanup()
    }
  })
})
