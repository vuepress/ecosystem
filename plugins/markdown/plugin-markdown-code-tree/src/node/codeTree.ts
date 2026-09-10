import { container } from '@mdit/plugin-container'
import type { RendererRule } from 'markdown-it'
import type Token from 'markdown-it/lib/token.mjs'
import type { Markdown } from 'vuepress/markdown'

import { getFileIcon } from './fileIcons/index.js'
import type { MarkdownCodeTreePluginOptions } from './options.js'
import { escapeAttr, hasMarker, resolveAttrs } from './utils.js'

/**
 * File tree node
 *
 * 文件树节点
 */
interface FileTreeNode {
  /**
   * Full path of the file or the folder
   *
   * 文件或文件夹的完整路径
   */
  path: string
  /**
   * Children of the folder
   *
   * 文件夹的子节点
   */
  children: FileTreeNode[]
}

/**
 * Build a file tree from file paths
 *
 * 根据文件路径构建文件树
 *
 * @param files - File paths / 文件路径
 * @returns File tree / 文件树
 */
const buildFileTree = (files: string[]): FileTreeNode[] => {
  const root: FileTreeNode[] = []

  for (const file of files) {
    const segments = file.split('/').filter((segment) => segment !== '')
    let nodes = root

    for (const index of segments.keys()) {
      const path = segments.slice(0, index + 1).join('/')
      let node = nodes.find((item) => item.path === path)

      if (!node) {
        node = { path, children: [] }
        nodes.push(node)
      }

      nodes = node.children
    }
  }

  return root
}

/**
 * Render file tree nodes to component tags
 *
 * 将文件树节点渲染为组件标签
 *
 * @param nodes - File tree nodes / 文件树节点
 * @returns Rendered tags / 渲染结果
 */
const renderFileTree = (nodes: FileTreeNode[]): string =>
  nodes
    .map(({ path, children }) => {
      const type = children.length ? 'folder' : 'file'

      return `<CodeTreeFileNode path="${escapeAttr(path)}" type="${type}" icon="${escapeAttr(
        getFileIcon(path, type),
      )}">${renderFileTree(children)}</CodeTreeFileNode>`
    })
    .join('')

/**
 * Render attributes to a HTML attribute string
 *
 * 将属性渲染为 HTML 属性字符串
 *
 * @param attrs - Attributes / 属性
 * @returns Rendered attributes / 渲染结果
 */
const renderAttrs = (attrs: Record<string, string>): string =>
  Object.entries(attrs)
    .filter(([, value]) => value !== '')
    .map(([name, value]) => ` ${name}="${escapeAttr(value)}"`)
    .join('')

/**
 * Normalize a height value to a CSS length
 *
 * 将高度值规范化为 CSS 长度
 *
 * @param height - Height value / 高度值
 * @returns CSS length or `null` / CSS 长度或 `null`
 */
const normalizeHeight = (height: number | string): string | null => {
  if (typeof height === 'number') return `${height}px`

  const value = height.trim()

  if (value === '') return null

  // A bare number is treated as pixels
  return /^\d+(?:\.\d+)?$/u.test(value) ? `${value}px` : value
}

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

    const fileTree = buildFileTree(files)
    // Fallback to the first code block when the expected entry does not exist
    const expectedEntry = activeFile || entry
    const active = files.includes(expectedEntry)
      ? expectedEntry
      : (files[0] ?? '')

    return `<CodeTree${renderAttrs({
      title,
      height: normalizeHeight(height) ?? '',
      entry: active,
    })}>${
      fileTree.length
        ? `<template #file-tree>${renderFileTree(fileTree)}</template>`
        : ''
    }`
  }

  container(md, {
    name: 'code-tree',
    openRenderer,
    closeRenderer: () => '</CodeTree>',
  })
}
