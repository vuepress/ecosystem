import type { MarkdownEnv } from 'vuepress/markdown'

import { getFileIcon } from './fileIcons/index.js'
import { escapeAttr } from './utils.js'

/**
 * Markdown env with the files read by the embedded code tree
 *
 * 带有嵌入代码树所读取文件的 Markdown 环境
 */
export interface CodeTreeEnv extends MarkdownEnv {
  /**
   * Files read by the embedded code tree
   *
   * 嵌入的代码树所读取的文件
   */
  codeTreeFiles?: string[]
}

/**
 * File tree node
 *
 * 文件树节点
 */
export interface FileTreeNode {
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
export const buildFileTree = (files: string[]): FileTreeNode[] => {
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
export const renderFileTree = (nodes: FileTreeNode[]): string =>
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
export const renderAttrs = (attrs: Record<string, string>): string =>
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
export const normalizeHeight = (height: number | string): string | null => {
  if (typeof height === 'number') return `${height}px`

  const value = height.trim()

  if (value === '') return null

  // A bare number is treated as pixels
  return /^\d+(?:\.\d+)?$/u.test(value) ? `${value}px` : value
}

/**
 * Render the code tree component
 *
 * 渲染代码树组件
 *
 * @param options - Render options / 渲染选项
 * @returns Rendered component / 渲染结果
 */
export const renderCodeTree = ({
  title,
  height,
  entry,
  files,
  content = '',
  autoClose = true,
}: {
  /**
   * Title of the code tree
   *
   * 代码树的标题
   */
  title: string
  /**
   * Height of the code tree
   *
   * 代码树的高度
   */
  height: number | string
  /**
   * File opened by default
   *
   * 默认打开的文件
   */
  entry: string
  /** File paths / 文件路径 */
  files: string[]
  /**
   * Rendered code blocks
   *
   * 渲染后的代码块
   */
  content?: string
  /**
   * Whether to append the closing tag
   *
   * The container syntax renders the closing tag on its own, while the embed
   * syntax renders the content inline.
   *
   * 是否追加闭合标签
   *
   * 容器语法自行渲染闭合标签，而嵌入语法则内联渲染内容。
   */
  autoClose?: boolean
}): string => {
  const fileTree = buildFileTree(files)
  // Fallback to the first code block when the expected entry does not exist
  const active = entry && files.includes(entry) ? entry : (files[0] ?? '')

  return `<CodeTree${renderAttrs({
    title,
    height: normalizeHeight(height) ?? '',
    entry: active,
  })}>${
    fileTree.length
      ? `<template #file-tree>${renderFileTree(fileTree)}</template>`
      : ''
  }${content}${autoClose ? '</CodeTree>' : ''}`
}

/**
 * Add a file to the page dependencies
 *
 * 将文件添加到页面依赖中
 *
 * @param env - Markdown env / Markdown 环境
 * @param file - Absolute path of the file / 文件的绝对路径
 */
export const addPageDependency = (env: CodeTreeEnv, file: string): void => {
  ;(env.codeTreeFiles ??= []).push(file)
}
