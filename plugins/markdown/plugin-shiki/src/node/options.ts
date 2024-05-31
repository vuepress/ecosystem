import type {
  LineNumberOptions,
  PreWrapperOptions,
  ShikiHighlightOptions,
} from './types.js'

/**
 * Options of @vuepress/plugin-shiki
 */
export type ShikiPluginOptions = ShikiHighlightOptions &
  PreWrapperOptions &
  LineNumberOptions
