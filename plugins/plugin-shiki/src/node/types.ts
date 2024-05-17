import type {
  BundledLanguage,
  BundledTheme,
  Highlighter,
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
   * Fallback language when the specified language is not available.
   */
  defaultHighlightLang?: string

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

  /**
   * Setup Shiki instance
   *
   * Custom shiki setup function. You can customize the shiki instance by adding your own shikiSetup function in your config.
   */
  shikiSetup?: (shiki: Highlighter) => void | Promise<void>

  transformers?: ShikiTransformer[]

  /**
   * The default theme applied to the code (via inline color style).
   * The rest of the themes are applied via CSS variables, and toggled by CSS overrides.
   */
  defaultColor?: false | StringLiteralUnion<'light' | 'dark'>

  /**
   * Show line numbers in code blocks
   * @default true
   */
  lineNumbers?: boolean | number

  /**
   * Enable highlight lines or not
   *
   * @default true
   */
  highlightLines?: boolean

  /**
   * Wrap the `<pre>` tag with an extra `<div>` or not. Do not disable it unless you
   * understand what's it for
   *
   * - Required for `highlightLines`
   * - Required for `lineNumbers`
   * - Required for title display of default theme
   */
  preWrapper?: boolean

  /**
   * Add `v-pre` directive or not
   *
   * @default { block: true, inline: true }
   */
  vPre?: {
    /**
     *
     * Add `v-pre` directive to `<pre>` tag of code block or not
     */
    block?: boolean

    /**
     * Add `v-pre` directive to `<code>` tag of inline code or not
     */
    inline?: boolean
  }

  /**
   * Enable notation diff transformer
   *
   * @default false
   *
   * @see https://shiki.style/packages/transformers#transformernotationdiff
   */
  notationDiff?: boolean

  /**
   * Enable notation focus transformer
   *
   * @default false
   *
   * @see https://shiki.style/packages/transformers#transformernotationfocus
   */
  notationFocus?: boolean

  /**
   * Enable notation highlight transformer
   *
   * @default false
   *
   * @see https://shiki.style/packages/transformers#transformernotationhighlight
   */
  notationHighlight?: boolean

  /**
   * Enable notation error level transformer
   *
   * @default false
   *
   * @see https://shiki.style/packages/transformers#transformernotationerrorlevel
   */
  notationErrorLevel?: boolean
}