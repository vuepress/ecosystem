import type { MarkdownItLineNumbersOptions } from '@vuepress/highlighter-helper'
import type { PreWrapperOptions, ShikiHighlightOptions } from './types.js'

/**
 * Options of @vuepress/plugin-shiki
 */
export type ShikiPluginOptions = Pick<
  MarkdownItLineNumbersOptions,
  'lineNumbers'
> &
  PreWrapperOptions &
  ShikiHighlightOptions
