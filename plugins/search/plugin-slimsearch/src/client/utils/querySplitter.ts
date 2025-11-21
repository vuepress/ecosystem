const CJK_REGEXP =
  /[\u4e00-\u9fff\u3400-\u4dbf\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af]/

export const fallbackQuerySplitter = (query: string): string[] =>
  query
    .split(/\s+/)
    .map((word) => {
      if (word.length > 3) {
        const chars = word.split('')

        if (chars.every((char) => CJK_REGEXP.test(char))) return chars
      }

      return word
    })
    .flat()

export const defaultQuerySplitter = (query: string, lang: string): string[] => {
  // check if Intl.Segmenter is available
  // through Chrome 87+, Edge 87+ supports it at 2020 and Safari 14.1+ supports it at 2021
  // Firefox added support at version 125 (2024-04), making it only newly available
  // so a fallbackQuerySplitter is still needed for older versions
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    return [...new Intl.Segmenter(lang, { granularity: 'word' }).segment(query)]
      .map(({ segment }) => segment)
      .filter((word) => word.trim())
  }

  return fallbackQuerySplitter(query)
}
