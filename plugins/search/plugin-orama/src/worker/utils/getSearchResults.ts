import { getByID, search } from '@orama/orama'
import type { SearchParamsFullText } from '@orama/orama'
import { buildSearchResults } from '@vuepress/search-helper/shared'
import type {
  IndexItemDocument,
  SearchableProperty,
  SearchHit,
} from '@vuepress/search-helper/shared'

import {
  CUSTOM_FIELDS_INDEX_ID,
  HEADING_INDEX_ID,
  TEXT_INDEX_ID,
} from '../../shared/index.js'
import type {
  IndexItem,
  SearchIndex,
  SearchResult,
  WorkerSearchOptions,
  OramaSortStrategy,
} from '../../shared/index.js'

/**
 * Perform a search with the given options.
 *
 * A `threshold` of `0` is used so that all query terms must match (AND
 * semantics). It is stricter than the default `OR` of MiniSearch used by the
 * slimsearch plugin, and it is what makes a query tokenized differently from
 * the index silently return nothing, so the tokenized terms of a hit are
 * highlighted only when they were actually matched.
 *
 * The `id` field is excluded from the searched properties by default, because
 * searching it would produce spurious matches.
 *
 * 使用给定选项执行搜索。
 *
 * `threshold` 设为 `0` 使得所有搜索词都必须匹配（AND 语义）。它比 slimsearch 插件所用的 MiniSearch 默认
 * `OR` 更严格，这也是「查询与索引分词不一致时会静默返回空结果」的原因，因此只有在命中项确实匹配上时才会高亮其词条。
 *
 * 默认会从搜索属性中排除 `id` 字段，因为搜索它会带来无效匹配。
 *
 * @param localeIndex - Locale search index 语言搜索索引
 * @param query - Search query 搜索词
 * @param searchOptions - Search options 搜索选项
 * @returns Orama search results Orama 搜索结果
 */
const searchWithOptions = (
  localeIndex: SearchIndex,
  query: string,
  searchOptions: WorkerSearchOptions,
): SearchHit[] => {
  const { properties, ...rest } = searchOptions

  const searchedProperties: SearchableProperty[] =
    properties && properties !== '*'
      ? [...properties]
      : [HEADING_INDEX_ID, TEXT_INDEX_ID, CUSTOM_FIELDS_INDEX_ID]

  const results = search(localeIndex, {
    term: query,
    threshold: 0,
    boost: {
      [CUSTOM_FIELDS_INDEX_ID]: 4,
      [HEADING_INDEX_ID]: 2,
      [TEXT_INDEX_ID]: 1,
    },
    limit: 100,
    ...rest,
    properties: searchedProperties,
  } as SearchParamsFullText<SearchIndex, IndexItem>)

  return (
    results as {
      hits: { id: string; score: number; document: IndexItem }[]
    }
  ).hits
}

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
  sortStrategy: OramaSortStrategy = 'max',
): SearchResult[] => {
  // Tokenize the query with the same tokenizer used to build the index, so
  // that CJK and case handling are consistent
  const displayTerms = localeIndex.tokenizer.tokenize(query)

  return buildSearchResults({
    hits: searchWithOptions(localeIndex, query, searchOptions),
    displayTerms,
    // Search the index to get the title when the page-level document did not
    // match the query
    getPageTitle: (pageId) =>
      (getByID(localeIndex, String(pageId)) as IndexItemDocument | undefined)?.[
        HEADING_INDEX_ID
      ],
    sortStrategy,
  })
}
