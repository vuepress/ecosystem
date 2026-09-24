import type { MatchedItem } from '../../shared/index.js'
import { getSearchClientConfig } from '../define.js'

/**
 * Get the path of a matched item.
 *
 * 获取匹配项的路径。
 *
 * @example
 *   import { getResultPath } from '@vuepress/search-helper/client'
 *
 *   getResultPath({ type: 'heading', id: 0, anchor: 'foo', display: [] })
 *   // '/page.html#foo'
 *
 * @param item - Matched item 匹配项
 * @returns Path of the item 匹配项的路径
 */
export const getResultPath = (item: MatchedItem): string =>
  getSearchClientConfig().store[item.id] +
  ('anchor' in item ? `#${item.anchor}` : '')
