import { buildSearchResults } from '@vuepress/search-helper/shared'
import type {
  SearchResult,
  SearchSortStrategy,
} from '@vuepress/search-helper/shared'

import { HEADING_INDEX_ID, getIndexTokenizer } from '../../shared/index.js'
import type { SearchIndex, WorkerSearchOptions } from '../../shared/index.js'
import { searchIndex } from './search.js'

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
): SearchResult[] =>
  buildSearchResults({
    hits: searchIndex(localeIndex, query, searchOptions),
    // Tokenize the query with the tokenizer of the index, so that the matches
    // are highlighted the same way they were indexed
    displayTerms: getIndexTokenizer(localeIndex)(query),
    // Search the store to get the title when the page-level document did not
    // match the query
    getPageTitle: (pageId) =>
      localeIndex.get(String(pageId))?.[HEADING_INDEX_ID],
    sortStrategy,
  })
