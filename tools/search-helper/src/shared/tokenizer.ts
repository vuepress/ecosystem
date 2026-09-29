import { foldDiacritics } from './foldDiacritics.js'

/**
 * Language used when the language of a locale is missing or unusable.
 *
 * 当语言环境的语言缺失或不可用时使用的语言。
 */
export const FALLBACK_LANGUAGE = 'en'

/** Regex matching a character that can be part of a word. 匹配可组成单词的字符的正则。 */
const WORD_CHAR_REGEXP = /[\p{L}\p{N}]/u

/**
 * Regex matching a word, used when word segmentation is unavailable.
 *
 * Apostrophes are kept, since word segmentation does not split them either
 * (`don't` is a single word).
 *
 * 匹配单词的正则，在无法进行分词时使用。
 *
 * 撇号会被保留，因为分词同样不会将其拆分（`don't` 是一个单词）。
 */
const WORD_REGEXP = /[\p{L}\p{N}'’]+/gu

/**
 * Regex matching the characters of the scripts that are not separated by
 * whitespace, which are split character by character.
 *
 * Covers Thai, Lao, Tibetan, Myanmar, Khmer, Japanese kana, Han and Hangul.
 *
 * 匹配不以空格分词的语言文字所对应的字符，它们会被逐字拆分。
 *
 * 覆盖泰文、老挝文、藏文、缅甸文、高棉文、日文假名、汉字与谚文。
 */
const UNSEPARATED_CHARS_REGEXP =
  /(?<unseparated>[\u0E00-\u0E7F\u0E80-\u0EFF\u0F00-\u0FFF\u1000-\u109F\u1100-\u11FF\u1780-\u17FF\u3040-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\uAC00-\uD7AF\uF900-\uFAFF])/gu

/**
 * Regex matching a letter together with its combining marks.
 *
 * Matching them together keeps a character and its marks from being folded
 * apart.
 *
 * 匹配一个字母及其组合标记。
 *
 * 将它们一起匹配可以避免把一个字符与其标记拆开折叠。
 */
const GRAPHEME_REGEXP = /\P{M}\p{M}*/gu

/**
 * Regex matching the ASCII letter that a character folds into.
 *
 * 匹配一个字符折叠后得到的 ASCII 字母。
 */
const FOLDED_LETTER_REGEXP = /^[a-z]$/u

/**
 * Tokenizer that splits a text into its word tokens.
 *
 * 将文本拆分为单词词条的分词器。
 */
export type WordTokenizer = (text: string) => string[]

/**
 * Whether `Intl.Segmenter` is available.
 *
 * It is available in Chrome 87+, Edge 87+, Safari 14.1+ and Firefox 125+.
 *
 * `Intl.Segmenter` 是否可用。
 *
 * 它在 Chrome 87+、Edge 87+、Safari 14.1+ 与 Firefox 125+ 中可用。
 *
 * @returns Whether `Intl.Segmenter` is available `Intl.Segmenter` 是否可用
 */
export const isSegmenterAvailable = (): boolean =>
  typeof Intl?.Segmenter === 'function'

/**
 * Create an `Intl.Segmenter` for the given language.
 *
 * The fallback language is used when the given one is missing or is not a valid
 * language tag.
 *
 * 为给定语言创建 `Intl.Segmenter`。
 *
 * 当给定语言缺失或不是合法的语言标签时，会改用回退语言。
 *
 * @param language - Language tag 语言标签
 * @returns Segmenter, or `null` when unavailable 分词器，不可用时返回 `null`
 */
export const createSegmenter = (language: string): Intl.Segmenter | null => {
  if (!isSegmenterAvailable()) return null

  for (const tag of [language, FALLBACK_LANGUAGE]) {
    if (!tag) continue

    try {
      return new Intl.Segmenter(tag, { granularity: 'word' })
    } catch {
      // Ignore invalid tags and try the next candidate
    }
  }

  return null
}

/**
 * Split a text into its words.
 *
 * `Intl.Segmenter` is used when it is available, and a regex based splitter
 * otherwise: the latter splits the characters of the scripts without word
 * separators (e.g. Chinese) one by one, so that they can still be matched.
 *
 * 将文本拆分为单词。
 *
 * `Intl.Segmenter` 可用时会使用它，否则使用基于正则的拆分器：后者会把不以空格分词的语言（如中文）的字符逐个拆分，以便它们仍能被匹配。
 *
 * @example
 *   import {
 *     createSegmenter,
 *     segmentWords,
 *   } from '@vuepress/search-helper/shared'
 *
 *   segmentWords('Hello, World!', createSegmenter('en-US')) // ['Hello', 'World']
 *
 * @param text - Text to split 需要拆分的文本
 * @param segmenter - Segmenter of the language, `null` when unavailable
 *   语言的分词器，不可用时为 `null`
 * @returns Words of the text 文本中的单词
 */
export const segmentWords = (
  text: string,
  segmenter: Intl.Segmenter | null,
): string[] =>
  segmenter
    ? [...segmenter.segment(text)]
        .filter(({ isWordLike }) => isWordLike)
        .map(({ segment }) => segment)
    : // Fall back to a regex based splitter when `Intl.Segmenter` is missing
      (text.match(WORD_REGEXP) ?? []).flatMap((word) =>
        word.split(UNSEPARATED_CHARS_REGEXP),
      )

/**
 * Fold the diacritics of a token that can be folded safely.
 *
 * Folding is applied grapheme by grapheme, and only to the characters that fold
 * into an ASCII letter. Folding the others can change how their words are
 * segmented: `です` folds into `てす`, which `Intl.Segmenter` then splits into `て`
 * and `す`. A token that is tokenized again after being folded would no longer
 * be a single token, which changes what a search for it means.
 *
 * Use `foldDiacritics` instead when the whole text is folded at once and the
 * segmentation comes first, e.g. to also match `Hướng` with `huong`.
 *
 * 折叠可以安全折叠变音符号的词条。
 *
 * 折叠是逐字形进行的，且只对折叠后为 ASCII 字母的字符生效。折叠其他字符会改变其单词的分词方式：`です` 会折叠为 `てす`，而
 * `Intl.Segmenter` 会把它拆成 `て` 与 `す`。一个被折叠后再分词的词条将不再是一个词条，从而改变搜索它的语义。
 *
 * 当整段文本是一次性折叠、且分词发生在其之前时，应改用 `foldDiacritics`，例如为了同时让 `Hướng` 与 `huong` 匹配。
 *
 * @example
 *   import { foldToken } from '@vuepress/search-helper/shared'
 *
 *   foldToken('Café') // 'cafe'
 *   foldToken('です') // 'です'
 *
 * @param token - Token to fold 需要折叠的词条
 * @returns Folded token 折叠后的词条
 */
export const foldToken = (token: string): string =>
  token.replaceAll(GRAPHEME_REGEXP, (grapheme) => {
    if (grapheme.codePointAt(0)! < 0x80) return grapheme

    const folded = foldDiacritics(grapheme)

    return folded !== grapheme && FOLDED_LETTER_REGEXP.test(folded)
      ? folded
      : grapheme
  })

/**
 * Create the tokenizer that splits a text into its word tokens.
 *
 * Tokens are lowercased and the diacritics of the letters that fold into an
 * ASCII letter are folded, so that `VuePress` matches `vuepress` and `Café`
 * matches `cafe`.
 *
 * The repetitions are kept: the engines that score their results by term
 * frequency (e.g. MiniSearch) rank a text higher when a word is repeated, so
 * removing them would change the relevance order. An engine that does not need
 * them can deduplicate on its own side.
 *
 * 创建将文本拆分为单词词条的分词器。
 *
 * 词条会被转换为小写，且折叠折叠后为 ASCII 字母的字母的变音符号，因此 `VuePress` 能匹配 `vuepress`，`Café` 能匹配
 * `cafe`。
 *
 * 重复项会被保留：按词频为结果评分的引擎（如
 * MiniSearch）会给重复出现某个单词的文本更高的排名，移除它们会改变相关度顺序。不需要它们的引擎可以自行去重。
 *
 * @example
 *   import { createWordTokenizer } from '@vuepress/search-helper/shared'
 *
 *   createWordTokenizer('en-US')('Hello, World!') // ['hello', 'world']
 *
 * @param language - Language of the locale (e.g. `zh-CN`) 语言环境的语言（如 `zh-CN`）
 * @returns Tokenizer of the language 该语言的分词器
 */
export const createWordTokenizer = (language: string): WordTokenizer => {
  const segmenter = createSegmenter(language)

  return (text: string): string[] =>
    segmentWords(text, segmenter)
      .map((word) => foldToken(word.toLowerCase()))
      .filter((word) => WORD_CHAR_REGEXP.test(word))
}
