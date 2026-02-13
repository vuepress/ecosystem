import type { UserConfig } from 'tsdown'
import { defineConfig } from 'tsdown'

const isProduction = process.env.NODE_ENV === 'production'

const defaultModuleSideEffects = (id: string): boolean =>
  id.endsWith('.css') || id.endsWith('.scss')

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

  /**
   * Additional external dependencies (for special cases like self-referencing
   * virtual modules). In most cases, tsdown auto-externalizes deps from
   * package.json so this is not needed.
   *
   * 额外的外部依赖（用于自引用虚拟模块等特殊情况）。
   * 大部分情况下 tsdown 会自动外部化 package.json 中的依赖，无需手动声明。
   */
  external?: (string | RegExp)[]

  /**
   * Custom module side effects determination
   *
   * By default, only `.css` and `.scss` imports are considered to have side
   * effects. Use this to add additional side-effect patterns. This is part
   * of the `treeshake` option in tsdown/rolldown.
   *
   * 自定义模块副作用判定，默认仅保留 `.css` 和 `.scss` 导入的副作用。
   *
   * @param id - Module ID / 模块 ID
   * @param external - Whether the module is external / 模块是否为外部模块
   *
   * @default (id) => id.endsWith('.css') || id.endsWith('.scss')
   */
  moduleSideEffects?: (id: string, external: boolean) => boolean | undefined
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
    treeshake,
    noExternal = [],
    external = [],
    inlineOnly = false,
    platform = 'node',
    dts = true,
    moduleSideEffects,
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
    treeshake: treeshake ?? {
      moduleSideEffects: moduleSideEffects ?? defaultModuleSideEffects,
    },
    external: [/\.s?css$/, ...external],
    fixedExtension: false,
    noExternal,
    inlineOnly,
  })
}
