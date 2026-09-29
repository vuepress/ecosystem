import { beforeAll, describe, expect, it } from 'vitest'

import { createTokenizer, isSegmenterAvailable } from '../src/shared/index.js'

describe('when `Intl.Segmenter` is not available', () => {
  // oxlint-disable-next-line vitest/no-hooks
  beforeAll(() => {
    // Simulate a browser without `Intl.Segmenter`, such as Firefox < 125
    //
    // It has to happen before any tokenizer is created, and this lives in its
    // own test file because the tokenizers are created eagerly
    Reflect.deleteProperty(Intl, 'Segmenter')
  })

  it('should detect that the segmenter is missing', () => {
    expect(isSegmenterAvailable()).toBe(false)
  })

  it('should split words of whitespace separated languages', () => {
    expect(createTokenizer('en-US')('Hello, World!')).toStrictEqual([
      'hello',
      'world',
    ])
    expect(createTokenizer('en-US')("It's a test")).toStrictEqual([
      "it's",
      'a',
      'test',
    ])
  })

  it('should split the characters of scripts without word separators', () => {
    expect(createTokenizer('zh-CN')('中文内容')).toStrictEqual([
      '中',
      '文',
      '内',
      '容',
    ])
    expect(createTokenizer('ko-KR')('한국어')).toStrictEqual(['한', '국', '어'])
  })

  it('should lowercase tokens and fold their diacritics', () => {
    expect(createTokenizer('fr-FR')('Le Café')).toStrictEqual(['le', 'cafe'])
    expect(createTokenizer('vi-VN')('Hướng')).toStrictEqual(['huong'])
  })
})
