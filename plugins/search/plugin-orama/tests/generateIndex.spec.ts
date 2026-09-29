import { search } from '@orama/orama'
import { decodeData } from '@vuepress/helper/shared'
import { PathStore } from '@vuepress/search-helper'
import { describe, expect, it } from 'vitest'
import type { Bundler, Page } from 'vuepress/core'
import { createBuildApp } from 'vuepress/core'
import { fs, path } from 'vuepress/utils'

import { getSearchIndexStore } from '../src/node/generateIndex.js'
import { oramaPlugin } from '../src/node/oramaPlugin.js'
import {
  prepareSearchIndex,
  prepareStore,
  prepareWorkerOptions,
  removeSearchIndex,
  updateSearchIndex,
} from '../src/node/prepare.js'
import { decodeIndex } from '../src/shared/index.js'
import type { SearchIndex, SearchIndexStore } from '../src/shared/index.js'
import { emptyTheme } from './__fixtures__/theme/empty.js'

const app = createBuildApp({
  bundler: {} as Bundler,
  source: path.resolve(__dirname, './__fixtures__/src'),
  dest: path.resolve(__dirname, './__fixtures__/dist'),
  theme: emptyTheme,
})

await app.init()

// Count the results of a query
const countResults = (index: SearchIndex, query: string): number =>
  (
    search(index, {
      term: query,
      threshold: 0,
      limit: 10,
    }) as { hits: unknown[] }
  ).hits.length

describe('index generation', () => {
  it('should build a searchable index store', async () => {
    const store = new PathStore()
    const searchIndexStore = await getSearchIndexStore(
      app,
      { indexContent: true },
      store,
      new Map(),
    )

    // The fixtures only contain English pages, so they share the root locale
    const [locale] = Object.keys(searchIndexStore)
    const index = searchIndexStore[locale]

    expect(countResults(index, 'paragraph')).toBeGreaterThan(0)
  })

  it('should write the temp files of the dev server', async () => {
    const store = new PathStore()
    const searchIndexStore = await getSearchIndexStore(
      app,
      { indexContent: true },
      store,
      new Map(),
    )

    await prepareStore(app, store)
    await prepareSearchIndex(app, searchIndexStore)
    await prepareWorkerOptions(app, {})

    for (const file of [
      'orama/store.js',
      'orama/index.js',
      'orama/worker-options.js',
      'orama/root.js',
    ])
      expect(fs.existsSync(app.dir.temp(file))).toBe(true)
  })

  it('should write a locale chunk that can be decoded and searched', async () => {
    const store = new PathStore()
    const searchIndexStore = await getSearchIndexStore(
      app,
      { indexContent: true },
      store,
      new Map(),
    )

    await prepareSearchIndex(app, searchIndexStore)

    const content = fs.readFileSync(app.dir.temp('orama/root.js'), 'utf-8')
    const encoded = JSON.parse(content.replace('export default ', '')) as string
    const index = decodeIndex(encoded)

    expect(index.tokenizer.language).toBe('en-US')
    expect(countResults(index, 'paragraph')).toBeGreaterThan(0)
  })

  it('should embed an index carrying its stop-words', async () => {
    const store = new PathStore()
    const searchIndexStore = await getSearchIndexStore(
      app,
      { indexContent: true },
      store,
      new Map(),
    )
    const index = searchIndexStore[Object.keys(searchIndexStore)[0]]
    const serialized = JSON.parse(
      decodeData(
        JSON.parse(
          fs
            .readFileSync(app.dir.temp('orama/root.js'), 'utf-8')
            .replace('export default ', ''),
        ) as string,
      ),
    ) as { lang: string; stopWords?: string[] }

    // English stop-words are embedded, so that the worker tokenizes queries
    // exactly like the index was tokenized
    expect(serialized.lang).toBe(index.tokenizer.language)
    expect(serialized.stopWords).toHaveLength(180)
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
      contentRendered: `<h2 id="a">Section</h2><p>Fresh content</p>`,
    }) as unknown as Parameters<typeof updateSearchIndex>[3]

  // Build the dev context the same way the plugin does when the dev server
  // starts
  const createContext = async (): Promise<{
    searchIndexStore: SearchIndexStore
    store: PathStore
    indexesByPage: Map<string, string[]>
  }> => {
    const store = new PathStore()
    const indexesByPage = new Map<string, string[]>()

    const searchIndexStore = await getSearchIndexStore(
      app,
      { indexContent: true },
      store,
      indexesByPage,
    )

    return { searchIndexStore, store, indexesByPage }
  }

  it('should rewrite the path store when a page is added', async () => {
    const context = await createContext()

    await updateSearchIndex(
      app,
      { indexContent: true },
      context,
      makePage('/brand-new-page.html', 'Brand new page'),
    )

    // A page added during a hot reload gets a new index id, so the store has to
    // be rewritten, otherwise the client can not resolve the path of its
    // results
    const storeContent = fs.readFileSync(
      app.dir.temp('orama/store.js'),
      'utf-8',
    )

    expect(storeContent).toContain('/brand-new-page.html')

    const newPageId = context.store.addPath('/brand-new-page.html')

    expect(storeContent).toContain(`"${newPageId}":"/brand-new-page.html"`)
  })

  it('should drop the page from the path store when it is removed', async () => {
    const context = await createContext()
    const page = makePage('/temporary-page.html', 'Temporary page')

    await updateSearchIndex(app, { indexContent: true }, context, page)
    await removeSearchIndex(app, context, page)

    const storeContent = fs.readFileSync(
      app.dir.temp('orama/store.js'),
      'utf-8',
    )

    expect(storeContent).not.toContain('/temporary-page.html')
  })

  it('should create the index of a locale when its first page is added', async () => {
    const context = await createContext()

    // The fixtures only contain pages of the root locale
    expect(context.searchIndexStore['/zh/']).toBeUndefined()

    await updateSearchIndex(
      app,
      { indexContent: true },
      context,
      makePage('/zh/brand-new.html', 'Brand new page', '/zh/'),
    )

    const index = context.searchIndexStore['/zh/']

    expect(index).toBeDefined()
    expect(countResults(index, 'Brand')).toBeGreaterThan(0)
    expect(fs.readFileSync(app.dir.temp('orama/index.js'), 'utf-8')).toContain(
      '"/zh/"',
    )
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
      fs.readFileSync(app.dir.temp('orama/index.js'), 'utf-8'),
    ).not.toContain('/zh/')
  })

  it('should pass the previous revision of a page to the index update', async () => {
    const plugin = oramaPlugin({ hotReload: true, indexContent: true })(app)

    await plugin.onInitialized?.(app)

    const oldPage = app.pages.find((page) => page.title === 'Demo Page')!
    const newPage = makePage(
      '/zh/moved-by-hook.html',
      'Moved by hook',
      '/zh/',
    ) as unknown as Page

    await plugin.onPageUpdated?.(app, 'update', newPage, oldPage)

    const storeContent = fs.readFileSync(
      app.dir.temp('orama/store.js'),
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
      { indexContent: true },
      context,
      makePage('/zh/moved-page.html', 'Moved page', '/zh/'),
      oldPage,
    )

    expect(countResults(context.searchIndexStore['/'], 'Demo')).toBe(0)
    expect(
      countResults(context.searchIndexStore['/zh/'], 'Moved'),
    ).toBeGreaterThan(0)

    const storeContent = fs.readFileSync(
      app.dir.temp('orama/store.js'),
      'utf-8',
    )

    expect(storeContent).not.toContain(oldPage.path)
    expect(storeContent).toContain('/zh/moved-page.html')
  })
})
