import { describe, expect, it } from 'vitest'

import { createTokenizer, isSegmenterAvailable } from '../src/shared/index.js'

describe(createTokenizer, () => {
  it('should segment words with `Intl.Segmenter`', () => {
    expect(isSegmenterAvailable()).toBe(true)
    expect(createTokenizer('en-US')('Hello, World!')).toStrictEqual([
      'hello',
      'world',
    ])
  })

  it('should keep apostrophes', () => {
    expect(createTokenizer('en-US')("It's a test")).toStrictEqual([
      "it's",
      'a',
      'test',
    ])
  })

  it('should lowercase tokens and fold their diacritics', () => {
    expect(createTokenizer('fr-FR')('Le Café')).toStrictEqual(['le', 'cafe'])
    expect(createTokenizer('vi-VN')('Hướng')).toStrictEqual(['huong'])
  })

  it('should segment the words of scripts without word separators', () => {
    expect(createTokenizer('zh-CN')('中文内容')).toStrictEqual(['中文', '内容'])
    expect(createTokenizer('ja-JP')('日本語のテスト')).toStrictEqual([
      '日本語',
      'の',
      'テスト',
    ])
  })

  it('should remove duplicate tokens', () => {
    expect(createTokenizer('en-US')('VuePress vuepress')).toStrictEqual([
      'vuepress',
    ])
  })
})
