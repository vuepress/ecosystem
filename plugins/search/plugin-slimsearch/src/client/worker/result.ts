import { entries } from '@vuepress/helper/client'
import type { MatchInfo, SearchIndex } from 'slimsearch'
import { getStoredFields, search } from 'slimsearch'

import type {
  CustomFieldIndexItem,
  IndexItem,
  PageIndexItem,
} from '../../shared/index.js'
import type {
  HeadingMatchedItem,
  MatchedItem,
  SearchResult,
  TitleMatchedItem,
  Word,
  WorkerSearchOptions,
} from '../typings/index.js'
import { getMatchedContent } from './matchContent.js'

declare const __SLIMSEARCH_SORT_STRATEGY__: 'max' | 'total'

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

const sortWithTotal = (valueA: PageResult, valueB: PageResult): number =>
  valueB.contents.reduce((total, [, score]) => total + score, 0) -
  valueA.contents.reduce((total, [, score]) => total + score, 0)

const sortWithMax = (valueA: PageResult, valueB: PageResult): number =>
  Math.max(...valueB.contents.map(([, score]) => score)) -
  Math.max(...valueA.contents.map(([, score]) => score))

export const getResults = (
  query: string,
  localeIndex: SearchIndex<string, IndexItem, IndexItem>,
  searchOptions: WorkerSearchOptions = {},
): SearchResult[] => {
  const resultMap: ResultMap = {}

  const results = search(localeIndex, query, {
    boost: {
      // eslint-disable-next-line no-useless-computed-key
      [/** Heading */ 'h']: 2,
      // eslint-disable-next-line no-useless-computed-key
      [/** Text */ 't']: 1,
      // eslint-disable-next-line no-useless-computed-key
      [/** CustomFields */ 'c']: 4,
    },
    prefix: true,
    ...searchOptions,
  })

  results.forEach((result) => {
    const { id, terms, score } = result
    const isCustomField = id.includes('@')
    const isSection = id.includes('#')
    const [pageIndex, info] = id.split(/[#@]/)
    const pageId = Number(pageIndex)

    const displayTerms = terms
      .sort((a, b) => a.length - b.length)
      .filter((item, index) =>
        terms.slice(index + 1).every((term) => !term.includes(item)),
      )

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, no-multi-assign
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
            .map((term) =>
              (result as CustomFieldIndexItem).c.map((field) =>
                getMatchedContent(field, term),
              ),
            )
            .flat()
            .filter((item): item is Word[] => item !== null),
        },
        score,
      ])
    } else {
      const headerContent = displayTerms
        .map((term) => getMatchedContent((result as PageIndexItem).h, term))
        .filter((item): item is Word[] => item !== null)

      if (headerContent.length)
        contents.push([
          {
            type: isSection ? 'heading' : 'title',
            id: pageId,
            ...(isSection && { anchor: info }),
            display: headerContent,
          } as HeadingMatchedItem | TitleMatchedItem,
          score,
        ])

      if (/** Text */ 't' in result && result.t)
        for (const text of result.t) {
          const matchedContent = displayTerms
            .map((term) => getMatchedContent(text, term))
            .filter((item): item is Word[] => item !== null)

          if (matchedContent.length)
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
  })

  return entries(resultMap)
    .sort(([, valueA], [, valueB]) =>
      __SLIMSEARCH_SORT_STRATEGY__ === 'total'
        ? sortWithTotal(valueA, valueB)
        : sortWithMax(valueA, valueB),
    )
    .map(([id, { title, contents }]) => {
      // Search to get title
      if (!title) {
        const pageIndex = getStoredFields(localeIndex, id) as unknown as
          | PageIndexItem
          | undefined

        // eslint-disable-next-line no-param-reassign
        if (pageIndex) title = pageIndex.h
      }

      return {
        title,
        contents: contents.map(([result]) => result),
      }
    })
}
