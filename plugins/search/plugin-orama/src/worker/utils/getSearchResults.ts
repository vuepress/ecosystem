import { getByID, search } from '@orama/orama'
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

  const results = search(localeIndex, {
    term: query,
    boost: {
      [CUSTOM_FIELDS_INDEX_ID]: 4,
      [HEADING_INDEX_ID]: 2,
      [TEXT_INDEX_ID]: 1,
    },
    limit: 100,
    ...searchOptions,
  })

  ;(
    results as {
      hits: { id: string; score: number; document: IndexItem }[]
    }
  ).hits.forEach(({ id, score }) => {
    const isCustomField = id.includes('@')
    const isSection = id.includes('#')
    const [pageIndex, info] = id.split(/[#@]/u)
    const pageId = Number(pageIndex)

    // oxlint-disable-next-line no-multi-assign
    const { contents } = (resultMap[pageId] ??= {
      title: '',
      contents: [],
    })

    const document = getByID(localeIndex, id) as IndexItem | null

    // CustomFieldIndexItem
    if (isCustomField) {
      const fields = document?.[CUSTOM_FIELDS_INDEX_ID] ?? []

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
          getMatchedContent(document?.[HEADING_INDEX_ID] ?? '', term),
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

      if (document?.[TEXT_INDEX_ID]) {
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
    .sort(([, valueA], [, valueB]) =>
      (sortStrategy ? sortResultByTotal : sortResultByMax)(valueA, valueB),
    )
    .map(([id, { contents }]) => {
      // Search to get title
      const pageIndex = getByID(localeIndex, id) as IndexItem | null
      const title = pageIndex?.[HEADING_INDEX_ID] ?? ''

      return {
        title,
        contents: contents.map(([result]) => result),
      }
    })
}
