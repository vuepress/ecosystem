import {
  collectClientDefines,
  createTestApp,
  stubClientDefines,
} from '@vuepress/test-utils'
import { createTestClient, renderVuePress } from '@vuepress/test-utils/client'
import { describe, expect, it, vi } from 'vitest'
import type { Component, VNode } from 'vue'
import { defineComponent, h } from 'vue'

// Imported from the source entry: the built type of `@vuepress/test-utils` may
// lag behind the source that Vitest resolves.
import { stubModule } from '../../../../../tools/test-utils/src/node/stubModule.js'
import type {
  useBlogCategory as useBlogCategoryFn,
  useBlogType as useBlogTypeFn,
} from '../../src/client/composables/index.js'
import { blogPlugin } from '../../src/node/index.js'
import type { CategoriesMap, TypesMap } from '../../src/shared/index.js'

interface BlogComposables {
  useBlogCategory: typeof useBlogCategoryFn
  useBlogType: typeof useBlogTypeFn
}

/**
 * Data of the stubbed `@temp/blog/*` modules
 *
 * The composables read these modules at import time, so they are stubbed once
 * and mutated in place. Reloading them with `vi.resetModules()` would reload
 * `vuepress/client` too and break the injected client data symbol.
 */
const store: Record<string, string> = {}
const typesMap: TypesMap = {}
const categoriesMap: CategoriesMap = {}

let composables: Promise<BlogComposables> | undefined

const loadComposables = (): Promise<BlogComposables> => {
  composables ??= (async (): Promise<BlogComposables> => {
    stubModule('@temp/blog/store', { store })
    stubModule('@temp/blog/type', { typesMap })
    stubModule('@temp/blog/category', { categoriesMap })

    return import('../../src/client/composables/index.js')
  })()

  return composables
}

let defines: Promise<Record<string, unknown>> | undefined

const getBlogDefines = (): Promise<Record<string, unknown>> => {
  defines ??= (async (): Promise<Record<string, unknown>> => {
    const app = await createTestApp({
      plugins: [blogPlugin({ metaScope: '' })],
    })

    try {
      return await collectClientDefines(app)
    } finally {
      app.cleanup()
    }
  })()

  return defines
}

const createTypeProbe = (
  useBlogType: typeof useBlogTypeFn,
  key?: string,
): Component =>
  defineComponent({
    name: 'BlogTypeProbe',
    setup() {
      const data = useBlogType(key)

      return (): VNode =>
        h('div', { class: 'blog-type' }, [
          h('span', { class: 'type-path' }, data.value.path),
          h(
            'span',
            { class: 'type-items' },
            data.value.items.map(({ path }) => path).join(','),
          ),
        ])
    },
  })

const createCategoryProbe = (
  useBlogCategory: typeof useBlogCategoryFn,
): Component =>
  defineComponent({
    name: 'BlogCategoryProbe',
    setup() {
      const data = useBlogCategory()

      return (): VNode =>
        h('div', { class: 'blog-category' }, [
          h('span', { class: 'category-path' }, data.value.path),
          h(
            'span',
            { class: 'category-current' },
            String(data.value.currentItems?.length ?? -1),
          ),
          h(
            'span',
            { class: 'category-map' },
            Object.entries(data.value.map)
              .map(
                ([name, item]) =>
                  `${name}=${item.path}[${item.items
                    .map(({ path }) => path)
                    .join('|')}]`,
              )
              .join(';'),
          ),
        ])
    },
  })

