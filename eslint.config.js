import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { vuepress } from 'eslint-config-vuepress'

const ROOT = path.resolve(fileURLToPath(import.meta.url), '..')
const E2E_DIR = path.resolve(ROOT, 'e2e')
const SCRIPTS_DIR = path.resolve(ROOT, 'scripts')
const PLUGINS_DIRS = fs
  .readdirSync(path.resolve(ROOT, 'plugins'))
  .map((item) => `./plugins/${item}`)
const THEME_DIRS = fs
  .readdirSync(path.resolve(ROOT, 'themes'))
  .map((item) => `./themes/${item}`)
const TOOLS_DIRS = fs
  .readdirSync(path.resolve(ROOT, 'tools'))
  .map((item) => `./tools/${item}`)

export default vuepress(
  {
    ignores: ['**/lib/**', '**/template/**'],
    imports: {
      packageDir: [
        ROOT,
        E2E_DIR,
        SCRIPTS_DIR,
        ...PLUGINS_DIRS,
        ...THEME_DIRS,
        ...TOOLS_DIRS,
      ],
    },
    typescript: {
      overrides: {
        '@typescript-eslint/consistent-indexed-object-style': 'off',
        '@typescript-eslint/no-dynamic-delete': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-floating-promises': [
          'error',
          {
            allowForKnownSafeCalls: [
              // Avoid explicit marking void for router.push
              {
                from: 'package',
                name: 'push',
                package: 'vue-router',
              },
              // Avoid explicit marking void for router.replace
              {
                from: 'package',
                name: 'replace',
                package: 'vue-router',
              },
            ],
          },
        ],
        '@typescript-eslint/promise-function-async': 'off',
        // 'no-underscore-dangle': 'off',
      },
    },
    vue: {
      overrides: {
        // TODO: false positive in vue sfc
        'no-useless-assignment': 'off',
      },
    },
  },
  {
    files: ['**/tests/**'],
    rules: {
      'import/no-unresolved': 'off',
      'no-console': 'off',
    },
  },
)
