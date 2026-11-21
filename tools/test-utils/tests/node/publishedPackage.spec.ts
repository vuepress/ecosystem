import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'

import type { Alias, Plugin } from 'vite'
import { describe, expect, it } from 'vitest'

/**
 * Paths of the Node.js entry of the built package
 *
 * These tests check the published files, so they need `dist/`, which is created
 * by `pnpm run bundle`. They are skipped when the package has not been built,
 * so that the unit tests still run in a fresh checkout, while CI (which builds
 * before running the tests) always runs them.
 */
const distIndex = path.resolve(import.meta.dirname, '../../dist/node/index.js')
const distTypes = path.resolve(
  import.meta.dirname,
  '../../dist/node/index.d.ts',
)

const distVirtualDir = path.resolve(
  import.meta.dirname,
  '../../dist/node/virtual',
)

const isBuilt =
  existsSync(distIndex) && existsSync(distTypes) && existsSync(distVirtualDir)

interface TestConfig {
  resolve?: { alias?: Alias[] }
  test?: { setupFiles?: string[] }
}

interface PackageManifest {
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  optionalDependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
  peerDependenciesMeta?: Record<string, { optional?: boolean }>
}

interface PublishedPackage {
  VIRTUAL_MODULE_IDS: readonly string[]
  vuepressTestPlugin: () => Plugin
}

/**
 * Load a module of the built package
 *
 * The modules are resolved at runtime, so they have no static type.
 *
 * 加载构建后包中的模块
 *
 * 这些模块在运行时才解析，因此没有静态类型。
 *
 * @param modulePath - The path of the module / 模块路径
 * @returns The exported members of the module / 模块导出的成员
 */
const loadModule = async (
  modulePath: string,
): Promise<Record<string, unknown>> => {
  const loaded: unknown = await import(modulePath)

  return loaded as Record<string, unknown>
}

/**
 * Load the Node.js entry of the built package
 *
 * 加载构建后包的 Node.js 入口
 *
 * @returns The members exported by the entry / 入口导出的成员
 */
const loadPublishedPackage = async (): Promise<PublishedPackage> =>
  (await loadModule(distIndex)) as unknown as PublishedPackage

/**
 * Get the config returned by the `config` hook of the plugin
 *
 * 获取插件 `config` 钩子返回的配置
 *
 * @param plugin - The plugin instance / 插件实例
 * @returns The config / 配置
 */
const getConfig = (plugin: Plugin): TestConfig => {
  const hook = plugin.config

  if (typeof hook !== 'function')
    throw new TypeError('The `config` hook of the plugin is missing.')

  return (hook as unknown as () => TestConfig).call({} as never)
}

/**
 * Get the file that a virtual module is aliased to
 *
 * 获取虚拟模块别名指向的文件
 *
 * @param config - The config of the plugin / 插件配置
 * @param name - The name of the virtual module / 虚拟模块名称
 * @returns The file of the alias / 别名对应的文件
 */
const getVirtualAlias = (
  config: TestConfig,
  name: string,
): string | undefined => {
  const alias = config.resolve?.alias?.find(
    (item) =>
      item.find instanceof RegExp && item.find.test(`@internal/${name}`),
  )

  return alias?.replacement
}

/**
 * Get the files that the plugin resolves for the setup and the virtual modules
 *
 * 获取插件为 setup 与虚拟模块解析出的文件
 *
 * @param config - The config of the plugin / 插件配置
 * @param virtualModuleIds - The names of the virtual modules / 虚拟模块名称
 * @returns The resolved files / 解析出的文件
 */
const getResolvedFiles = (
  config: TestConfig,
  virtualModuleIds: readonly string[],
): string[] =>
  [
    ...(config.test?.setupFiles ?? []),
    ...virtualModuleIds.map((name) => getVirtualAlias(config, name)),
  ].filter((file): file is string => file !== undefined)

/**
 * Get the names exported by the declarations
 *
 * 获取声明文件导出的名称
 *
 * @param types - The content of the declaration file / 声明文件内容
 * @returns The exported names / 导出的名称
 */
