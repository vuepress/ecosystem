import { PathStore } from '@vuepress/search-helper'
import { search } from 'slimsearch'
import { describe, expect, it } from 'vitest'
import type { Bundler, Page } from 'vuepress/core'
import { createBuildApp } from 'vuepress/core'
import { fs, path } from 'vuepress/utils'

import { getSearchIndexStore } from '../src/node/generateIndex.js'
import {
  prepareSearchIndex,
  prepareStore,
  prepareWorkerOptions,
  removeSearchIndex,
  updateSearchIndex,
} from '../src/node/prepare.js'
import { slimsearchPlugin } from '../src/node/slimsearchPlugin.js'
import type { SearchIndex, SearchIndexStore } from '../src/shared/index.js'
import { emptyTheme } from './__fixtures__/theme/empty.js'

const app = createBuildApp({
  bundler: {} as Bundler,
  source: path.resolve(import.meta.dirname, './__fixtures__/src'),
  dest: path.resolve(import.meta.dirname, './__fixtures__/dist'),
  theme: emptyTheme,
})

await app.init()

const options = { indexContent: true }

// Count the results of a query
const countResults = (index: SearchIndex, query: string): number =>
  search(index, query).length

// Build the dev context the same way the plugin does when the dev server starts
const createContext = async (): Promise<{
  searchIndexStore: SearchIndexStore
  store: PathStore
  indexesByPage: Map<string, string[]>
}> => {
  const store = new PathStore()
  const indexesByPage = new Map<string, string[]>()

  const searchIndexStore = await getSearchIndexStore(
    app,
    options,
    store,
    indexesByPage,
  )

  return { searchIndexStore, store, indexesByPage }
}

describe('index generation', () => {
  it('should build a searchable index store', async () => {
    const { searchIndexStore } = await createContext()

    // The fixtures only contain English pages, so they share the root locale
    expect(Object.keys(searchIndexStore)).toStrictEqual(['/'])
    expect(countResults(searchIndexStore['/'], 'Zephyrate')).toBeGreaterThan(0)
  })

  it('should build a searchable index', async () => {
    const { searchIndexStore } = await createContext()
    const index = searchIndexStore[Object.keys(searchIndexStore)[0]]

    expect(countResults(index, 'paragraph')).toBeGreaterThan(0)
    expect(countResults(index, '中文')).toBeGreaterThan(0)
  })

  it('should fold the diacritics of the query and of the content alike', async () => {
    const { searchIndexStore } = await createContext()
    const index = searchIndexStore[Object.keys(searchIndexStore)[0]]

    // The content holds `café`, so both forms have to match it
    expect(countResults(index, 'cafe')).toBeGreaterThan(0)
    expect(countResults(index, 'café')).toBeGreaterThan(0)
  })

  it('should write the temp files of the dev server', async () => {
    const { searchIndexStore, store } = await createContext()

    await prepareStore(app, store)
    await prepareSearchIndex(app, searchIndexStore)
    await prepareWorkerOptions(app, {})

    for (const file of [
      'slimsearch/store.js',
      'slimsearch/index.js',
      'slimsearch/worker-options.js',
      'slimsearch/root.js',
    ])
      expect(fs.existsSync(app.dir.temp(file))).toBe(true)
  })
})

describe('dev hot reload', () => {
  const makePage = (
    pagePath: string,
    title: string,
    pathLocale = '/',
  ): Parameters<typeof updateSearchIndex>[3] =>
    ({
      path: pagePath,
      pathLocale,
      title,
      frontmatter: {},
      data: {},
      contentRendered: '<h2 id="a">Section</h2><p>Fresh content</p>',
    }) as unknown as Parameters<typeof updateSearchIndex>[3]

  it('should create the index of a locale when its first page is added', async () => {
    const context = await createContext()

    // The fixtures only contain pages of the root locale
    expect(context.searchIndexStore['/zh/']).toBeUndefined()

    await updateSearchIndex(
      app,
      options,
      context,
      makePage('/zh/brand-new.html', 'Brand new page', '/zh/'),
    )

    const index = context.searchIndexStore['/zh/']

    expect(index).toBeDefined()
    expect(countResults(index, 'Brand')).toBeGreaterThan(0)
    expect(
      fs.readFileSync(app.dir.temp('slimsearch/index.js'), 'utf-8'),
    ).toContain('"/zh/"')
  })

  it('should not throw when a page of a locale without an index is removed', async () => {
    const context = await createContext()

    await prepareSearchIndex(app, context.searchIndexStore)

    await expect(
      removeSearchIndex(
        app,
        context,
        makePage('/zh/never-indexed.html', 'Never indexed', '/zh/'),
      ),
    ).resolves.toBeUndefined()

    // The locale has no index, so it has no temp chunk to rewrite either
    expect(
      fs.readFileSync(app.dir.temp('slimsearch/index.js'), 'utf-8'),
    ).not.toContain('/zh/')
  })

  it('should pass the previous revision of a page to the index update', async () => {
    const plugin = slimsearchPlugin({ hotReload: true, indexContent: true })(
      app,
    )

    await plugin.onInitialized?.(app)

    const oldPage = app.pages.find((page) => page.title === 'Demo Page')!
    const newPage = makePage(
      '/zh/moved-by-hook.html',
      'Moved by hook',
      '/zh/',
    ) as unknown as Page

    await plugin.onPageUpdated?.(app, 'update', newPage, oldPage)

    const storeContent = fs.readFileSync(
      app.dir.temp('slimsearch/store.js'),
      'utf-8',
    )

    // The hook has to hand the previous revision over, otherwise the documents
    // stay in the index of the locale it left
    expect(storeContent).not.toContain(oldPage.path)
    expect(storeContent).toContain('/zh/moved-by-hook.html')
  })

  it('should drop the documents of the previous locale when the path changes', async () => {
    const context = await createContext()
    const oldPage = app.pages.find((page) => page.title === 'Demo Page')!

    expect(context.indexesByPage.has(oldPage.path)).toBe(true)
    expect(countResults(context.searchIndexStore['/'], 'Demo')).toBeGreaterThan(
      0,
    )

    await updateSearchIndex(
      app,
      options,
      context,
      makePage('/zh/moved-page.html', 'Moved page', '/zh/'),
      oldPage,
    )

    expect(countResults(context.searchIndexStore['/'], 'Demo')).toBe(0)
    expect(
      countResults(context.searchIndexStore['/zh/'], 'Moved'),
    ).toBeGreaterThan(0)

    const storeContent = fs.readFileSync(
      app.dir.temp('slimsearch/store.js'),
      'utf-8',
    )

    expect(storeContent).not.toContain(oldPage.path)
    expect(storeContent).toContain('/zh/moved-page.html')
  })
})
