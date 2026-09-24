import { buildSearchResults } from '@vuepress/search-helper/shared'
import { getStoredFields, search } from 'slimsearch'

import {
  CUSTOM_FIELDS_INDEX_ID,
  HEADING_INDEX_ID,
  TEXT_INDEX_ID,
} from '../../shared/index.js'
import type {
  PageIndexItem,
  SearchIndex,
  SearchResult,
  SearchSortStrategy,
  WorkerSearchOptions,
} from '../../shared/index.js'

/**
 * Normalize the matched terms of a result for highlighting.
 *
 * Terms are sorted by length and the ones contained in a longer term are
 * dropped, so that the longest term is highlighted as a whole.
 *
 * 规范化命中项的匹配词条，用于高亮。
 *
 * 词条会按长度排序，并丢弃被更长词条包含的词条，从而把最长的词条整体高亮。
 *
 * @param terms - Matched terms 匹配的词条
 * @returns Normalized terms 规范化后的词条
 */
const normalizeTerms = (terms: string[]): string[] =>
  terms
    .sort((a, b) => a.length - b.length)
    .filter((item, index) =>
      terms.slice(index + 1).every((term) => !term.includes(item)),
    )

/**
 * Search a locale index and build the search results.
 *
 * 搜索某个语言环境的索引并构建搜索结果。
 *
 * @param query - Search query 搜索词
 * @param localeIndex - Locale search index 语言搜索索引
 * @param searchOptions - Search options 搜索选项
 * @param sortStrategy - Strategy to sort the results 结果的排序策略
 * @returns Search results 搜索结果
 */
export const getSearchResults = (
  query: string,
  localeIndex: SearchIndex,
  searchOptions: WorkerSearchOptions = {},
  sortStrategy: SearchSortStrategy = 'max',
): SearchResult[] => {
  const results = search(localeIndex, query, {
    boost: {
      [CUSTOM_FIELDS_INDEX_ID]: 4,
      [HEADING_INDEX_ID]: 2,
      [TEXT_INDEX_ID]: 1,
    },
    prefix: true,
    ...searchOptions,
  })

  return buildSearchResults({
    hits: results.map(({ id, score, terms, ...document }) => ({
      id,
      score,
      terms: normalizeTerms(terms),
      // SlimSearch does not store the id in the document
      document: { ...document, id },
    })),
    displayTerms: [],
    // Search the index to get the title when the page-level document did not
    // match the query
    getPageTitle: (pageId) =>
      (
        getStoredFields(localeIndex, String(pageId)) as unknown as
          | PageIndexItem
          | undefined
      )?.[HEADING_INDEX_ID],
    sortStrategy,
  })
}
