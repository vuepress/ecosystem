import type { MatchedContent } from '../../shared/index.js'

const MAX_LENGTH = 100
const SUFFIX_LENGTH = 20
const LEADING_ELLIPSIS = '… '
const TRAILING_ELLIPSIS = ' …'

export const getMatchedContent = (
  content: string,
  queryString: string,
): MatchedContent | null => {
  const contentLowerCase = content.toLowerCase()
  const queryStringLowerCase = queryString.toLowerCase()
  const matchLength = queryStringLowerCase.length

  const matches: [start: number, end: number][] = []
  let matchIndex = contentLowerCase.indexOf(queryStringLowerCase)

  while (matchIndex >= 0) {
    matches.push([matchIndex, matchIndex + matchLength])
    matchIndex = contentLowerCase.indexOf(
      queryStringLowerCase,
      matchIndex + matchLength,
    )
  }

  if (matches.length === 0) return null

  if (content.length <= MAX_LENGTH)
    return { text: content, highlights: matches.flat() }

  // Start the snippet at the first match and extend it to include as many
  // subsequent matches as fit within the budget, leaving room for the
  // surrounding context and ellipses on the truncated sides
  const [firstMatch] = matches
  const [windowStart, firstEnd] = firstMatch
  let windowEnd = firstEnd

  for (const [, end] of matches.slice(1)) {
    if (
      end - windowStart >
      MAX_LENGTH -
        SUFFIX_LENGTH * 2 -
        LEADING_ELLIPSIS.length -
        TRAILING_ELLIPSIS.length
    )
      break

    windowEnd = end
  }

  const hasLeadingCut = windowStart > 0
  const hasTrailingCut = windowEnd < content.length

  // Keep a short context around the truncated sides
  const leadingText = hasLeadingCut
    ? content.slice(Math.max(0, windowStart - SUFFIX_LENGTH), windowStart)
    : ''
  const trailingText = hasTrailingCut
    ? content.slice(
        windowEnd,
        Math.min(content.length, windowEnd + SUFFIX_LENGTH),
      )
    : ''

  const leading = hasLeadingCut ? `${LEADING_ELLIPSIS}${leadingText}` : ''
  const trailing = hasTrailingCut ? `${trailingText}${TRAILING_ELLIPSIS}` : ''

  const bodyLength = MAX_LENGTH - leading.length - trailing.length
  const bodyEnd = windowStart + Math.min(bodyLength, windowEnd - windowStart)

  const text = `${leading}${content.slice(windowStart, bodyEnd)}${trailing}`
  const textStart = windowStart - leading.length

  const highlights = matches
    .filter(([start, end]) => start >= windowStart && end <= bodyEnd)
    .flatMap(([start, end]) => [start - textStart, end - textStart])

  return { text, highlights }
}
