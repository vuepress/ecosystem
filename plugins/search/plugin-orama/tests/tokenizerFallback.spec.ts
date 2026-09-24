import { insertMultiple, search } from '@orama/orama'
import { beforeAll, describe, expect, it } from 'vitest'

import {
  createIndex,
  createTokenizer,
  decodeIndex,
  encodeIndex,
  isSegmenterAvailable,
  preloadTokenizers,
} from '../src/shared/index.js'
import type { IndexItem, SearchIndex } from '../src/shared/index.js'

// Count the results of a query
const countResults = (index: SearchIndex, query: string): number =>
  (
    search(index, {
      term: query,
      threshold: 0,
      limit: 10,
    }) as { hits: unknown[] }
  ).hits.length

describe('when `Intl.Segmenter` is not available', () => {
  // oxlint-disable-next-line vitest/no-hooks
  beforeAll(() => {
    // Simulate a browser without `Intl.Segmenter`, such as Firefox < 125
    //
    // It has to happen before any tokenizer is created, and this lives in its
    // own test file because the loaded tokenizers are cached by the modules
    Reflect.deleteProperty(Intl, 'Segmenter')
  })

  it('should detect that the segmenter is missing', () => {
    expect(isSegmenterAvailable()).toBe(false)
  })

  it('should not load `@orama/tokenizers`', async () => {
    // The module of `@orama/tokenizers` creates an `Intl.Segmenter` when it is
    // evaluated, so loading it would throw
    await expect(preloadTokenizers(['zh-CN', 'ja-JP'])).resolves.toBeUndefined()
  })

  it('should split words of whitespace separated languages', () => {
    expect(createTokenizer('en-US').tokenize('Hello, World!')).toStrictEqual([
      'hello',
      'world',
    ])
    expect(createTokenizer('en-US').tokenize("It's a test")).toStrictEqual([
      "it's",
      'a',
      'test',
    ])
  })

  it('should split the characters of scripts without word separators', () => {
    expect(createTokenizer('zh-CN').tokenize('中文内容')).toStrictEqual([
      '中',
      '文',
      '内',
      '容',
    ])
    expect(createTokenizer('ko-KR').tokenize('한국어')).toStrictEqual([
      '한',
      '국',
      '어',
    ])
  })

  it('should lowercase and fold diacritics', () => {
    expect(createTokenizer('fr-FR').tokenize('Le Café')).toStrictEqual([
      'le',
      'cafe',
    ])
    expect(createTokenizer('vi-VN').tokenize('Hướng')).toStrictEqual(['huong'])
  })

  it('should remove stop-words', () => {
    expect(createTokenizer('en-US', ['the']).tokenize('The fox')).toStrictEqual(
      ['fox'],
    )
  })

  it('should still build a searchable index', async () => {
    const docs: IndexItem[] = [
      { id: '0', h: '中文内容测试' },
      { id: '1', h: 'Hello World' },
    ]
    const index = createIndex('zh-CN')

    await insertMultiple(index, docs)

    // Characters are indexed one by one, so a multi-character query is
    // tokenized into characters that all have to be found
    expect(countResults(index, '中文')).toBe(1)
    expect(countResults(index, '内容')).toBe(1)
    expect(countResults(index, '测试')).toBe(1)
    expect(countResults(index, 'Hello')).toBe(1)
  })

  it('should restore an index that tokenizes queries identically', async () => {
    const index = createIndex('zh-CN')

    await insertMultiple(index, [{ id: '0', h: '中文内容测试' }])

    const restored = decodeIndex(encodeIndex(index))

    for (const query of ['中文', '内容', '测试'])
      expect(countResults(restored, query)).toBe(countResults(index, query))
  })
})
