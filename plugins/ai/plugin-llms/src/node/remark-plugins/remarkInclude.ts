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
  /^\/\/ ?#?((?:end)?region) ([\w*-]+)$/, // javascript, typescript, java
  /^\/\* ?#((?:end)?region) ([\w*-]+) ?\*\/$/, // css, less, scss
  /^#pragma ((?:end)?region) ([\w*-]+)$/, // C, C++
  /^<!-- #?((?:end)?region) ([\w*-]+) -->$/, // HTML, markdown
  /^#((?:End )Region) ([\w*-]+)$/, // Visual Basic
  /^::#((?:end)region) ([\w*-]+)$/, // Bat
  /^# ?((?:end)?region) ([\w*-]+)$/, // C#, PHP, Powershell, Python, perl & misc
]

// regexp to match the import syntax
const INCLUDE_COMMENT_RE =
  /^( *)<!-{2,}\s*@include:\s*([^<>|:"*?]+(?:\.[a-z0-9]+))(?:#([\w-]+))?(?:\{(\d+)?-(\d+)?\})?\s*-{2,}>\s*$/gm
const INCLUDE_RE =
  /^( *)@include:\s*([^<>|:"*?]+(?:\.[a-z0-9]+))(?:#([\w-]+))?(?:\{(\d+)?-(\d+)?\})?\s*$/gm

const NEWLINE_RE = /\r\n?|\n/g
const SYNTAX_PUSH_RE = /^<!-- #include-env-start: ([^)]*?) -->$/
const HTML_LINK_RE = /(?:href|src)="(.*?)"/

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
    tag.match(end ? /^[Ee]nd ?[rR]egion$/ : /^[rR]egion$/),
  )
}

const findRegion = (
  lines: string[],
  regionName: string,
): { lineStart: number; lineEnd: number } | null => {
  let regexp: RegExp | null = null
  let lineStart = -1

  for (const [lineId, line] of lines.entries())
    if (regexp === null) {
      for (const reg of REGIONS_RE)
        if (testLine(line, reg, regionName)) {
          lineStart = lineId + 1
          regexp = reg
          break
        }
    } else if (testLine(line, regexp, regionName, true)) {
      return { lineStart, lineEnd: lineId }
    }

  return null
}

export const handleInclude = (
  info: ImportFileInfo,
  { cwd, resolvedPath }: IncludeInfo,
): string => {
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
  if (!fs.existsSync(realPath)) {
    logger.error(`${realPath} not found`)

    return '\nFile not found\n'
  }

  // read file content
  const fileContent = fs.readFileSync(realPath).toString()

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

  return dedent(results.join('\n').replace(/\n?$/, '\n'))
}

const resolveInclude = (
  cwd: string | null,
  [indent, includePath, region, lineStart, lineEnd]: string[],
  options: Required<MarkdownIncludePluginOptions>,
): string => {
  const actualPath = options.resolvePath(includePath, cwd)
  const resolvedPath = options.resolveImagePath || options.resolveLinkPath
  let content = handleInclude(
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
    content = replaceInclude(content, options, {
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

const replaceInclude = (
  content: string,
  options: Required<MarkdownIncludePluginOptions>,
  { cwd }: IncludeInfo,
): string =>
  content.replace(
    options.useComment ? INCLUDE_COMMENT_RE : INCLUDE_RE,
    (_, ...args: string[]) => resolveInclude(cwd, args, options),
  )

const convertLink = (filepath: string, base: string): string => {
  if (filepath.startsWith('.')) {
    path.relative(base, filepath)
  }
  return filepath
}

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
        const matched = node.value.match(SYNTAX_PUSH_RE)
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
      if (node.type === 'link') {
        node.url = convertLink(node.url, base)
      }

      // html tag: <a href="path">
      if (node.type === 'html' && node.value.startsWith('<a ')) {
        node.value = node.value.replace(HTML_LINK_RE, (m, link: string) =>
          m.replace(link, convertLink(link, base)),
        )
      }
    }

    if (resolveImagePath) {
      // markdown syntax: ![alt](path)
      if (node.type === 'image') {
        node.url = convertLink(node.url, base)
      }

      // html tag: <img src="path">
      if (node.type === 'html' && node.value.startsWith('<img ')) {
        node.value = node.value.replace(HTML_LINK_RE, (m, link: string) =>
          m.replace(link, convertLink(link, base)),
        )
      }
    }
  })
}

/**
 * Remark plugin for include, which is based on markdown-it-include
 *
 *
 * ```markdown
 * <!-- \@include: path/to/file.md -->
 * ```
 */
export const remarkInclude =
  (cwd: string, options: Required<MarkdownIncludePluginOptions>) =>
  () =>
  (tree: Root): void => {
    visit(tree, (node, index, parent) => {
      if (!parent || typeof index !== 'number') return

      let matched: string[] | null = null

      if (node.type === 'html' && options.useComment)
        matched = node.value.match(new RegExp(INCLUDE_COMMENT_RE.source))
      else if (node.type === 'text')
        matched = node.value.match(new RegExp(INCLUDE_RE.source))

      if (!matched) return

      const content = resolveInclude(cwd, matched.slice(1), options)

      if (content !== (node as { value: string }).value) {
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
    })
  }
