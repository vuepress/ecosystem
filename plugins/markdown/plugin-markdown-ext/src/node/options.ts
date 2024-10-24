import type { MarkdownItTaskListOptions } from '@mdit/plugin-tasklist'

/**
 * Options of markdown-ext plugin
 */
export interface MarkdownExtPluginOptions {
  /**
   * Whether enable standard GFM support
   *
   * 是否启用标准的 GitHub Favor Markdown 支持
   *
   * @default false
   */
  gfm?: boolean

  /**
   * Whether convert `\n` in paragraphs into `<br>`s
   *
   * 是否将段落中的 `\n` 转换为 `<br>`
   *
   * @description enabled in gfm mode
   *
   * @default false
   */
  breaks?: boolean

  /**
   * Whether convert URL-like text into links
   *
   * 是否将文字中的链接格式文字转换为链接
   *
   * @description enabled in gfm mode
   *
   * @default false
   */
  linkify?: boolean

  /**
   * Whether to enable footnote format support
   *
   * 是否启用脚注格式支持。
   *
   * @description enabled in gfm mode
   *
   * @default false
   */
  footnote?: boolean

  /**
   * Whether to enable tasklist format support
   *
   * 是否启用任务列表支持
   *
   * @description enabled in gfm mode
   *
   * @default false
   */
  tasklist?: MarkdownItTaskListOptions | boolean

  /**
   * Whether to enable component support
   *
   * 是否启用组件支持
   *
   * @default false
   */
  component?: boolean

  /**
   * Whether to enable v-pre wrapper.
   *
   * 是否启用 v-pre 容器。
   *
   * @default false
   */
  vPre?: boolean
}
