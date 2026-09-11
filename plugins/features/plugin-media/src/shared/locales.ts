/**
 * Locale of EmbedPDF, see the `Locale` interface of `@embedpdf/plugin-i18n`
 *
 * EmbedPDF 的语言，参见 `@embedpdf/plugin-i18n` 的 `Locale` 接口
 *
 * EmbedPDF bundles `en`, `nl`, `de`, `fr`, `es`, `zh-CN`, `zh-TW`, `ja`, `sv`
 * and `pt-BR`, whose translations are not exported. Passing locales to the
 * viewer **replaces** them instead of extending them.
 *
 * EmbedPDF 内置的语言没有导出，传入语言会**替换**而非追加。
 *
 * The page locale is resolved by `getPDFLocale()`, which only returns the
 * built-in codes above. A locale with another code must also be enabled via the
 * `i18n.defaultLocale` of the viewer config.
 *
 * 页面语言由 `getPDFLocale()` 解析，只会返回上方的内置语言代码。
 *
 * 其他代码的语言还需另经 `i18n.defaultLocale` 配置启用。
 */
export type { Locale as PDFLocaleData } from '@embedpdf/vue-pdf-viewer'