describe('blog type composable', () => {
  it('should resolve the articles of the type declared in the frontmatter', async () => {
    typesMap.article = { '/': { path: '/article/', indexes: [0, 1] } }
    store['0'] = '/posts/a/'
    store['1'] = '/posts/b/'

    const { useBlogType } = await loadComposables()
    const probe = createTypeProbe(useBlogType)
    const restore = stubClientDefines(await getBlogDefines())

    try {
      const html = await renderVuePress({
        content: probe,
        page: {
          path: '/',
          frontmatter: { blog: { type: 'type', key: 'article' } },
        },
      })

      expect(html).toContain('<span class="type-path">/article/</span>')
      expect(html).toContain(
        '<span class="type-items">/posts/a/,/posts/b/</span>',
      )
    } finally {
      restore()
    }
  })

  it('should prefer the key argument over the frontmatter key', async () => {
    typesMap.article = { '/': { path: '/article/', indexes: [0] } }
    typesMap.archive = { '/': { path: '/archive/', indexes: [1] } }
    store['0'] = '/posts/a/'
    store['1'] = '/posts/b/'

    const { useBlogType } = await loadComposables()
    const probe = createTypeProbe(useBlogType, 'archive')
    const restore = stubClientDefines(await getBlogDefines())

    try {
      const html = await renderVuePress({
        content: probe,
        page: {
          path: '/',
          frontmatter: { blog: { type: 'type', key: 'article' } },
        },
      })

      expect(html).toContain('<span class="type-path">/archive/</span>')
      expect(html).toContain('<span class="type-items">/posts/b/</span>')
    } finally {
      restore()
    }
  })

  it('should select the type config of the current locale', async () => {
    typesMap.article = {
      '/': { path: '/article/', indexes: [0] },
      '/zh/': { path: '/zh/article/', indexes: [1] },
    }
    store['0'] = '/posts/en/'
    store['1'] = '/zh/posts/zh/'

    const { useBlogType } = await loadComposables()
    const probe = createTypeProbe(useBlogType)
    const restore = stubClientDefines(await getBlogDefines())

    try {
      const html = await renderVuePress({
        content: probe,
        page: {
          path: '/zh/',
          frontmatter: { blog: { type: 'type', key: 'article' } },
        },
        site: {
          locales: {
            '/': { lang: 'en-US', title: 'Site' },
            '/zh/': { lang: 'zh-CN', title: '站点' },
          },
        },
      })

      expect(html).toContain('<span class="type-path">/zh/article/</span>')
      expect(html).toContain('<span class="type-items">/zh/posts/zh/</span>')
      expect(html).not.toContain('/posts/en/')
    } finally {
      restore()
    }
  })

  it('should fall back to an empty list and warn when no key is available', async () => {
    typesMap.article = { '/': { path: '/article/', indexes: [0] } }
    store['0'] = '/posts/a/'

    const { useBlogType } = await loadComposables()
    const probe = createTypeProbe(useBlogType)
    const restore = stubClientDefines(await getBlogDefines())
    const warn = vi.spyOn(console, 'warn').mockImplementation((): void => {})

    try {
      const html = await renderVuePress({ content: probe, page: { path: '/' } })

      expect(html).toContain('<span class="type-path">/</span>')
      expect(html).toContain('<span class="type-items"></span>')
      expect(warn).toHaveBeenCalledWith('useBlogType: key not found')
    } finally {
      warn.mockRestore()
      restore()
    }
  })

  it('should throw when the key is not configured', async () => {
    typesMap.article = { '/': { path: '/article/', indexes: [] } }

    const { useBlogType } = await loadComposables()
    const probe = createTypeProbe(useBlogType, 'missing')
    const restore = stubClientDefines(await getBlogDefines())

    try {
      await expect(
        renderVuePress({ content: probe, page: { path: '/' } }),
      ).rejects.toThrow('useBlogType: key missing is invalid')
    } finally {
      restore()
    }
  })

  it('should report the frontmatter key when it is not configured', async () => {
    typesMap.article = { '/': { path: '/article/', indexes: [] } }

    const { useBlogType } = await loadComposables()
    const probe = createTypeProbe(useBlogType)
    const restore = stubClientDefines(await getBlogDefines())

    try {
      await expect(
        renderVuePress({
          content: probe,
          page: {
            frontmatter: { blog: { key: 'missing', type: 'type' } },
            path: '/',
          },
        }),
      ).rejects.toThrow('useBlogType: key missing is invalid')
    } finally {
      restore()
    }
  })

  it('should update when navigating to a page of another type', async () => {
    typesMap.article = { '/': { path: '/article/', indexes: [0] } }
    typesMap.archive = { '/': { path: '/archive/', indexes: [1] } }
    store['0'] = '/posts/a/'
    store['1'] = '/posts/b/'

    const { useBlogType } = await loadComposables()
    const probe = createTypeProbe(useBlogType)
    const restore = stubClientDefines(await getBlogDefines())

    try {
      const client = await createTestClient({
        content: probe,
        page: {
          path: '/',
          frontmatter: { blog: { type: 'type', key: 'article' } },
        },
        routes: {
          '/archive/': {
            component: probe,
            pageData: {
              path: '/archive/',
              frontmatter: { blog: { type: 'type', key: 'archive' } },
            },
          },
        },
      })

      await expect(client.renderToString()).resolves.toContain('/posts/a/')

      await client.router.push('/archive/')

      await expect(client.renderToString()).resolves.toContain('/posts/b/')
    } finally {
      restore()
    }
  })
})

