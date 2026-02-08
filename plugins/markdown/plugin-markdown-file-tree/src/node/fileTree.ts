import type { PluginSimple } from 'markdown-it'
import type StateBlock from 'markdown-it/lib/rules_block/state_block.mjs'
import type Token from 'markdown-it/lib/token.mjs'
import { parseFileTreeContent } from './parseFileTreeContent.js'
import type { FileTreeNode } from './types.js'

const MARKER = ':'
const MARKER_MIN_LEN = 3
const NAME = 'file-tree'

const defineFileTreeContainer = (
  state: StateBlock,
  startLine: number,
  endLine: number,
  silent: boolean,
): boolean => {
  const start = state.bMarks[startLine] + state.tShift[startLine]
  const max = state.eMarks[startLine]
  let pos = start

  // check marker
  if (state.src[pos] !== MARKER) return false

  // check marker length
  for (pos = start + 1; pos <= max; pos++) {
    if (state.src[pos] !== MARKER) break
  }

  if (pos - start < MARKER_MIN_LEN) return false

  const markup = state.src.slice(start, pos)
  const info = state.src.slice(pos, max).trim()

  // ::: file-tree
  // check info starts with file-tree
  if (!info.startsWith(NAME)) return false

  /* istanbul ignore if -- @preserve */
  if (silent) return true

  let line = startLine + 1
  let content = ''
  // collect container content until encounter the end marker
  while (line < endLine) {
    if (
      state.src.slice(state.bMarks[line], state.eMarks[line]).trim() === markup
    ) {
      break
    }

    content += `${state.src.slice(state.bMarks[line], state.eMarks[line])}\n`
    line++
  }

  const token = state.push(`${NAME}_container`, '', 0)
  token.meta = { title: info.slice(NAME.length).trim() }
  token.content = content
  token.markup = `${markup} ${NAME}`
  token.map = [startLine, line + 1]

  state.line = line + 1

  return true
}

export const fileTree: PluginSimple = (md) => {
  md.block.ruler.before('fence', `${NAME}_definition`, defineFileTreeContainer)

  const renderNodes = (nodes: FileTreeNode[]): string =>
    nodes
      .map(
        ({
          level,
          children,
          filename,
          comment,
          focus,
          expanded,
          type,
          diff,
        }) => {
          // 文件夹无子节点时补充省略号
          if (children.length === 0 && type === 'folder') {
            children.push({
              level: level + 1,
              children: [],
              filename: '…',
              type: 'file',
            } as unknown as FileTreeNode)
          }

          const nodeType = children.length > 0 ? 'folder' : type
          const indent = `\n${'  '.repeat(level + 1)}`
          const isEmptyFolder =
            nodeType === 'folder' &&
            children.filter(
              (child) => child.filename !== '…' && child.filename !== '...',
            ).length === 0

          const propsRendered = `type="${nodeType}" filename="${filename}" :level="${level}"${nodeType === 'folder' && expanded ? ' expanded' : ''}${focus ? ' focus' : ''}${diff ? ` diff="${diff}"` : ''}${isEmptyFolder ? ' empty' : ''}`
          const commentRendered = comment
            ? `${indent}  <template #comment>${md.renderInline(comment.replaceAll('#', String.raw`\#`))}</template>`
            : ''
          const childrenRendered =
            children.length > 0
              ? `${indent}  ${renderNodes(children).trimStart()}`
              : ''

          return `${indent}<FileTreeNode ${propsRendered}>${commentRendered}${childrenRendered}${indent}</FileTreeNode>`
        },
      )
      .join('')

  md.renderer.rules[`${NAME}_container`] = (
    tokens: Token[],
    idx: number,
  ): string => {
    const token = tokens[idx]
    const meta = token.meta as { title: string }
    const nodes = parseFileTreeContent(token.content)

    return `<div class="vp-${NAME}">${meta.title ? `\n<div class="${NAME}-title">${meta.title}</div>\n` : ''}${renderNodes(nodes)}\n</div>`
  }
}
