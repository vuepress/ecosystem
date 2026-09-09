import { describe, expect, it } from 'vitest'

import { createIndex, serializeIndex } from '../src/shared/index.js'
import type { IndexItem } from '../src/shared/index.js'
import { getSearchResults } from '../src/worker/utils/getSearchResults.js'
import { getSuggestions } from '../src/worker/utils/getSuggestions.js'

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

describe('createIndex and serializeIndex', () => {
  it('should create a searchable index', async () => {
    const index = createIndex('en')
    const { insertMultiple } = await import('@orama/orama')

    await insertMultiple(index, docs)

    const results = getSearchResults('hello', index)
    expect(results).toHaveLength(1)
    expect(results[0].title).toBe('Hello world')
  })

  it('should support CJK search', async () => {
    const index = createIndex('zh-CN')
    const { insertMultiple } = await import('@orama/orama')

    await insertMultiple(index, docs)

    const results = getSearchResults('中文', index)
    expect(results).toHaveLength(1)
    expect(results[0].title).toBe('你好世界')
  })

  it('should support prefix search', async () => {
    const index = createIndex('en')
    const { insertMultiple } = await import('@orama/orama')

    await insertMultiple(index, docs)

    const results = getSearchResults('hell', index)
    expect(results).toHaveLength(1)
    expect(results[0].title).toBe('Hello world')
  })

  it('should roundtrip through serialization', async () => {
    const index = createIndex('en')
    const { insertMultiple } = await import('@orama/orama')

    await insertMultiple(index, docs)

    const serialized = serializeIndex(index)
    const restored = createIndex(serialized.lang, serialized.data)

    const results = getSearchResults('vuepress', restored)
    expect(results).toHaveLength(1)
    expect(results[0].title).toBe('VuePress plugin')
  })

  it('should not match the document id', async () => {
    const index = createIndex('en')
    const { insertMultiple } = await import('@orama/orama')

    await insertMultiple(index, docs)

    // Searching a digit should not match documents through the `id` field
    const results = getSearchResults('0', index)
    expect(results).toHaveLength(0)
  })

  it('should require all query terms to match', async () => {
    const index = createIndex('en')
    const { insertMultiple } = await import('@orama/orama')

    await insertMultiple(index, docs)

    // Only the document containing both terms should match
    const results = getSearchResults('quick brown', index)
    expect(results).toHaveLength(1)
    expect(results[0].title).toBe('Hello world')
  })
})

describe(getSuggestions, () => {
  it('should suggest extensions of the query', async () => {
    const index = createIndex('en')
    const { insertMultiple } = await import('@orama/orama')

    await insertMultiple(index, docs)

    const suggestions = getSuggestions('vue', index)
    expect(suggestions).toContain('vuepress')
  })
})
