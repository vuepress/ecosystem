import { describe, expect, it } from 'vitest'
import type { Bundler, Page } from 'vuepress/core'
import { createBuildApp } from 'vuepress/core'
import { path } from 'vuepress/utils'

import { collectPageIndex } from '../src/node/collectPageIndex.js'
import { PathStore } from '../src/node/pathStore.js'
import { emptyTheme } from './__fixtures__/theme/empty.js'

const app = createBuildApp({
  bundler: {} as Bundler,
  source: path.resolve(__dirname, './__fixtures__/src'),
  theme: emptyTheme,
})

// oxlint-disable-next-line node/no-top-level-await
await app.init()

const makePage = (
  pagePath: string,
  frontmatter: Record<string, unknown>,
): Page =>
  ({
    path: pagePath,
    pathLocale: '/',
    title: pagePath,
    frontmatter,
    data: {},
    contentRendered: `<h2 id="a">Section</h2><p>Some content</p>`,
  }) as unknown as Page

describe(collectPageIndex, () => {
  it('should group the index items by locale path', () => {
    const store = new PathStore()
    const { indexesByLocale, indexesByPage } = collectPageIndex(
      app,
      { indexContent: true },
      store,
    )

    expect(Object.keys(indexesByLocale)).toStrictEqual(['/'])
    expect(indexesByLocale['/'].length).toBeGreaterThan(0)
    expect(indexesByPage.size).toBeGreaterThan(0)
  })

  it('should track the index ids of every page', () => {
    const store = new PathStore()
    const { indexesByPage } = collectPageIndex(
      app,
      { indexContent: true },
      store,
    )

    for (const ids of indexesByPage.values()) expect(ids).not.toHaveLength(0)
  })

  it('should fill the given index map', () => {
    const store = new PathStore()
    const indexesByPage = new Map<string, string[]>()
    const result = collectPageIndex(
      app,
      { indexContent: true },
      store,
      indexesByPage,
    )

    expect(result.indexesByPage).toBe(indexesByPage)
    expect(indexesByPage.size).toBeGreaterThan(0)
  })

  it('should skip pages with `search: false`', () => {
    const store = new PathStore()
    const page = makePage('/hidden.html', { search: false })
    const { indexesByLocale, indexesByPage } = collectPageIndex(
      { pages: [page] } as unknown as Parameters<typeof collectPageIndex>[0],
      {},
      store,
    )

    expect(indexesByLocale).toStrictEqual({})
    expect(indexesByPage.size).toBe(0)
  })

  it('should skip pages filtered out by the filter option', () => {
    const store = new PathStore()
    const page = makePage('/filtered.html', {})
    const { indexesByLocale, indexesByPage } = collectPageIndex(
      { pages: [page] } as unknown as Parameters<typeof collectPageIndex>[0],
      { filter: () => false },
      store,
    )

    expect(indexesByLocale).toStrictEqual({})
    expect(indexesByPage.size).toBe(0)
  })

  it('should index a page that is not filtered out', () => {
    const store = new PathStore()
    const page = makePage('/kept.html', {})
    const { indexesByLocale } = collectPageIndex(
      { pages: [page] } as unknown as Parameters<typeof collectPageIndex>[0],
      { indexContent: true },
      store,
    )

    const items = indexesByLocale['/']

    expect(items).toContainEqual({ id: '0', h: '/kept.html' })
    expect(items.some(({ id }) => id === '0#a')).toBe(true)
  })
})
