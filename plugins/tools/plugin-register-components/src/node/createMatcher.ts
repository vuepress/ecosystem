import picomatch from 'picomatch'

/**
 * @description
 * `globby` uses `!*.md` as an negative-pattern, and `picomatch` needs special handling for this specific case.
 * `globby` 使用 `!*.md` 作为反模式，`picomatch` 需要根据这个特殊情况做特殊处理
 *
 * @param rawPatterns - The raw patterns to create a matcher / 用于创建匹配器的原始模式
 * @returns picomatch matcher / picomatch 匹配器
 */
export const createMatcher = (rawPatterns: string[]): picomatch.Matcher => {
  const patterns: string[] = []
  const ignored: string[] = []

  for (const pattern of rawPatterns) {
    if (pattern.startsWith('!')) {
      ignored.push(pattern.slice(1))
    } else {
      patterns.push(pattern)
    }
  }

  return picomatch(patterns, {
    ignore: ignored.length > 0 ? ignored : undefined,
  })
}
