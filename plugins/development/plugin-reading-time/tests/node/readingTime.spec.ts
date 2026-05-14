import { describe, expect, it } from 'vitest'

import { getReadingTime, getWordNumber } from '../../src/node/getReadingTime.js'

describe('words test', () => {
  describe('should handle english', () => {
    it('should count words', () => {
      expect(
        getWordNumber('\n Mr.Hope is handsome, and he is a great man.'),
      ).toBe(9)
    })

    it('should ignore marks', () => {
      expect(
        getWordNumber(
          '\n Mr.Hope ! is #$%^&* handsome, and %^&* he is a great man.',
        ),
      ).toBe(9)
    })
  })

  describe('should handle chinese', () => {
    it('should count words', () => {
      expect(getWordNumber('春眠不觉晓，处处闻啼鸟。')).toBe(10)
    })

    it('should ignore marks', () => {
      expect(getWordNumber('春眠^&*(不觉晓，处处闻!#$%啼鸟。')).toBe(10)
    })
  })

  describe('should handle russian', () => {
    it('should count words', () => {
      expect(
        getWordNumber('Для меня очень странно было услышать эту причину.'),
      ).toBe(8)
    })

    it('should ignore marks', () => {
      expect(
        getWordNumber(
          'Для меня очень **странно** [было][] услышать эту причину.',
        ),
      ).toBe(8)
    })
  })

  describe('should handle mixed content', () => {
    it('should count words', () => {
      expect(
        getWordNumber(
          '  春眠不觉晓，处处闻啼鸟。\n   Mr.Hope is handsome, and he is a great man.',
        ),
      ).toBe(19)
    })

    it('should ignore marks', () => {
      expect(
        getWordNumber(
          '春眠^&*(不觉晓，处处闻!#$%啼鸟。\n Mr.Hope ! is #$%^&* handsome, and %^&* he is a great man.',
        ),
      ).toBe(19)
    })
  })
})

describe('reading Time Test', () => {
  it('reading Time', () => {
    expect(
      getReadingTime(
        '\n Mr.Hope ! is #$%^&* handsome, and %^&* he is a great man.',
      ),
    ).toStrictEqual({
      minutes: 0.03,
      words: 9,
    })

    expect(getReadingTime('春眠^&*(不觉晓，处处闻!#$%啼鸟。')).toStrictEqual({
      minutes: 0.03,
      words: 10,
    })

    expect(
      getReadingTime(
        '  春眠不觉晓，处处闻啼鸟。\n   Mr.Hope is handsome, and he is a great man.',
      ),
    ).toStrictEqual({
      minutes: 0.06,
      words: 19,
    })

    expect(
      getReadingTime(
        '\n  春眠不觉晓，处处闻啼鸟。\n   Mr.Hope is handsome, and he is a great man.\n  春眠不觉晓，处处闻啼鸟。\n   Mr.Hope is handsome, and he is a great man.\n  春眠不觉晓，处处闻啼鸟。\n   Mr.Hope is handsome, and he is a great man.\n  春眠不觉晓，处处闻啼鸟。\n   Mr.Hope is handsome, and he is a great man.\n  春眠不觉晓，处处闻啼鸟。\n   Mr.Hope is handsome, and he is a great man.\n  春眠不觉晓，处处闻啼鸟。\n   Mr.Hope is handsome, and he is a great man.\n  春眠不觉晓，处处闻啼鸟。\n   Mr.Hope is handsome, and he is a great man.',
      ),
    ).toStrictEqual({
      minutes: 0.44,
      words: 133,
    })
  })
})
