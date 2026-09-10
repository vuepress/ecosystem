import { container } from '@mdit/plugin-container'
import type { RendererRule } from 'markdown-it'
import type Token from 'markdown-it/lib/token.mjs'
import type { Markdown } from 'vuepress/markdown'

import type { MarkdownCodeTreePluginOptions } from './options.js'
import { renderCodeTree } from './renderCodeTree.js'
import { hasMarker, resolveAttrs } from './utils.js'

/**
 * Markdown code tree plugin
 *
 * This plugin is used to render a code tree, which is a file tree with code
 * blocks of each file, in VuePress.
 *
 * Markdown 代码树插件
 *
 * 该插件用于在 VuePress 中渲染代码树，即带有每个文件代码块的文件树。
 *
 * @example
 *   import { codeTree } from '@vuepress/plugin-markdown-code-tree'
 *
 *   md.use(codeTree, { height: '400px' })
 *
 * @param md - MarkdownIt instance / MarkdownIt 实例
 * @param options - Plugin options / 插件选项
 */
export const codeTree = (
  md: Markdown,
  { height: defaultHeight = '320px' }: MarkdownCodeTreePluginOptions = {},
): void => {
  /**
   * Collect the file path of every code block inside the container
   *
   * 收集容器内每个代码块的文件路径
   *
   * @param tokens - All tokens / 所有 token
   * @param index - Index of the opening token / 开始 token 的索引
   * @returns File paths and the file marked with `:active` / 文件路径与标记为 `:active`
   *   的文件
   */
  const collectFiles = (
    tokens: Token[],
    index: number,
  ): { files: string[]; activeFile: string } => {
    const files: string[] = []
    let activeFile = ''

    // The content of the container may hold nested containers, so the matching
    // closing token is found by tracking the nesting depth
    let depth = 0
    for (let i = index + 1; i < tokens.length; i++) {
      const token = tokens[i]

      if (token.nesting === -1) {
        if (depth === 0) break
        depth -= 1
        continue
      }

      if (token.nesting === 1) {
        depth += 1
        continue
      }

      if (token.type !== 'fence') continue

      const fenceInfo = token.info
        ? md.utils.unescapeAll(token.info).trim()
        : ''
      // Trim the file path to keep it in sync with the rendered code block title
      const file = resolveAttrs(fenceInfo, 'title')?.trim()

      if (!file) continue

      files.push(file)

      if (hasMarker(fenceInfo, ':active')) activeFile = file
    }

    return { files, activeFile }
  }

  const openRenderer: RendererRule = (tokens, index): string => {
    const info = tokens[index].info ?? ''
    // Trim the values, as the highlighter trims the code block title as well,
    // otherwise the file path in the file tree does not match the rendered title
    const title = resolveAttrs(info, 'title')?.trim() ?? ''
    const entry = resolveAttrs(info, 'entry')?.trim() ?? ''
    const height = resolveAttrs(info, 'height')?.trim() || defaultHeight
    const { files, activeFile } = collectFiles(tokens, index)

    return renderCodeTree({
      title,
      height,
      entry: activeFile || entry,
      files,
      // The content is rendered by the container plugin itself
      autoClose: false,
    })
  }

  container(md, {
    name: 'code-tree',
    openRenderer,
    closeRenderer: () => '</CodeTree>',
  })
}
