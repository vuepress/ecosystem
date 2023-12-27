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

export type ShikiTheme =
  | ThemeRegistration
  | ThemeRegistrationRaw
  | StringLiteralUnion<BundledTheme>

export type ShikiLang =
  | LanguageInput
  | StringLiteralUnion<BundledLanguage>
  | SpecialLanguage

/**
 * Options of @vuepress/plugin-shiki
 */
export interface ShikiPluginOptions {
  langs?: ShikiLang[]
  theme?: ShikiTheme
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
