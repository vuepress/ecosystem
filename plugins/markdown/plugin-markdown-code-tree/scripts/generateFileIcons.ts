/**
 * Generate the file icon table of the code tree plugin
 *
 * The table is derived from an icon source, so that it never has to be curated
 * by hand. Run it with:
 *
 * `pnpm --filter @vuepress/plugin-markdown-code-tree generate:icons`
 *
 * To replace the icon set, add another {@link IconSource} and point
 * {@link SOURCE} to it.
 *
 * 生成代码树插件的文件图标表
 *
 * 该表由图标数据源推导而来，因此永远不需要人工维护。运行方式：
 *
 * `pnpm --filter @vuepress/plugin-markdown-code-tree generate:icons`
 *
 * 如需更换图标集，新增一个 {@link IconSource}，并将 {@link SOURCE} 指向它即可。
 */

import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'

import { path } from 'vuepress/utils'

const __dirname = import.meta.dirname

// Anchor the resolution on the package itself, so that the dependencies are
// looked up from its own `node_modules`
const require = createRequire(path.join(__dirname, '../package.json'))

const OUTPUT_DIR = path.resolve(__dirname, '../src/node/fileIcons/generated')

/**
 * Line limit of a linted file, above which a lint exemption is needed
 *
 * 被 lint 检查的文件的行数限制，超出后需要添加 lint 豁免
 */
const MAX_LINES = 500

/**
 * Path of the `oxfmt` executable
 *
 * The command line interface is used instead of the Node API, because it also
 * reads the configuration file of the repository.
 *
 * `oxfmt` 可执行文件的路径
 *
 * 使用命令行接口而不是 Node API，因为它还会读取仓库的配置文件。
 */
const OXFMT_BIN = path.join(
  path.dirname(require.resolve('oxfmt/package.json')),
  'bin/oxfmt',
)

/**
 * Icon name of every file name, file extension and folder name
 *
 * 每个文件名、文件扩展名与文件夹名称对应的图标名称
 */
interface IconData {
  /**
   * Icon name of a file name, matched against the whole name of a file
   *
   * 文件名对应的图标名称，与文件的完整名称匹配
   */
  files: Record<string, string>
  /**
   * Icon name of a file extension, without the leading dot
   *
   * 文件扩展名对应的图标名称，不包含前导点
   */
  extensions: Record<string, string>
  /**
   * Icon name of a folder name
   *
   * 文件夹名称对应的图标名称
   */
  folders: Record<string, string>
  /**
   * Icon name used when nothing matches a file
   *
   * 没有匹配到文件时使用的图标名称
   */
  defaultFile: string
  /**
   * Icon name used when nothing matches a folder
   *
   * 没有匹配到文件夹时使用的图标名称
   */
  defaultFolder: string
}

/**
 * A source of file icons
 *
 * Any source works, as long as it provides the icon name of every file name,
 * file extension and folder name.
 *
 * 文件图标数据源
 *
 * 只要能够提供每个文件名、文件扩展名与文件夹名称对应的图标名称，任何数据源都可以。
 */
interface IconSource {
  /**
   * Name of the package of the source, installed as a dev dependency
   *
   * 数据源包的名称，作为开发依赖安装
   */
  name: string
  /**
   * Iconify collection that the icon names belong to
   *
   * 图标名称所属的 Iconify 图标集
   */
  collection: string
  /**
   * A file that the package exports, used to locate its directory
   *
   * A package that declares `exports` may not export its `package.json`, so an
   * exported file is used instead.
   *
   * 包导出的一个文件，用于定位其目录
   *
   * 声明了 `exports` 的包可能不导出其 `package.json`，因此改用导出的文件。
   */
  probe: string
  /**
   * Collect the icon data
   *
   * 收集图标数据
   */
  collect: () => Promise<IconData>
}

/**
 * Manifest of the icon set
 *
 * 图标集的 manifest
 */
interface Manifest {
  version: string
  fileNames: Record<string, string>
  fileExtensions: Record<string, string>
  folderNames: Record<string, string>
  languageIcons: Record<string, string>
}

/**
 * Bridge tables of the icon source
 *
 * 图标数据源的 bridge 表
 */
interface IconBridges {
  EXTENSION_LANGUAGE_BRIDGE: Record<string, string>
  FILENAME_LANGUAGE_BRIDGE: Record<string, string>
}

/**
 * Runtime API of the icon source
 *
 * 图标数据源的运行时 API
 */
interface IconApi {
  getIconForFile: (fileName: string) => string | undefined
  getIconForFolder: (folderName: string) => string
  DEFAULT_FILE: string
  DEFAULT_FOLDER: string
}

/**
 * Resolve the directory of a package from an exported probe file
 *
 * 通过导出的探针文件解析包的目录
 *
 * @param probe - Exported file of the package / 包导出的文件
 * @returns Directory of the package / 包的目录
 */
const resolvePackageDir = (probe: string): string =>
  path.dirname(path.dirname(require.resolve(probe)))

/**
 * Read a JSON file
 *
 * @param file - Absolute path of the file / 文件的绝对路径
 * @returns Parsed content / 解析后的内容
 */
