import { describe, expect, it } from 'vitest'
import type { Bundler } from 'vuepress/core'
import { createBuildApp } from 'vuepress/core'
import { path } from 'vuepress/utils'

import { getSearchIndexStore } from '../src/node/generateIndex.js'
import { PathStore } from '../src/node/pathStore.js'
import { createIndex, serializeIndex } from '../src/shared/index.js'
import { getSearchResults } from '../src/worker/utils/getSearchResults.js'
import { emptyTheme } from './__fixtures__/theme/empty.js'

const app = createBuildApp({
  bundler: {} as Bundler,
  source: path.resolve(__dirname, './__fixtures__/src'),
  theme: emptyTheme,
})

await app.init()

describe(getSearchIndexStore, () => {
  it('should build a searchable index store', async () => {
    const store = new PathStore()
    const searchIndexStore = await getSearchIndexStore(
      app,
      { indexContent: true },
      store,
    )

    // The fixtures only contain English pages, so they share the root locale
    const [locale] = Object.keys(searchIndexStore)
    const index = searchIndexStore[locale]

    // The store should be usable by the worker search utils
    const results = getSearchResults('paragraph', index)
    expect(results.length).toBeGreaterThan(0)
  })

  it('should roundtrip through serialization', async () => {
    const store = new PathStore()
    const searchIndexStore = await getSearchIndexStore(
      app,
      { indexContent: true },
      store,
    )

    for (const locale of Object.keys(searchIndexStore)) {
      const serialized = serializeIndex(searchIndexStore[locale])
      const restored = createIndex(serialized.lang, serialized.data)

      // Searching the restored index should still work
      const results = getSearchResults('paragraph', restored)
      expect(results.length).toBeGreaterThan(0)
    }
  })
})