const getDeclaredNames = (types: string): Set<string> => {
  const names = new Set<string>()

  for (const { groups } of types.matchAll(/^export\s*\{(?<body>[^}]*)\}$/gmu)) {
    for (const part of (groups?.body ?? '').split(',')) {
      const name = part
        .trim()
        .split(/\s+as\s+/u)
        .pop()

      if (name) names.add(name)
    }
  }

  for (const { groups } of types.matchAll(
    /^export declare (?:const|function|class) (?<name>[\w$]+)/gmu,
  ))
    if (groups?.name) names.add(groups.name)

  return names
}

describe('package manifest', () => {
  it('should declare vitest as a required dependency', () => {
    const packageRoot = path.resolve(import.meta.dirname, '../..')
    const manifest = JSON.parse(
      readFileSync(path.join(packageRoot, 'package.json'), 'utf8'),
    ) as PackageManifest

    // A peer dependency makes the package resolve `vitest` from the tree of
    // the consumer, so that a single instance runs the tests; the dev
    // dependency is what the local build and tests resolve.
    expect(manifest.peerDependencies?.vitest).toBeDefined()
    expect(manifest.devDependencies?.vitest).toBeDefined()
    expect(manifest.dependencies?.vitest).toBeUndefined()
    expect(manifest.optionalDependencies?.vitest).toBeUndefined()
    expect(manifest.peerDependenciesMeta?.vitest?.optional).not.toBe(true)
  })
})

describe.skipIf(!isBuilt)('published package', () => {
  it('should declare every runtime export in the types', async () => {
    const runtimeExports = Object.keys(await loadPublishedPackage())
    const declaredNames = getDeclaredNames(readFileSync(distTypes, 'utf8'))

    expect(runtimeExports.length).toBeGreaterThan(0)

    expect(
      runtimeExports.filter((name) => !declaredNames.has(name)),
    ).toStrictEqual([])
  })

  it('should resolve the setup file and the virtual modules to files', async () => {
    const { VIRTUAL_MODULE_IDS, vuepressTestPlugin } =
      await loadPublishedPackage()
    const config = getConfig(vuepressTestPlugin())

    const files = getResolvedFiles(config, VIRTUAL_MODULE_IDS)

    expect(VIRTUAL_MODULE_IDS.length).toBeGreaterThan(0)
    expect(files).toHaveLength(VIRTUAL_MODULE_IDS.length + 1)

    for (const file of files) {
      expect(
        existsSync(`${file}.js`),
        `the resolved file "${file}.js" does not exist`,
      ).toBe(true)
    }
  })

  it('should declare every runtime export of the virtual modules', async () => {
    const virtualModules = readdirSync(distVirtualDir).filter((file) =>
      file.endsWith('.js'),
    )

    expect(virtualModules.length).toBeGreaterThan(0)

    const missingNames = await Promise.all(
      virtualModules.map(async (file) => {
        const modulePath = path.join(distVirtualDir, file)
        const typesPath = path.join(
          distVirtualDir,
          `${path.basename(file, '.js')}.d.ts`,
        )
        const declaredNames = getDeclaredNames(readFileSync(typesPath, 'utf8'))
        const runtimeExports = Object.keys(await loadModule(modulePath))

        expect(runtimeExports.length).toBeGreaterThan(0)

        return runtimeExports.filter((name) => !declaredNames.has(name))
      }),
    )

    expect(missingNames.flat()).toStrictEqual([])
  })

  it('should import vitest instead of bundling it', () => {
    const entrySource = readFileSync(distIndex, 'utf8')
    const typesSource = readFileSync(distTypes, 'utf8')

    // `vitest` is a peer dependency, so both the entry and the declarations
    // must import it instead of inlining the runtime and the type graph.
    expect(entrySource).toMatch(/^import[^\n]*from\s*["']vitest["']/mu)
    expect(typesSource).toMatch(/^import[^\n]*from\s*["']vitest["']/mu)
    expect(entrySource).not.toContain('tinyspy')

    // The package itself is tiny: the entry is a few kilobytes when vitest is
    // external (281,930 bytes minified and 622,747 bytes otherwise when it was
    // bundled), so these ceilings guard against inlining it again.
    expect(statSync(distIndex).size).toBeLessThan(64_000)
    expect(statSync(distTypes).size).toBeLessThan(64_000)
  })
})
