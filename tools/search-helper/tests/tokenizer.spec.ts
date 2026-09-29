import { describe, expect, it } from 'vitest'

import { createWordTokenizer, foldToken } from '../src/shared/index.js'

describe(foldToken, () => {
  it('should fold the diacritics that fold into an ASCII letter', () => {
    expect(foldToken('café')).toBe('cafe')
    expect(foldToken('naïve')).toBe('naive')
    expect(foldToken('uber')).toBe('uber')
    expect(foldToken('über')).toBe('uber')
  })

  it('should keep the letters that are not an accented letter', () => {
    // `ß` is a letter of its own rather than an accented letter, so it does not
    // fold
    expect(foldToken('straße')).toBe('straße')
  })

  it('should keep the letters that do not fold into an ASCII letter', () => {
    // Folding them would change how they are segmented, e.g. `です` would be
    // split into `て` and `す` by the segmenter
    expect(foldToken('です')).toBe('です')
    expect(foldToken('中文')).toBe('中文')
    expect(foldToken('한국어')).toBe('한국어')
  })
})

describe(createWordTokenizer, () => {
  it('should split a text into its lowercased words', () => {
    expect(createWordTokenizer('en-US')('Hello, World!')).toStrictEqual([
      'hello',
      'world',
    ])
  })

  it('should keep the apostrophes of a word', () => {
    expect(createWordTokenizer('en-US')("It's a test")).toStrictEqual([
      "it's",
      'a',
      'test',
    ])
  })

  it('should split the words of the scripts without word separators', () => {
    expect(createWordTokenizer('zh-CN')('中文内容')).toStrictEqual([
      '中文',
      '内容',
    ])
  })

  it('should keep the repetitions of a word', () => {
    // The engines that score their results by term frequency rank a text
    // higher when a word is repeated, so the tokenizer must not deduplicate
    expect(createWordTokenizer('en-US')('vue vue unique')).toStrictEqual([
      'vue',
      'vue',
      'unique',
    ])
  })

  it('should keep the words that only differ by their diacritics', () => {
    expect(createWordTokenizer('fr-FR')('Café cafe')).toStrictEqual([
      'cafe',
      'cafe',
    ])
  })
})
