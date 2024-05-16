import type { MarkdownImagePluginOptions } from './options.js'

declare module 'vuepress/markdown' {
  export interface MarkdownOptions {
    image?: MarkdownImagePluginOptions
  }
}
