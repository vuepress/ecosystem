/**
 * Options for markdown-it line numbers plugin
 *
 * markdown-it 行号插件选项
 */
export interface MarkdownItLineNumbersOptions {
  /**
   * Show line numbers in code blocks
   *
   * 在代码块中显示行号
   *
   * - If `number`, show line numbers with code block lines not less than `number`.
   * - If `true`, show line number always
   * - If `false`, do not enable line numbers globally, but you can enable it for individual code blocks using `:line-numbers`
   * - If `'disable'`, Completely disable line number
   *
   * - 如果是 `number`，当代码块行数不少于该数字时显示行号
   * - 如果是 `true`，总是显示行号
   * - 如果是 `false`，不全局启用行号，但你可以为单个代码块使用 `:line-numbers` 启用
   * - 如果是 `'disable'`，完全禁用行号
   *
   * @default 'disable'
   */
  lineNumbers?: boolean | number | 'disable'

  /**
   * Whether to remove the last line
   *
   * 是否移除最后一行
   *
   * @default false
   */
  removeLastLine?: boolean

  /**
   * Custom resolving function that whether to enable line numbers for a single code block
   *
   * 自定义解析函数，用于决定是否为单个代码块启用行号
   *
   * @param info - Code block info string / 代码块信息字符串
   * @returns `boolean | undefined`
   *  - `boolean` - Whether to enable line numbers / 是否启用行号
   *  - `undefined` - built-in resolving / 使用内置解析
   */
  resolveLineNumbers?: (info: string) => boolean | undefined
}