const readJson = (file: string): unknown =>
  JSON.parse(fs.readFileSync(file, 'utf-8')) as unknown

/**
 * The icon source based on `@yutengjing/vscode-icons`
 *
 * It ships the flattened manifest of the `vscode-icons` extension, whose values
 * are SVG names that map to the `vscode-icons` Iconify collection.
 *
 * Its manifest intentionally omits single segment extensions, such as `ts` and
 * `md`, because a real VS Code installation resolves those with the language
 * contributions bundled with VS Code, so the bridge tables of the package are
 * needed on top of the manifest.
 *
 * 基于 `@yutengjing/vscode-icons` 的数据源
 *
 * 它提供了 vscode-icons 扩展打平后的 manifest，其值是 SVG 名称，可映射到 `vscode-icons` Iconify 图标集。
 *
 * 它的 manifest 有意省略了 `ts`、`md` 这类单段扩展名，因为真实 VS Code 会用随附的语言 贡献来解析它们，因此还需要该包的
 * bridge 表。
 */
const vscodeIconsSource: IconSource = {
  name: '@yutengjing/vscode-icons',
  collection: 'vscode-icons',
  probe: '@yutengjing/vscode-icons/assets/manifest.json',

  collect: async () => {
    const dir = resolvePackageDir(vscodeIconsSource.probe)
    const distDir = path.join(dir, 'dist')
    const bridgeFile = path.join(distDir, 'extension-language-bridge.js')

    if (!fs.existsSync(bridgeFile)) {
      throw new Error(
        `${bridgeFile} does not exist, the layout of ${vscodeIconsSource.name} has changed`,
      )
    }

    const { collection } = vscodeIconsSource
    const toIconifyName = (svg: string): string =>
      `${collection}:${path.basename(svg, '.svg').replaceAll('_', '-')}`

    const manifest = readJson(
      path.join(dir, 'assets/manifest.json'),
    ) as Manifest
    const bridge = (await import(pathToFileURL(bridgeFile).href)) as IconBridges
    const { getIconForFile, getIconForFolder, DEFAULT_FILE, DEFAULT_FOLDER } =
      (await import(
        pathToFileURL(path.join(distDir, 'index.js')).href
      )) as IconApi

    /**
     * Resolve the icon of every key
     *
     * @param keys - Keys to resolve / 要解析的键
     * @param resolve - Resolver of a key / 键的解析函数
     * @returns Key to icon name mapping / 键到图标名称的映射
     */
    const collect = (
      keys: string[],
      resolve: (key: string) => string | undefined,
    ): Record<string, string> => {
      const result: Record<string, string> = {}

      for (const key of [...new Set(keys)].sort()) {
        const svg = resolve(key)

        if (svg) result[key] = toIconifyName(svg)
      }

      return result
    }

    return {
      files: collect(
        [
          ...Object.keys(manifest.fileNames),
          ...Object.keys(bridge.FILENAME_LANGUAGE_BRIDGE),
        ],
        (key) => getIconForFile(key),
      ),
      // An extension is resolved by probing the source with a file name, so that
      // the extension handling of the source is reused
      extensions: collect(
        [
          ...Object.keys(manifest.fileExtensions),
          ...Object.keys(bridge.EXTENSION_LANGUAGE_BRIDGE),
        ],
        (key) => getIconForFile(`file.${key}`),
      ),
      folders: collect(Object.keys(manifest.folderNames), (key) =>
        getIconForFolder(key),
      ),
      defaultFile: toIconifyName(DEFAULT_FILE),
      defaultFolder: toIconifyName(DEFAULT_FOLDER),
    }
  },
}

const SOURCE = vscodeIconsSource

/**
 * The icons that exist in the Iconify collection of the source
 *
 * The generated names are rendered by an iconify component, and a name that
 * does not exist renders as nothing, so the invalid ones have to be dropped.
 *
 * 数据源的 Iconify 图标集中存在的图标
 *
 * 生成的名称会由 iconify 组件渲染，不存在的名称会渲染为空白，因此必须丢弃无效的名称。
 */
const validIcons = ((): Set<string> => {
  const { icons, aliases } = readJson(
    require.resolve(`@iconify-json/${SOURCE.collection}/icons.json`),
  ) as { icons: Record<string, unknown>; aliases?: Record<string, unknown> }

  return new Set([...Object.keys(icons), ...Object.keys(aliases ?? {})])
})()

const dropped: string[] = []

/**
 * Group the icon names by the keys that use them
 *
 * A reverse index is used instead of a plain map, since an icon name is shared
 * by many keys, which makes the generated table about half the size.
 *
 * 按使用图标名称的键对其进行分组
 *
 * 使用反查索引而不是普通的映射，因为一个图标名称会被许多键共用，这能让生成表缩小约一半。
 *
 * @param entries - Key to icon name mapping / 键到图标名称的映射
 * @returns Icon name to keys mapping / 图标名称到键的映射
 */
