import type { MarkdownImagePluginOptions } from './node/options.js'

declare module 'vuepress/markdown' {
  export interface MarkdownOptions {
    image?: MarkdownImagePluginOptions
  }
}
