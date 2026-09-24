import { describe, expect, it } from 'vitest'

import { foldDiacritics } from '../src/shared/index.js'

describe(foldDiacritics, () => {
  it('should fold diacritics', () => {
    expect(foldDiacritics('Café')).toBe('Cafe')
    expect(foldDiacritics('très')).toBe('tres')
    expect(foldDiacritics('schön')).toBe('schon')
    expect(foldDiacritics('hướng dẫn')).toBe('huong dan')
    expect(foldDiacritics('łączenie')).toBe('laczenie')
    expect(foldDiacritics('Ångström')).toBe('Angstrom')
    expect(foldDiacritics('Καλημέρα')).toBe('Καλημερα')
    expect(foldDiacritics('أهلاً')).toBe('اهلاً')
  })

  it('should not change ASCII text', () => {
    expect(foldDiacritics('Hello World 123')).toBe('Hello World 123')
  })

  it('should keep the length of the text', () => {
    // The consuming highlight logic reuses the offsets of the folded text
    expect(foldDiacritics('Café à Paris')).toHaveLength('Café à Paris'.length)
    expect(foldDiacritics('hướng dẫn')).toHaveLength('hướng dẫn'.length)
    expect(foldDiacritics('中文内容')).toHaveLength('中文内容'.length)
  })

  it('should keep characters that can not be folded', () => {
    // No decomposition (or a decomposition into multiple characters) means
    // that folding would change the length of the text
    expect(foldDiacritics('straße')).toBe('straße')
    expect(foldDiacritics('ﬁle')).toBe('ﬁle')
    expect(foldDiacritics('中文内容')).toBe('中文内容')
    expect(foldDiacritics('😀')).toBe('😀')
  })

  it('should be idempotent', () => {
    for (const text of ['Café', 'très', 'straße', '中文内容', ''] as const)
      expect(foldDiacritics(foldDiacritics(text))).toBe(foldDiacritics(text))
  })
})
