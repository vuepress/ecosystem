import type {
  MarkdownItCodeBlockTitleOptions,
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
 *
 * @vuepress/plugin-prismjs 的选项
 */
export type PrismjsPluginOptions = MarkdownItCodeBlockTitleOptions &
  MarkdownItLineNumbersOptions &
  MarkdownItPreWrapperOptions &
  MarkdownItPrismjsHighlightOptions &
  Pick<MarkdownItCollapsedLinesOptions, 'collapsedLines'> &
  PrismjsHighlightOptions
