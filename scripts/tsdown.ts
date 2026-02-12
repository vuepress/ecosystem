import type { UserConfig } from 'tsdown'
import { defineConfig } from 'tsdown'

const isProduction = process.env.NODE_ENV === 'production'

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
export const tsdownConfig = (
  fileOptions: string | string[],
  options: TsdownOptions = {},
): UserConfig => {
  const files = Array.isArray(fileOptions) ? fileOptions : [fileOptions]

  const {
    alias,
    define,
    treeshake = {
      moduleSideEffects: (id: string): boolean =>
        id.endsWith('.css') || id.endsWith('.scss'),
    },
    noExternal = [],
    inlineOnly = false,
    platform = 'node',
    dts = true,
  } = options

  return defineConfig({
    entry: Object.fromEntries(files.map((item) => [item, `./src/${item}.ts`])),
    format: 'esm',
    outDir: './lib',
    sourcemap: true,
    dts,
    minify: isProduction,
    target: ['node20.19', 'chrome107', 'edge107', 'firefox104', 'safari16'],
    platform,
    define,
    alias,
    treeshake,
    fixedExtension: false,
    noExternal,
    inlineOnly,
  })
}
