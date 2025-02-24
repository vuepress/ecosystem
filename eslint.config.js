import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { vuepress } from 'eslint-config-vuepress'

const ROOT = path.resolve(fileURLToPath(import.meta.url), '..')
const DOCS_DIR = path.resolve(ROOT, 'docs')
const E2E_DIR = path.resolve(ROOT, 'e2e')
const PLUGINS_DIRS = fs
  .readdirSync(path.resolve(ROOT, 'plugins'))
  .filter((category) =>
    fs.statSync(path.resolve(ROOT, `./plugins/${category}`)).isDirectory(),
  )
  .flatMap((category) =>
    fs
      .readdirSync(path.resolve(ROOT, `./plugins/${category}`))
      .map((plugin) => path.resolve(ROOT, `./plugins/${category}/${plugin}`)),
  )
const THEMES_DIRS = fs
  .readdirSync(path.resolve(ROOT, 'themes'))
  .map((item) => path.resolve(ROOT, `./themes/${item}`))
const TOOLS_DIRS = fs
  .readdirSync(path.resolve(ROOT, 'tools'))
  .map((item) => path.resolve(ROOT, `./tools/${item}`))

export default vuepress(
  {
    ignores: ['**/lib/**', '**/template/**', '**/node_modules/**'],
    imports: {
      packageDir: [
        ROOT,
        DOCS_DIR,
        E2E_DIR,
        ...PLUGINS_DIRS,
        ...THEMES_DIRS,
        ...TOOLS_DIRS,
      ],
    },
    typescript: {
      overrides: {
        '@typescript-eslint/consistent-indexed-object-style': 'off',
        '@typescript-eslint/naming-convention': [
          'warn',

          {
            selector: 'default',
            format: ['camelCase'],
            leadingUnderscore: 'allowSingleOrDouble',
            trailingUnderscore: 'allow',
          },
          // allow global variables like __VUEPRESS_DEV__
          {
            selector: ['variable'],
            filter: '^__.*__$',
            format: ['UPPER_CASE'],
            leadingUnderscore: 'requireDouble',
            trailingUnderscore: 'requireDouble',
          },
          {
            selector: ['variable'],
            format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
            leadingUnderscore: 'allowSingleOrDouble',
            trailingUnderscore: 'allowSingleOrDouble',
          },
          // stop checking object literal properties type properties
          // the format can be `og:title` `line-width` `__raw` `__VUEPRESS_DEV` `++` ...
          {
            selector: ['objectLiteralProperty', 'typeProperty'],
            format: null,
          },
          // allow slots like `navbar-start`
          {
            selector: ['typeMethod'],
            filter: '^[a-z]+(?:-[a-z]+)*?$',
            format: null,
          },
          {
            selector: ['property'],
            format: ['camelCase', 'PascalCase'],
          },
          {
            selector: ['parameter'],
            format: ['camelCase', 'PascalCase'],
            leadingUnderscore: 'allow',
            trailingUnderscore: 'allow',
          },
          {
            selector: 'import',
            format: ['PascalCase', 'camelCase'],
          },
          {
            selector: 'typeLike',
            format: ['PascalCase'],
          },
          {
            selector: 'enumMember',
            format: ['PascalCase'],
          },
        ],
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
        'no-underscore-dangle': 'off',
        'no-labels': 'off',
      },
    },
    vue: {
      overrides: {
        // FIXME: false positive in vue sfc
        'no-useless-assignment': 'off',
        'vue/multi-word-component-names': [
          'error',
          { ignores: ['Badge', 'Layout'] },
        ],
        'vue/static-class-names-order': 'off',
        'vue/no-v-html': 'off',
        'vue/no-root-v-if': 'off',
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
