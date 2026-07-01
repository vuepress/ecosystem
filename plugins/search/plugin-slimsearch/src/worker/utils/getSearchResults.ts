import { entries } from '@vuepress/helper/shared'
import type { MatchInfo, SearchIndex } from 'slimsearch'
import { getStoredFields, search } from 'slimsearch'

import {
  HEADING_INDEX_ID,
  TEXT_INDEX_ID,
  CUSTOM_FIELDS_INDEX_ID,
} from '../../shared/index.js'
import type {
  CustomFieldIndexItem,
  IndexItem,
  PageIndexItem,
  HeadingMatchedItem,
  MatchedItem,
  SearchResult,
  TitleMatchedItem,
  Word,
  WorkerSearchOptions,
} from '../../shared/index.js'
import { getMatchedContent } from './getMatchedContent.js'

export type MiniSearchResult = IndexItem & {
  terms: string[]
  score: number
  match: MatchInfo
}

interface PageResult {
  title: string
  contents: [result: MatchedItem, score: number][]
}

type ResultMap = Record<string, PageResult>

const sortResultByTotal = (valueA: PageResult, valueB: PageResult): number =>
  valueB.contents.reduce((total, [, score]) => total + score, 0) -
  valueA.contents.reduce((total, [, score]) => total + score, 0)

const sortResultByMax = (valueA: PageResult, valueB: PageResult): number =>
  Math.max(...valueB.contents.map(([, score]) => score)) -
  Math.max(...valueA.contents.map(([, score]) => score))

// oxlint-disable-next-line max-lines-per-function
export const getSearchResults = (
  query: string,
  localeIndex: SearchIndex<string, IndexItem, IndexItem>,
  searchOptions: WorkerSearchOptions = {},
  sortStrategy = 'max',
): SearchResult[] => {
  const resultMap: ResultMap = {}

  const results = search(localeIndex, query, {
    boost: {
      [CUSTOM_FIELDS_INDEX_ID]: 4,
      [HEADING_INDEX_ID]: 2,
      [TEXT_INDEX_ID]: 1,
    },
    prefix: true,
    ...searchOptions,
  })

  results.forEach((result) => {
    const { id, terms, score } = result
    const isCustomField = id.includes('@')
    const isSection = id.includes('#')
    const [pageIndex, info] = id.split(/[#@]/u)
    const pageId = Number(pageIndex)

    const displayTerms = terms
      .sort((a, b) => a.length - b.length)
      .filter((item, index) =>
        terms.slice(index + 1).every((term) => !term.includes(item)),
      )

    const { contents } = (resultMap[pageId] ??= {
      title: '',
      contents: [],
    })

    // CustomFieldIndexItem
    if (isCustomField) {
      contents.push([
        {
          type: 'customField',
          id: pageId,
          index: info,
          display: displayTerms
            .flatMap((term) =>
              (result as CustomFieldIndexItem)[CUSTOM_FIELDS_INDEX_ID].map(
                (field) => getMatchedContent(field, term),
              ),
            )
            .filter((item): item is Word[] => item != null),
        },
        score,
      ])
    } else {
      const headerContent = displayTerms
        .map((term) =>
          getMatchedContent((result as PageIndexItem)[HEADING_INDEX_ID], term),
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

      if (TEXT_INDEX_ID in result && result[TEXT_INDEX_ID]) {
        for (const text of result[TEXT_INDEX_ID]) {
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
    .sort(([, valueA], [, valueB]) =>
      (sortStrategy ? sortResultByTotal : sortResultByMax)(valueA, valueB),
    )
    .map(([id, { title, contents }]) => {
      // Search to get title
      if (!title) {
        const pageIndex = getStoredFields(localeIndex, id) as unknown as
          | PageIndexItem
          | undefined

        // oxlint-disable-next-line no-param-reassign
        if (pageIndex) title = pageIndex[HEADING_INDEX_ID]
      }

      return {
        title,
        contents: contents.map(([result]) => result),
      }
    })
}
