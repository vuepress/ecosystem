import type { PluginSimple } from 'markdown-it'
import type StateBlock from 'markdown-it/lib/rules_block/state_block.mjs'
import type Token from 'markdown-it/lib/token.mjs'
import { parseFileTreeContent } from './parseFileTreeContent.js'
import type { FileTreeNode } from './types'

const maker = ':'
const markerMinLen = 3
const name = 'file-tree'

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
  if (state.src[pos] !== maker) return false

  // check marker length
  for (pos = start + 1; pos <= max; pos++) {
    if (state.src[pos] !== maker) break
  }

  if (pos - start < markerMinLen) return false

  const markup = state.src.slice(start, pos)
  const info = state.src.slice(pos, max).trim()

  // ::: file-tree
  // check info starts with file-tree
  if (!info.startsWith(name)) return false

  /* istanbul ignore if -- @preserve */
  if (silent) return true

  let line = startLine
  let content = ''
  // collect container content until encounter the end marker
  while (++line < endLine) {
    if (
      state.src.slice(state.bMarks[line], state.eMarks[line]).trim() === markup
    ) {
      break
    }

    content += `${state.src.slice(state.bMarks[line], state.eMarks[line])}\n`
  }

  const token = state.push(`${name}_container`, '', 0)
  token.meta = { title: info.slice(name.length).trim() }
  token.content = content
  token.markup = `${markup} ${name}`
  token.map = [startLine, line + 1]

  state.line = line + 1

  return true
}

export const fileTree: PluginSimple = (md) => {
  md.block.ruler.before('fence', `${name}_definition`, defineFileTreeContainer)

  const renderNodes = (nodes: FileTreeNode[]): string =>
    nodes
      .map((node) => {
        const {
          level,
          children,
          filename,
          comment,
          focus,
          expanded,
          type,
          diff,
        } = node
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
        const renderedComment = comment
          ? `<template #comment>${md.renderInline(comment.replaceAll('#', '\\#'))}</template>`
          : ''
        const renderProps = `type="${nodeType}" filename="${filename}" :level="${level}"${nodeType === 'folder' && expanded ? ' expanded' : ''}${focus ? ' focus' : ''}${diff ? ` diff="${diff}"` : ''}`

        return `<FileTreeNode ${renderProps}>
      ${renderedComment}
      ${children.length > 0 ? renderNodes(children) : ''}
      </FileTreeNode>`
      })
      .join('\n')

  md.renderer.rules[`${name}_container`] = (
    tokens: Token[],
    idx: number,
  ): string => {
    const token = tokens[idx]
    const meta = token.meta as { title: string }
    const nodes = parseFileTreeContent(token.content)

    return `<div class="vp-${name}">
  ${meta.title ? `<div class="${name}-title">${meta.title}</div>` : ''}
  ${renderNodes(nodes)}
</div>`
  }
}
