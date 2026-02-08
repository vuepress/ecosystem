import type { Markdown } from 'vuepress/markdown'
import { isFunction } from 'vuepress/shared'
import { resolveAttr } from '../utils/index.js'
import type {
  CodeBlockTitleRender,
  MarkdownItCodeBlockTitleOptions,
} from './options.js'

/**
 * Default title render function
 *
 * 默认标题渲染函数
 *
 * @param title - Code block title / 代码块标题
 * @param code - Original code block HTML / 原始代码块 HTML
 * @returns Code block HTML with title / 带标题的代码块 HTML
 */
const defaultTitleRender: CodeBlockTitleRender = (title, code) =>
  `\
<div class="code-block-with-title">
  <div class="code-block-title-bar" data-title="${title}">
    <span>${title}</span>
  </div>
  ${code}
</div>`

/**
 * Add code block title functionality to markdown-it
 *
 * 为 markdown-it 添加代码块标题功能
 *
 * @param md - MarkdownIt instance / MarkdownIt 实例
 * @param options - Plugin options / 插件选项
 *
 * @example
 * ```ts
 * import { codeBlockTitle } from '@vuepress/highlighter-helper'
 *
 * md.use(codeBlockTitle, {
 *   codeBlockTitle: true
 * })
 * ```
 */
export const codeBlockTitle = (
  md: Markdown,
  {
    codeBlockTitle: codeBlockTitleOptions = true,
  }: MarkdownItCodeBlockTitleOptions = {},
): void => {
  if (codeBlockTitleOptions === false) return

  const titleRender: CodeBlockTitleRender = isFunction(codeBlockTitleOptions)
    ? codeBlockTitleOptions
    : defaultTitleRender

  const rawFence = md.renderer.rules.fence!

  md.renderer.rules.fence = (...args): string => {
    const [tokens, index] = args
    const token = tokens[index]
    // get token info
    const info = token.info ? md.utils.unescapeAll(token.info).trim() : ''
    const rawCode = rawFence(...args)
    const title = resolveAttr(info, 'title')?.trim()

    if (!title) return rawCode

    return titleRender(title, rawCode)
  }
}
