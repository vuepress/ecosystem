import { addAll, createIndex, loadIndex } from 'slimsearch'
import type { IndexObject, SearchIndex } from 'slimsearch'
import { describe, expect, it } from 'vitest'

import {
  decodeJSON,
  encodeJSON,
  INDEX_FIELD_CONFIG,
} from '../src/shared/index.js'
import type { IndexItem } from '../src/shared/index.js'
import { getSearchResults } from '../src/worker/utils/getSearchResults.js'

const docs: IndexItem[] = [
  {
    id: '0',
    h: 'Hello world',
    t: ['The quick brown fox jumps over the lazy dog'],
  },
  {
    id: '0#section1',
    h: 'Installation guide',
    t: ['Step by step instructions'],
  },
  { id: '0@0', c: ['author: mr-hope'] },
  { id: '1', h: '你好世界', t: ['这是一段中文内容，用于测试搜索'] },
  {
    id: '2',
    h: 'VuePress plugin',
    t: ['Search plugin for VuePress'],
    c: ['tag: search'],
  },
]

const createSearchIndex = (): SearchIndex<string, IndexItem, IndexItem> =>
  createIndex<string, IndexItem, IndexItem>({ ...INDEX_FIELD_CONFIG })

describe('encodeJSON and decodeJSON', () => {
  it('should roundtrip the serialized index', () => {
    const index = createSearchIndex()
    addAll(index, docs)

    const serialized = index.toJSON()
    const decoded = decodeJSON<IndexObject<IndexItem>>(encodeJSON(serialized))

    expect(JSON.stringify(decoded)).toBe(JSON.stringify(serialized))
  })

  it('should restore a searchable index', () => {
    const index = createSearchIndex()
    addAll(index, docs)

    const restored = loadIndex<string, IndexItem, IndexItem>(
      decodeJSON<IndexObject<IndexItem>>(encodeJSON(index.toJSON())),
      INDEX_FIELD_CONFIG,
    )

    const results = getSearchResults('vuepress', restored)
    expect(results).toHaveLength(1)
    expect(results[0].title).toBe('VuePress plugin')
  })

  it('should shrink the payload', () => {
    const index = createSearchIndex()
    addAll(index, docs)

    const raw = JSON.stringify(index.toJSON())
    const encoded = encodeJSON(index.toJSON())

    expect(encoded.length).toBeLessThan(raw.length)
  })
})
