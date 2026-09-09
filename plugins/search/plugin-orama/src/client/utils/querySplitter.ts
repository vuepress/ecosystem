const CJK_REGEXP =
  /[\u4E00-\u9FFF\u3400-\u4DBF\u3040-\u309F\u30A0-\u30FF\uAC00-\uD7AF]/u

/**
 * Split the query without the `Intl.Segmenter` API.
 *
 * Used as a fallback for browsers that do not support it.
 *
 * 在不支持 `Intl.Segmenter` API 时拆分查询。
 *
 * 用于不支持该 API 的浏览器的回退方案。
 *
 * @param query - Search query 搜索词
 * @returns Split words 分词结果
 */
export const fallbackQuerySplitter = (query: string): string[] =>
  query.split(/\s+/u).flatMap((word) => {
    if (word.length > 3) {
      // oxlint-disable-next-line unicorn/prefer-spread
      const chars = word.split('')

      if (chars.every((char) => CJK_REGEXP.test(char))) return chars
    }

    return word
  })

/**
 * Split the query into words.
 *
 * 将查询拆分为词语。
 *
 * @param query - Search query 搜索词
 * @param lang - Language 语言
 * @returns Split words 分词结果
 */
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
