import { removeEndingSlash } from 'vuepress/shared'
import type { FileTreeNode, FileTreeNodeProps } from './types.js'

const FOCUS_RE = /^\*\*(.*)\*\*(?:$|\s+)/

/**
 * Parse the info string of a single node to extract attributes such as file name, comments, and type.
 *
 * 解析单个节点的信息字符串以提取属性，如文件名、注释和类型。
 *
 * @param rawInfo Node description string. 节点描述字符串
 * @returns File tree node attributes. 文件树节点属性
 */
export const parseFileTreeNodeInfo = (rawInfo: string): FileTreeNodeProps => {
  let filename = ''
  let focus = false
  let expanded = true
  let type: FileTreeNodeProps['type'] = 'file'
  let diff: FileTreeNodeProps['diff']
  let info = rawInfo

  if (info.startsWith('++')) {
    info = info.slice(2).trim()
    diff = 'add'
  } else if (info.startsWith('--')) {
    info = info.slice(2).trim()
    diff = 'remove'
  }

  info = info.replace(FOCUS_RE, (_, matched: string) => {
    filename = matched
    focus = true
    return ''
  })

  if (filename === '' && !focus) {
    const sharpIndex = info.indexOf('#')
    filename = info.slice(0, sharpIndex === -1 ? info.length : sharpIndex)
    info = sharpIndex === -1 ? '' : info.slice(sharpIndex)
  }

  const comment = info.trim()

  if (filename.endsWith('/')) {
    type = 'folder'
    expanded = false
    filename = removeEndingSlash(filename)
  }

  return { filename, comment, focus, expanded, type, diff }
}

/**
 * Parse the original file tree content into a node tree structure
 *
 * 解析原始文件树内容，将其转换为节点树结构。
 *
 * @param content The original text content of the file tree. 文件树的原始文本内容
 * @returns An array of file tree nodes. 文件树节点数组
 */
export const parseFileTreeContent = (content: string): FileTreeNode[] => {
  const root: FileTreeNode = {
    level: -1,
    children: [],
  } as unknown as FileTreeNode
  const stack: FileTreeNode[] = [root]
  const lines = content.trimEnd().split('\n')
  const spaceLength = lines[0].match(/^\s*/)?.[0].length ?? 0

  for (const line of lines) {
    const match = line.match(/^(\s*)-(.*)$/)
    if (!match) continue

    const level = Math.floor((match[1].length - spaceLength) / 2)
    const info = match[2].trim()

    while (stack.length > 0 && stack[stack.length - 1].level >= level)
      stack.pop()

    const parent = stack[stack.length - 1]
    const node: FileTreeNode = {
      level,
      children: [],
      ...parseFileTreeNodeInfo(info),
    }
    parent.children.push(node)
    stack.push(node)
  }

  return root.children
}
