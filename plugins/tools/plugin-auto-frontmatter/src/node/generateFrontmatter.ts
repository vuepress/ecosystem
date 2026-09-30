import { isDeepStrictEqual } from 'node:util'

import matter from 'gray-matter'
import { dump } from 'js-yaml'
import pMap from 'p-map'
import { fs, hash as getHash, path } from 'vuepress/utils'

import { createFilter } from './createFilter.js'
import {
  isPermalinkHandle,
  resetShortPermalinkRegistry,
} from './helper/addPermalink.js'
import type { PermalinkHandle } from './helper/addPermalink.js'
import type {
  AutoFrontmatterContext,
  AutoFrontmatterData,
  AutoFrontmatterHandle,
  AutoFrontmatterRule,
} from './types.js'
import { logger } from './utils.js'

/**
 * Get markdown info
 *
 * @param relativePath - Relative path of the markdown file / Markdown 文件的相对路径
 * @param cwd - Current working directory / 当前工作目录
 * @returns Markdown info including frontmatter data and content / 包含
 *   frontmatter 数据和内容的 Markdown 信息
 */
const getMarkdownInfo = async (
  relativePath: string,
  cwd: string,
): Promise<{
  data: AutoFrontmatterData
  matter: string
  content: string
  context: AutoFrontmatterContext
}> => {
  const filepath = path.join(cwd, relativePath)
  const raw = await fs.promises.readFile(filepath, 'utf-8')
  /*
   * `gray-matter` caches the parsed result by the body content and returns the
   * same `data` object for files sharing the same body. As the plugin mutates
   * `data` in place, the cache would leak the generated frontmatter between
   * files. Passing an options object opts out of the cache.
   */
  const { data, content, matter: matterText } = matter(raw, {})
  return {
    data,
    matter: matterText,
    content,
    context: {
      filepath,
      relativePath,
      content,
    },
  }
}

/**
 * Get the key of a top level mapping entry
 *
 * 获取顶层映射条目的键
 *
 * The line is parsed by hand instead of with a regular expression: a pattern
 * like `/^(?![#\s])(?<key>[^:]+?)\s*:(?:\s|$)/u` is ambiguous, because both
 * `[^:]+?` and `\s*` can match whitespace, so a line made of many tabs and no
 * colon makes the engine backtrack over every split point (quadratic time).
 *
 * 该行通过手工解析而非正则表达式：像 `/^(?![#\s])(?<key>[^:]+?)\s*:(?:\s|$)/u` 这样的模式存在歧义，因为
 * `[^:]+?` 与 `\s*` 都能匹配空白，所以一行由大量制表符组成且不含冒号时，引擎会在每个切分点回溯（平方级耗时）。
 *
 * @param line - Line of the frontmatter / frontmatter 的行
 * @returns The key of the entry, `null` when the line is not a top level entry
 *   / 条目的键，该行不是顶层条目时为 `null`
 */
const getTopLevelKey = (line: string): string | null => {
  // indented lines are continuations of the previous entry
  if (/^\s/u.test(line)) return null

  const index = line.indexOf(':')

  if (index <= 0) return null

  const key = line.slice(0, index).trimEnd()

  if (key === '') return null

  const rest = line.slice(index + 1)

  // `key: value` or `key:`
  return rest === '' || /^\s/u.test(rest) ? key : null
}

interface FrontmatterBlock {
  /** Comment lines that document the entry */
  comments: string[]
  /** Key of the entry, `null` for lines that belong to no entry */
  key: string | null
  /** Lines of the entry */
  lines: string[]
  /** Whether the block holds the comments at the end of the frontmatter */
  trailing?: boolean
}

/**
 * Group the lines of a frontmatter into blocks, one per top level entry
 *
 * 将 frontmatter 的行按顶层条目分组
 *
 * A comment is attached to the entry that follows it, so that rewriting an
 * entry never drops the comment that documents it.
 *
 * 注释会附加到其后的条目上，因此重写条目时不会丢失描述它的注释。
 *
 * @param lines - Lines of the frontmatter / frontmatter 的行
 * @returns Blocks of the frontmatter / frontmatter 的分组
 */
