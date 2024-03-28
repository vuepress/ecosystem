import { computed } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import type { ClientSideSearchIndex } from './findInIndex.js'

export interface SearchSuggestion {
  link: string
  title: string
  text: string
}

const escapeRegExp = (input: string): string => {
  return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

const highlightText = (
  fullText: string,
  highlightTarget: string,
  splitBy: string,
): string => {
  let result = fullText
  const highlightWords = highlightTarget.split(splitBy).filter(Boolean)
  if (highlightWords.length > 0) {
    for (const word of highlightWords) {
      result = result.replace(
        new RegExp(escapeRegExp(word), 'ig'),
        '<em>$&</em>',
      )
    }
  } else {
    result = fullText.replace(
      new RegExp(escapeRegExp(highlightTarget), 'ig'),
      '<em>$&</em>',
    )
  }

  return result
}

const getSuggestionText = (
  content: string,
  query: string,
  maxLen: number,
): string => {
  const queryIndex = content.toLowerCase().indexOf(query.toLowerCase())
  const queryFirstWord = query.split(' ')[0]
  let startIndex =
    queryIndex === -1
      ? content.toLowerCase().indexOf(queryFirstWord.toLowerCase())
      : queryIndex
  let prefix = ''
  if (startIndex > 15) {
    startIndex -= 15
    prefix = '.. '
  }
  const text = content.substr(startIndex, maxLen)
  return prefix + highlightText(text, query, ' ')
}

export const useSearchSuggestions = ({
  findInIndex,
  routeLocale,
  query,
  maxSuggestions,
}: {
  findInIndex: ClientSideSearchIndex
  routeLocale: Ref<string>
  query: Ref<string>
  maxSuggestions: Ref<number>
}): ComputedRef<SearchSuggestion[]> => {
  return computed(() => {
    const searchStr = query.value.trim().toLowerCase()
    if (!searchStr) return []

    const suggestions: SearchSuggestion[] = findInIndex(
      searchStr,
      maxSuggestions.value,
    ).map((r) => {
      return {
        link: r.path,
        title: r.title,
        text: getSuggestionText(r.content, searchStr, 30),
      }
    })

    return suggestions
  })
}
