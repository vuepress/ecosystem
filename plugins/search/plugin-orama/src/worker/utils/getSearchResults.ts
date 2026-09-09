import { getByID, search } from '@orama/orama'
import type { SearchParamsFullText } from '@orama/orama'
import { entries } from '@vuepress/helper/shared'

import {
  CUSTOM_FIELDS_INDEX_ID,
  HEADING_INDEX_ID,
  TEXT_INDEX_ID,
} from '../../shared/index.js'
import type {
  HeadingMatchedItem,
  IndexItem,
  MatchedItem,
  SearchableProperty,
  SearchIndex,
  SearchResult,
  TitleMatchedItem,
  WorkerSearchOptions,
  Word,
} from '../../shared/index.js'
import { getMatchedContent } from './getMatchedContent.js'

interface PageResult {
  title: string
  contents: [result: MatchedItem, score: number][]
}

type ResultMap = Record<number, PageResult>

/**
 * Perform a search with the given options.
 *
 * The `id` field is excluded from the searched properties by default, because
 * searching it would produce spurious matches. A `threshold` of `0` is used so
 * that all query terms must match (AND semantics), consistent with the
 * slimsearch plugin.
 *
 * 使用给定选项执行搜索。
 *
 * 默认会从搜索属性中排除 `id` 字段，因为搜索它会带来无效匹配。`threshold` 设为 `0` 使得所有搜索词都必须匹配（AND 语义），与
 * slimsearch 插件保持一致。
 *
 * @param localeIndex - Locale search index 语言搜索索引
 * @param query - Search query 搜索词
 * @param searchOptions - Search options 搜索选项
 * @param extra - Extra search params 额外搜索参数
 * @returns Orama search results Orama 搜索结果
 */
const searchWithOptions = (
  localeIndex: SearchIndex,
  query: string,
  searchOptions: WorkerSearchOptions,
  extra: Partial<SearchParamsFullText<SearchIndex, IndexItem>>,
): ReturnType<typeof search<SearchIndex, IndexItem>> => {
  const { properties, ...rest } = searchOptions

  const searchedProperties: SearchableProperty[] =
    properties && properties !== '*'
      ? [...properties]
      : [HEADING_INDEX_ID, TEXT_INDEX_ID, CUSTOM_FIELDS_INDEX_ID]

  return search(localeIndex, {
    term: query,
    threshold: 0,
    ...extra,
    ...rest,
    properties: searchedProperties,
  })
}

const sortResultByTotal = (valueA: PageResult, valueB: PageResult): number =>
  valueB.contents.reduce((total, [, score]) => total + score, 0) -
  valueA.contents.reduce((total, [, score]) => total + score, 0)

const sortResultByMax = (valueA: PageResult, valueB: PageResult): number =>
  Math.max(...valueB.contents.map(([, score]) => score)) -
  Math.max(...valueA.contents.map(([, score]) => score))

export const getSearchResults = (
  query: string,
  localeIndex: SearchIndex,
  searchOptions: WorkerSearchOptions = {},
  sortStrategy = 'max',
): SearchResult[] => {
  const resultMap: ResultMap = {}

  // Tokenize the query with the same tokenizer used to build the index, so
  // that CJK and case handling are consistent
  const displayTerms = localeIndex.tokenizer.tokenize(query)

  const results = searchWithOptions(localeIndex, query, searchOptions, {
    boost: {
      [CUSTOM_FIELDS_INDEX_ID]: 4,
      [HEADING_INDEX_ID]: 2,
      [TEXT_INDEX_ID]: 1,
    },
    limit: 100,
  })

  ;(
    results as {
      hits: { id: string; score: number; document: IndexItem }[]
    }
  ).hits.forEach(({ id, score, document }) => {
    const isCustomField = id.includes('@')
    const isSection = id.includes('#')
    const [pageIndex, info] = id.split(/[#@]/u)
    const pageId = Number(pageIndex)

    // oxlint-disable-next-line no-multi-assign
    const { contents } = (resultMap[pageId] ??= {
      title: '',
      contents: [],
    })

    // The page-level document holds the page title
    if (document.id === String(pageId))
      resultMap[pageId].title = document[HEADING_INDEX_ID] ?? ''

    // CustomFieldIndexItem
    if (isCustomField) {
      const fields = document[CUSTOM_FIELDS_INDEX_ID] ?? []

      contents.push([
        {
          type: 'customField',
          id: pageId,
          index: info,
          display: displayTerms
            .flatMap((term) =>
              fields.map((field) => getMatchedContent(field, term)),
            )
            .filter((item): item is Word[] => item != null),
        },
        score,
      ])
    } else {
      const headerContent = displayTerms
        .map((term) =>
          getMatchedContent(document[HEADING_INDEX_ID] ?? '', term),
        )
        .filter((item): item is Word[] => item != null)

      if (headerContent.length > 0) {
        contents.push([
          {
            type: isSection ? 'heading' : 'title',
            id: pageId,
            ...(isSection && { anchor: info }),
            display: headerContent,
          } as HeadingMatchedItem | TitleMatchedItem,
          score,
        ])
      }

      if (document[TEXT_INDEX_ID]) {
        for (const text of document[TEXT_INDEX_ID]) {
          const matchedContent = displayTerms
            .map((term) => getMatchedContent(text, term))
            .filter((item): item is Word[] => item != null)

          if (matchedContent.length > 0) {
            contents.push([
              {
                type: 'text',
                id: pageId,
                ...(isSection && { anchor: info }),
                display: matchedContent,
              },
              score,
            ])
          }
        }
      }
    }
  })

  return entries(resultMap)
    .filter(([, { contents }]) => contents.length > 0)
    .sort(([, valueA], [, valueB]) =>
      (sortStrategy === 'total' ? sortResultByTotal : sortResultByMax)(
        valueA,
        valueB,
      ),
    )
    .map(([id, { title, contents }]) => ({
      // Search to get title if the page-level document did not match
      title: title || (getByID(localeIndex, id)?.[HEADING_INDEX_ID] ?? ''),
      contents: contents.map(([result]) => result),
    }))
}
