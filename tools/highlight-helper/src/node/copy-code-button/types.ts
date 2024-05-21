import type { LocaleConfig } from 'vuepress/shared'

/**
 * Options for copy code button
 *
 * `<button title="{title}" class="{className}"></button>`
 */
export interface CopyCodeButtonOptions {
  /**
   * Class name of the button
   *
   * @default 'copy'
   */
  className?: string

  /**
   * Locale config for copy code button
   */
  locales?: LocaleConfig<CopyCodeButtonLocaleOptions>
}

export interface CopyCodeButtonLocaleOptions {
  /**
   * Title of the button
   *
   * @default 'Copy code'
   */
  title?: string

  /**
   * Copied text
   *
   * @default 'Copied!'
   */
  copied?: string
}

export type CopyCodeButtonRender = (filepathRelative: string) => string
