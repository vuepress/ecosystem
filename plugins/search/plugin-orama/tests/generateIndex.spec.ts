import { search } from '@orama/orama'
import { decodeData } from '@vuepress/helper/shared'
import { PathStore } from '@vuepress/search-helper'
import { describe, expect, it } from 'vitest'
import type { Bundler } from 'vuepress/core'
import { createBuildApp } from 'vuepress/core'
import { fs, path } from 'vuepress/utils'

import { getSearchIndexStore } from '../src/node/generateIndex.js'
import {
  prepareSearchIndex,
  prepareStore,
  prepareWorkerOptions,
} from '../src/node/prepare.js'
import { decodeIndex } from '../src/shared/index.js'
import type { SearchIndex } from '../src/shared/index.js'
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
