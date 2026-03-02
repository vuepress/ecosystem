import picomatch from 'picomatch'
import { isFunction } from 'vuepress/shared'

type Matcher = (filepath: string) => boolean
type Pattern = Matcher | string[] | string

const matchers = new Map<string[] | string, Matcher>()

/**
 * Create Filter from pattern
 *
 * @param pattern - Pattern to create filter / 用于创建过滤器的模式
 * @returns Filter function / 过滤器函数
 */
export const createFilter = (pattern: Pattern): Matcher => {
  if (isFunction(pattern)) return pattern

  if (matchers.has(pattern)) return matchers.get(pattern)!

  if (!Array.isArray(pattern)) {
    const matcher = picomatch(pattern)
    matchers.set(pattern, matcher)
    return matcher
  }

  const patterns: string[] = []
  const ignorePatterns: string[] = []

  // find negative patterns, like `!*.md`
  for (const item of pattern) {
    if (item.startsWith('!')) ignorePatterns.push(item.slice(1))
    else patterns.push(item)
  }

  const matcher =
    patterns.length === 0
      ? (): false => false
      : picomatch(patterns, { ignore: ignorePatterns })

  matchers.set(pattern, matcher)
  return matcher
}
