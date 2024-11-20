export interface MarkdownItLineNumbersOptions {
  /**
   * Show line numbers in code blocks
   *
   * - If `number`, show line numbers with code block lines not less than `number`.
   * - If `true`, show line number always
   * - If `false`, do not enable line numbers globally, but you can enable it for individual code blocks using `:line-numbers`
   * - If `'disable'`, Completely disable line number
   * @default 'disable'
   */
  lineNumbers?: boolean | number | 'disable'

  /**
   * @default false
   */
  removeLastLine?: boolean
}
