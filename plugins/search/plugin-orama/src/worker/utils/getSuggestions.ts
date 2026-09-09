import { search } from '@orama/orama'

import type {
  IndexItem,
  SearchIndex,
  WorkerSearchOptions,
} from '../../shared/index.js'

/**
 * Get auto suggestions for the query.
 *
 * Orama does not provide a built-in autosuggest API, so we collect tokens from
 * the fields of matched documents that extend the query with a prefix.
 *
 * 获取查询的自动建议。
 *
 * Orama 不提供内置的自动建议 API，因此我们从命中文档的字段中收集以查询为前缀扩展的词条。
 *
 * @param query - Search query 搜索词
 * @param localeIndex - Locale search index 语言搜索索引
 * @param searchOptions - Search options 搜索选项
 * @returns Search suggestions 搜索建议
 */
export const getSuggestions = (
  query: string,
  localeIndex: SearchIndex,
  searchOptions: WorkerSearchOptions = {},
): string[] => {
  const { properties, ...rest } = searchOptions

  const results = search(localeIndex, {
    term: query,
    limit: 10,
    ...rest,
    ...(properties
      ? { properties: properties === '*' ? properties : [...properties] }
      : {}),
  })

  // Use the last token of the query for prefix matching, so that a multi-word
  // query suggests completions for its final word
  const queryToken =
    localeIndex.tokenizer.tokenize(query).pop()?.toLowerCase() ?? query

  const suggestions = new Set<string>()

  ;(results as { hits: { document: IndexItem }[] }).hits.forEach(
    ({ document }) => {
      const fields = [document.h, ...(document.t ?? []), ...(document.c ?? [])]

      fields.forEach((field) => {
        if (!field) return

        localeIndex.tokenizer.tokenize(field).forEach((token) => {
          if (token.startsWith(queryToken) && token.length > queryToken.length)
            suggestions.add(token)
        })
      })
    },
  )

  return [...suggestions].slice(0, 10)
}
