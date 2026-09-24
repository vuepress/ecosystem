import type { OramaLanguage } from '../shared/index.js'
import { getOramaLanguage } from '../shared/index.js'

/**
 * Loaders of the stop-words provided by `@orama/stopwords`.
 *
 * Orama's packages only ship stop-words for these languages: `czech` has none,
 * even though Orama supports it.
 *
 * `@orama/stopwords` 提供的停用词的加载器。
 *
 * Orama 的包只为这些语言提供停用词：`czech` 没有，尽管 Orama 支持它。
 */
const STOP_WORDS_LOADERS: Record<
  string,
  () => Promise<{ stopwords: string[] }>
> = {
  arabic: () => import('@orama/stopwords/arabic'),
  armenian: () => import('@orama/stopwords/armenian'),
  bulgarian: () => import('@orama/stopwords/bulgarian'),
  danish: () => import('@orama/stopwords/danish'),
  dutch: () => import('@orama/stopwords/dutch'),
  english: () => import('@orama/stopwords/english'),
  finnish: () => import('@orama/stopwords/finnish'),
  french: () => import('@orama/stopwords/french'),
  german: () => import('@orama/stopwords/german'),
  greek: () => import('@orama/stopwords/greek'),
  hungarian: () => import('@orama/stopwords/hungarian'),
  indian: () => import('@orama/stopwords/indian'),
  indonesian: () => import('@orama/stopwords/indonesian'),
  irish: () => import('@orama/stopwords/irish'),
  italian: () => import('@orama/stopwords/italian'),
  japanese: () => import('@orama/stopwords/japanese'),
  lithuanian: () => import('@orama/stopwords/lithuanian'),
  mandarin: () => import('@orama/stopwords/mandarin'),
  nepali: () => import('@orama/stopwords/nepali'),
  norwegian: () => import('@orama/stopwords/norwegian'),
  portuguese: () => import('@orama/stopwords/portuguese'),
  romanian: () => import('@orama/stopwords/romanian'),
  russian: () => import('@orama/stopwords/russian'),
  sanskrit: () => import('@orama/stopwords/sanskrit'),
  serbian: () => import('@orama/stopwords/serbian'),
  slovenian: () => import('@orama/stopwords/slovenian'),
  spanish: () => import('@orama/stopwords/spanish'),
  swedish: () => import('@orama/stopwords/swedish'),
  tamil: () => import('@orama/stopwords/tamil'),
  turkish: () => import('@orama/stopwords/turkish'),
  ukrainian: () => import('@orama/stopwords/ukrainian'),
}

/** Already loaded stop-words. 已加载的停用词。 */
const loadedStopWords = new Map<string, string[]>()

/**
 * Get the stop-words of a language.
 *
 * They are embedded into the search index, so that only the languages used by
 * the site are shipped to the browser.
 *
 * 获取某个语言的停用词。
 *
 * 它们会被内嵌到搜索索引中，因此只有站点实际使用的语言会被发送到浏览器。
 *
 * @example
 *   import { getStopWords } from '@vuepress/plugin-orama'
 *
 *   await getStopWords('zh-CN') // ['的', '了', ...]
 *
 * @param language - Language of the locale (e.g. `zh-CN`) 语言环境的语言（如 `zh-CN`）
 * @returns Stop-words of the language, or `undefined` when it has none
 *   该语言的停用词，没有时返回 `undefined`
 */
export const getStopWords = async (
  language: string,
): Promise<string[] | undefined> => {
  const oramaLanguage: OramaLanguage | null = getOramaLanguage(language)

  if (!oramaLanguage) return undefined

  const cached = loadedStopWords.get(oramaLanguage)

  if (cached) return cached

  const loader = STOP_WORDS_LOADERS[oramaLanguage]

  if (!loader) return undefined

  try {
    const { stopwords } = await loader()

    loadedStopWords.set(oramaLanguage, stopwords)

    return stopwords
  } catch {
    return undefined
  }
}