const groupByIcon = (
  entries: Record<string, string>,
): Record<string, string[]> => {
  const result: Record<string, string[]> = {}

  for (const key of Object.keys(entries).sort()) {
    const icon = entries[key]

    if (!validIcons.has(icon.split(':')[1])) {
      dropped.push(`${key} -> ${icon}`)

      continue
    }

    ;(result[icon] ??= []).push(key)
  }

  return result
}

/**
 * Quote a string as a single quoted literal
 *
 * @param value - Raw value / 原始值
 * @returns Quoted literal / 引号包裹的字面量
 */
const quote = (value: string): string =>
  `'${value.replaceAll('\\', String.raw`\\`).replaceAll("'", String.raw`\'`)}'`

/**
 * Render the header of a generated file
 *
 * The source is written after a label, so that its leading `@` is not parsed as
 * a JSDoc tag.
 *
 * @param description - Description of the file / 文件的描述
 * @param source - Name and version of the source / 数据源的名称与版本
 * @returns File header / 文件头
 */
const renderHeader = (description: string, source: string): string => `/**
 * ${description}
 *
 * Generated by \`scripts/generateFileIcons.ts\`, do not edit
 *
 * Source: ${source}
 *
 * ${description}
 *
 * 由 \`scripts/generateFileIcons.ts\` 生成，请勿手动编辑
 *
 * 数据源：${source}
 */
`

/**
 * Render a reverse index as a module
 *
 * @param name - Name of the export / 导出名
 * @param index - Reverse index / 反查索引
 * @param header - File header / 文件头
 * @returns Module content / 模块内容
 */
const renderIndex = (
  name: string,
  index: Record<string, string[]>,
  header: string,
): string => {
  const entries = Object.keys(index)
    .sort()
    .map(
      (icon) =>
        `  ${quote(icon)}: [\n${index[icon]
          .map((key) => `    ${quote(key)},`)
          .join('\n')}\n  ],`,
    )
    .join('\n')

  return `${header}\nimport type { IconIndex } from '../types.js'

export const ${name}: IconIndex = {
${entries}
}
`
}

/**
 * Format the generated files with `oxfmt`
 *
 * @param files - Absolute paths of the files / 文件的绝对路径
 */
const formatFiles = (files: string[]): void => {
  execFileSync(process.execPath, [OXFMT_BIN, ...files], { stdio: 'inherit' })
}

/**
 * Add a lint exemption to the files that exceed the line limit
 *
 * The exemption is added only when it is needed, otherwise oxlint reports an
 * unused directive.
 *
 * @param files - Absolute paths of the files / 文件的绝对路径
 */
const addLineExemption = (files: string[]): void => {
  const large = files.filter(
    (file) => fs.readFileSync(file, 'utf-8').split('\n').length > MAX_LINES,
  )

  if (large.length === 0) return

  for (const file of large) {
    fs.writeFileSync(
      file,
      `/* oxlint-disable max-lines */\n${fs.readFileSync(file, 'utf-8')}`,
    )
  }

  formatFiles(large)
}

/**
 * Count the keys of a reverse index
 *
 * @param index - Reverse index / 反查索引
 * @returns Number of keys / 键的数量
 */
const countKeys = (index: Record<string, string[]>): number =>
  Object.values(index).reduce((sum, keys) => sum + keys.length, 0)

const main = async (): Promise<void> => {
  const { version } = readJson(
    path.join(resolvePackageDir(SOURCE.probe), 'package.json'),
  ) as { version: string }
  const source = `${SOURCE.name}@${version}`
  const data = await SOURCE.collect()

  const files = groupByIcon(data.files)
  const extensions = groupByIcon(data.extensions)
  const folders = groupByIcon(data.folders)

  const outputs = {
    'defaults.ts': `${renderHeader('Default icons', source)}
export const defaultFile = ${quote(data.defaultFile)}

export const defaultFolder = ${quote(data.defaultFolder)}
`,
    'files.ts': renderIndex(
      'files',
      files,
      renderHeader('Icons of file names', source),
    ),
    'extensions.ts': renderIndex(
      'extensions',
      extensions,
      renderHeader('Icons of file extensions', source),
    ),
    'folders.ts': renderIndex(
      'folders',
      folders,
      renderHeader('Icons of folder names', source),
    ),
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  const paths = Object.keys(outputs).map((name) => {
    const file = path.join(OUTPUT_DIR, name)

    fs.writeFileSync(file, outputs[name as keyof typeof outputs])

    return file
  })

  formatFiles(paths)
  addLineExemption(paths)

  console.log(`source:     ${source}`)
  console.log(
    `entries:    ${countKeys(files)} files, ${countKeys(extensions)} extensions, ${countKeys(folders)} folders`,
  )
  console.log(
    `icons:      ${Object.keys(files).length + Object.keys(extensions).length + Object.keys(folders).length} references`,
  )
  console.log(`defaults:   ${data.defaultFile}, ${data.defaultFolder}`)

  if (dropped.length) {
    console.warn(
      `dropped ${dropped.length} name(s) missing from ${SOURCE.collection}:\n  ${dropped.join('\n  ')}`,
    )
  }
}

await main()
