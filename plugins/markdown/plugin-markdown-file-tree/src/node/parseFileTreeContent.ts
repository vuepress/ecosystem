import { removeEndingSlash } from 'vuepress/shared'
import type { FileTreeNode, FileTreeNodeProps } from './types.js'

const RE_FOCUS = /^\*\*(.*)\*\*(?:$|\s+)/

/**
 * Parse the info string of a single node to extract attributes such as file name, comments, and type.
 * @param info Node description string
 * @returns File tree node attributes
 */
export function parseFileTreeNodeInfo(rawInfo: string): FileTreeNodeProps {
  let filename = ''
  let focus = false
  let expanded: boolean | undefined = true
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

  info = info.replace(RE_FOCUS, (_, matched: string) => {
    filename = matched
    focus = true
    return ''
  })

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
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
 * @param content The original text content of the file tree
 * @returns An array of file tree nodes
 */
export function parseFileTreeContent(content: string): FileTreeNode[] {
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

    while (stack.length > 0 && stack[stack.length - 1].level >= level) {
      stack.pop()
    }

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
