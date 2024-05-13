import type {
  BundledLanguage,
  BundledTheme,
  LanguageInput,
  ShikiTransformer,
  SpecialLanguage,
  StringLiteralUnion,
  ThemeRegistration,
  ThemeRegistrationRaw,
} from 'shiki'

export type ShikiLang =
  | LanguageInput
  | StringLiteralUnion<BundledLanguage>
  | SpecialLanguage

export type ShikiTheme =
  | ThemeRegistration
  | ThemeRegistrationRaw
  | StringLiteralUnion<BundledTheme>

/**
 * Options of @vuepress/plugin-shiki
 */
export interface ShikiPluginOptions {
  /**
   * Languages to be loaded.
   *
   * Shiki does not preload any languages to avoid extra overhead. So you need
   * to specify the languages you want to use.
   *
   * @see https://shiki.style/languages
   */
  langs?: ShikiLang[]

  /**
   * The single theme to use
   *
   * @see https://shiki.style/themes
   */
  theme?: ShikiTheme

  /**
   * The dark and light themes to use
   *
   * @see https://shiki.style/themes
   */
  themes?: {
    dark: ShikiTheme
    light: ShikiTheme
  }

  transformers?: ShikiTransformer[]
}
