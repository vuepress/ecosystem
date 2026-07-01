import type { Code, Root } from 'mdast'
import { visit } from 'unist-util-visit'
import type { ImportCodePluginOptions } from 'vuepress/markdown'
import { colors, fs, path } from 'vuepress/utils'

import { logger } from '../utils/logger.js'

interface ImportCodeInfo {
  importPath: string
  lineStart: number
  lineEnd?: number
  lang: string
  meta?: string
}

// regexp to match the import syntax
const SYNTAX_RE =
  /^@\[code(?:\{(?:(?:(?<lineStart>\d+)?-(?<lineEnd>\d+)?)|(?<lineSingle>\d+))\})?(?: (?<info>[^\]]+))?\]\((?<importPath>[^)]*)\)/u

const resolveImportCode = async (
  cwd: string,
  { importPath, lineStart, lineEnd, lang, meta }: ImportCodeInfo,
): Promise<Code> => {
  let importFilePath = importPath

  if (!path.isAbsolute(importPath)) importFilePath = path.join(cwd, importPath)

  // check file existence
  if (!(await fs.pathExists(importFilePath))) {
    logger.error(`Import file ${colors.magenta(importPath)} not found`)
    return { type: 'code', lang, meta, value: 'File Not Found' }
  }

  const fileContent = await fs.readFile(importFilePath, 'utf-8')

  return {
    type: 'code',
    lang,
    meta,
    value: fileContent
      .split('\n')
      .slice(lineStart ? lineStart - 1 : lineStart, lineEnd)
      .join('\n')
      .replace(/\n?$/u, '\n'),
  }
}

const parseLineNumber = (line: string | undefined): number | undefined =>
  line ? Math.trunc(Number(line)) : undefined

/**
 * Import code plugin for remark, convert syntax into actual content
 *
 * E.g.:
 *
 * - `@[code](filepath)`
 * - `@[code{lineStart-lineEnd} info}](filepath)`
 *
 * @param cwd - Current working directory to resolve import paths /
 *   用于解析导入路径的当前工作目录
 * @param handleImportPath - Optional function to handle import paths, e.g. for
 *   alias resolution / 可选的函数，用于处理导入路径，例如别名解析
 * @returns Unified plugin to transform import code syntax into actual code
 *   blocks in markdown AST / 将导入代码语法转换为 markdown AST 中实际代码块的 Unified 插件
 */
export const remarkImportCode =
  (
    cwd: string,
    {
      handleImportPath = (importPath): string => importPath,
    }: ImportCodePluginOptions,
  ) =>
  () =>
  async (tree: Root): Promise<void> => {
    const tasks: {
      parent: { children: unknown[] }
      index: number
      matched: RegExpExecArray
    }[] = []

    visit(tree, (node, index, parent) => {
      if (!parent || typeof index !== 'number') return

      if (node.type === 'text' && node.value.trim().startsWith('@[code')) {
        const content = node.value.trim()
        // @[code]()
        if (content.length <= 9) return

        const matched = SYNTAX_RE.exec(content)
        if (!matched?.groups) return

        tasks.push({ parent, index, matched })
      }
    })

    // Resolve all imports in parallel
    const resolved = await Promise.all(
      tasks.reverse().map(async ({ parent, index, matched }) => {
        const lineSingle = parseLineNumber(matched.groups!.lineSingle)
        const importPath = handleImportPath(matched.groups!.importPath)
        const info = matched.groups!.info || path.extname(importPath).slice(1)
        const lang = /^(?<lang>[^ :[{]+)/u.exec(info)?.groups?.lang || ''

        const options: ImportCodeInfo = {
          lineStart:
            lineSingle ?? parseLineNumber(matched.groups!.lineStart) ?? 0,
          lineEnd: lineSingle ?? parseLineNumber(matched.groups!.lineEnd),
          importPath,
          lang: lang.toLowerCase(),
          meta: info.slice(lang.length).trim(),
        }

        return {
          parent,
          index,
          code: await resolveImportCode(cwd, options),
        }
      }),
    )

    // Apply replacements in reverse order
    for (const { parent, index, code } of resolved)
      parent.children.splice(index, 1, code)
  }
