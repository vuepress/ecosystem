import type { MarkdownIncludePluginOptions } from '@vuepress/plugin-markdown-include'
import type { Root } from 'mdast'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { visit } from 'unist-util-visit'
import { fs, path } from 'vuepress/utils'

import { dedent } from '../utils/dedent.js'
import { logger } from '../utils/logger.js'

interface ImportFileLineInfo {
  filePath: string
  lineStart?: number
  lineEnd?: number
}

interface ImportFileRegionInfo {
  filePath: string
  region: string
}

type ImportFileInfo = ImportFileLineInfo | ImportFileRegionInfo

interface IncludeInfo {
  cwd: string | null
  resolvedPath?: boolean
}

const REGIONS_RE = [
  /^\/\/ ?#?(?<tag>(?:end)?region) (?<name>[\w*-]+)$/u, // javascript, typescript, java
  /^\/\* ?#(?<tag>(?:end)?region) (?<name>[\w*-]+) ?\*\/$/u, // css, less, scss
  /^#pragma (?<tag>(?:end)?region) (?<name>[\w*-]+)$/u, // C, C++
  /^<!-- #?(?<tag>(?:end)?region) (?<name>[\w*-]+) -->$/u, // HTML, markdown
  /^#(?<tag>(?:End )Region) (?<name>[\w*-]+)$/u, // Visual Basic
  /^::#(?<tag>(?:end)region) (?<name>[\w*-]+)$/u, // Bat
  /^# ?(?<tag>(?:end)?region) (?<name>[\w*-]+)$/u, // C#, PHP, Powershell, Python, perl & misc
]

