import type { App } from 'vuepress/core'
import type { Markdown, MarkdownEnv } from 'vuepress/markdown'
import { fs, isChildPath, logger, path, tinyglobby } from 'vuepress/utils'

import type { MarkdownCodeTreePluginOptions } from './options.js'
import { addPageDependency, renderCodeTree } from './renderCodeTree.js'
import { resolveAttrs, sanitizeFilePath } from './utils.js'

/**
 * File types that can not be displayed as code
 *
 * 无法作为代码展示的文件类型
 */
const UNSUPPORTED_FILE_TYPES = new Set([
  /* image */
  'avif',
  'bmp',
  'gif',
  'ico',
  'jpeg',
  'jpg',
  'png',
  'svg',
  'tiff',
  'webp',
  /* media */
  'aac',
  'avi',
  'flac',
  'flv',
  'm3u',
  'm3u8',
  'mkv',
  'mov',
  'mp3',
  'mp4',
  'ogg',
  'wav',
  'webm',
  /* font */
  'eot',
  'otf',
  'ttf',
  'woff',
  'woff2',
  /* document */
  'doc',
  'docx',
  'key',
  'numbers',
  'pages',
  'pdf',
  'ppt',
  'pptx',
  'xls',
  'xlsx',
  /* archive */
  '7z',
  'bz2',
  'gz',
  'rar',
  'tar',
  'zip',
])

/**
 * Paths that are ignored when reading a directory
 *
 * 读取目录时忽略的路径
 */
const IGNORED_FILES = [
  '**/node_modules/**',
  '**/.git/**',
  '**/.cache/**',
  '**/.temp/**',
  '**/.DS_Store',
  '**/.gitkeep',
]

/**
 * Size limit of a single file
 *
 * 单个文件的大小上限
 */
const MAX_FILE_SIZE = 128 * 1024

/**
 * Maximum number of bytes used to detect a binary file
 *
 * 检测二进制文件时使用的最大字节数
 */
const BINARY_CHECK_SIZE = 8192

/**
 * Maximum ratio of control characters in a text file
 *
 * 文本文件中控制字符的最大占比
 */
const MAX_CONTROL_CHAR_RATIO = 0.1

/**
 * Join a globbed relative path to its root directory
 *
 * A globbed path always uses `/` as the separator, while a `\` is a valid
 * character of a file name, so the path can not be joined by `path.join`.
 *
 * 将 glob 得到的相对路径拼接到根目录
 *
 * Glob 得到的路径始终以 `/` 作为分隔符，而 `\` 是合法的文件名字符，因此不能使用 `path.join` 进行拼接。
 *
 * @param root - Root directory / 根目录
 * @param file - Relative path / 相对路径
 * @returns Absolute path / 绝对路径
 */
const joinRoot = (root: string, file: string): string =>
  `${root}${path.sep}${file.split('/').join(path.sep)}`

/**
 * Whether a file can be displayed as code
 *
 * 文件是否可以作为代码展示
 *
 * @param file - File path / 文件路径
 * @returns Whether the file can be displayed / 文件是否可以展示
 */
const isSupportedFile = (file: string): boolean =>
  !UNSUPPORTED_FILE_TYPES.has(path.extname(file).slice(1).toLowerCase())

/**
 * Whether a content seems to be binary
 *
 * NUL bytes and a high ratio of control characters are strong indicators of a
 * binary file.
 *
 * 内容是否看起来是二进制
 *
 * NUL 字节与大量控制字符是二进制文件的明显特征。
 *
 * @param content - File content / 文件内容
 * @returns Whether the content is binary / 内容是否为二进制
 */
const isBinaryContent = (content: Buffer): boolean => {
  const sample = content.subarray(0, BINARY_CHECK_SIZE)

  if (sample.includes(0)) return true

  let controlChars = 0

  for (const byte of sample) {
    // Ignore tab, line feed and carriage return
    if (byte < 32 && byte !== 9 && byte !== 10 && byte !== 13) controlChars += 1
  }

  return controlChars / sample.length > MAX_CONTROL_CHAR_RATIO
}

/**
 * Read a file as code
 *
 * Binary files and oversized files are skipped.
 *
 * 将文件读取为代码
 *
 * 二进制文件与超出大小限制的文件会被跳过。
 *
 * @param filepath - Absolute path of the file / 文件的绝对路径
 * @returns File content, or `null` when the file can not be used / 文件内容，不可用时返回
 *   `null`
 */
