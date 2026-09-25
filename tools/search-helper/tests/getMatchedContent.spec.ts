// oxlint-disable vitest/max-expects
import { describe, expect, it } from 'vitest'

import { getMatchedContent } from '../src/shared/getMatchedContent.js'

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

    // The single characters below are expanded to the words they belong to
    expect(getMatchedContent(LONG, 'T')).toStrictEqual({
      text: "The apple is red, and it's veeeeeeeeeeeeeeeeee …",
      highlights: [0, 3, 22, 26],
    })

    expect(getMatchedContent(LONG, 'h')).toStrictEqual({
      text: 'The apple is red, and i …',
      highlights: [0, 3],
    })

    expect(getMatchedContent(LONG, 'Th')).toStrictEqual({
      text: 'The apple is red, and i …',
      highlights: [0, 3],
    })

    expect(getMatchedContent(LONG, 'e')).toStrictEqual({
      text: "The apple is red, and it's veeeeeeee …",
      highlights: [0, 3, 4, 9, 13, 16],
    })

    expect(getMatchedContent(LONG, 's')).toStrictEqual({
      text: "… The apple is red, and it's veeeeeeeeeeeeeeeeee …",
      highlights: [12, 14, 24, 28],
    })

    expect(getMatchedContent(LONG, 'u')).toStrictEqual({
      text: '… eeeeeeeeeeeeeeeeery delicious. The banana is yell …',
      highlights: [22, 31],
    })

    expect(getMatchedContent(LONG, 'us')).toStrictEqual({
      text: '… eeeeeeeeeeeeeeeeery delicious. The banana is yell …',
      highlights: [22, 31],
    })
  })
})

describe('whole word highlighting', () => {
  it('should expand a prefix match to the whole word', () => {
    // A query is matched as a prefix, so highlighting only the matched part
    // would cut the word in the middle
    expect(getMatchedContent('The Quick Brown Fox', 'quic')).toStrictEqual({
      text: 'The Quick Brown Fox',
      highlights: [4, 9],
    })
    expect(getMatchedContent('The Quick Brown Fox', 'q')).toStrictEqual({
      text: 'The Quick Brown Fox',
      highlights: [4, 9],
    })
  })

  it('should expand a match in the middle of a word', () => {
    expect(getMatchedContent('catalog category', 'log')).toStrictEqual({
      text: 'catalog category',
      highlights: [0, 7],
    })
  })

  it('should expand every match of a query', () => {
    expect(getMatchedContent('catalog category', 'cat')).toStrictEqual({
      text: 'catalog category',
      highlights: [0, 7, 8, 16],
    })
  })

  it('should keep the apostrophes of a word', () => {
    expect(getMatchedContent("don't stop", 'don')).toStrictEqual({
      text: "don't stop",
      highlights: [0, 5],
    })
  })

  it('should not expand through a hyphen', () => {
    // Hyphens are not part of a word, so `e-mail` is two words
    expect(getMatchedContent('e-mail address', 'mail')).toStrictEqual({
      text: 'e-mail address',
      highlights: [2, 6],
    })
  })

  it('should not expand a Chinese word to its neighbours', () => {
    // Expanding through the word characters would swallow the whole sentence,
    // so the words have to be found by segmentation
    expect(getMatchedContent('上海交通大学', '上海')).toStrictEqual({
      text: '上海交通大学',
      highlights: [0, 2],
    })
    expect(getMatchedContent('上海交通大学', '交通')).toStrictEqual({
      text: '上海交通大学',
      highlights: [2, 4],
    })
    expect(getMatchedContent('这是一个中文的测试', '中文')).toStrictEqual({
      text: '这是一个中文的测试',
      highlights: [4, 6],
    })
  })

  it('should merge the matches that expand to the same word', () => {
    // `cat` and `catalog` both match `catalog`, and expanding them makes them
    // overlap, which would highlight the word twice
    expect(getMatchedContent('catalog', 'cat')).toStrictEqual({
      text: 'catalog',
      highlights: [0, 7],
    })
  })

  it('should not expand a match spanning several words', () => {
    expect(getMatchedContent('foo bar baz', 'foo bar')).toStrictEqual({
      text: 'foo bar baz',
      highlights: [0, 7],
    })
  })
})
