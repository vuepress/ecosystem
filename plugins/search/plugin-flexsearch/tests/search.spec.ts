import { describe, expect, it } from 'vitest'

import {
  createIndex,
  decodeIndex,
  encodeIndex,
  serializeIndex,
} from '../src/shared/index.js'
import type { SearchIndex, SearchIndexItem } from '../src/shared/index.js'
import { getSearchResults } from '../src/worker/utils/getSearchResults.js'
import { getSuggestions } from '../src/worker/utils/getSuggestions.js'

const items: SearchIndexItem[] = [
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
  // `alpha` only appears in the heading of the first one, while `bravo` only
  // appears in the content of both of them, and `charlie` appears in neither
  { id: '3', h: 'Alpha heading', t: ['bravo content'] },
  { id: '4', h: 'Alpha bravo', t: ['nothing here'] },
]

const createTestIndex = (lang = 'en'): SearchIndex => {
  const index = createIndex(lang)

  for (const item of items) index.add(item)

  return index
}

describe('createIndex and its search helpers', () => {
  it('should create a searchable index', () => {
    const index = createTestIndex()

    const results = getSearchResults('hello', index)

    expect(results).toHaveLength(1)
    expect(results[0].title).toBe('Hello world')
  })

  it('should support CJK search', () => {
    const index = createTestIndex('zh-CN')

    const results = getSearchResults('中文', index)

    expect(results).toHaveLength(1)
    expect(results[0].title).toBe('你好世界')
  })

  it('should support prefix search', () => {
    const index = createTestIndex()

    const results = getSearchResults('hell', index)

    expect(results).toHaveLength(1)
    expect(results[0].title).toBe('Hello world')
  })

  it('should require all query terms to match', () => {
    const index = createTestIndex()

    expect(getSearchResults('quick brown', index)).toHaveLength(1)
    expect(getSearchResults('quick nowhere', index)).toHaveLength(0)
  })

  it('should match a document whose terms are spread over its fields', () => {
    const index = createTestIndex()

    // `alpha` is a heading of both documents, while `bravo` is a content of
    // `3` and a heading of `4`
    expect(getSearchResults('alpha bravo', index)).toHaveLength(2)
    expect(getSearchResults('alpha charlie', index)).toHaveLength(0)
    expect(getSearchResults('bravo charlie', index)).toHaveLength(0)
  })

  it('should treat the last term as optional when suggesting', () => {
    const index = createTestIndex()

    // `charlie` matches nothing, so only the term before it is required
    expect(getSearchResults('alpha charlie', index)).toHaveLength(0)
    expect(
      getSearchResults('alpha charlie', index, { suggest: true }),
    ).toHaveLength(2)
  })

  it('should find a document that a common term ranks very low', () => {
    const index = createIndex('en')

    // `common` matches every document, while `rare` only matches the last one,
    // which is also the least relevant one for `common`
    for (let i = 0; i < 300; i += 1)
      index.add({ id: String(i), h: `Document ${i}`, t: ['common word'] })
    index.add({ id: '300', h: 'Rare document', t: ['common rare word'] })

    // The hits of a term are not truncated by `limit`, otherwise the document
    // would be dropped from the intersection
    const results = getSearchResults('common rare', index, { limit: 10 })

    expect(results).toHaveLength(1)
    expect(results[0].title).toBe('Rare document')
  })

  it('should clamp a negative offset', () => {
    const index = createTestIndex()

    // A negative offset must be clamped instead of slicing the results from
    // their end
    expect(getSearchResults('vuepress', index, { offset: -1 })).toStrictEqual(
      getSearchResults('vuepress', index),
    )
  })

  it('should paginate a suggestion query', () => {
    const index = createIndex('en')

    for (let i = 0; i < 30; i += 1)
      index.add({ id: String(i), h: `Document ${i}`, t: ['shared keyword'] })

    // The optional term of a suggestion query must not bound the results,
    // otherwise an offset beyond its own limit would return nothing
    expect(
      getSearchResults('shared', index, {
        suggest: true,
        limit: 10,
        offset: 10,
      }),
    ).toHaveLength(10)
    expect(
      getSearchResults('shared', index, {
        suggest: true,
        limit: 10,
        offset: 10,
      }),
    ).toStrictEqual(
      getSearchResults('shared', index, { limit: 10, offset: 10 }),
    )
  })

  it('should not match the document id', () => {
    const index = createTestIndex()

    expect(getSearchResults('0', index)).toHaveLength(0)
  })

  it('should ignore the properties that are not indexed', () => {
    const index = createTestIndex()

    // The `id` field is not indexed by FlexSearch, and searching it would
    // throw instead of returning no result
    expect(() =>
      getSearchResults('hello', index, { properties: ['id'] }),
    ).not.toThrow()
    expect(
      getSearchResults('hello', index, { properties: ['id'] }),
    ).toHaveLength(0)
    // The other properties are still searched
    expect(
      getSearchResults('hello', index, { properties: ['id', 'h'] }),
    ).toHaveLength(1)
  })

  it('should restrict the search to the given properties', () => {
    const index = createTestIndex()

    // `hello` only appears in the heading of the first document
    expect(
      getSearchResults('hello', index, { properties: ['t'] }),
    ).toHaveLength(0)
    expect(
      getSearchResults('hello', index, { properties: ['h'] }),
    ).toHaveLength(1)
    expect(getSearchResults('hello', index, { properties: '*' })).toHaveLength(
      1,
    )
  })

  it('should return a document once when several of its fields match', () => {
    const index = createTestIndex()

    const results = getSearchResults('vuepress', index)

    expect(results).toHaveLength(1)
    expect(results[0].title).toBe('VuePress plugin')
  })

  it('should combine the matches of the fields', () => {
    const index = createTestIndex()

    // `bravo` is a heading of `4` and a content of `3`, while `alpha` is a
    // heading of both of them
    expect(getSearchResults('bravo', index)).toHaveLength(2)
  })

  it('should apply limit and offset to the merged results', () => {
    const index = createIndex('en')

    for (let i = 0; i < 3; i += 1)
      // The term matches both the heading and the content of every document
      index.add({ id: String(i), h: 'shared keyword', t: ['shared keyword'] })

    expect(getSearchResults('shared', index)).toHaveLength(3)
    expect(getSearchResults('shared', index, { limit: 2 })).toHaveLength(2)
    expect(
      getSearchResults('shared', index, { limit: 1, offset: 1 }),
    ).toHaveLength(1)
    expect(getSearchResults('shared', index, { offset: 3 })).toHaveLength(0)
  })

  it('should suggest tokens extending the query', () => {
    const index = createTestIndex()

    expect(getSuggestions('vuep', index)).toContain('VuePress')
    expect(getSuggestions('nowhere', index)).toHaveLength(0)
  })

  it('should roundtrip through serialization', () => {
    const index = createTestIndex()
    const serialized = serializeIndex(index)
    const restored = createIndex(serialized.lang, serialized.chunks)

    const results = getSearchResults('vuepress', restored)

    expect(results).toHaveLength(1)
    expect(results[0].title).toBe('VuePress plugin')
  })

  it('should roundtrip through an encoded index', () => {
    const index = createTestIndex()
    const encoded = encodeIndex(index)
    const restored = decodeIndex(encoded)

    const results = getSearchResults('vuepress', restored)

    expect(results).toHaveLength(1)
    expect(results[0].title).toBe('VuePress plugin')

    // Compression should shrink the payload
    const raw = JSON.stringify(serializeIndex(index))

    expect(encoded.length).toBeLessThan(raw.length)
  })

  it('should keep the language of the index in its payload', () => {
    const index = createTestIndex('zh-CN')

    // The tokenizer can not be serialized, so the language has to travel with
    // the index for it to be tokenized the same way once restored
    expect(serializeIndex(index).lang).toBe('zh-CN')
  })

  it('should search a CJK index after a serialization roundtrip', () => {
    const restored = decodeIndex(encodeIndex(createTestIndex('zh-CN')))

    const results = getSearchResults('中文', restored)

    expect(results).toHaveLength(1)
    expect(results[0].title).toBe('你好世界')
  })
})
