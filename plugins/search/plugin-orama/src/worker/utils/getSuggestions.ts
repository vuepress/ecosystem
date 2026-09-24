import { search } from '@orama/orama'
import { foldDiacritics } from '@vuepress/search-helper/shared'
import type { IndexItemDocument } from '@vuepress/search-helper/shared'

import {
  CUSTOM_FIELDS_INDEX_ID,
  HEADING_INDEX_ID,
  TEXT_INDEX_ID,
} from '../../shared/index.js'
import type {
  SearchableProperty,
  SearchIndex,
  WorkerSearchOptions,
} from '../../shared/index.js'

/**
 * Find the original-cased occurrence of a (lowercased and folded) token in a
 * field.
 *
 * The tokenizer lowercases tokens and folds their diacritics for indexing, so
 * we look the token up in the folded field text to preserve the document's case
 * in the suggestions.
 *
 * 在字段中查找小写且已折叠变音符号的词条所对应的原始大小写文本。
 *
 * 分词器为索引而将词条小写化并折叠变音符号，因此我们在折叠后的字段文本中进行查找，以便在建议中保留文档原有的大小写。
 *
 * @param field - Original field text 原始字段文本
 * @param token - Lowercased and folded token 小写且已折叠变音符号的词条
 * @returns Original-cased token, or null if not found 原始大小写的词条，未找到时返回 null
 */
const getOriginalToken = (field: string, token: string): string | null => {
  const fieldFolded = foldDiacritics(field.toLowerCase())
  const tokenFolded = foldDiacritics(token.toLowerCase())
  let index = 0

  while ((index = fieldFolded.indexOf(tokenFolded, index)) !== -1) {
    const original = field.slice(index, index + tokenFolded.length)

    if (foldDiacritics(original.toLowerCase()) === tokenFolded) return original
    index += tokenFolded.length
  }

  return null
}

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

  const searchedProperties: SearchableProperty[] =
    properties && properties !== '*'
      ? [...properties]
      : [HEADING_INDEX_ID, TEXT_INDEX_ID, CUSTOM_FIELDS_INDEX_ID]

  const results = search(localeIndex, {
    term: query,
    threshold: 0,
    limit: 10,
    ...rest,
    properties: searchedProperties,
  })

  // Use the last token of the query for prefix matching, so that a multi-word
  // query suggests completions for its final word
  const queryToken =
    localeIndex.tokenizer.tokenize(query).pop()?.toLowerCase() ?? query

  const suggestions = new Set<string>()

  ;(results as { hits: { document: IndexItemDocument }[] }).hits.forEach(
    ({ document }) => {
      const fields = [document.h, ...(document.t ?? []), ...(document.c ?? [])]

      fields.forEach((field) => {
        if (!field) return

        localeIndex.tokenizer.tokenize(field).forEach((token) => {
          if (token.startsWith(queryToken) && token.length > queryToken.length)
            suggestions.add(getOriginalToken(field, token) ?? token)
        })
      })
    },
  )

  return [...suggestions].slice(0, 10)
}
