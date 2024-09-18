import type { MarkdownItCollapsedLinesOptions } from '@vuepress/highlighter-helper'
import type { PreWrapperOptions, ShikiHighlightOptions } from './types.js'

/**
 * Options of @vuepress/plugin-shiki
 */
export type ShikiPluginOptions = Pick<
  MarkdownItCollapsedLinesOptions,
  'collapsedLines'
> &
  PreWrapperOptions &
  ShikiHighlightOptions & {
    /**
     * Line number options
     *
     * - A `boolean` value is to enable line numbers or not globally.
     * - A `number` value is the minimum number of lines to enable line numbers
     * - `disable` means completely disable the feature
     *
     * @default true
     */
    lineNumbers?: boolean | number | 'disable'
  }