// regexp to match the import syntax
const INCLUDE_COMMENT_RE =
  /^(?<indent> *)<!-{2,}\s*@include:\s*(?<filePath>[^<>|:"*?]+(?:\.[a-z0-9]+))(?:#(?<region>[\w-]+))?(?:\{(?<lineStart>\d+)?-(?<lineEnd>\d+)?\})?\s*-{2,}>\s*$/gmu
const INCLUDE_RE =
  /^(?<indent> *)@include:\s*(?<filePath>[^<>|:"*?]+(?:\.[a-z0-9]+))(?:#(?<region>[\w-]+))?(?:\{(?<lineStart>\d+)?-(?<lineEnd>\d+)?\})?\s*$/gmu

// single-match (non-global) variants used inside the remark visitor
const INCLUDE_COMMENT_RE_SINGLE = new RegExp(INCLUDE_COMMENT_RE.source, 'mu')
const INCLUDE_RE_SINGLE = new RegExp(INCLUDE_RE.source, 'mu')

const NEWLINE_RE = /\r\n?|\n/gu
const SYNTAX_PUSH_RE = /^<!-- #include-env-start: (?<dir>[^)]*?) -->$/u
const HTML_LINK_RE = /(?:href|src)="(?<url>.*?)"/u

const testLine = (
  line: string,
  regexp: RegExp,
  regionName: string,
  end = false,
): boolean => {
  const [full, tag, name] = regexp.exec(line.trim()) ?? []

  return Boolean(
    full &&
    tag &&
    name === regionName &&
    tag.match(end ? /^[Ee]nd ?[rR]egion$/u : /^[rR]egion$/u),
  )
}

const findRegion = (
  lines: string[],
  regionName: string,
): { lineStart: number; lineEnd: number } | null => {
  let regexp: RegExp | null = null
  let lineStart = -1

  for (const [lineId, line] of lines.entries()) {
    if (regexp == null) {
      for (const reg of REGIONS_RE) {
        if (testLine(line, reg, regionName)) {
          lineStart = lineId + 1
          regexp = reg
          break
        }
      }
    } else if (testLine(line, regexp, regionName, true)) {
      return { lineStart, lineEnd: lineId }
    }
  }

  return null
}

export const handleInclude = async (
  info: ImportFileInfo,
  { cwd, resolvedPath }: IncludeInfo,
): Promise<string> => {
  const { filePath } = info
  let realPath = filePath

  if (!path.isAbsolute(filePath)) {
    // if the importPath is relative path, we need to resolve it
    // according to the markdown filePath
    if (!cwd) {
      logger.error(`Error when resolving path: ${filePath}`)

      return '\nError when resolving path\n'
    }

    realPath = path.resolve(cwd, filePath)
  }

  // check file existence
  if (!(await fs.pathExists(realPath))) {
    logger.error(`${realPath} not found`)

    return '\nFile not found\n'
  }

  // read file content
  const fileContent = await fs.readFile(realPath, 'utf-8')

  const lines = fileContent.replace(NEWLINE_RE, '\n').split('\n')
  let results: string[] = []

  // is region
  if ('region' in info) {
    const region = findRegion(lines, info.region)

    if (region) results = lines.slice(region.lineStart, region.lineEnd)
  }
  // is file
  else {
    const { lineStart, lineEnd } = info

    if (lineStart) {
      results = lines.slice(lineStart - 1, lineEnd)
    } else if (lines[0] === '---') {
      const endLineIndex = lines.findIndex(
        (line, index) => index !== 0 && line === '---',
      )

      results = lines.slice(Math.max(endLineIndex + 1, 1), lineEnd)
    } else {
      results = lines.slice(0, lineEnd)
    }
  }

  if (resolvedPath && realPath.endsWith('.md')) {
    const dirName = path.dirname(realPath)

    results.unshift(`<!-- #include-env-start: ${dirName} -->`)
    results.push('<!-- #include-env-end -->')
  }

  return dedent(results.join('\n').replace(/\n?$/u, '\n'))
}

const resolveInclude = async (
  cwd: string | null,
  [indent, includePath, region, lineStart, lineEnd]: string[],
  options: Required<MarkdownIncludePluginOptions>,
): Promise<string> => {
  const actualPath = options.resolvePath(includePath, cwd)
  const resolvedPath = options.resolveImagePath || options.resolveLinkPath
  let content = await handleInclude(
    {
      filePath: actualPath,
      ...(region
        ? { region }
        : {
            ...(lineStart ? { lineStart: Number(lineStart) } : {}),
            ...(lineEnd ? { lineEnd: Number(lineEnd) } : {}),
          }),
    },
    { cwd, resolvedPath },
  )

  if (options.deep && actualPath.endsWith('.md')) {
    // oxlint-disable-next-line no-use-before-define
    content = await replaceInclude(content, options, {
      cwd: path.isAbsolute(actualPath)
        ? path.dirname(actualPath)
        : cwd
          ? path.resolve(cwd, path.dirname(actualPath))
          : null,
    })
  }

  return content
    .split('\n')
    .map((line) => indent + line)
    .join('\n')
}

const replaceInclude = async (
  content: string,
  options: Required<MarkdownIncludePluginOptions>,
  { cwd }: IncludeInfo,
): Promise<string> => {
  const regex = options.useComment ? INCLUDE_COMMENT_RE : INCLUDE_RE
  const matches = [...content.matchAll(regex)]

  const replacements = await Promise.all(
    matches.map(async (match) => ({
      index: match.index,
      length: match[0].length,
      result: await resolveInclude(cwd, match.slice(1), options),
    })),
  )

  let result = ''
  let lastIndex = 0
  for (const { index, length, result: replacement } of replacements) {
    result += content.slice(lastIndex, index)
    result += replacement
    lastIndex = index + length
  }

  result += content.slice(lastIndex)

  return result
}

const convertLink = (filepath: string, base: string): string =>
  filepath.startsWith('.') ? path.relative(base, filepath) : filepath

const resolveLink = (
  tree: Root,
  cwd: string,
  resolveLinkPath: boolean,
  resolveImagePath: boolean,
): void => {
  const stack: string[] = []

  visit(tree, (node, index, parent) => {
    if (!parent || typeof index !== 'number') return

    if (node.type === 'html') {
      // include env start
      if (node.value.startsWith('<!-- #include-env-start: ')) {
        const matched = SYNTAX_PUSH_RE.exec(node.value)
        if (matched) stack.push(matched[1])
        node.value = ''
      }
      // include env end
      if (node.value === '<!-- #include-env-end -->') {
        stack.pop()
        node.value = ''
      }
    }

    const currentDir = stack[stack.length - 1]

    if (!currentDir) return

    const base = path.relative(cwd, currentDir)
    if (resolveLinkPath) {
      // markdown syntax: [link](path)
      if (node.type === 'link') node.url = convertLink(node.url, base)

      // html tag: <a href="path">
      if (node.type === 'html' && node.value.startsWith('<a ')) {
        node.value = node.value.replace(HTML_LINK_RE, (matched, link: string) =>
          matched.replace(link, convertLink(link, base)),
        )
      }
    }

    if (resolveImagePath) {
      // markdown syntax: ![alt](path)
      if (node.type === 'image') node.url = convertLink(node.url, base)

      // html tag: <img src="path">
      if (node.type === 'html' && node.value.startsWith('<img ')) {
        node.value = node.value.replace(HTML_LINK_RE, (matched, link: string) =>
          matched.replace(link, convertLink(link, base)),
        )
      }
    }
  })
}

/**
 * Remark plugin for include, which is based on markdown-it-include
 *
 * Remark 插件，用于包含其他文件内容，基于 markdown-it-include 实现
 *
 * E.g.:
 *
 * ```md
 * <!-- @include: path/to/file.md -->
 * ```
 *
 * @param cwd - The current working directory, used to resolve relative paths
 * @param options - The options for the plugin
 * @returns A remark plugin
 */
export const remarkInclude =
  (cwd: string, options: Required<MarkdownIncludePluginOptions>) =>
  () =>
  async (tree: Root): Promise<void> => {
    const tasks: {
      parent: { children: unknown[] }
      index: number
      matched: string[]
    }[] = []

    visit(tree, (node, index, parent) => {
      if (!parent || typeof index !== 'number') return

      let matched: string[] | null = null

      if (node.type === 'html' && options.useComment)
        matched = node.value.match(INCLUDE_COMMENT_RE_SINGLE)
      else if (node.type === 'text')
        matched = node.value.match(INCLUDE_RE_SINGLE)

      if (matched) tasks.push({ parent, index, matched })
    })

    // Resolve all includes in parallel
    const resolved = await Promise.all(
      tasks.reverse().map(async ({ parent, index, matched }) => ({
        parent,
        index,
        content: await resolveInclude(cwd, matched.slice(1), options),
      })),
    )

    // Apply replacements in reverse order
    for (const { parent, index, content } of resolved) {
      if (content !== (parent.children[index] as { value: string }).value) {
        const subTree = fromMarkdown(content)
        if (options.resolveLinkPath || options.resolveImagePath) {
          resolveLink(
            subTree,
            cwd,
            options.resolveLinkPath,
            options.resolveImagePath,
          )
        }
        parent.children.splice(index, 1, ...subTree.children)
      }
    }
  }
