export interface MarkdownItCollapsedLinesOptions {
  /**
   * Whether to collapse code blocks when they exceed a certain number of lines,
   *
   * - If `number`, collapse starts from line `number`.
   * - If `true`, collapse starts from line 15 by default.
   * - If `false`, disable collapse.
   * @default false
   */
  collapsedLines?: boolean | number

  /**
   * @default false
   */
  removeLastLine?: boolean
}
