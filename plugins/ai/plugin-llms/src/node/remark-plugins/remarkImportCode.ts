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
  /^@\[code(?:{(?:(?:(?<lineStart>\d+)?-(?<lineEnd>\d+)?)|(?<lineSingle>\d+))})?(?: (?<info>[^\]]+))?\]\((?<importPath>[^)]*)\)/

const resolveImportCode = (
  cwd: string,
  { importPath, lineStart, lineEnd, lang, meta }: ImportCodeInfo,
): Code => {
  let importFilePath = importPath

  if (!path.isAbsolute(importPath)) {
    importFilePath = path.join(cwd, importPath)
  }

  // check file existence
  if (!fs.existsSync(importFilePath)) {
    logger.error(`Import file ${colors.magenta(importPath)} not found`)
    return { type: 'code', lang, meta, value: 'File Not Found' }
  }

  const fileContent = fs.readFileSync(importFilePath).toString()

  return {
    type: 'code',
    lang,
    meta,
    value: fileContent
      .split('\n')
      .slice(lineStart ? lineStart - 1 : lineStart, lineEnd)
      .join('\n')
      .replace(/\n?$/, '\n'),
  }
}

const parseLineNumber = (line: string | undefined): number | undefined =>
  line ? Number.parseInt(line, 10) : undefined

/**
 * import code plugin for remark, convert syntax into actual content
 *
 * `@[code](filepath)`
 *
 * `@[code{lineStart-lineEnd} info}](filepath)`
 */
export const remarkImportCode = (
  cwd: string,
  { handleImportPath = (str) => str }: ImportCodePluginOptions,
) => {
  return () =>
    (tree: Root): void => {
      visit(tree, (node, index, parent) => {
        if (!parent || typeof index !== 'number') return

        if (node.type === 'text' && node.value.trim().startsWith('@[code')) {
          const content = node.value.trim()
          // @[code]()
          if (content.length <= 9) return

          const matched = content.match(SYNTAX_RE)
          if (!matched?.groups) return

          const lineSingle = parseLineNumber(matched.groups.lineSingle)
          const importPath = handleImportPath(matched.groups.importPath)
          const info = matched.groups.info || path.extname(importPath).slice(1)
          const lang = info.match(/^([^ :[{]+)/)?.[1] || ''

          const options: ImportCodeInfo = {
            lineStart:
              lineSingle ?? parseLineNumber(matched.groups.lineStart) ?? 0,
            lineEnd: lineSingle ?? parseLineNumber(matched.groups.lineEnd),
            importPath,
            lang: lang.toLowerCase(),
            meta: info.slice(lang.length).trim(),
          }

          parent.children.splice(index, 1, resolveImportCode(cwd, options))
        }
      })
    }
}