const readAsCode = (filepath: string): string | null => {
  const stat = fs.statSync(filepath)

  if (stat.size > MAX_FILE_SIZE) {
    logger.warn(
      `code_tree_embed: ${filepath} is larger than ${MAX_FILE_SIZE} bytes, and is skipped`,
    )

    return null
  }

  const content = fs.readFileSync(filepath)

  if (isBinaryContent(content)) {
    logger.warn(
      `code_tree_embed: ${filepath} seems to be a binary file, and is skipped`,
    )

    return null
  }

  return content.toString('utf-8')
}

/**
 * Resolve the root directory of the embedded code tree
 *
 * An absolute path starts with `/`, which is resolved from the source
 * directory, otherwise it is resolved from the directory of the current page.
 *
 * 解析嵌入代码树的根目录
 *
 * 以 `/` 开头的绝对路径从源目录解析，否则从当前页面所在目录解析。
 *
 * @param app - VuePress app instance / VuePress 应用实例
 * @param env - Markdown env / Markdown 环境
 * @param dir - Directory of the code tree / 代码树的目录
 * @returns Absolute path of the directory, or `null` when it is invalid /
 *   目录的绝对路径，无效时返回 `null`
 */
const resolveRoot = (
  app: App,
  env: MarkdownEnv,
  dir: string,
): string | null => {
  if (dir === '') return null

  const source = app.dir.source()

  if (dir.startsWith('/')) return path.resolve(source, `.${dir}`)

  if (!env.filePath) return null

  return path.resolve(path.dirname(env.filePath), dir)
}

/**
 * Resolve the real path of a directory
 *
 * Symbolic links are resolved, so that a directory pointing outside of the
 * source directory can be detected.
 *
 * 解析目录的真实路径
 *
 * 会解析符号链接，从而可以检测到指向源目录之外的目录。
 *
 * @param app - VuePress app instance / VuePress 应用实例
 * @param root - Absolute path of the directory / 目录的绝对路径
 * @returns Real path of the directory, or `null` when the directory is not
 *   usable / 目录的真实路径，不可用时返回 `null`
 */
const resolveRealRoot = (app: App, root: string): string | null => {
  if (!fs.existsSync(root)) {
    logger.warn(`code_tree_embed: ${root} does not exist`)

    return null
  }

  if (!fs.statSync(root).isDirectory()) {
    logger.warn(`code_tree_embed: ${root} is not a directory`)

    return null
  }

  const realRoot = fs.realpathSync(root)

  if (!isChildPath(realRoot, fs.realpathSync(app.dir.source()))) {
    logger.warn(
      `code_tree_embed: ${root} is outside of the source directory, and is skipped`,
    )

    return null
  }

  return realRoot
}

/**
 * Wrap the content of a file with a code fence
 *
 * The fence is longer than the longest backtick run in the content, so that the
 * code block is not closed by the content itself.
 *
 * 将文件内容包裹为代码块
 *
 * 围栏长于内容中最长的反引号串，从而不会被内容本身提前闭合。
 *
 * @param file - File path / 文件路径
 * @param content - File content / 文件内容
 * @returns Code fence / 代码块
 */
