import { describe, expect, it } from 'vitest'

import {
  getLanguageSubtag,
  getOramaLanguage,
  isSegmenterAvailable,
} from '../src/shared/index.js'

describe(getLanguageSubtag, () => {
  it('should return the primary subtag', () => {
    expect(getLanguageSubtag('zh-Hant-TW')).toBe('zh')
    expect(getLanguageSubtag('en-US')).toBe('en')
  })

  it('should accept a subtag separator', () => {
    // `zh_CN` is not a valid BCP-47 tag but is commonly used
    expect(getLanguageSubtag('zh_CN')).toBe('zh')
  })

  it('should be case-insensitive', () => {
    expect(getLanguageSubtag('EN-us')).toBe('en')
    expect(getLanguageSubtag('ZH')).toBe('zh')
  })

  it('should return an empty string for an empty tag', () => {
    expect(getLanguageSubtag('')).toBe('')
  })
})

describe(getOramaLanguage, () => {
  it('should map the languages handled by the built-in tokenizer', () => {
    expect(getOramaLanguage('en-US')).toBe('english')
    expect(getOramaLanguage('de-DE')).toBe('german')
    expect(getOramaLanguage('fr-FR')).toBe('french')
    expect(getOramaLanguage('ru-RU')).toBe('russian')
  })

  it('should map the languages handled by `@orama/tokenizers`', () => {
    expect(getOramaLanguage('zh-CN')).toBe('mandarin')
    expect(getOramaLanguage('zh-TW')).toBe('mandarin')
    expect(getOramaLanguage('ja-JP')).toBe('japanese')
  })

  it('should map the languages whose subtag does not match the name', () => {
    // Orama calls Hindi `indian`
    expect(getOramaLanguage('hi-IN')).toBe('indian')
    expect(getOramaLanguage('cs-CZ')).toBe('czech')
    expect(getOramaLanguage('sl-SI')).toBe('slovenian')
    expect(getOramaLanguage('sa-IN')).toBe('sanskrit')
  })

  it('should map every Norwegian written form to the same language', () => {
    expect(getOramaLanguage('no-NO')).toBe('norwegian')
    expect(getOramaLanguage('nb-NO')).toBe('norwegian')
    expect(getOramaLanguage('nn-NO')).toBe('norwegian')
  })

  it('should return null for the languages missing from Orama', () => {
    // These languages are listed by Orama's documentation but are missing from
    // every `@orama/*` package
    expect(getOramaLanguage('ko-KR')).toBeNull()
    expect(getOramaLanguage('pl-PL')).toBeNull()
    expect(getOramaLanguage('sk-SK')).toBeNull()
    expect(getOramaLanguage('vi-VN')).toBeNull()
    expect(getOramaLanguage('th-TH')).toBeNull()
  })

  it('should return null for unusable tags', () => {
    expect(getOramaLanguage('')).toBeNull()
    expect(getOramaLanguage('english')).toBeNull()
  })
})

describe(isSegmenterAvailable, () => {
  it('should detect `Intl.Segmenter`', () => {
    // Node.js 22 supports it
    expect(isSegmenterAvailable()).toBe(true)
  })
})
