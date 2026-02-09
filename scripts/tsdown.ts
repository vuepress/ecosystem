import type { UserConfig } from 'tsdown'
import { defineConfig } from 'tsdown'

const isProduction = process.env.NODE_ENV === 'production'

/**
 * File information
 *
 * 文件信息
 */
export interface FileInfo {
  /**
   * Base directory
   *
   * 基础目录
   */
  base: string

  /**
   * Files to bundle
   *
   * 待打包的文件
   */
  files: string[]

  /**
   * Target directory
   *
   * 目标目录
   */
  target?: string
}

/**
 * Tsdown options
 *
 * Tsdown 选项
 */
export interface TsdownOptions {
  /**
   * Platform
   *
   * 平台
   */
  platform?: UserConfig['platform']

  /**
   * Whether to generate dts files
   *
   * 是否生成 dts 文件
   *
   * @default !browser
   */
  dts?: boolean

  /**
   * Alias options
   *
   * 别名选项
   */
  alias?: Record<string, string>

  /**
   * Whether to tree shake
   *
   * 是否进行树摇
   *
   * @default true
   */
  treeshake?: UserConfig['treeshake']

  /**
   * Inline options
   *
   * 内联选项
   *
   * @default browser ? false : undefined
   */
  inlineOnly?: (string | RegExp)[] | false

  /**
   * Packages not to treat as external
   *
   * 不作为外部处理的包
   */
  noExternal?: (string | RegExp)[]

  /**
   * Define options
   *
   * 定义选项
   */
  define?: Record<string, string>
}

/**
 * Create tsdown configuration
 *
 * 创建 tsdown 配置
 *
 * @param filePath - File path or file info / 文件路径或文件信息
 * @param options - Tsdown options / Tsdown 选项
 * @returns Tsdown configuration / Tsdown 配置
 */
// oxlint-disable-next-line complexity
export const tsdownConfig = (
  fileOptions: string | FileInfo,
  options: TsdownOptions = {},
): UserConfig => {
  const isObject = typeof fileOptions === 'object'
  const base = isObject ? (fileOptions.base ? `${fileOptions.base}/` : '') : ''
  const files = isObject ? fileOptions.files : [fileOptions]
  const targetDir = isObject ? (fileOptions.target ?? fileOptions.base) : ''
  const isNode = isObject
    ? fileOptions.base.startsWith('node') || fileOptions.base.startsWith('cli')
    : fileOptions.startsWith('node/') || fileOptions.startsWith('cli/')
  const isBrowser = isObject
    ? fileOptions.base.startsWith('client')
    : fileOptions.startsWith('client/')

  const {
    platform = isNode ? 'node' : isBrowser ? 'browser' : 'neutral',
    dts = isObject
      ? !fileOptions.base.startsWith('cli')
      : !fileOptions.startsWith('cli/'),
    alias,
    define,
    treeshake = {
      moduleSideEffects: (id: string): boolean =>
        id.endsWith('.css') || id.endsWith('.scss'),
    },
    noExternal = [],
    inlineOnly = false,
  } = options

  return defineConfig({
    entry: Object.fromEntries(
      files.map((item) => [item, `./src/${base}${item}.ts`]),
    ),
    format: 'esm',
    outDir: `./lib${targetDir ? `/${targetDir}` : ''}`,
    sourcemap: true,
    dts,
    minify: isProduction,
    target: isBrowser
      ? ['chrome107', 'edge107', 'firefox104', 'safari16']
      : 'node20.19',
    platform,
    define,
    alias,
    treeshake,
    fixedExtension: false,
    noExternal,
    inlineOnly,
  })
}
