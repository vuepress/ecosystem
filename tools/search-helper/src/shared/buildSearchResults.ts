import { entries } from '@vuepress/helper/shared'

import type { IndexItemDocument } from './data.js'
import {
  CUSTOM_FIELDS_INDEX_ID,
  HEADING_INDEX_ID,
  TEXT_INDEX_ID,
} from './data.js'
import { getMatchedContent } from './getMatchedContent.js'
import type {
  HeadingMatchedItem,
  MatchedContent,
  MatchedItem,
  SearchResult,
  TitleMatchedItem,
} from './result.js'
import type { SearchSortStrategy } from './sortStrategy.js'

/** A hit returned by the search engine. 搜索引擎返回的命中项。 */
export interface SearchHit {
  /** Index id of the hit 命中项的索引 id */
  id: string
  /** Relevance score of the hit 命中项的相关度分数 */
  score: number
  /** Document of the hit 命中项的文档 */
  document: IndexItemDocument
  /**
   * Tokens matched in this hit
   *
   * Falls back to the shared `displayTerms` when it is not provided.
   *
   * 该命中项中匹配到的词条
   *
   * 未提供时会回退到共用的 `displayTerms`。
   */
  terms?: string[]
}

/** Options for building the search results. 构建搜索结果的选项。 */
export interface BuildSearchResultsOptions {
  /** Hits returned by the search engine 搜索引擎返回的命中项 */
  hits: SearchHit[]
  /**
   * Tokens of the query
   *
   * They are used to highlight the matches, so they should be tokenized the
   * same way the index was.
   *
   * 搜索词的词条
   *
   * 它们用于高亮匹配内容，因此应与构建索引时使用相同的分词方式。
   */
  displayTerms: string[]
  /**
   * Get the title of a page by its index id
   *
   * 通过索引 id 获取页面标题
   *
   * @param pageId - Index id of the page 页面的索引 id
   * @returns Title of the page 页面的标题
   */
  getPageTitle: (pageId: number) => string | undefined
  /**
   * Strategy to sort the results
   *
   * 结果的排序策略
   *
   * @default 'max'
   */
  sortStrategy?: SearchSortStrategy
}

interface PageResult {
  title: string
  contents: [result: MatchedItem, score: number][]
}

type ResultMap = Record<number, PageResult>

const sortResultByTotal = (valueA: PageResult, valueB: PageResult): number =>
  valueB.contents.reduce((total, [, score]) => total + score, 0) -
  valueA.contents.reduce((total, [, score]) => total + score, 0)

const sortResultByMax = (valueA: PageResult, valueB: PageResult): number =>
  Math.max(...valueB.contents.map(([, score]) => score)) -
  Math.max(...valueA.contents.map(([, score]) => score))

/**
 * Build the search results of a query out of the hits of a search engine.
 *
 * Hits are grouped by page: the page-level document provides the title of the
 * page, while every other hit adds a matched section, content or custom field.
 *
 * 根据搜索引擎的命中项构建搜索词的结果。
 *
 * 命中项会按页面分组：页面级文档提供页面标题，其他命中项则会添加匹配的段落、正文或自定义字段。
 *
 * @example
 *   import { buildSearchResults } from '@vuepress/search-helper/shared'
 *
 *   buildSearchResults({
 *     hits,
 *     displayTerms: ['vuepress'],
 *     getPageTitle: (pageId) => '',
 *   })
 *
 * @param options - Build options 构建选项
 * @returns Search results 搜索结果
 */
export const buildSearchResults = ({
  hits,
  displayTerms,
  getPageTitle,
  sortStrategy = 'max',
}: BuildSearchResultsOptions): SearchResult[] => {
  const resultMap: ResultMap = {}

  hits.forEach(({ id, score, document, terms = displayTerms }) => {
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
          display: terms
            .flatMap((term) =>
              fields.map((field) => getMatchedContent(field, term)),
            )
            .filter((item): item is MatchedContent => item != null),
        },
        score,
      ])
    } else {
      const headerContent = terms
        .map((term) =>
          getMatchedContent(document[HEADING_INDEX_ID] ?? '', term),
        )
        .filter((item): item is MatchedContent => item != null)

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
          const matchedContent = terms
            .map((term) => getMatchedContent(text, term))
            .filter((item): item is MatchedContent => item != null)

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
      // Search the index to get the title if the page-level document did not
      // match the query
      title: title || (getPageTitle(Number(id)) ?? ''),
      contents: contents.map(([result]) => result),
    }))
}
