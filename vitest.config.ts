import { existsSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'

import vue from '@vitejs/plugin-vue'
import type { Alias } from 'vite'
import { defineConfig } from 'vitest/config'

import { vuepressTestPlugin } from './tools/test-utils/src/node/index.ts'

const __dirname = import.meta.dirname

const getSubDirectories = (dir: string): string[] =>
  readdirSync(dir).filter((item) =>
    statSync(path.join(dir, item)).isDirectory(),
  )

interface PackageInfo {
  dir: string
  name: string
}

/**
 * Get the packages of a workspace directory
 *
 * @param rootDir - The workspace directory to scan / 要扫描的工作区目录
 * @param nested - Whether the packages are grouped into sub-categories /
 *   包是否被分组到子分类中
 * @returns The package information / 包信息
 */
const getPackages = (rootDir: string, nested = false): PackageInfo[] =>
  getSubDirectories(path.resolve(__dirname, rootDir)).flatMap((category) => {
    const categoryDir = path.resolve(__dirname, rootDir, category)

    return (nested ? getSubDirectories(categoryDir) : ['.']).map((name) => ({
      dir:
        name === '.'
          ? `./${rootDir}/${category}`
          : `./${rootDir}/${category}/${name}`,
      name: name === '.' ? category : name,
    }))
  })

/**
 * Create aliases that resolve a package to its TypeScript source
 *
 * The packages are aliased to `src/`, so that unit tests do not need a build
 * step, and always run against the current source. The root entry of a package
 * is `src/node/index.ts`, which is re-exported as the published entry.
 *
 * @param packages - The packages to alias / 要创建别名的包
 * @returns The aliases / 别名
 */
const createSourceAliases = (packages: PackageInfo[]): Alias[] =>
  packages.flatMap(({ dir, name }) => [
    {
      find: new RegExp(`^@vuepress/${name}$`, 'u'),
      replacement: path.resolve(__dirname, `${dir}/src/node/index.ts`),
    },
    {
      find: new RegExp(`^@vuepress/${name}/(client|shared)$`, 'u'),
      replacement: path.resolve(__dirname, `${dir}/src/$1/index.ts`),
    },
  ])

const pluginPackages = getPackages('plugins', true)
const themePackages = getPackages('themes')
const toolPackages = getPackages('tools')

/**
 * Directories that `@theme/*` may resolve to
 *
 * They are declared in `tsconfig.json`, and the alias is set by
 * `@vuepress/theme-default` for making the theme files replaceable.
 */
const THEME_DIRS = ['components', 'composables', 'utils'].map((dir) =>
  path.resolve(__dirname, './themes/theme-default/src/client', dir),
)

const resolveThemeModule = (id: string): string | undefined => {
  if (!id.startsWith('@theme/')) return undefined

  const name = id.slice('@theme/'.length)

  for (const dir of THEME_DIRS) {
    for (const file of [name, `${name}.js`, `${name}.vue`, `${name}.ts`]) {
      const filePath = path.join(dir, file)

      if (existsSync(filePath)) return filePath
    }
  }

  return undefined
}

export default defineConfig({
  plugins: [vue(), vuepressTestPlugin({ resolve: resolveThemeModule })],
  resolve: {
    alias: [
      ...createSourceAliases(pluginPackages),
      ...createSourceAliases(themePackages),
      ...createSourceAliases(toolPackages),
    ],
  },
  test: {
    coverage: {
      provider: 'istanbul',
      reporter: ['clover', 'json', 'lcov', 'text'],
    },
    environmentOptions: {
      happyDOM: {
        settings: {
          // No test loads external scripts, and happy-dom reports every
          // tracking script appended to the head as an error with a stack
          // trace, so treat the disabled loading as a success instead
          handleDisabledFileLoadingAsSuccess: true,
        },
      },
    },
    include: [
      'plugins/**/tests/**/*.spec.ts',
      'themes/**/tests/**/*.spec.ts',
      'tools/**/tests/**/*.spec.ts',
    ],
    typecheck: {
      enabled: true,
      ignoreSourceErrors: true,
    },
  },
})
