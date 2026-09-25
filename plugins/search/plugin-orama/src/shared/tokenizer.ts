import { components } from '@orama/orama'
import type { DefaultTokenizer, Tokenizer } from '@orama/orama'
import { foldDiacritics } from '@vuepress/search-helper/shared'

import { TOKENIZER_LANGUAGES, getOramaLanguage } from './language.js'

/**
 * Factory of an official tokenizer.
 *
 * The tokenizers of `@orama/tokenizers` are created with their default config,
 * which already targets the right language.
 *
 * 官方分词器的工厂函数。
 *
 * `@orama/tokenizers` 的分词器使用其默认配置创建，该配置已针对正确的语言。
 */
type TokenizerFactory = () => Tokenizer

/**
 * Tokenizer of an index.
 *
 * The stop-words are carried by the tokenizer, so that they can be embedded
 * into the index and restored along with it. Orama itself only serializes the
 * language of the tokenizer, so the tokenizer has to expose them.
 *
 * 索引的分词器。
 *
 * 停用词由分词器携带，以便内嵌到索引中并随其一起还原。Orama 本身只会序列化分词器的语言，因此分词器必须暴露它们。
 */
export interface SearchTokenizer extends Tokenizer {
  /** Stop-words of the language 语言的停用词 */
  stopWords?: string[]
}

/** Language tag used when the locale language is missing or unusable. */
const FALLBACK_LANGUAGE = 'en'

/**
 * Orama language used by the normalizer.
 *
 * Only the diacritics folding of the normalizer is used, which is the same for
 * every language, so the default one is used.
 *
 * 规范化器使用的 Orama 语言。
 *
 * 只使用规范化器的变音符号折叠，它对所有语言都相同，因此使用默认语言。
 */
const NORMALIZER_LANGUAGE = 'english'

/**
 * Regex matching a character that can be part of a word.
 *
 * 匹配可组成单词的字符的正则。
 */
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
 * Loaders of the tokenizers provided by `@orama/tokenizers`.
 *
 * They are imported dynamically because the module creates an `Intl.Segmenter`
 * at its top level, which throws when the API is not available (e.g. Firefox <
 * 125). A dynamic import defers that to the moment the tokenizer is actually
 * needed, and it is guarded by an availability check.
 *
 * `@orama/tokenizers` 提供的分词器的加载器。
 *
 * 它们被动态导入，因为该模块在顶层创建了 `Intl.Segmenter`，当该 API 不可用（如 Firefox <
 * 125）时会抛错。动态导入会将其推迟到真正需要分词器时，且会先做可用性检查。
 */
const TOKENIZER_LOADERS: Record<
  string,
  () => Promise<{ createTokenizer: TokenizerFactory }>
> = {
  japanese: () => import('@orama/tokenizers/japanese'),
  mandarin: () => import('@orama/tokenizers/mandarin'),
}

/** Already loaded official tokenizers. 已加载的官方分词器。 */
const tokenizerFactories = new Map<string, TokenizerFactory>()

/**
 * Whether `Intl.Segmenter` is available.
 *
 * It is available in Chrome 87+, Edge 87+, Safari 14.1+ and Firefox 125+, and
 * it is required by `@orama/tokenizers`.
 *
 * `Intl.Segmenter` 是否可用。
 *
 * 它在 Chrome 87+、Edge 87+、Safari 14.1+ 与 Firefox 125+ 中可用，且是 `@orama/tokenizers`
 * 的必需项。
 *
 * @returns Whether `Intl.Segmenter` is available `Intl.Segmenter` 是否可用
 */
export const isSegmenterAvailable = (): boolean =>
  typeof Intl?.Segmenter === 'function'

/**
 * Load the official tokenizers required by the given languages.
 *
 * This is a best-effort preload: when a tokenizer can not be loaded, a generic
 * segmenter with equivalent behavior is used instead.
 *
 * 加载给定语言所需的官方分词器。
 *
 * 这是一个尽力而为的预加载：当分词器无法加载时，会改用行为等价的通用分词器。
 *
 * @example
 *   import { preloadTokenizers } from '@vuepress/plugin-orama'
 *
 *   await preloadTokenizers(['zh-CN', 'ja-JP'])
 *
 * @param languages - Languages of the indexes 索引的语言
 */
