import type { Markdown } from 'vuepress/markdown'
import { resolveAttr } from '../utils/index.js'
import type {
  CodeBlockTitleRender,
  MarkdownItCodeBlockTitleOptions,
} from './options.js'

const defaultTitleRender: CodeBlockTitleRender = (title: string) =>
  `<div class="code-block-title-bar"><span class="title">${title}</span></div>`

export const codeBlockTitle = (
  md: Markdown,
  {
    codeBlockTitle: titleEnabledOrRender = true,
  }: MarkdownItCodeBlockTitleOptions = {},
): void => {
  if (titleEnabledOrRender === false) return

  const titleRender: CodeBlockTitleRender =
    titleEnabledOrRender === true ? defaultTitleRender : titleEnabledOrRender

  const rawFence = md.renderer.rules.fence!

  md.renderer.rules.fence = (...args) => {
    const [tokens, index] = args
    const token = tokens[index]
    // get token info
    const info = token.info ? md.utils.unescapeAll(token.info).trim() : ''
    const rawCode = rawFence(...args)
    const title = resolveAttr(info, 'title')?.trim()

    if (!title) return rawCode

    return `<div class="code-block-title">${titleRender(title)}${rawCode}</div>`
  }
}
