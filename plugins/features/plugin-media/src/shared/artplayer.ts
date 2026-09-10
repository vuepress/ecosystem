import type { I18n, Option as ArtPlayerInitOptions } from 'artplayer'

export type ArtPlayerOptions = Partial<
  Omit<
    ArtPlayerInitOptions,
    | 'container'
    | 'contextmenu'
    | 'controls'
    | 'customType'
    | 'layers'
    | 'plugins'
    | 'settings'
    | 'type'
    | 'url'
  >
>

/**
 * Artplayer locales that are not bundled in the core
 *
 * 未内置在 Artplayer 核心包中的语言
 *
 * Since `v5.1.0`, Artplayer only bundles `en` and `zh-cn` in the core, other
 * locales must be imported from `artplayer/i18n/*` manually. 自 `v5.1.0`
 * 起，Artplayer 核心包只内置 `en` 与 `zh-cn`，其他语言需从 `artplayer/i18n/*` 手动导入。
 */
export const ART_PLAYER_I18N_LANGS = [
  'ar',
  'cs',
  'es',
  'fa',
  'fr',
  'id',
  'pl',
  'ru',
  'tr',
  'vi',
  'zh-tw',
] as const

/**
 * Locale of Artplayer that should be imported manually
 *
 * 需要手动导入的 Artplayer 语言
 */
export type ArtPlayerI18nLang = (typeof ART_PLAYER_I18N_LANGS)[number]

const ART_PLAYER_LANGS = new Set<string>([
  'en',
  'zh-cn',
  ...ART_PLAYER_I18N_LANGS,
])

/**
 * Resolve the Artplayer language from a page language
 *
 * 根据页面语言获取 Artplayer 语言
 *
 * @example
 *   getArtPlayerLang('zh-CN') // 'zh-cn'
 *   getArtPlayerLang('zh-HK') // 'zh-tw'
 *   getArtPlayerLang('fr-FR') // 'fr'
 *
 * @param lang - Page language / 页面语言
 * @returns Artplayer language / Artplayer 语言
 */
export const getArtPlayerLang = (lang: string): string => {
  const langCode = lang.toLowerCase()

  if (ART_PLAYER_LANGS.has(langCode)) return langCode

  const [langName] = langCode.split('-')

  if (ART_PLAYER_LANGS.has(langName)) return langName

  if (langName === 'zh')
    return /hant|tw|hk|mo/u.test(langCode) ? 'zh-tw' : 'zh-cn'

  return 'en'
}

/**
 * Merge custom i18n into the bundled i18n
 *
 * 将自定义 i18n 合并到已打包的 i18n 中
 *
 * @param base - Bundled i18n / 已打包的 i18n
 * @param custom - Custom i18n, which takes precedence / 优先级更高的自定义 i18n
 * @returns Merged i18n / 合并后的 i18n
 */
export const mergeArtPlayerI18n = (base: I18n, custom?: I18n): I18n => {
  if (!custom) return base

  const result: I18n = { ...base }

  Object.entries(custom).forEach(([lang, localeData]) => {
    result[lang] = { ...base[lang], ...localeData }
  })

  return result
}
