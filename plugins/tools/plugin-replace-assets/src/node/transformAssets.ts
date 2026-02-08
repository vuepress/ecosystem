import MagicString from 'magic-string'
import type { ReplacementRule } from './types.js'
import { normalizeUrl } from './utils.js'

/**
 * Check if url matches find
 *
 * @param find - The find pattern, can be a string or a RegExp / 查找模式，可以是字符串或正则表达式
 * @param url - The URL to check / 要检查的 URL
 * @returns True if the URL matches the find pattern, false otherwise / 如果 URL 匹配查找模式则返回 true，否则返回 false
 */
export const isMatchUrl = (find: RegExp | string, url: string): boolean => {
  if (typeof find === 'string') {
    // like regexp string, start with `^` or end with `$`
    if (find.startsWith('^') || find.endsWith('$')) {
      return new RegExp(find).test(url)
    }

    return url.endsWith(find) || url.startsWith(find)
  }

  return find.test(url)
}

const cache = new Map<string, string>()

/**
 * Replace asset with rules
 *
 * @param rules - Replacement rules / 替换规则
 * @param url - The original asset URL / 原始资源 URL
 * @returns The replaced asset URL if matched, otherwise return undefined / 如果匹配则返回替换后的资源 URL，否则返回 undefined
 *
 * @example
 * ```ts
 * replacementAssetWithRules([{ find: '/foo/', replacement: 'https://example.com' }], '/foo/a.jpg')
 * // -> 'https://example.com/foo/a.jpg'
 * ```
 */
export const replacementAssetWithRules = (
  rules: ReplacementRule[],
  url: string,
): string | void => {
  if (cache.has(url)) return cache.get(url)

  for (const { find, replacement } of rules) {
    if (find && isMatchUrl(find, url)) {
      const replaced =
        typeof replacement === 'function'
          ? normalizeUrl(replacement(url))
          : normalizeUrl(url, replacement)

      /* istanbul ignore if -- @preserve */
      if (replaced) {
        cache.set(url, replaced)
        return replaced
      }
    }
  }
}

const ESCAPED_DOUBLE_QUOTE = String.raw`\"`

export const transformAssets = (
  code: string,
  pattern: RegExp,
  rules: ReplacementRule[],
): string => {
  const str = new MagicString(code)
  let matched: RegExpExecArray | null
  let hasMatched = false

  while ((matched = pattern.exec(code))) {
    const assetUrl =
      matched[6] ||
      matched[5] ||
      matched[4] ||
      matched[3] ||
      matched[2] ||
      matched[1]
    const [left, right] = matched[0].startsWith('(')
      ? ['("', '")']
      : matched[0].startsWith(ESCAPED_DOUBLE_QUOTE)
        ? [ESCAPED_DOUBLE_QUOTE, ESCAPED_DOUBLE_QUOTE]
        : ['"', '"']

    const start = matched.index
    const end = start + matched[0].length
    const resolved = replacementAssetWithRules(rules, assetUrl)
    if (resolved) {
      hasMatched = true
      str.update(start, end, `${left}${resolved}${right}`)
    }
  }

  if (!hasMatched) return code

  return str.toString()
}
