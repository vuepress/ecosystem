import type { PDFViewerConfig } from '@embedpdf/vue-pdf-viewer'

/**
 * EmbedPDF options
 *
 * EmbedPDF 配置
 *
 * `src` is not allowed here, as it should be provided by the component.
 *
 * 此处不允许 `src`，它应由组件提供。
 */
export type PDFOptions = Partial<Omit<PDFViewerConfig, 'src'>>

/**
 * Locale codes built into EmbedPDF
 *
 * EmbedPDF 内置的语言代码
 *
 * Keys are lowercased language codes, values are the locale codes used by
 * EmbedPDF.
 *
 * 键为小写语言代码，值为 EmbedPDF 使用的语言代码。
 *
 * The name must not collide with the injected `PDF_LOCALES`.
 *
 * 名称不能与注入的 `PDF_LOCALES` 冲突。
 */
const PDF_BUILTIN_LOCALES = new Map<string, string>([
  ['de', 'de'],
  ['en', 'en'],
  ['es', 'es'],
  ['fr', 'fr'],
  ['ja', 'ja'],
  ['nl', 'nl'],
  ['sv', 'sv'],
  ['pt-br', 'pt-BR'],
  ['zh-cn', 'zh-CN'],
  ['zh-tw', 'zh-TW'],
])

/**
 * Resolve the EmbedPDF locale from a page language
 *
 * 根据页面语言获取 EmbedPDF 语言
 *
 * Only the codes of the locales built into EmbedPDF are returned, other
 * languages fall back to `en`.
 *
 * 只会返回 EmbedPDF 内置的语言代码，其他语言会回退到 `en`。
 *
 * @example
 *   getPDFLocale('zh-CN') // 'zh-CN'
 *   getPDFLocale('zh-Hant') // 'zh-TW'
 *   getPDFLocale('fr-FR') // 'fr'
 *   getPDFLocale('ko') // 'en'
 *
 * @param lang - Page language / 页面语言
 * @returns EmbedPDF locale code / EmbedPDF 语言代码
 */
export const getPDFLocale = (lang: string): string => {
  const langCode = lang.toLowerCase()
  const locale = PDF_BUILTIN_LOCALES.get(langCode)

  if (locale) return locale

  const [langName] = langCode.split('-')

  if (langName === 'zh')
    return /hant|tw|hk|mo/u.test(langCode) ? 'zh-TW' : 'zh-CN'

  // EmbedPDF only bundles Brazilian Portuguese
  if (langName === 'pt') return 'pt-BR'

  return PDF_BUILTIN_LOCALES.get(langName) ?? 'en'
}
