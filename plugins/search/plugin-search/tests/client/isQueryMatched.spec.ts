import { describe, expect, it } from 'vitest'

import { isQueryMatched } from '../../src/client/utils/isQueryMatched.js'

describe('query matching', () => {
  it('should match a word at the start of a word', () => {
    expect(isQueryMatched('vue', ['VuePress'])).toBe(true)
  })

  it('should not match a word in the middle of a word', () => {
    // `press` is not a word of `VuePress`, it is only a suffix
    expect(isQueryMatched('press', ['VuePress'])).toBe(false)
  })

  it('should require every word but the last one to match exactly', () => {
    expect(isQueryMatched('vuepress guide', ['VuePress Guide'])).toBe(true)
    expect(isQueryMatched('guide vuepress', ['VuePress Guide'])).toBe(true)
    // `vue` is not a whole word of `VuePress`
    expect(isQueryMatched('vue guide', ['VuePress Guide'])).toBe(false)
  })

  it('should require the last word to match exactly when the query ends with a space', () => {
    expect(isQueryMatched('vue', ['VuePress'])).toBe(true)
    expect(isQueryMatched('vue ', ['VuePress'])).toBe(false)
  })

  it('should be case insensitive', () => {
    expect(isQueryMatched('VUEPRESS', ['vuepress'])).toBe(true)
  })

  it('should treat a query with non-ASCII characters as a substring search', () => {
    expect(isQueryMatched('中文', ['这是一段中文内容'])).toBe(true)
    expect(isQueryMatched('中文 内容', ['这是一段中文内容'])).toBe(true)
    expect(isQueryMatched('英文', ['这是一段中文内容'])).toBe(false)
  })

  it('should escape regular expression characters of the query', () => {
    expect(isQueryMatched('a.b', ['a.b'])).toBe(true)
    // the dot must not act as a wildcard
    expect(isQueryMatched('a.b', ['axb'])).toBe(false)
  })

  it('should match any of the given fields', () => {
    expect(isQueryMatched('author', ['Title', 'author: mr-hope'])).toBe(true)
  })
})
