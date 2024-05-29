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

export interface ShikiHighlightOptions {
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
   * Language alias
   *
   * @see https://shiki.style/guide/load-lang#custom-language-aliases
   */
  langAlias?: Record<string, StringLiteralUnion<BundledLanguage>>

  /**
   * Fallback language when the specified language is not available.
   */
  defaultLang?: string

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
   * Function to customize Shiki highlighter instance.
   */
  shikiSetup?: (shiki: Highlighter) => void | Promise<void>

  transformers?: ShikiTransformer[]

  /**
   * The default theme applied to the code (via inline color style).
   * The rest of the themes are applied via CSS variables, and toggled by CSS overrides.
   */
  defaultColor?: false | StringLiteralUnion<'light' | 'dark'>

  /**
   * Enable highlight lines or not
   *
   * @default true
   */
  highlightLines?: boolean

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

  /**
   * Log level Highlighter language detecter
   *
   * @description defaults to `'debug'` when `--debug` flag is enabled
   *
   * @default 'warn'
   */
  logLevel?: 'silent' | 'warn' | 'debug'
}

export interface LineNumberOptions {
  /**
   * Show line numbers in code blocks
   * @default true
   */
  lineNumbers?: boolean | number
}

export interface PreWrapperOptions {
  /**
   * Wrap the `<pre>` tag with an extra `<div>` or not. Do not disable it unless you
   * understand what's it for
   *
   * - Required for `lineNumbers`
   * - Required for title display of default theme
   */
  preWrapper?: boolean
}
