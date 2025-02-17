import { expect, it } from 'vitest'
import { defaultQuerySplitter } from '../src/client/utils/querySplitter.js'

it('defaultQuerySplitter', () => {
  const testCases: [string, string[]][] = [
    ['你好世界', ['你', '好', '世', '界']],
    ['你好 世界', ['你好', '世界']],
    ['hello world', ['hello', 'world']],
    ['hello 你好 world 世界', ['hello', '你好', 'world', '世界']],
    ['hi hello 你好 世界', ['hi', 'hello', '你好', '世界']],
    ['', ['']],
  ]

  for (const [query, expected] of testCases) {
    const result = defaultQuerySplitter(query)
    expect(result).toEqual(expected)
  }
})
