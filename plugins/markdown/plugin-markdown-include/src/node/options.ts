import type { MarkdownItIncludeOptions } from '@mdit/plugin-include'

export type MarkdownIncludePluginOptions = Omit<
  MarkdownItIncludeOptions,
  'currentPath'
>
