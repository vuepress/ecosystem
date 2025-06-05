/**
 * Code block title render function
 *
 * 代码块标题渲染函数
 *
 * @param title - The title to render / 要渲染的标题
 * @param code - The code block HTML / 代码块 HTML
 * @returns The rendered HTML / 渲染后的 HTML
 */
export type CodeBlockTitleRender = (title: string, code: string) => string

/**
 * Options for markdown-it code block title plugin
 *
 * markdown-it 代码块标题插件选项
 */
export interface MarkdownItCodeBlockTitleOptions {
  /**
   * Whether to render the title of the code block
   *
   * 是否渲染代码块的标题
   *
   * - If `true`, enable the title render of the code block
   * - If `false`, disable the title render of the code block
   * - If `Function`, custom title render
   *
   * - 如果是 `true`，启用代码块标题渲染
   * - 如果是 `false`，禁用代码块标题渲染
   * - 如果是 `Function`，自定义标题渲染
   *
   * @default true
   */
  codeBlockTitle?: CodeBlockTitleRender | boolean
}
