import type {
  MarkdownItCollapsedLinesOptions,
  MarkdownItLineNumbersOptions,
} from '@vuepress/highlighter-helper'
import type { MarkdownItPreWrapperOptions } from './markdown/index.js'
import type { ShikiHighlightOptions } from './types.js'

/**
 * Options of @vuepress/plugin-shiki
 */
export type ShikiPluginOptions = MarkdownItLineNumbersOptions &
  MarkdownItPreWrapperOptions &
  Pick<MarkdownItCollapsedLinesOptions, 'collapsedLines'> &
  ShikiHighlightOptions
