import type {
  MarkdownItCollapsedLinesOptions,
  MarkdownItLineNumbersOptions,
} from '@vuepress/highlighter-helper'
import type {
  MarkdownItPreWrapperOptions,
  MarkdownItPrismjsHighlightOptions,
} from './markdown/index.js'
import type { PrismjsHighlightOptions } from './types.js'

/**
 * Options of @vuepress/plugin-prismjs
 */
export type PrismjsPluginOptions = MarkdownItLineNumbersOptions &
  MarkdownItPreWrapperOptions &
  MarkdownItPrismjsHighlightOptions &
  Pick<MarkdownItCollapsedLinesOptions, 'collapsedLines'> &
  PrismjsHighlightOptions
