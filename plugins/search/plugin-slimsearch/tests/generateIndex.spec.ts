import { PathStore } from '@vuepress/search-helper'
import { search } from 'slimsearch'
import { describe, expect, it } from 'vitest'
import type { Bundler } from 'vuepress/core'
import { createBuildApp } from 'vuepress/core'
import { path } from 'vuepress/utils'

import { getSearchIndexStore } from '../src/node/generateIndex.js'
import type { SearchIndex } from '../src/shared/index.js'
import { emptyTheme } from './__fixtures__/theme/empty.js'

const app = createBuildApp({
  bundler: {} as Bundler,
  source: path.resolve(import.meta.dirname, './__fixtures__/src'),
  theme: emptyTheme,
})

await app.init()

// Build the index of the only locale of the fixtures
const getIndex = async (): Promise<SearchIndex> => {
  const searchIndexStore = await getSearchIndexStore(
    app,
    { indexContent: true },
    new PathStore(),
    new Map(),
  )

  return searchIndexStore[Object.keys(searchIndexStore)[0]]
}

describe('index generation', () => {
  it('should build a searchable index', async () => {
    const index = await getIndex()

    expect(search(index, 'paragraph').length).toBeGreaterThan(0)
    expect(search(index, '中文').length).toBeGreaterThan(0)
  })

  it('should fold the diacritics of the query and of the content alike', async () => {
    const index = await getIndex()

    // The content holds `café`, so both forms have to match it
    expect(search(index, 'cafe').length).toBeGreaterThan(0)
    expect(search(index, 'café').length).toBeGreaterThan(0)
  })
})
