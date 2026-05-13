import { describe, expect, it } from 'vitest'

import {
  defaultQuerySplitter,
  fallbackQuerySplitter,
} from '../src/client/utils/querySplitter.js'

describe(defaultQuerySplitter, () => {
  it('should split query into words', () => {
    const testCases: [string, string[]][] = [
      ['你好世界', ['你好', '世界']],
      ['你好 世界', ['你好', '世界']],
      ['hello world', ['hello', 'world']],
      ['hello 你好 world 世界', ['hello', '你好', 'world', '世界']],
      ['hi hello 你好 世界', ['hi', 'hello', '你好', '世界']],
      ['', []],
    ]

    for (const [query, expected] of testCases) {
      const result = defaultQuerySplitter(query, 'zh-CN')
      expect(result).toEqual(expected)
    }
  })
})

describe(fallbackQuerySplitter, () => {
  it('should split query into characters', () => {
    const testCases: [string, string[]][] = [
      ['你好世界', ['你', '好', '世', '界']],
      ['你好 世界', ['你好', '世界']],
      ['hello world', ['hello', 'world']],
      ['hello 你好 world 世界', ['hello', '你好', 'world', '世界']],
      ['hi hello 你好 世界', ['hi', 'hello', '你好', '世界']],
      ['', ['']],
    ]

    for (const [query, expected] of testCases) {
      const result = fallbackQuerySplitter(query)
      expect(result).toEqual(expected)
    }
  })
})
