import { decodeData } from '@vuepress/helper/shared'
import { PathStore, getLocaleLanguage } from '@vuepress/search-helper'
import { describe, expect, it } from 'vitest'
import type { Bundler } from 'vuepress/core'
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
import { decodeIndex } from '../src/shared/index.js'
import type { SearchIndex } from '../src/shared/index.js'
import { getSearchResults } from '../src/worker/utils/getSearchResults.js'
import { emptyTheme } from './__fixtures__/theme/empty.js'

const app = createBuildApp({
  bundler: {} as Bundler,
  source: path.resolve(import.meta.dirname, './__fixtures__/src'),
  dest: path.resolve(import.meta.dirname, './__fixtures__/dist'),
  theme: emptyTheme,
})

await app.init()

// Count the results of a query
const countResults = (index: SearchIndex, query: string): number =>
  getSearchResults(query, index).length

describe('index generation', () => {
  it('should build a searchable index store', () => {
    const store = new PathStore()
    const searchIndexStore = getSearchIndexStore(
      app,
      { indexContent: true },
      store,
      new Map(),
    )

    // The fixtures only contain English pages, so they share the root locale
    const [locale] = Object.keys(searchIndexStore)

    expect(countResults(searchIndexStore[locale], 'paragraph')).toBeGreaterThan(
      0,
    )
  })

  it('should write the temp files of the dev server', async () => {
    const store = new PathStore()
    const searchIndexStore = getSearchIndexStore(
      app,
      { indexContent: true },
      store,
      new Map(),
    )

    await prepareStore(app, store)
    await prepareSearchIndex(app, searchIndexStore)
    await prepareWorkerOptions(app, {})

    for (const file of [
      'flexsearch/store.js',
      'flexsearch/index.js',
      'flexsearch/worker-options.js',
      'flexsearch/root.js',
    ])
      expect(fs.existsSync(app.dir.temp(file))).toBe(true)
  })

  it('should write a locale chunk that can be decoded and searched', async () => {
    const store = new PathStore()
    const searchIndexStore = getSearchIndexStore(
      app,
      { indexContent: true },
      store,
      new Map(),
    )

    await prepareSearchIndex(app, searchIndexStore)

    const content = fs.readFileSync(app.dir.temp('flexsearch/root.js'), 'utf-8')
    const encoded = JSON.parse(content.replace('export default ', '')) as string
    const index = decodeIndex(encoded)

    expect(countResults(index, 'paragraph')).toBeGreaterThan(0)
  })

  it('should embed the language of the locale in the chunk', async () => {
    const store = new PathStore()
    const searchIndexStore = getSearchIndexStore(
      app,
      { indexContent: true },
      store,
      new Map(),
    )
    const [locale] = Object.keys(searchIndexStore)

    await prepareSearchIndex(app, searchIndexStore)

    const content = fs.readFileSync(app.dir.temp('flexsearch/root.js'), 'utf-8')
    const encoded = JSON.parse(content.replace('export default ', '')) as string
    // The tokenizer can not be serialized, so the language has to travel with
    // the index for it to be recreated on the other side
    const serialized = JSON.parse(decodeData(encoded)) as { lang: string }

    expect(serialized.lang).toBe(getLocaleLanguage(app, locale))
  })
})

describe('dev hot reload', () => {
  const makePage = (
    pagePath: string,
    title: string,
  ): Parameters<typeof updateSearchIndex>[3] =>
    ({
      path: pagePath,
      pathLocale: '/',
      title,
      frontmatter: {},
      data: {},
      contentRendered: '<h2 id="a">Section</h2><p>Fresh content</p>',
    }) as unknown as Parameters<typeof updateSearchIndex>[3]

  it('should rewrite the path store when a page is added', async () => {
    const store = new PathStore()
    const indexesByPage = new Map<string, string[]>()
    const searchIndexStore = getSearchIndexStore(
      app,
      { indexContent: true },
      store,
      indexesByPage,
    )
    const context = { searchIndexStore, store, indexesByPage }

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
      app.dir.temp('flexsearch/store.js'),
      'utf-8',
    )

    expect(storeContent).toContain('/brand-new-page.html')
  })

  it('should drop the page from the path store when it is removed', async () => {
    const store = new PathStore()
    const indexesByPage = new Map<string, string[]>()
    const searchIndexStore = getSearchIndexStore(
      app,
      { indexContent: true },
      store,
      indexesByPage,
    )
    const context = { searchIndexStore, store, indexesByPage }
    const page = makePage('/temporary-page.html', 'Temporary page')

    await updateSearchIndex(app, { indexContent: true }, context, page)
    await removeSearchIndex(app, context, page)

    const storeContent = fs.readFileSync(
      app.dir.temp('flexsearch/store.js'),
      'utf-8',
    )

    expect(storeContent).not.toContain('/temporary-page.html')
  })

  it('should rewrite the path store for a locale without an index', async () => {
    const store = new PathStore()
    const indexesByPage = new Map<string, string[]>()
    // A page whose locale has no index yet, which happens when the first page
    // of a locale is deleted without ever being added
    const context = { searchIndexStore: {}, store, indexesByPage }
    const page = makePage('/temporary-page.html', 'Temporary page')

    store.addPath(page.path)

    await expect(removeSearchIndex(app, context, page)).resolves.toBeUndefined()

    const storeContent = fs.readFileSync(
      app.dir.temp('flexsearch/store.js'),
      'utf-8',
    )

    expect(storeContent).not.toContain('/temporary-page.html')
  })

  it('should drop the documents of a page whose path changed', async () => {
    const store = new PathStore()
    const indexesByPage = new Map<string, string[]>()
    const searchIndexStore = getSearchIndexStore(
      app,
      { indexContent: true },
      store,
      indexesByPage,
    )
    const context = { searchIndexStore, store, indexesByPage }
    const oldPage = makePage('/old-path.html', 'Old path')
    const newPage = {
      ...makePage('/new-path.html', 'New path'),
      pathLocale: '/zh/',
    } as unknown as Parameters<typeof updateSearchIndex>[3]

    await updateSearchIndex(app, { indexContent: true }, context, oldPage)
    await updateSearchIndex(
      app,
      { indexContent: true },
      context,
      newPage,
      oldPage,
    )

    const storeContent = fs.readFileSync(
      app.dir.temp('flexsearch/store.js'),
      'utf-8',
    )

    // The page used to be indexed under another path, so its documents have to
    // be dropped from the locale it belonged to
    expect(storeContent).not.toContain('/old-path.html')
    expect(storeContent).toContain('/new-path.html')
  })
})
