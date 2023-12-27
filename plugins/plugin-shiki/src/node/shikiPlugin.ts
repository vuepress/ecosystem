import type { Plugin } from '@vuepress/core'
import { getHighlighter } from 'shikiji'
import type {
  BundledLanguage,
  BundledTheme,
  LanguageInput,
  SpecialLanguage,
  StringLiteralUnion,
  ThemeRegistration,
  ThemeRegistrationRaw,
} from 'shikiji'

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
   * Shikiji does not preload any languages to avoid extra overhead. So you need
   * to specify the languages you want to use.
   *
   * @see https://shikiji.netlify.app/languages
   */
  langs?: ShikiLang[]

  /**
   * The single theme to use
   *
   * @see https://shikiji.netlify.app/themes
   */
  theme?: ShikiTheme

  /**
   * The dark and light themes to use
   *
   * @see https://shikiji.netlify.app/themes
   */
  themes?: {
    dark: ShikiTheme
    light: ShikiTheme
  }
}

export const shikiPlugin = ({
  langs,
  theme = 'nord',
  themes,
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
        ...(themes ? { themes } : { theme }),
      })
  },
})
