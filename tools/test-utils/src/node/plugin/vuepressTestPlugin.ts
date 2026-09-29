import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'

import type { Alias, Plugin } from 'vite'

const require = createRequire(import.meta.url)

const resolveModule = (id: string): string | undefined => {
  try {
    return require.resolve(id)
  } catch {
    return undefined
  }
}

/**
 * Names of the generated VuePress client modules
 *
 * VuePress 生成的客户端模块的名称
 */
export const VIRTUAL_MODULE_IDS = [
  'clientConfigs',
  'routes',
  'siteData',
  'themeData',
  'userStyle',
] as const

const createVirtualAliases = (): Alias[] =>
  VIRTUAL_MODULE_IDS.map((name) => ({
    find: new RegExp(`^@internal/${name}$`, 'u'),
    replacement: path.resolve(import.meta.dirname, '../virtual', name),
  }))

const createClientAliases = (): Alias[] =>
  (
    [
      ['vuepress/client', resolveModule('vuepress/client')],
      ['@vuepress/client', resolveModule('@vuepress/client')],
    ] as [string, string | undefined][]
  )
    .filter(([, replacement]) => Boolean(replacement))
    .map(([find, replacement]) => ({
      find: new RegExp(`^${find}$`, 'u'),
      replacement: replacement!,
    }))

/**
 * Patterns of the client packages that must be inlined
 *
 * They are matched against the resolved module paths, because
 * `@vuepress/client` reads the generated modules at module scope, and must be
 * transformed by Vite.
 *
 * 必须被内联的客户端包的模式
 *
 * 它们匹配解析后的模块路径，因为 `@vuepress/client` 会在模块作用域读取生成模块，必须由 Vite 处理。
 */
const CLIENT_INLINE_PATTERNS = [
  /@vuepress[+/\\]client(?:@|[\\/])/u,
  /[\\/]node_modules[\\/]vuepress[\\/]dist[\\/]client\.js$/u,
]

/**
 * Options of `vuepressTestPlugin`
 *
 * `vuepressTestPlugin` 的选项
 */
export interface VuepressTestPluginOptions {
  /**
   * Site base
   *
   * The value of `__VUEPRESS_BASE__`
   *
   * 站点 base
   *
   * 即 `__VUEPRESS_BASE__` 的值
   *
   * @default '/'
   */
  base?: string

  /**
   * Whether to simulate the development mode
   *
   * The value of `__VUEPRESS_DEV__`
   *
   * Notice that the development mode enables HMR branches, which access
   * `__VUE_HMR_RUNTIME__` that is not available in unit tests.
   *
   * 是否模拟开发模式
   *
   * 即 `__VUEPRESS_DEV__` 的值
   *
   * 注意：开发模式会启用 HMR 分支，它会访问单元测试中不存在的 `__VUE_HMR_RUNTIME__`。
   *
   * @default false
   */
  dev?: boolean

  /**
   * Version of vuepress core
   *
   * The value of `__VUEPRESS_VERSION__`, which is read from the installed
   * `vuepress` package by default.
   *
   * Vuepress 核心的版本
   *
   * 即 `__VUEPRESS_VERSION__` 的值，默认读取已安装的 `vuepress` 包。
   */
  version?: string

  /**
   * Resolve the module ids that `resolve.alias` cannot express
   *
   * Vite `resolve.alias` maps one pattern to one file, so it cannot handle a
   * convention that may resolve to different directories or extensions, e.g.
   * the `@theme/*` alias of `@vuepress/theme-default`.
   *
   * 解析 `resolve.alias` 无法表达的模块 id
   *
   * Vite 的 `resolve.alias` 只能把一个模式映射到一个文件，无法处理可能落到不同目录或扩展名的约定，如
   * `@vuepress/theme-default` 的 `@theme/*` 别名。
   *
   * @param id - The imported module id / 导入的模块 id
   * @returns The resolved file path, or `undefined` / 解析出的文件路径，或 `undefined`
   */
  resolve?: (id: string) => string | undefined
}

const getVuepressVersion = (): string => {
  const packagePath = resolveModule('vuepress/package.json')

  if (!packagePath) return '0.0.0'

  const { version } = JSON.parse(readFileSync(packagePath, 'utf8')) as {
    version: string
  }

  return version
}

/**
 * Create a Vite/Vitest plugin that makes `vuepress/client` usable in unit tests
 *
 * `vuepress/client` imports generated modules (`@internal/*`) and compile-time
 * defines (`__VUEPRESS_DEV__`, ...) at module scope, so it cannot be imported
 * in a unit test directly. This plugin injects the defines, resolves
 * `vuepress/client` to files that can be transformed, and replaces the
 * generated modules with placeholders reading the test state.
 *
 * 创建让 `vuepress/client` 可用于单元测试的 Vite/Vitest 插件
 *
 * `vuepress/client` 在模块作用域就引用生成模块（`@internal/*`）与编译期 define（`__VUEPRESS_DEV__`
 * 等），因此无法在单元测试中直接导入。该插件会注入 define、把 `vuepress/client`
 * 解析为可被转换的文件，并用读取测试状态的占位模块替换生成模块。
 *
 * @example
 *   // vitest.config.ts
 *   import { defineConfig } from 'vitest/config'
 *   import { vuepressTestPlugin } from '@vuepress/test-utils'
 *
 *   export default defineConfig({
 *     plugins: [vuepressTestPlugin()],
 *   })
 *
 * @param options - Plugin options / 插件选项
 * @returns The Vite plugin / Vite 插件
 */
export const vuepressTestPlugin = (
  options: VuepressTestPluginOptions = {},
): Plugin => {
  const {
    base = '/',
    dev = false,
    resolve,
    version = getVuepressVersion(),
  } = options

  return {
    name: 'vuepress-test-utils',
    enforce: 'pre',

    config: () => ({
      define: {
        __VUE_OPTIONS_API__: JSON.stringify(true),
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
        __VUEPRESS_BASE__: JSON.stringify(base),
        __VUEPRESS_DEV__: JSON.stringify(dev),
        __VUEPRESS_VERSION__: JSON.stringify(version),
      },
      resolve: {
        alias: [...createVirtualAliases(), ...createClientAliases()],
      },
      test: {
        server: {
          deps: {
            inline: CLIENT_INLINE_PATTERNS,
          },
        },
        setupFiles: [path.resolve(import.meta.dirname, '../setup')],
      },
    }),

    resolveId: resolve
      ? (id) => {
          const resolved = resolve(id)

          return resolved ? path.resolve(resolved) : undefined
        }
      : undefined,
  }
}
