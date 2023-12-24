import type { Plugin } from '@vuepress/core'
import {
  
  
  getHighlighter
  
  
  
  
  
} from 'shikiji'
import type {BundledLanguage, BundledTheme, LanguageInput, SpecialLanguage, StringLiteralUnion, ThemeRegistration, ThemeRegistrationRaw} from 'shikiji';

const defaultTheme = 'nord'

export type ShikiPluginTheme =
  | ThemeRegistration
  | ThemeRegistrationRaw
  | StringLiteralUnion<BundledTheme>

/**
 * Options of @vuepress/plugin-shiki
 */
export interface ShikiPluginOptions {
  theme?: ShikiPluginTheme
  lightTheme?: ShikiPluginTheme
  darkTheme?: ShikiPluginTheme
  langs?: (
    | LanguageInput
    | StringLiteralUnion<BundledLanguage>
    | SpecialLanguage
  )[]
}

export const shikiPlugin = ({
  theme,
  lightTheme,
  darkTheme,
  langs,
}: ShikiPluginOptions = {}): Plugin => ({
  name: '@vuepress/plugin-shiki',
  extendsMarkdown: async (md) => {
    const highlighter = await getHighlighter({
      themes: [theme, lightTheme, darkTheme].filter(
        (t) => t !== undefined,
      ) as ShikiPluginTheme[],
      langs,
    })
    md.options.highlight = (code, lang) =>
      highlighter.codeToHtml(code, {
        lang,
        themes: {
          light: lightTheme ?? theme ?? defaultTheme,
          dark: darkTheme ?? theme ?? defaultTheme,
        },
      })
  },
})