const groupFrontmatterBlocks = (lines: string[]): FrontmatterBlock[] => {
  const blocks: FrontmatterBlock[] = []
  let pendingComments: string[] = []

  for (const line of lines) {
    if (line.startsWith('#')) {
      pendingComments.push(line)
      continue
    }

    const key = getTopLevelKey(line)

    if (key == null && blocks.length > 0) {
      // a continuation line of the previous entry
      blocks.at(-1)!.lines.push(...pendingComments, line)
      pendingComments = []
      continue
    }

    blocks.push({ comments: pendingComments, key, lines: [line] })
    pendingComments = []
  }

  // trailing comments
  if (pendingComments.length > 0) {
    blocks.push({
      comments: [],
      key: null,
      lines: pendingComments,
      trailing: true,
    })
  }

  return blocks
}

const getEol = (value: string): string =>
  value.includes('\r\n') ? '\r\n' : '\n'

/**
 * Clone frontmatter data, so changes made by the handler can be detected
 *
 * 克隆 frontmatter 数据，以便检测处理器做出的修改
 *
 * @param data - Frontmatter data / frontmatter 数据
 * @returns Cloned frontmatter data / 克隆后的 frontmatter 数据
 */
const cloneData = (data: AutoFrontmatterData): AutoFrontmatterData => {
  try {
    return structuredClone(data)
  } catch {
    // values that cannot be cloned by `structuredClone`
    return { ...data }
  }
}

/**
 * Patch the frontmatter of a file, keeping the untouched entries (including
 * their comments, order and formatting) as they are
 *
 * 修补文件的 frontmatter，未变更的条目（包括其注释、顺序与格式）保持原样
 *
 * Falls back to dumping the whole frontmatter when the patch cannot be verified
 * to be equivalent to the handled data.
 *
 * 当无法验证修补结果与处理后的数据等价时，回退为整体重新生成 frontmatter。
 *
 * @param matterText - Raw frontmatter text without delimiters / 不含分隔符的原始
 *   frontmatter 文本
 * @param before - Frontmatter data before handling / 处理前的 frontmatter 数据
 * @param result - Frontmatter data after handling / 处理后的 frontmatter 数据
 * @returns New frontmatter text without delimiters / 不含分隔符的新 frontmatter 文本
 */
export const patchFrontmatter = (
  matterText: string,
  before: AutoFrontmatterData,
  result: AutoFrontmatterData,
): string => {
  if (Object.keys(result).length === 0) return ''

  const eol = getEol(matterText)
  // `matter` keeps the `\r` of the CRLF right before the closing delimiter
  const lines = matterText.replace(/\r$/u, '').split(/\r?\n/u)

  if (lines[0] === '') lines.shift()

  const blocks = groupFrontmatterBlocks(lines)
  const keys = new Set(Object.keys(result))
  const handled = new Set<string>()
  const output: string[] = []
  const trailing: string[] = []

  for (const block of blocks) {
    if (block.key == null) {
      // the comments at the end stay at the end, after the new entries
      const target = block.trailing ? trailing : output

      target.push(...block.comments, ...block.lines)
      continue
    }

    // entries removed by the handler are dropped, but their comments are kept
    if (!keys.has(block.key)) {
      output.push(...block.comments)
      continue
    }

    handled.add(block.key)

    const current = dump({ [block.key]: result[block.key] }).trimEnd()
    const previous = dump({ [block.key]: before[block.key] }).trimEnd()

    // only rewrite the entries that actually changed, keeping their comments
    output.push(
      ...block.comments,
      ...(current === previous ? block.lines : current.split('\n')),
    )
  }

  for (const key of keys) {
    if (!handled.has(key)) {
      output.push(
        ...dump({ [key]: result[key] })
          .trimEnd()
          .split('\n'),
      )
    }
  }

  output.push(...trailing)

  const patched = output.join(eol)

  try {
    /*
     * Verify with the same parser that produced `result`. `js-yaml` v5 does not
     * resolve timestamps (js-yaml v4 removed the type from the default schema),
     * while the `js-yaml` v3 used by `gray-matter` parses `date: 2020-01-01` into
     * a `Date`, so comparing against `load(patched)` would reject every
     * frontmatter containing an unquoted date and lose their comments.
     */
    const parsed = matter(`---${eol}${patched}${eol}---${eol}`, {}).data

    if (isDeepStrictEqual(parsed, result)) return patched
  } catch {
    // ignore, use the fallback below
  }

  return dump(result).trimEnd().split('\n').join(eol)
}

