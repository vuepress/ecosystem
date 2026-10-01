import { createSegmenter } from '../../shared/index.js'

const CJK_REGEXP =
  /[\u4E00-\u9FFF\u3400-\u4DBF\u3040-\u309F\u30A0-\u30FF\uAC00-\uD7AF]/u

export const fallbackQuerySplitter = (query: string): string[] =>
  query.split(/\s+/u).flatMap((word) => {
    if (word.length > 3) {
      const chars = word.split('')

      if (chars.every((char) => CJK_REGEXP.test(char))) return chars
    }

    return word
  })

export const defaultQuerySplitter = (query: string, lang: string): string[] => {
  // check if Intl.Segmenter is available
  // through Chrome 87+, Edge 87+ supports it at 2020 and Safari 14.1+ supports it at 2021
  // Firefox added support at version 125 (2024-04), making it only newly available
  // so a fallbackQuerySplitter is still needed for older versions
  //
  // `createSegmenter` also handles a missing or invalid language tag, which
  // would otherwise throw here
  const segmenter = createSegmenter(lang)

  // Every segment is kept, including the ones that are not words: the splitter
  // only decides where the words of a query are split
  if (segmenter) {
    return [...segmenter.segment(query)]
      .map(({ segment }) => segment)
      .filter((word) => word.trim())
  }

  return fallbackQuerySplitter(query)
}
