// oxlint-disable vitest/max-expects
import { describe, expect, it } from 'vitest'

import { getMatchedContent } from '../src/worker/utils/getMatchedContent.js'

const LONG =
  "The apple is red, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious. The banana is yellow, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious"

describe(getMatchedContent, () => {
  it('should match content', () => {
    expect(getMatchedContent('a b c d', 'a')).toStrictEqual({
      text: 'a b c d',
      highlights: [0, 1],
    })
    expect(getMatchedContent('a b c d', 'b')).toStrictEqual({
      text: 'a b c d',
      highlights: [2, 3],
    })
    expect(getMatchedContent('apple banana cherry', 'banana')).toStrictEqual({
      text: 'apple banana cherry',
      highlights: [6, 12],
    })
  })

  it('should preserve the original case of the content', () => {
    expect(getMatchedContent('Hello World', 'hello')).toStrictEqual({
      text: 'Hello World',
      highlights: [0, 5],
    })
    expect(getMatchedContent('The Quick Brown Fox', 'quick')).toStrictEqual({
      text: 'The Quick Brown Fox',
      highlights: [4, 9],
    })
    expect(getMatchedContent('VuePress Search Plugin', 'search')).toStrictEqual(
      {
        text: 'VuePress Search Plugin',
        highlights: [9, 15],
      },
    )
  })

  it('should return null if no content is matched', () => {
    expect(getMatchedContent('b c d', 'a')).toBeNull()
  })

  it('should match content multiple times', () => {
    expect(getMatchedContent('a b c d c b a', 'b')).toStrictEqual({
      text: 'a b c d c b a',
      highlights: [2, 3, 10, 11],
    })
  })

  it('should cut off long content', () => {
    expect(
      getMatchedContent(
        "The apple is red, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery delicious",
        'apple',
      ),
    ).toStrictEqual({
      text: "… The apple is red, and it's ve …",
      highlights: [6, 11],
    })

    expect(getMatchedContent(LONG, 'is')).toStrictEqual({
      text: "… The apple is red, and it's veeee …",
      highlights: [12, 14],
    })

    expect(getMatchedContent(LONG, 'The')).toStrictEqual({
      text: 'The apple is red, and i …',
      highlights: [0, 3],
    })

    expect(getMatchedContent(LONG, 'delicious')).toStrictEqual({
      text: '… eeeeeeeeeeeeeeeeery delicious. The banana is yell …',
      highlights: [22, 31],
    })

    expect(getMatchedContent(LONG, 'T')).toStrictEqual({
      text: "The apple is red, and it's veeeeeeeeeeeeeeee …",
      highlights: [0, 1, 23, 24],
    })

    expect(getMatchedContent(LONG, 'h')).toStrictEqual({
      text: '… The apple is red, and  …',
      highlights: [3, 4],
    })

    expect(getMatchedContent(LONG, 'Th')).toStrictEqual({
      text: 'The apple is red, and  …',
      highlights: [0, 2],
    })

    expect(getMatchedContent(LONG, 'e')).toStrictEqual({
      text: "… The apple is red, and it's veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee …",
      highlights: [
        4, 5, 10, 11, 16, 17, 30, 31, 31, 32, 32, 33, 33, 34, 34, 35, 35, 36,
        36, 37, 37, 38, 38, 39, 39, 40, 40, 41, 41, 42, 42, 43, 43, 44, 44, 45,
        45, 46, 46, 47, 47, 48, 48, 49, 49, 50, 50, 51, 51, 52, 52, 53, 53, 54,
        54, 55, 55, 56, 56, 57, 57, 58, 58, 59, 59, 60,
      ],
    })

    expect(getMatchedContent(LONG, 's')).toStrictEqual({
      text: "… The apple is red, and it's veeeeeeeeeeeeeeeeee …",
      highlights: [13, 14, 27, 28],
    })

    expect(getMatchedContent(LONG, 'u')).toStrictEqual({
      text: '… eeeeeeeeeery delicious. The banana is yel …',
      highlights: [22, 23],
    })

    expect(getMatchedContent(LONG, 'us')).toStrictEqual({
      text: '… eeeeeeeeeery delicious. The banana is yell …',
      highlights: [22, 24],
    })
  })
})