/**
 * Find rule by filepath, Only return the first
 *
 * @param rules - List of auto frontmatter rules / 自动 frontmatter 规则列表
 * @param filepath - File path to find rule for / 要查找规则的文件路径
 * @returns The first matched rule / 第一个匹配的规则
 */
export const findRule = (
  rules: AutoFrontmatterRule[],
  filepath: string,
): AutoFrontmatterRule | undefined => {
  const rule = rules.find(({ filter }) => createFilter(filter)(filepath))
  return rule
}

/**
 * Generate frontmatter for a single Markdown file
 *
 * @param filepath - File path of the Markdown file / Markdown 文件的路径
 * @param cwd - Current working directory / 当前工作目录
 * @param handle - Function to handle frontmatter data and context / 处理
 *   frontmatter 数据和上下文的函数
 */
export const generateFileFrontmatter = async (
  filepath: string,
  cwd: string,
  handle: AutoFrontmatterHandle,
): Promise<void> => {
  try {
    const {
      data,
      matter: matterText,
      content,
      context,
    } = await getMarkdownInfo(filepath, cwd)
    // the handler mutates `data` in place, keep a copy to know what changed
    const before = cloneData(data)
    const beforeHash = getHash(data)
    const result = await handle(data, context)
    const afterHash = getHash(result)

    // data not changed, skip writing
    if (beforeHash === afterHash) return

    const formatted = patchFrontmatter(matterText, before, result)
    const eol = getEol(matterText)

    await fs.promises.writeFile(
      context.filepath,
      formatted ? `---${eol}${formatted}${eol}---${eol}${content}` : content,
      'utf-8',
    )
  } catch (err) {
    logger.error(`Failed to generate frontmatter for ${filepath}`, err)
  }
}

/**
 * Reserve the permalinks that are already written in the frontmatter, so that
 * generated permalinks never conflict with them
 *
 * 保留 frontmatter 中已存在的永久链接，使生成的永久链接不会与其冲突
 *
 * @param fileList - List of Markdown file paths / Markdown 文件路径列表
 * @param cwd - Current working directory / 当前工作目录
 * @param rules - List of auto frontmatter rules / 自动 frontmatter 规则列表
 */
const reservePermalinks = async (
  fileList: string[],
  cwd: string,
  rules: AutoFrontmatterRule[],
): Promise<void> => {
  const handles = new Set<PermalinkHandle>()

  for (const { handle } of rules)
    if (isPermalinkHandle(handle)) handles.add(handle)

  // no handler needs the registry, skip reading every file again
  if (handles.size === 0) return

  const permalinks: string[] = []

  await pMap(
    fileList,
    async (relativePath) => {
      try {
        const { data } = await getMarkdownInfo(relativePath, cwd)

        if (typeof data.permalink === 'string' && data.permalink !== '')
          permalinks.push(data.permalink)
      } catch (err) {
        logger.error(`Failed to read the permalink of ${relativePath}`, err)
      }
    },
    { concurrency: 64 },
  )

  for (const handle of handles) handle.reserve(permalinks)
}

type Task = readonly [string, AutoFrontmatterHandle]

/**
 * Generate frontmatter for all Markdown files
 *
 * @param fileList - List of Markdown file paths / Markdown 文件路径列表
 * @param cwd - Current working directory / 当前工作目录
 * @param rules - List of auto frontmatter rules / 自动 frontmatter 规则列表
 */
export const generateFileListFrontmatter = async (
  fileList: string[],
  cwd: string,
  rules: AutoFrontmatterRule[],
): Promise<void> => {
  // start every run with an empty permalink registry
  resetShortPermalinkRegistry()

  const tasks: Task[] = []

  for (const filepath of fileList) {
    const rule = findRule(rules, filepath)
    if (rule) tasks.push([filepath, rule.handle])
  }

  if (tasks.length === 0) return

  await reservePermalinks(fileList, cwd, rules)

  // Limit the number of concurrent tasks
  await pMap(
    tasks,
    ([filepath, handle]) => generateFileFrontmatter(filepath, cwd, handle),
    { concurrency: 64 },
  )
}