describe('blog category composable', () => {
  it('should resolve the category map declared in the frontmatter', async () => {
    categoriesMap.category = {
      '/': {
        path: '/category/',
        map: {
          foo: { path: '/category/foo/', indexes: [0] },
          bar: { path: '/category/bar/', indexes: [1, 2] },
        },
      },
    }
    store['0'] = '/posts/a/'
    store['1'] = '/posts/b/'
    store['2'] = '/posts/c/'

    const { useBlogCategory } = await loadComposables()
    const probe = createCategoryProbe(useBlogCategory)
    const restore = stubClientDefines(await getBlogDefines())

    try {
      const html = await renderVuePress({
        content: probe,
        page: {
          path: '/category/',
          frontmatter: { blog: { type: 'category', key: 'category' } },
        },
      })

      expect(html).toContain('<span class="category-path">/category/</span>')
      expect(html).toContain('foo=/category/foo/[/posts/a/]')
      expect(html).toContain('bar=/category/bar/[/posts/b/|/posts/c/]')
      expect(html).toContain('<span class="category-current">-1</span>')
    } finally {
      restore()
    }
  })

  it('should expose the items of the matched category item page', async () => {
    categoriesMap.category = {
      '/': {
        path: '/category/',
        map: {
          foo: { path: '/category/foo/', indexes: [0] },
          bar: { path: '/category/bar/', indexes: [1] },
        },
      },
    }
    store['0'] = '/posts/a/'
    store['1'] = '/posts/b/'

    const { useBlogCategory } = await loadComposables()
    const probe = createCategoryProbe(useBlogCategory)
    const restore = stubClientDefines(await getBlogDefines())

    try {
      const html = await renderVuePress({
        content: probe,
        page: {
          path: '/category/foo/',
          frontmatter: { blog: { type: 'category', key: 'category' } },
        },
      })

      expect(html).toContain('<span class="category-current">1</span>')
    } finally {
      restore()
    }
  })

  it('should fall back to an empty map and warn when no key is available', async () => {
    categoriesMap.category = { '/': { path: '/category/', map: {} } }

    const { useBlogCategory } = await loadComposables()
    const probe = createCategoryProbe(useBlogCategory)
    const restore = stubClientDefines(await getBlogDefines())
    const warn = vi.spyOn(console, 'warn').mockImplementation((): void => {})

    try {
      const html = await renderVuePress({ content: probe, page: { path: '/' } })

      expect(html).toContain('<span class="category-path">/</span>')
      expect(html).toContain('<span class="category-map"></span>')
      expect(warn).toHaveBeenCalledWith('useBlogCategory: key not found')
    } finally {
      warn.mockRestore()
      restore()
    }
  })
})
