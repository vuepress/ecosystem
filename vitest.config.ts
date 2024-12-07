import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vitest/config'
import { getDirname } from 'vuepress/utils'

const __dirname = import.meta.dirname || getDirname(import.meta.url)

const getSubDirectories = (dir: string): string[] =>
  fs
    .readdirSync(dir)
    .filter((item) => fs.statSync(path.join(dir, item)).isDirectory())

const pluginPackages = getSubDirectories(path.resolve(__dirname, 'plugins'))
const themePackages = getSubDirectories(path.resolve(__dirname, 'themes'))

export default defineConfig({
  resolve: {
    alias: [
      {
        find: new RegExp(`^@vuepress/(${pluginPackages.join('|')})$`),
        replacement: path.resolve(__dirname, './plugins/$1/src/index.ts'),
      },
      {
        find: new RegExp(`^@vuepress/(${themePackages.join('|')})$`),
        replacement: path.resolve(__dirname, './themes/$1/src/index.ts'),
      },
      {
        find: new RegExp(`^@vuepress/(${themePackages.join('|')}/client)$`),
        replacement: path.resolve(__dirname, './themes/$1/src/client/index.ts'),
      },
    ],
  },
  test: {
    coverage: {
      all: false,
      provider: 'istanbul',
      reporter: ['clover', 'json', 'lcov', 'text'],
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
