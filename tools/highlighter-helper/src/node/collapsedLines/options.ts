/**
 * Options for markdown-it collapsed lines plugin
 *
 * markdown-it 折叠行插件选项
 */
export interface MarkdownItCollapsedLinesOptions {
  /**
   * Whether to collapse code blocks when they exceed a certain number of lines
   *
   * 当代码块超过一定行数时是否折叠
   *
   * - If `number`, collapse starts from line `number`.
   * - If `true`, collapse starts from line 15 by default.
   * - If `false`, do not enable code block collapsing globally, but you can enable it for individual code blocks using `:collapsed-lines`
   * - If `'disable'`, Completely disable code block collapsing
   *
   * - 如果是 `number`，从第 `number` 行开始折叠
   * - 如果是 `true`，默认从第 15 行开始折叠
   * - 如果是 `false`，不全局启用代码块折叠，但你可以为单个代码块使用 `:collapsed-lines` 启用
   * - 如果是 `'disable'`，完全禁用代码块折叠
   *
   * @default 'disable'
   */
  collapsedLines?: boolean | number | 'disable'

  /**
   * Whether to remove the last line
   *
   * 是否移除最后一行
   *
   * @default false
   */
  removeLastLine?: boolean
}
