import type { MarkdownItIncludeOptions } from '@mdit/plugin-include'

/**
 * Options for `@vuepress/plugin-markdown-include`
 *
 * `@vuepress/plugin-markdown-include` 插件的选项
 */
export type MarkdownIncludePluginOptions = Omit<
  MarkdownItIncludeOptions,
  'currentPath'
>
