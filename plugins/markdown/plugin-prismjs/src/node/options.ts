import type { MarkdownItLineNumbersOptions } from '@vuepress/highlighter-helper'
import type { HighlightOptions, PreWrapperOptions } from './types.js'

/**
 * Options of @vuepress/plugin-prismjs
 */
export interface PrismjsPluginOptions
  extends Pick<MarkdownItLineNumbersOptions, 'lineNumbers'>,
    PreWrapperOptions,
    HighlightOptions {
  /**
   * Languages to preload
   *
   * Workaround for prismjs language reloading issue
   *
   * @default ['markdown', 'jsdoc', 'yaml']
   * @see https://github.com/PrismJS/prism/issues/2716
   */
  preloadLanguages?: string[]
}
