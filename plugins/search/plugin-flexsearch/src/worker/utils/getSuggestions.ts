import {
  CUSTOM_FIELDS_INDEX_ID,
  HEADING_INDEX_ID,
  TEXT_INDEX_ID,
  foldDiacritics,
} from '@vuepress/search-helper/shared'

import { getIndexTokenizer } from '../../shared/index.js'
import type { SearchIndex, WorkerSearchOptions } from '../../shared/index.js'
import { resolveFields, searchIndex } from './search.js'

/** Max count of the suggestions. 建议的最大数量。 */
const SUGGESTION_COUNT = 10

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
 * FlexSearch does not expose the tokens of a query, so the tokens of the
 * matched documents that extend the last token of the query are collected
 * instead. Only the fields that are searched are collected from, so the
 * suggestions never extend a word of a field the search excludes.
 *
 * Only the boost and the searched properties of the search options are reused:
 * the suggestions are collected from the matched documents rather than from the
 * results themselves.
 *
 * 获取查询的自动建议。
 *
 * FlexSearch 不会暴露查询的词条，因此改为从命中文档中收集以查询最后一个词条为前缀扩展的词条。
 * 只会从被搜索的字段中收集，因此建议不会扩展来自被搜索排除的字段中的单词。
 *
 * 只会复用搜索选项中的权重与被搜索的属性：建议是从命中的文档而非结果本身中收集的。
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
  const tokenize = getIndexTokenizer(localeIndex)

  // Use the last token of the query for prefix matching, so that a multi-word
  // query suggests completions for its final word
  const queryToken = tokenize(query).at(-1)

  if (!queryToken) return []

  const searchedFields = resolveFields(searchOptions.properties)
  const suggestions = new Set<string>()

  for (const { document } of searchIndex(localeIndex, query, {
    boost: searchOptions.boost,
    properties: searchOptions.properties,
    limit: SUGGESTION_COUNT,
  })) {
    const fields = [
      ...(searchedFields.includes(HEADING_INDEX_ID)
        ? [document[HEADING_INDEX_ID]]
        : []),
      ...(searchedFields.includes(TEXT_INDEX_ID)
        ? (document[TEXT_INDEX_ID] ?? [])
        : []),
      ...(searchedFields.includes(CUSTOM_FIELDS_INDEX_ID)
        ? (document[CUSTOM_FIELDS_INDEX_ID] ?? [])
        : []),
    ]

    for (const field of fields) {
      if (!field) continue

      for (const token of tokenize(field)) {
        if (token.startsWith(queryToken) && token.length > queryToken.length)
          suggestions.add(getOriginalToken(field, token) ?? token)
      }
    }
  }

  return [...suggestions].slice(0, SUGGESTION_COUNT)
}
