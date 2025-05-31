import type { Markdown } from 'vuepress/markdown'
import { isFunction } from 'vuepress/shared'
import { resolveAttr } from '../utils/index.js'
import type {
  CodeBlockTitleRender,
  MarkdownItCodeBlockTitleOptions,
} from './options.js'

const defaultTitleRender: CodeBlockTitleRender = (title, code) =>
  `\
<div class="code-block-with-title">
  <div class="code-block-title-bar" data-title="${title}">
    <span>${title}</span>
  </div>
  ${code}
</div>`

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

  md.renderer.rules.fence = (...args) => {
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
