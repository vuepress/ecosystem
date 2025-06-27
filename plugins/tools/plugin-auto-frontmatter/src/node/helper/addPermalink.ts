import { ensureEndingSlash, ensureLeadingSlash } from '@vuepress/helper'
import { customAlphabet } from 'nanoid'
import type { AutoFrontmatterData } from '../types.js'

interface AddShortPermalinkOptions {
  /**
   * Use `nanoid` to generate a random character length
   * @default 8
   */
  length?: number
  /**
   * Add prefix
   * @default `/`
   */
  prefix?: string
  /**
   * Add suffix
   * @default `.html`
   */
  suffix?: string
}

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz1234567890', 8)

/**
 * add permalink to frontmatter
 * @param data - frontmatter data
 * @param options - options
 * @example
 * ```ts
 * {
 *   handle(data, context) {
 *     addPermalink(data, { prefix: '/posts/', length: 8, suffix: '.html' })
 *     // => data.permalink = '/posts/ac3e7gh2.html'
 *     return data
 *  }
 * }
 * ```
 */
export const addShortPermalink = (
  data: AutoFrontmatterData,
  options: AddShortPermalinkOptions = {},
): void => {
  if (data.permalink) return

  const { length = 8, prefix = '/', suffix = '.html' } = options
  data.permalink = `${ensureEndingSlash(ensureLeadingSlash(prefix))}${nanoid(length)}${suffix}`
}