const wrapWithFence = (file: string, content: string): string => {
  const longestRun = [...content.matchAll(/`+/gu)].reduce(
    (max, [match]) => Math.max(max, match.length),
    0,
  )
  const fence = '`'.repeat(Math.max(3, longestRun + 1))
  const extension = path
    .extname(file)
    .slice(1)
    .replaceAll(/[^\w+#-]/gu, '')

  return `${fence}${extension || 'text'} title="${file}"\n${content}\n${fence}`
}

/**
 * Whether a file is inside of a directory
 *
 * Symbolic links may point outside of the directory, so the real path is
 * resolved before the check.
 *
 * 文件是否位于目录中
 *
 * 符号链接可能指向目录之外，因此检查前会解析真实路径。
 *
 * @param file - Relative path of the file / 文件的相对路径
 * @param root - Real path of the directory / 目录的真实路径
 * @param source - Real path of the expected parent directory / 期望的父目录的真实路径
 * @returns Whether the file is inside / 文件是否位于其中
 */
const isInsideSource = (
  file: string,
  root: string,
  source: string,
): boolean => {
  try {
    return isChildPath(fs.realpathSync(joinRoot(root, file)), source)
  } catch {
    return false
  }
}

/**
 * Collect the code files inside a directory
 *
 * 收集目录中的代码文件
 *
 * @param root - Real path of the directory / 目录的真实路径
 * @param source - Real path of the source directory / 源目录的真实路径
 * @returns Relative paths of the code files / 代码文件的相对路径
 */
const collectCodeFiles = (root: string, source: string): string[] =>
  tinyglobby
    .globSync('**/*', {
      cwd: root,
      onlyFiles: true,
      dot: true,
      ignore: IGNORED_FILES,
    })
    .filter((file) => isSupportedFile(file))
    .filter((file) => isInsideSource(file, root, source))
    .sort()

/**
 * Embed a directory as a code tree
 *
 * Syntax: `@[code-tree title="..." height="..." entry="..."](dir_path)`
 *
 * 将目录嵌入为代码树
 *
 * 语法：`@[code-tree title="..." height="..." entry="..."](dir_path)`
 *
 * @example
 *   Embed a directory: `@[code-tree title="Vue App" height="400px"](src)`
 *
 * @param md - MarkdownIt instance / MarkdownIt 实例
 * @param app - VuePress app instance / VuePress 应用实例
 * @param options - Plugin options / 插件选项
 */
export const embedCodeTree = (
  md: Markdown,
  app: App,
  { height: defaultHeight = '320px' }: MarkdownCodeTreePluginOptions = {},
): void => {
  const NAME = 'code_tree_embed'
  const SYNTAX_PATTERN =
    /^@\[code-tree(?: (?<info>[^\]]*))?\]\((?<dir>[^)]*)\)$/u

  // `import_code` is registered before `fence` by vuepress, and it does not
  // match this syntax, so anchoring on `fence` is enough
  md.block.ruler.before(
    'fence',
    NAME,
    (state, startLine, _endLine, silent) => {
      const start = state.bMarks[startLine] + state.tShift[startLine]
      const max = state.eMarks[startLine]
      const line = state.src.slice(start, max)

      // Cheap check before the pattern, since this rule runs on every line
      if (!/^@\[code-tree(?:[ \]])/u.test(line)) return false

      const match = SYNTAX_PATTERN.exec(line.trim())

      if (!match) return false

      /* istanbul ignore if -- @preserve */
      if (silent) return true

      const token = state.push(NAME, '', 0)
      token.meta = {
        info: match.groups?.info?.trim() ?? '',
        dir: match.groups?.dir?.trim() ?? '',
      }
      token.map = [startLine, startLine + 1]

      state.line = startLine + 1

      return true
    },
    { alt: ['paragraph', 'reference', 'blockquote', 'list'] },
  )

  md.renderer.rules[NAME] = (
    tokens,
    index,
    _options,
    env: MarkdownEnv,
  ): string => {
    const { info, dir } = tokens[index].meta as { info: string; dir: string }

    if (dir === '') {
      logger.warn(`${NAME}: a directory is required`)

      return ''
    }

    const root = resolveRoot(app, env, dir)

    if (!root) {
      logger.warn(
        `${NAME}: "${dir}" can not be resolved, since the file path of the current page is unknown, use an absolute path instead`,
      )

      return ''
    }

    const realRoot = resolveRealRoot(app, root)

    if (!realRoot) return ''

    const files = collectCodeFiles(realRoot, fs.realpathSync(app.dir.source()))

    if (files.length === 0) {
      logger.warn(`${NAME}: no code file is found in ${dir}`)

      return ''
    }

    const contents = files
      .map((file) => {
        const filepath = joinRoot(realRoot, file)
        const content = readAsCode(filepath)

        if (content == null) return null

        addPageDependency(env, filepath)

        // The path is sanitized, as it is rendered as a plain title
        return { file: sanitizeFilePath(file), content }
      })
      .filter((item) => item != null)

    if (contents.length === 0) {
      logger.warn(`${NAME}: no code file is readable in ${dir}`)

      return ''
    }

    return renderCodeTree({
      title: resolveAttrs(info, 'title')?.trim() ?? '',
      height: resolveAttrs(info, 'height')?.trim() || defaultHeight,
      entry: resolveAttrs(info, 'entry')?.trim() ?? '',
      files: contents.map(({ file }) => file),
      // Render the code blocks with a fresh env, so that the embedded content
      // does not pollute the env of the current page
      content: md.render(
        contents
          .map(({ file, content }) => wrapWithFence(file, content))
          .join('\n\n'),
        {},
      ),
    })
  }
}
