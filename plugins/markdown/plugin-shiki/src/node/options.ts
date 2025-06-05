import type {
  MarkdownItCodeBlockTitleOptions,
  MarkdownItCollapsedLinesOptions,
  MarkdownItLineNumbersOptions,
} from '@vuepress/highlighter-helper'
import type { ShikiTwoslashOptions } from '@vuepress/shiki-twoslash'
import type { MarkdownItPreWrapperOptions } from './markdown/index.js'
import type { ShikiHighlightOptions } from './types.js'

/**
 * Options of @vuepress/plugin-shiki
 *
 * @vuepress/plugin-shiki 的选项
 */
export type ShikiPluginOptions = MarkdownItCodeBlockTitleOptions &
  MarkdownItLineNumbersOptions &
  MarkdownItPreWrapperOptions &
  Pick<MarkdownItCollapsedLinesOptions, 'collapsedLines'> &
  ShikiHighlightOptions & {
    /**
     * Enable twoslash
     *
     * 启用 twoslash
     *
     * @description You should install `@shikijs/twoslash` manually.
     *
     * 你需要手动安装 `@shikijs/twoslash`。
     *
     * @default false
     */
    twoslash?:
      | boolean
      | (ShikiTwoslashOptions & {
          /**
           * The options for caching resolved types
           *
           * 缓存解析类型的选项
           *
           * @default true
           */
          typesCache?: ShikiTwoslashOptions['typesCache'] | true
        })
  }
