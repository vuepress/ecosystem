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
import { bundledLanguages, getHighlighter } from 'shiki'
import type { Plugin } from 'vuepress/core'

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

const DEFAULT_LANGS = Object.keys(bundledLanguages)

export const shikiPlugin = ({
  langs = DEFAULT_LANGS,
  theme = 'nord',
  themes,
  transformers = [],
}: ShikiPluginOptions = {}): Plugin => ({
  name: '@vuepress/plugin-shiki',

  extendsMarkdown: async (md) => {
    const highlighter = await getHighlighter({
      langs,
      themes: themes ? [themes.dark, themes.light] : [theme],
    })

    md.options.highlight = (code, lang) =>
      highlighter.codeToHtml(code, {
        lang,
        transformers,
        ...(themes ? { themes } : { theme }),
      })
  },
})
