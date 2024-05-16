import type { MarkdownMathPluginOptions } from './options.js'

declare module 'vuepress/markdown' {
  export interface MarkdownOptions {
    math?: MarkdownMathPluginOptions
  }
}
