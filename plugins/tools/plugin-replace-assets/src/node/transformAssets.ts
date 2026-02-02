import MagicString from 'magic-string'
import type { ReplacementRule } from './types.js'
import { normalizeUrl } from './utils.js'

/**
 * Check if url matches find
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

export const transformAssets = (
  code: string,
  pattern: RegExp,
  rules: ReplacementRule[],
): string => {
  const s = new MagicString(code)
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
      : matched[0].startsWith('\\"')
        ? ['\\"', '\\"']
        : ['"', '"']

    const start = matched.index
    const end = start + matched[0].length
    const resolved = replacementAssetWithRules(rules, assetUrl)
    if (resolved) {
      hasMatched = true
      s.update(start, end, `${left}${resolved}${right}`)
    }
  }

  if (!hasMatched) return code

  return s.toString()
}
