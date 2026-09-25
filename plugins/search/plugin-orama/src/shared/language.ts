/**
 * Language names supported by Orama.
 *
 * Most of them are handled by the built-in tokenizer of `@orama/orama`, except
 * `mandarin` and `japanese` which require `@orama/tokenizers`.
 *
 * Orama 支持的语言名称。
 *
 * 其中大部分由 `@orama/orama` 内置的分词器处理，只有 `mandarin` 与 `japanese` 需要
 * `@orama/tokenizers`。
 */
export type OramaLanguage =
  | 'arabic'
  | 'armenian'
  | 'bulgarian'
  | 'czech'
  | 'danish'
  | 'dutch'
  | 'english'
  | 'finnish'
  | 'french'
  | 'german'
  | 'greek'
  | 'hungarian'
  | 'indian'
  | 'indonesian'
  | 'irish'
  | 'italian'
  | 'japanese'
  | 'lithuanian'
  | 'mandarin'
  | 'nepali'
  | 'norwegian'
  | 'portuguese'
  | 'romanian'
  | 'russian'
  | 'sanskrit'
  | 'serbian'
  | 'slovenian'
  | 'spanish'
  | 'swedish'
  | 'tamil'
  | 'turkish'
  | 'ukrainian'

/**
 * Languages handled by `@orama/tokenizers` instead of the built-in tokenizer.
 *
 * 由 `@orama/tokenizers` 处理而非内置分词器的语言。
 */
export const TOKENIZER_LANGUAGES: readonly OramaLanguage[] = [
  'japanese',
  'mandarin',
]

/**
 * Mapping from the BCP-47 primary language subtag to the Orama language.
 *
 * Note that several Orama language names do not match their BCP-47 subtag
 * (`indian` for Hindi, `mandarin` for Chinese), and that the internal language
 * code used by Orama does not either (`sanskrit` is `sk`, `slovenian` is
 * `ru`).
 *
 * Languages supported by Orama's official documentation but missing from its
 * packages (Korean, Polish, Slovak, Vietnamese) are intentionally absent, so
 * that they fall back to the generic tokenizer.
 *
 * BCP-47 主语言子标签到 Orama 语言的映射。
 *
 * 注意有多个 Orama 语言名与其 BCP-47 子标签并不一致（印地语为 `indian`，中文为 `mandarin`），Orama
 * 内部使用的语言码同样如此（`sanskrit` 为 `sk`，`slovenian` 为 `ru`）。
 *
 * Orama 官方文档声称支持、但其包中并不存在的语言（韩语、波兰语、斯洛伐克语、越南语）被刻意排除，以便它们回退到通用分词器。
 */
const LANGUAGE_BY_SUBTAG: Record<string, OramaLanguage> = {
  ar: 'arabic',
  bg: 'bulgarian',
  cs: 'czech',
  da: 'danish',
  de: 'german',
  el: 'greek',
  en: 'english',
  es: 'spanish',
  fi: 'finnish',
  fr: 'french',
  ga: 'irish',
  hi: 'indian',
  hu: 'hungarian',
  hy: 'armenian',
  id: 'indonesian',
  it: 'italian',
  ja: 'japanese',
  lt: 'lithuanian',
  nb: 'norwegian',
  ne: 'nepali',
  nl: 'dutch',
  nn: 'norwegian',
  no: 'norwegian',
  pt: 'portuguese',
  ro: 'romanian',
  ru: 'russian',
  sa: 'sanskrit',
  sl: 'slovenian',
  sr: 'serbian',
  sv: 'swedish',
  ta: 'tamil',
  tr: 'turkish',
  uk: 'ukrainian',
  zh: 'mandarin',
}

/**
 * Get the primary language subtag of a language tag.
 *
 * The tag is normalized first, so that `zh_CN` and `ZH-cn` are both handled.
 *
 * 获取语言标签的主语言子标签。
 *
 * 标签会先被标准化，因此 `zh_CN` 与 `ZH-cn` 都能被处理。
 *
 * @example
 *   import { getLanguageSubtag } from '@vuepress/plugin-orama'
 *
 *   getLanguageSubtag('zh-Hant-TW') // 'zh'
 *   getLanguageSubtag('en_US') // 'en'
 *
 * @param language - Language tag 语言标签
 * @returns Primary language subtag 主语言子标签
 */
export const getLanguageSubtag = (language: string): string =>
  (language ?? '').replaceAll('_', '-').split('-')[0].toLowerCase()

/**
 * Resolve the Orama language of a language tag.
 *
 * 解析语言标签对应的 Orama 语言。
 *
 * @example
 *   import { getOramaLanguage } from '@vuepress/plugin-orama'
 *
 *   getOramaLanguage('zh-CN') // 'mandarin'
 *   getOramaLanguage('ko-KR') // null
 *
 * @param language - Language tag 语言标签
 * @returns Orama language, or `null` when Orama does not support it Orama
 *   语言，Orama 不支持时返回 `null`
 */
export const getOramaLanguage = (language: string): OramaLanguage | null =>
  LANGUAGE_BY_SUBTAG[getLanguageSubtag(language)] ?? null
