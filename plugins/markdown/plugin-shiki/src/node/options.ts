import type {
  MarkdownItCollapsedLinesOptions,
  MarkdownItLineNumbersOptions,
} from '@vuepress/highlighter-helper'
import type { ShikiTwoslashOptions } from '@vuepress/shiki-twoslash'
import type { MarkdownItPreWrapperOptions } from './markdown/index.js'
import type { ShikiHighlightOptions } from './types.js'

/**
 * Options of @vuepress/plugin-shiki
 */
export type ShikiPluginOptions = MarkdownItLineNumbersOptions &
  MarkdownItPreWrapperOptions &
  Pick<MarkdownItCollapsedLinesOptions, 'collapsedLines'> &
  ShikiHighlightOptions & {
    /**
     * Enable twoslash
     *
     * @description You should install `@shikijs/twoslash` manually.
     *
     * @default false
     */
    twoslash?:
      | boolean
      | (ShikiTwoslashOptions & {
          /**
           * The options for caching resolved types
           * @default true
           */
          typesCache?: ShikiTwoslashOptions['typesCache'] | true
        })
  }
