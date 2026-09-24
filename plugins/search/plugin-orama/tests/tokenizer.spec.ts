import type { Tokenizer } from '@orama/orama'
import { insertMultiple, search } from '@orama/orama'
import { describe, expect, it } from 'vitest'

import { getStopWords } from '../src/node/stopwords.js'
import {
  createIndex,
  createTokenizer,
  decodeIndex,
  encodeIndex,
  preloadTokenizers,
  serializeIndex,
} from '../src/shared/index.js'
import type { IndexItem, SearchIndex } from '../src/shared/index.js'

// Create a searchable index of a single locale
const createSearchableIndex = async (
  language: string,
  docs: IndexItem[],
): Promise<SearchIndex> => {
  await preloadTokenizers([language])

  const index = createIndex(language, null, {
    stopWords: await getStopWords(language),
  })

  await insertMultiple(index, docs)

  return index
}

// Count the results of a query
const countResults = (index: SearchIndex, query: string): number =>
  (
    search(index, {
      term: query,
      threshold: 0,
      limit: 10,
    }) as { hits: unknown[] }
  ).hits.length

describe(createTokenizer, () => {
  it('should keep the language tag, so that it can be recreated', () => {
    expect(createTokenizer('en-US').language).toBe('en-US')
    expect(createTokenizer('zh-CN').language).toBe('zh-CN')
    expect(createTokenizer('ko-KR').language).toBe('ko-KR')
  })

  it('should fall back to a usable language for empty tags', () => {
    expect(createTokenizer('').language).toBe('en')
  })

  it('should keep non-string values as is', () => {
    // Orama also tokenizes numbers and booleans
    expect(
      createTokenizer('en-US').tokenize(42 as unknown as string),
    ).toStrictEqual([42])
  })

  describe('languages handled by the built-in tokenizer', () => {
    it('should split on whitespace and punctuation', () => {
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

    it('should lowercase tokens', () => {
      expect(
        createTokenizer('en-US').tokenize('VuePress PLUGIN'),
      ).toStrictEqual(['vuepress', 'plugin'])
    })

    it('should fold diacritics', () => {
      expect(
        createTokenizer('fr-FR').tokenize('Le Café à Paris'),
      ).toStrictEqual(['le', 'cafe', 'a', 'paris'])
      expect(createTokenizer('de-DE').tokenize('Die Straße')).toStrictEqual([
        'die',
        'strase',
      ])
    })

    it('should remove stop-words', () => {
      expect(
        createTokenizer('en-US', ['the', 'is']).tokenize('The fox is here'),
      ).toStrictEqual(['fox', 'here'])
      expect(
        createTokenizer('en-US').tokenize('The fox is here'),
      ).toStrictEqual(['the', 'fox', 'is', 'here'])
    })
  })

  describe('chinese and Japanese', () => {
    it('should segment words instead of splitting on whitespace', () => {
      expect(createTokenizer('zh-CN').tokenize('中文内容测试')).toStrictEqual([
        '中文',
        '内容',
        '测试',
      ])
      expect(createTokenizer('ja-JP').tokenize('日本語のテスト')).toContain(
        '日本語',
      )
    })

    it('should ignore punctuation and whitespace', () => {
      expect(createTokenizer('zh-CN').tokenize('（中文） 内容')).toStrictEqual([
        '中文',
        '内容',
      ])
    })

    it('should lowercase tokens', () => {
      // The official `@orama/tokenizers` tokenizers do not lowercase, so that
      // `vuepress` would not match `VuePress` without this
      expect(createTokenizer('zh-CN').tokenize('VuePress 插件文档')).toContain(
        'vuepress',
      )
    })

    it('should remove stop-words', () => {
      // The official `@orama/tokenizers` tokenizers never apply their
      // `stopWords` option
      expect(
        createTokenizer('zh-CN', ['内容']).tokenize('中文内容测试'),
      ).toStrictEqual(['中文', '测试'])
    })
  })

  describe('languages missing from Orama', () => {
    it('should fall back to `Intl.Segmenter`', () => {
      expect(
        createTokenizer('ko-KR').tokenize('한국어 검색 테스트'),
      ).toStrictEqual(['한국어', '검색', '테스트'])
    })

    it('should split the characters of scripts without word separators', () => {
      expect(createTokenizer('th-TH').tokenize('ภาษาไทย')).not.toHaveLength(0)
    })

    it('should lowercase and fold diacritics', () => {
      // Orama only folds the Latin-1 Supplement and Latin Extended-A blocks,
      // so the Vietnamese diacritics have to be folded by us
      expect(createTokenizer('vi-VN').tokenize('Hướng Dẫn')).toStrictEqual([
        'huong',
        'dan',
      ])
    })

    it('should remove stop-words', () => {
      expect(
        createTokenizer('ko-KR', ['검색']).tokenize('한국어 검색'),
      ).toStrictEqual(['한국어'])
    })
  })
})

describe('search with the out-of-the-box tokenizer', () => {
  it('should match Chinese words', async () => {
    const index = await createSearchableIndex('zh-CN', [
      { id: '0', h: '这是一个中文的测试' },
      { id: '1', h: '中文分词插件' },
    ])

    expect(countResults(index, '中文')).toBe(2)
    expect(countResults(index, '插件')).toBe(1)
  })

  it('should match Chinese words character by character', async () => {
    const index = await createSearchableIndex('zh-CN', [
      { id: '0', h: '中文内容测试' },
    ])

    // Word segmentation is not perfect, but adjacent characters are indexed as
    // nearby words, so a query still matches the word it appears in
    expect(countResults(index, '内容')).toBe(1)
    expect(countResults(index, '测试')).toBe(1)
  })

  it('should remove Chinese stop-words', async () => {
    const index = await createSearchableIndex('zh-CN', [
      { id: '0', h: '这是一个中文的测试' },
    ])

    expect(countResults(index, '的')).toBe(0)
  })

  it('should match Latin words inside Chinese content', async () => {
    const index = await createSearchableIndex('zh-CN', [
      { id: '0', h: 'VuePress 插件文档' },
    ])

    expect(countResults(index, 'VuePress')).toBe(1)
    // The official tokenizer does not lowercase, so this is our own behavior
    expect(countResults(index, 'vuepress')).toBe(1)
  })

  it('should match English words regardless of their case', async () => {
    const index = await createSearchableIndex('en-US', [
      { id: '0', h: 'The VuePress Plugin' },
    ])

    expect(countResults(index, 'vuepress')).toBe(1)
    expect(countResults(index, 'VuePress')).toBe(1)
    expect(countResults(index, 'plugin')).toBe(1)
  })

  it('should remove English stop-words', async () => {
    const index = await createSearchableIndex('en-US', [
      { id: '0', h: 'The VuePress Plugin' },
    ])

    expect(countResults(index, 'the')).toBe(0)
  })

  it('should match accented words without their diacritics', async () => {
    const index = await createSearchableIndex('fr-FR', [
      { id: '0', h: 'Le Café à Paris' },
    ])

    expect(countResults(index, 'cafe')).toBe(1)
    expect(countResults(index, 'café')).toBe(1)
  })

  it('should match Japanese words', async () => {
    const index = await createSearchableIndex('ja-JP', [
      { id: '0', h: 'これは日本語のテストです' },
    ])

    expect(countResults(index, '日本語')).toBe(1)
    expect(countResults(index, 'テスト')).toBe(1)
  })

  it('should match Korean words', async () => {
    const index = await createSearchableIndex('ko-KR', [
      { id: '0', h: '한국어 검색 테스트' },
    ])

    expect(countResults(index, '한국어')).toBe(1)
    expect(countResults(index, '검색')).toBe(1)
  })
})

describe('serialization of the tokenizer', () => {
  it('should embed the language and the stop-words', async () => {
    const index = await createSearchableIndex('zh-CN', [{ id: '0', h: '中文' }])

    const serialized = serializeIndex(index)

    expect(serialized.lang).toBe('zh-CN')
    expect(serialized.stopWords).toHaveLength(794)
  })

  it('should leave out the stop-words when there are none', async () => {
    const index = await createSearchableIndex('ko-KR', [
      { id: '0', h: '한국어' },
    ])

    expect(serializeIndex(index)).not.toHaveProperty('stopWords')
  })

  it('should restore an index that tokenizes queries identically', async () => {
    // A restored index that tokenizes queries differently from how it was
    // indexed would silently stop matching
    const languages = ['zh-CN', 'ja-JP', 'en-US', 'de-DE', 'ko-KR']
    const indexes = await Promise.all(
      languages.map((language) =>
        createSearchableIndex(language, [
          { id: '0', h: '这是一个中文的测试 VuePress Plugin' },
        ]),
      ),
    )

    languages.forEach((language, index) => {
      const restored = decodeIndex(encodeIndex(indexes[index]))

      for (const query of ['中文', 'VuePress', 'Plugin', '的']) {
        expect(countResults(restored, query), `${language} / ${query}`).toBe(
          countResults(indexes[index], query),
        )
      }
    })
  })

  it('should keep the stop-words of a restored index', async () => {
    const index = await createSearchableIndex('zh-CN', [
      { id: '0', h: '这是一个中文的测试' },
    ])
    const restored = decodeIndex(encodeIndex(index))

    expect(restored.tokenizer.language).toBe('zh-CN')
    expect(countResults(restored, '的')).toBe(0)
  })
})

describe('custom tokenizer', () => {
  // Split CJK character by character, which is what a dictionary based
  // tokenizer would do instead of the word segmentation of `Intl.Segmenter`
  const splitChars = (text: string): string[] =>
    text
      .toLowerCase()
      .split(/\s+/u)
      .flatMap((word) =>
        // oxlint-disable-next-line unicorn/prefer-spread
        /[\u3400-\u9FFF]/u.test(word) ? word.split('') : [word],
      )
      .filter(Boolean)

  const createCharTokenizer = (): Tokenizer => ({
    language: 'zh-CN',
    normalizationCache: new Map(),
    tokenize: (raw: string) => splitChars(raw),
  })

  const createCharIndex = async (): Promise<SearchIndex> => {
    const index = createIndex('zh-CN', null, {
      tokenizer: createCharTokenizer,
    })

    await insertMultiple(index, [{ id: '0', h: '上海交通大学' }])

    return index
  }

  it('should tokenize the index with the custom tokenizer', async () => {
    const index = await createCharIndex()

    expect(countResults(index, '上海')).toBe(1)
  })

  it('should stay searchable when the client splits the query the same way', async () => {
    // A tokenizer can not be sent to the worker, which tokenizes the queries
    // with the out-of-the-box tokenizer instead. This only works because the
    // client splits the query first and sends it as separate words, so a
    // custom tokenizer has to split words exactly like the `querySplitter`
    const index = await createCharIndex()
    const restored = decodeIndex(encodeIndex(index))

    const splitQuery = splitChars('上海交通').join(' ')

    expect(splitQuery).toBe('上 海 交 通')
    expect(countResults(restored, splitQuery)).toBe(1)
    expect(countResults(restored, splitQuery)).toBe(
      countResults(index, splitQuery),
    )
  })

  it('should not match a query that was not split by the client', async () => {
    // This is the failure mode a custom tokenizer leads to when it is not
    // paired with a matching `querySplitter`: the query is tokenized into words
    // that do not exist in the index
    const index = await createCharIndex()
    const restored = decodeIndex(encodeIndex(index))

    expect(countResults(restored, '上海交通')).toBe(0)
  })
})

describe(getStopWords, () => {
  it('should return the stop-words of a supported language', async () => {
    await expect(getStopWords('zh-CN')).resolves.toHaveLength(794)
    await expect(getStopWords('en-US')).resolves.toHaveLength(180)
  })

  it('should return the same language for every region of a language', async () => {
    await expect(getStopWords('zh-TW')).resolves.toStrictEqual(
      await getStopWords('zh-CN'),
    )
  })

  it('should return undefined for a language without stop-words', async () => {
    // Orama ships no stop-words for Czech
    await expect(getStopWords('cs-CZ')).resolves.toBeUndefined()
    await expect(getStopWords('ko-KR')).resolves.toBeUndefined()
    await expect(getStopWords('')).resolves.toBeUndefined()
  })
})
