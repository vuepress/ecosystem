import { encodeData } from '@vuepress/helper'
import type { PluginSimple } from 'markdown-it'
import type { RenderRule } from 'markdown-it/lib/renderer.mjs'

const mermaidRenderer: RenderRule = (tokens, index) =>
  `<Mermaid code="${encodeData(tokens[index].content)}"></Mermaid>`

interface MermaidOptions {
  content: string
  diagram?: string
  title?: string
  indent?: boolean
}

/**
 * Get Mermaid content with proper formatting
 *
 * 获取格式化的 Mermaid 内容
 *
 * @param options - Mermaid options / Mermaid 选项
 *
 * @returns Formatted Mermaid content / 格式化的 Mermaid 内容
 */
export const getMermaidContent = ({
  diagram = 'mermaid',
  content,
  title = '',
  indent = diagram !== 'mermaid',
}: MermaidOptions): string => {
  const [, originalFrontmatter, rest] =
    /^\s*---\n([^]*?)\n---\n\n([\s\S]*)\s*$/m.exec(content) ?? [
      null,
      '',
      content,
    ]

  const frontmatter = (
    !title || /^title:\s*(.*)/m.test(originalFrontmatter)
      ? originalFrontmatter
      : `title: ${title}\n${originalFrontmatter}`
  ).trim()

  return `\
${
  frontmatter
    ? `\
---
${frontmatter}
---

`
    : ''
}\
${
  diagram === 'mermaid'
    ? ''
    : `\
${diagram}
`
}\
${
  indent
    ? rest
        .split('\n')
        .map((line) => (line ? `  ${line}` : ''))
        .join('\n')
    : rest
}\
`
}

const getMermaid = (options: MermaidOptions): string =>
  `<Mermaid code="${encodeData(getMermaidContent(options))}"${
    options.title ? ` title="${encodeData(options.title)}"` : ''
  }></Mermaid>`

const DIAGRAM_MAP: Record<string, [diagramName: string, indent?: boolean]> = {
  'class': ['classDiagram'],
  'c4c': ['C4Context'],
  'er': ['erDiagram'],
  'gantt': [''],
  'git-graph': ['gitGraph'],
  'journey': [''],
  'mindmap': [''],
  'kanban': [''],
  'pie': [''],
  'quadrant': ['quadrantChart'],
  'requirement': ['requirementDiagram'],
  'sequence': ['sequenceDiagram'],
  'state': ['stateDiagram-v2'],
  'timeline': [''],

  // beta diagrams
  'architecture': ['architecture-beta'],
  'block': ['block-beta', false],
  'packet': ['packet-beta', false],
  'sankey': ['sankey-beta', false],
  'xy': ['xychart-beta', false],
  'treemap': ['treemap-beta', false],
  'radar': ['radar-beta'],
}

/**
 * Mermaid markdown-it plugin
 *
 * Mermaid markdown-it 插件
 */
export const mermaid: PluginSimple = (md) => {
  // Handle ```mermaid blocks
  const { fence } = md.renderer.rules

  md.renderer.rules.fence = (...args): string => {
    const [tokens, index] = args
    const { content, info } = tokens[index]

    const fenceInfo = info.trim()

    if (fenceInfo === 'mermaid') return getMermaid({ content, indent: false })

    const [name, ...rest] = fenceInfo.split(' ')

    if (name in DIAGRAM_MAP)
      return getMermaid({
        diagram: DIAGRAM_MAP[name][0] || name,
        title: rest.join(' '),
        content,
        indent: DIAGRAM_MAP[name][1] ?? true,
      })

    return fence!(...args)
  }

  md.renderer.rules.mermaid = mermaidRenderer
}