export const preloadTokenizers = async (
  languages: Iterable<string>,
): Promise<void> => {
  // `@orama/tokenizers` requires `Intl.Segmenter`
  if (!isSegmenterAvailable()) return

  const pending = new Set<string>()

  for (const language of languages) {
    const oramaLanguage = getOramaLanguage(language)

    if (
      oramaLanguage &&
      TOKENIZER_LANGUAGES.includes(oramaLanguage) &&
      !tokenizerFactories.has(oramaLanguage)
    )
      pending.add(oramaLanguage)
  }

  await Promise.all(
    [...pending].map(async (oramaLanguage) => {
      try {
        const { createTokenizer } = await TOKENIZER_LOADERS[oramaLanguage]()

        tokenizerFactories.set(oramaLanguage, createTokenizer)
      } catch {
        // Fall back to the generic segmenter, which behaves identically
      }
    }),
  )
}

/**
 * Create an `Intl.Segmenter` for the given language.
 *
 * @param language - Language tag 语言标签
 * @returns Segmenter, or `null` when unavailable 分词器，不可用时返回 `null`
 */
const createSegmenter = (language: string): Intl.Segmenter | null => {
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
 * Create the normalizer used to normalize the tokens of the generic tokenizer.
 *
 * Orama's built-in tokenizer is reused so that tokens are normalized exactly
 * like the ones of the supported languages: stop-words are removed and
 * diacritics are folded. Its language only affects the (unused) splitter and
 * the cache keys, so the fallback one is used.
 *
 * 创建用于规范化通用分词器词条的规范化器。
 *
 * 复用 Orama
 * 内置的分词器，使词条与受支持语言的词条完全一致地被规范化：移除停用词并折叠变音符号。其语言只影响（未使用的）分隔符与缓存键，因此使用回退语言。
 *
 * @param stopWords - Stop-words of the language 语言的停用词
 * @returns Orama tokenizer Orama 分词器
 */
const createNormalizer = (stopWords?: string[]): DefaultTokenizer =>
  components.tokenizer.createTokenizer({
    language: NORMALIZER_LANGUAGE,
    stopWords,
    // The tokens are already deduplicated
    allowDuplicates: true,
  })

/**
 * Fold the diacritics that Orama itself does not fold.
 *
 * Orama only replaces the characters of the Latin-1 Supplement and Latin
 * Extended-A blocks, so Vietnamese, Romanian, Greek and Sanskrit diacritics
 * survive it. Folding is applied to the index and to the queries alike, so it
 * never breaks a match.
 *
 * 折叠 Orama 自身不会折叠的变音符号。
 *
 * Orama 只替换拉丁字母补充与拉丁字母扩展 A
 * 区段的字符，因此越南语、罗马尼亚语、希腊语与梵语的变音符号会被保留。折叠会同时应用于索引与查询，因此不会破坏匹配。
 *
 * @param tokens - Tokens 词条
 * @returns Folded tokens 折叠后的词条
 */
const foldTokens = (tokens: string[]): string[] =>
  tokens.map((token) => foldDiacritics(token))

/**
 * Create a tokenizer that segments text with `Intl.Segmenter`.
 *
 * It is used for the languages that Orama does not support, and for the
 * languages of `@orama/tokenizers` when their tokenizer can not be loaded.
 *
 * Note that the official tokenizer of `@orama/tokenizers` is only a segmenter:
 * it does not lowercase its tokens, does not remove stop-words and does not
 * fold diacritics (its `stopWords` option is never applied), so those are
 * always handled here.
 *
 * 创建使用 `Intl.Segmenter` 分词的分词器。
 *
 * 它用于 Orama 不支持的语言，以及 `@orama/tokenizers` 的语言在无法加载其分词器时。
 *
 * 注意官方的 `@orama/tokenizers` 分词器只是一个分词器：它不会将词条转换为小写、不会移除停用词、也不会折叠变音符号（其
 * `stopWords` 选项从未生效），因此这些始终在这里处理。
 *
 * @param language - Language tag 语言标签
 * @param stopWords - Stop-words of the language 语言的停用词
 * @returns Orama tokenizer Orama 分词器
 */
const createSegmenterTokenizer = (
  language: string,
  stopWords?: string[],
): SearchTokenizer => {
  const segmenter = createSegmenter(language)
  const normalizer = createNormalizer(stopWords)

  const segmentText = (text: string): string[] => {
    if (segmenter) {
      return [...segmenter.segment(text)]
        .filter(({ isWordLike }) => isWordLike)
        .map(({ segment }) => segment)
    }

    // Fall back to a regex based splitter when `Intl.Segmenter` is missing
    return (text.match(WORD_REGEXP) ?? []).flatMap((word) =>
      word.split(UNSEPARATED_CHARS_REGEXP),
    )
  }

  return {
    language: language || FALLBACK_LANGUAGE,
    normalizationCache: normalizer.normalizationCache,
    stopWords,
    tokenize: (raw: string): string[] => {
      // Match the behavior of the default Orama tokenizer for non-strings
      if (typeof raw !== 'string') return [raw]

      return [
        ...new Set(
          foldTokens(
            segmentText(raw)
              .map((token) => token.toLowerCase().trim())
              .filter((token) => token && WORD_CHAR_REGEXP.test(token))
              // Stop-words and diacritics are handled by Orama itself
              .map((token) => normalizer.normalizeToken('', token, true))
              .filter(Boolean),
          ),
        ),
      ]
    },
  }
}

/**
 * Create an out-of-the-box tokenizer for the given language.
 *
 * The tokenizer is chosen from the locale language:
 *
 * - Chinese and Japanese use the official `@orama/tokenizers` tokenizers, which
 *   segment words with `Intl.Segmenter` instead of splitting on whitespace.
 * - The languages supported by Orama use its built-in tokenizer.
 * - Any other language falls back to `Intl.Segmenter`.
 *
 * Tokens are lowercased, stop-words are removed and diacritics are folded, so
 * that `Café` matches `cafe` and `VuePress` matches `vuepress`.
 *
 * Since a word is only matched when the index and the query are tokenized the
 * same way, the tokenizer only depends on the language and the stop-words: an
 * index is always tokenized again with the tokenizer of its language when it is
 * restored, see `createIndex` and `decodeIndex`.
 *
 * 为给定语言创建开箱即用的分词器。
 *
 * 分词器根据语言环境的语言选择：
 *
 * - 中文与日文使用官方的 `@orama/tokenizers` 分词器，它们使用 `Intl.Segmenter` 分词，而不是按空格拆分。
 * - Orama 支持的语言使用其内置分词器。
 * - 其他语言回退到 `Intl.Segmenter`。
 *
 * 词条会被转换为小写、移除停用词并折叠变音符号，因此 `Café` 能匹配 `cafe`，`VuePress` 能匹配 `vuepress`。
 *
 * 由于只有索引与查询用相同方式分词时才能匹配，分词器只取决于语言与停用词：索引还原时始终会使用其语言对应的分词器重新分词，见 `createIndex` 与
 * `decodeIndex`。
 *
 * @example
 *   import { createTokenizer } from '@vuepress/plugin-orama'
 *
 *   createTokenizer('zh-CN').tokenize('中文内容') // ['中文', '内容']
 *
 * @param language - Language of the locale (e.g. `zh-CN`) 语言环境的语言（如 `zh-CN`）
 * @param stopWords - Stop-words of the language, provided by `@orama/stopwords`
 *   语言的停用词，由 `@orama/stopwords` 提供
 * @returns Orama tokenizer Orama 分词器
 */
export const createTokenizer = (
  language: string,
  stopWords?: string[],
): SearchTokenizer => {
  const oramaLanguage = getOramaLanguage(language)

  // Languages handled by the built-in tokenizer already lowercase their tokens,
  // remove the stop-words and fold the diacritics
  if (oramaLanguage && !TOKENIZER_LANGUAGES.includes(oramaLanguage)) {
    const tokenizer = components.tokenizer.createTokenizer({
      language: oramaLanguage,
      stopWords,
    })

    // The language tag is kept, so that the tokenizer can be recreated from it
    return {
      language: language || oramaLanguage,
      normalizationCache: tokenizer.normalizationCache,
      stopWords: tokenizer.stopWords,
      tokenize: (raw: string) =>
        typeof raw === 'string' ? foldTokens(tokenizer.tokenize(raw)) : [raw],
    }
  }

  return createSegmenterTokenizer(language, stopWords)
}
