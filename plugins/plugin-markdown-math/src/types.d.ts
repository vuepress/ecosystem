import type { MarkdownMathPluginOptions } from './node/options.js'

declare module 'vuepress/markdown' {
  export interface MarkdownOptions {
    math?: MarkdownMathPluginOptions
  }
}
