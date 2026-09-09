import type { Word } from '../../shared/index.js'

const MAX_LENGTH = 100
const SUFFIX_LENGTH = 20

export const getMatchedContent = (
  content: string,
  queryString: string,
): Word[] | null => {
  const contentLowerCase = content.toLowerCase()
  const queryStringLowerCase = queryString.toLowerCase()
  const result: Word[] = []

  let startIndex = 0
  let contentLength = 0

  const addResult = (
    text: string,
    isEnd = false,
    markedText?: string,
  ): void => {
    let display: string

    // A beginning of a long string
    if (contentLength === 0) {
      display =
        text.length > SUFFIX_LENGTH ? `… ${text.slice(-SUFFIX_LENGTH)}` : text
    }
    // Already the last text
    else if (isEnd) {
      display =
        // If the string will be longer than maxLength
        text.length + contentLength > MAX_LENGTH
          ? `${text.slice(0, MAX_LENGTH - contentLength)}… `
          : text
    }
    // Text is at the middle
    else {
      display =
        text.length > SUFFIX_LENGTH
          ? `${text.slice(0, SUFFIX_LENGTH)} … ${text.slice(-SUFFIX_LENGTH)}`
          : text
    }

    if (display) result.push(display)
    contentLength += display.length

    if (!isEnd) {
      // Use the original-cased text from the content for the highlight, so
      // that the document's case is preserved in the search results
      const displayMark = markedText ?? queryString

      result.push(['mark', displayMark])
      contentLength += displayMark.length

      if (contentLength >= MAX_LENGTH) result.push(' …')
    }
  }

  let matchIndex = contentLowerCase.indexOf(queryStringLowerCase, startIndex)

  if (matchIndex === -1) return null

  while (matchIndex >= 0) {
    const endIndex = matchIndex + queryStringLowerCase.length

    // Append content before, highlighting the original-cased matched text
    addResult(
      content.slice(startIndex, matchIndex),
      false,
      content.slice(matchIndex, endIndex),
    )

    startIndex = endIndex

    if (contentLength > MAX_LENGTH) break

    matchIndex = contentLowerCase.indexOf(queryStringLowerCase, startIndex)
  }

  if (contentLength < MAX_LENGTH) addResult(content.slice(startIndex), true)

  return result
}
