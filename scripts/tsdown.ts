import type { UserConfig } from 'tsdown'
import { defineConfig } from 'tsdown'

const isProduction = process.env.NODE_ENV === 'production'

/**
 * File info for multi-file entry points
 *
 * 多文件入口点的文件信息
 */
export interface FileInfo {
  /**
   * Base directory under src/
   *
   * src/ 下的基础目录
   */
  base: string

  /**
   * File names under the base directory
   *
   * 基础目录下的文件名
   */
  files: string[]
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
   * @default true
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
   * @default false
   */
  inlineOnly?: (string | RegExp)[] | false

  /**
   * Packages not to treat as external
   *
   * 不作为外部处理的包
   */
  noExternal?: (string | RegExp)[]

  /**
   * External dependencies
   *
   * 外部依赖
   */
  external?: (string | RegExp)[]

  /**
   * External dependencies for dts only (ignored by tsdown, kept for compatibility)
   *
   * 仅用于 dts 的外部依赖（tsdown 忽略此选项，保留以兼容）
   */
  dtsExternal?: (string | RegExp)[]

  /**
   * Whether to resolve and bundle dependencies
   *
   * 是否解析并打包依赖
   */
  resolve?: boolean

  /**
   * Define options
   *
   * 定义选项
   */
  define?: Record<string, string>

  /**
   * Module side effects option
   *
   * 模块副作用选项
   */
  moduleSideEffects?: (id: string) => boolean
}

/**
 * Create tsdown configuration
 *
 * 创建 tsdown 配置
 *
 * @param filePath - File path, file paths array, or file info / 文件路径、文件路径数组或文件信息
 * @param options - Tsdown options / Tsdown 选项
 * @returns Tsdown configuration / Tsdown 配置
 */
export const tsdownConfig = (
  fileOptions: string | string[] | FileInfo,
  options: TsdownOptions = {},
): UserConfig => {
  const {
    alias,
    define,
    treeshake = {
      moduleSideEffects: (id: string): boolean =>
        id.endsWith('.css') || id.endsWith('.scss'),
    },
    noExternal = [],
    external = [],
    inlineOnly = false,
    platform = 'node',
    dts = true,
    resolve = false,
    moduleSideEffects,
  } = options

  let entry: Record<string, string>

  if (typeof fileOptions === 'object' && !Array.isArray(fileOptions)) {
    // FileInfo object: { base, files }
    entry = Object.fromEntries(
      fileOptions.files.map((item) => [
        `${fileOptions.base}/${item}`,
        `./src/${fileOptions.base}/${item}.ts`,
      ]),
    )
  } else {
    const files = Array.isArray(fileOptions) ? fileOptions : [fileOptions]

    entry = Object.fromEntries(files.map((item) => [item, `./src/${item}.ts`]))
  }

  return defineConfig({
    entry,
    format: 'esm',
    outDir: './lib',
    sourcemap: true,
    dts,
    minify: isProduction,
    target: ['node20.19', 'chrome107', 'edge107', 'firefox104', 'safari16'],
    platform,
    define,
    alias,
    treeshake: moduleSideEffects
      ? {
          ...(typeof treeshake === 'object' ? treeshake : {}),
          moduleSideEffects,
        }
      : treeshake,
    fixedExtension: false,
    external: [/\.s?css$/, ...external],
    noExternal: resolve ? [] : noExternal,
    inlineOnly,
  })
}
