import { removeEndingSlash, removeLeadingSlash } from '@vuepress/helper'

export const createAssetPattern = (prefix: string): RegExp => {
  // oxlint-disable-next-line id-length
  const s = `(${prefix}.*?)`
  return new RegExp(
    [
      `(?:"${s}")`, // "prefix"
      `(?:'${s}')`, // 'prefix'
      `(?:\\(${s}\\))`, // (prefix)
      `(?:\\('${s}'\\))`, // ('prefix')
      `(?:\\("${s}"\\))`, // ("prefix")
      `(?:\\\\"${s}\\\\")`, // \"prefix\"
    ].join('|'),
    'gu',
  )
}

/**
 * Normalize url
 *
 * @example
 * ```ts
 * normalizeUrl('/bar', '/foo/') // -> /foo/bar
 * ```
 */
export const normalizeUrl = (url: string, base?: string): string => {
  if (!url) return ''

  if (base) {
    return `${removeEndingSlash(base)}/${removeLeadingSlash(url)}`
  }

  return url
}
