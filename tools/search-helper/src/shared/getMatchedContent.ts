import { foldDiacritics } from './foldDiacritics.js'
import type { MatchedContent } from './result.js'

const MAX_LENGTH = 100
const SUFFIX_LENGTH = 20
const LEADING_ELLIPSIS = '… '
const TRAILING_ELLIPSIS = ' …'

/**
 * Regex matching a character that can be part of a word.
 *
 * Apostrophes are included, since word segmentation does not split them either
 * (`don't` is a single word).
 *
 * 匹配可组成单词的字符的正则。
 *
 * 撇号被包含在内，因为分词同样不会将其拆分（`don't` 是一个单词）。
 */
const WORD_CHAR_REGEXP = /[\p{L}\p{N}'’]/u

/**
 * Regex matching the characters of the scripts that are not separated by
 * whitespace, whose words can not be found without word segmentation.
 *
 * Covers Thai, Lao, Tibetan, Myanmar, Khmer, Japanese kana, Han and Hangul.
 *
 * 匹配不以空格分词的语言文字所对应的字符，没有分词就无法找到它们的单词。
 *
 * 覆盖泰文、老挝文、藏文、缅甸文、高棉文、日文假名、汉字与谚文。
 */
const UNSEPARATED_CHAR_REGEXP =
  /[\u0E00-\u0E7F\u0E80-\u0EFF\u0F00-\u0FFF\u1000-\u109F\u1100-\u11FF\u1780-\u17FF\u3040-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\uAC00-\uD7AF\uF900-\uFAFF]/u

/**
 * Segmenter used to find the boundaries of the words of a content.
 *
 * It is created lazily, so that a runtime without `Intl.Segmenter` (e.g.
 * Firefox < 125) falls back to the word characters instead of throwing.
 *
 * 用于查找内容中单词边界的分词器。
 *
 * 它是懒创建的，因此在没有 `Intl.Segmenter` 的运行时（如 Firefox < 125）中会回退到按单词字符判断，而不是抛错。
 */
let wordSegmenter: Intl.Segmenter | null | undefined

/**
 * Get the segmenter used to find the boundaries of the words of a content.
 *
 * The locale does not affect the segmentation of the languages we care about,
 * so the default one is used.
 *
 * 获取用于查找内容中单词边界的分词器。
 *
 * 语言环境不会影响我们关心的语言的分词，因此使用默认语言环境。
 *
 * @returns Segmenter, or `null` when unavailable 分词器，不可用时返回 `null`
 */
const getWordSegmenter = (): Intl.Segmenter | null => {
  if (wordSegmenter === undefined) {
    wordSegmenter =
      typeof Intl?.Segmenter === 'function'
        ? new Intl.Segmenter(undefined, { granularity: 'word' })
        : null
  }

  return wordSegmenter
}

/**
 * Whether a character can be part of a word that is expanded to.
 *
 * The characters of the scripts without word separators are left out, because
 * expanding through them would swallow the whole sentence.
 *
 * 该字符是否可以作为扩展目标单词的一部分。
 *
 * 不以空格分词的语言文字所对应的字符被排除在外，因为向它们扩展会吞掉整句话。
 *
 * @param char - Character 字符
 * @returns Whether it can be expanded to 是否可以扩展
 */
const isExpandableChar = (char: string): boolean =>
  WORD_CHAR_REGEXP.test(char) && !UNSEPARATED_CHAR_REGEXP.test(char)

/**
 * Expand a match through the word characters around it.
 *
 * It is used when word segmentation is unavailable, in which case only the
 * words of the languages separated by whitespace can be found.
 *
 * 将匹配项向两侧的单词字符扩展。
 *
 * 它在无法进行分词时使用，此时只能找到以空格分词的语言的单词。
 *
 * @param content - Content 内容
 * @param match - Match to expand 需要扩展的匹配项
 * @returns Expanded match 扩展后的匹配项
 */
const expandByWordChars = (
  content: string,
  [start, end]: [number, number],
): [number, number] => {
  let wordStart = start
  let wordEnd = end

  while (wordStart > 0 && isExpandableChar(content[wordStart - 1]))
    wordStart -= 1
  while (wordEnd < content.length && isExpandableChar(content[wordEnd]))
    wordEnd += 1

  return [wordStart, wordEnd]
}

/**
 * Expand every match to the whole word that contains it.
 *
 * A query is matched as a prefix, so a match is often only the beginning of a
 * word (`quic` in `Quick`). Highlighting the whole word reads better than
 * highlighting a part of it.
 *
 * 将每个匹配项扩展到包含它的整个单词。
 *
 * 查询是按前缀匹配的，因此匹配项常常只是单词的开头（`Quick` 中的 `quic`）。高亮整个单词比只高亮其中一部分更易读。
 *
 * @param content - Content 内容
 * @param matches - Matches to expand 需要扩展的匹配项
 * @returns Expanded matches 扩展后的匹配项
 */
const expandMatches = (
  content: string,
  matches: [number, number][],
): [number, number][] => {
  const segmenter = getWordSegmenter()

  if (!segmenter)
    return matches.map((match) => expandByWordChars(content, match))

  const wordRanges = [...segmenter.segment(content)].map(
    ({ index, segment }): [number, number] => [index, index + segment.length],
  )

  return matches.map(
    ([start, end]) =>
      // A match spanning several words is left as is
      wordRanges.find(
        ([rangeStart, rangeEnd]) => rangeStart <= start && end <= rangeEnd,
      ) ?? [start, end],
  )
}

/**
 * Merge the overlapping matches, so that a text is never highlighted twice.
 *
 * Two terms of a query can match the same word (`cat` and `catalog` both match
 * `catalog`), and expanding them to the whole word makes them overlap.
 *
 * 合并重叠的匹配项，使同一段文本不会被高亮两次。
 *
 * 查询中的两个词条可能匹配同一个单词（`cat` 与 `catalog` 都匹配 `catalog`），将它们扩展到整个单词后就会重叠。
 *
 * @param matches - Matches to merge 需要合并的匹配项
 * @returns Merged matches 合并后的匹配项
 */
const mergeMatches = (matches: [number, number][]): [number, number][] => {
  const merged: [number, number][] = []

  for (const [start, end] of [...matches].sort(([a], [b]) => a - b)) {
    const last = merged.at(-1)

    if (last && start <= last[1]) last[1] = Math.max(last[1], end)
    else merged.push([start, end])
  }

  return merged
}

/**
 * Find the matched content of a query in a text, with the ranges to highlight.
 *
 * The text is truncated around the first match when it is too long, and the
 * ranges are expanded to the whole words they belong to.
 *
 * 在文本中查找搜索词的匹配内容，并给出需要高亮的范围。
 *
 * 文本过长时会围绕第一个匹配项截断，且范围会扩展到它们所属的整个单词。
 *
 * @example
 *   import { getMatchedContent } from '@vuepress/search-helper/shared'
 *
 *   getMatchedContent('The Quick Brown Fox', 'quic')
 *   // { text: 'The Quick Brown Fox', highlights: [4, 9] }
 *
 * @param content - Content to search in 需要搜索的内容
 * @param queryString - Query to search for 需要搜索的搜索词
 * @returns Matched content, or `null` when the query does not match
 *   匹配的内容，搜索词未匹配时返回 `null`
 */
export const getMatchedContent = (
  content: string,
  queryString: string,
): MatchedContent | null => {
  // Tokens are lowercased and their diacritics are folded when they are
  // indexed, so the content has to be normalized the same way. Folding keeps
  // the length of the text, so the offsets remain valid on the original text.
  const contentLowerCase = foldDiacritics(content.toLowerCase())
  const queryStringLowerCase = foldDiacritics(queryString.toLowerCase())
  const matchLength = queryStringLowerCase.length

  const rawMatches: [start: number, end: number][] = []
  let matchIndex = contentLowerCase.indexOf(queryStringLowerCase)

  while (matchIndex >= 0) {
    rawMatches.push([matchIndex, matchIndex + matchLength])
    matchIndex = contentLowerCase.indexOf(
      queryStringLowerCase,
      matchIndex + matchLength,
    )
  }

  if (rawMatches.length === 0) return null

  const matches = mergeMatches(expandMatches(content, rawMatches))

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

  // A match crossing a truncated side can not be highlighted as a whole word
  const highlights = matches
    .filter(([start, end]) => start >= windowStart && end <= bodyEnd)
    .flatMap(([start, end]) => [start - textStart, end - textStart])

  return { text, highlights }
}
