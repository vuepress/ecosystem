import { defineHopeConfig } from 'oxc-config-hope/oxlint'

export default defineHopeConfig(
  {
    ignore: ['template/', '**/tests/__fixtures__/'],

    node: [
      '**/src/{cli,node}/**/*.ts',
      'tools/**/*.ts',
      '**/.vuepress/config.ts',
      '*.config.ts',
      '.ncurc.cjs',
    ],
    vue: true,
    vitest: [
      'plugins/*/*/tests/**/*.spec.ts',
      'themes/*/tests/**/*.spec.ts',
      'tools/*/tests/**/*.spec.ts',
    ],
    playwright: true,

    rules: {
      // The following rules are not working properly, so they have been temporarily disabled
      'vitest/consistent-test-filename': 'off',
      'sort-vars': 'off',
      'one-var': 'off',
      'promise/always-return': 'off',
      // ----------- end --------------

      // complex states may be needed for some functions
      'max-params': ['warn', 5],
      // allow undefined usage
      'no-undefined': 'off',
      // define variables are preferred with UPPERCASE surrounded by underscores
      'no-underscore-dangle': 'off',
      // allow warning comments, like todo, fixme
      'no-warning-comments': 'off',
      // object assign can be performant
      'prefer-object-spread': 'off',

      // @recommended is used to mark recommended fields in options interfaces, which are not required but recommended to be provided
      'jsdoc/check-tag-names': [
        'warn',
        { definedTags: ['recommended'], typed: true },
      ],

      // we only use this when necessary
      'typescript/no-non-null-assertion': 'off',
      // this can introduce false positives, as though type is required, users might not provide such
      'typescript/prefer-nullish-coalescing': 'off',
      // we often check other types
      'typescript/strict-boolean-expressions': 'off',

      // disabled due to performance consideration
      'unicorn/prefer-code-point': 'off',
      // globalThis is not supported in some environments, and we already handle SSR carefully
      // so window is still preferred in client codes
      'unicorn/prefer-global-this': 'off',
      // relax max-nested restrictions
      'unicorn/max-nested-calls': ['warn', { max: 5 }],
      // sometimes we need to check if a defined variable is injected
      'unicorn/no-typeof-undefined': 'off',
    },
  },
  // node files
  {
    files: ['**/src/{cli,node}/**/*.ts'],
    plugins: ['node'],
    rules: {
      'no-restricted-imports': [
        'error',
        '@vuepress/helper/client',
        'vuepress/client',
      ],
      'node/no-process-env': 'off',
    },
  },
  // Layout and styles ported from the VitePress default theme. The components,
  // support helpers and shared utilities are kept close to upstream so they can be
  // diffed and re-synced against VitePress, therefore project-specific rules are
  // disabled for them.
  {
    files: [
      'themes/theme-default/src/client/theme-default/components/**',
      'themes/theme-default/src/client/theme-default/support/**',
      'themes/theme-default/src/client/theme-default/shared.ts',
      'themes/theme-default/src/client/theme-default/index.ts',
      'themes/theme-default/src/client/theme-default/without-fonts.ts',
    ],
    rules: {
      'arrow-body-style': 'off',
      'complexity': 'off',
      'curly': 'off',
      'eqeqeq': 'off',
      'func-style': 'off',
      'id-length': 'off',
      'max-lines-per-function': 'off',
      'no-constant-binary-expression': 'off',
      'no-control-regex': 'off',
      'no-use-before-define': 'off',
      'no-empty-function': 'off',
      'no-implicit-coercion': 'off',
      'no-multi-assign': 'off',
      'no-negated-condition': 'off',
      'no-param-reassign': 'off',
      'no-plusplus': 'off',
      'no-shadow': 'off',
      'no-unused-expressions': 'off',
      'no-useless-return': 'off',
      'prefer-const': 'off',
      'prefer-destructuring': 'off',
      'prefer-named-capture-group': 'off',
      'prefer-template': 'off',
      'require-unicode-regexp': 'off',
      'import/consistent-type-specifier-style': 'off',
      'import/no-unassigned-import': 'off',
      'import/unambiguous': 'off',
      'jsdoc/require-param': 'off',
      'jsdoc/require-returns': 'off',
      'oxc/no-map-spread': 'off',
      'typescript/consistent-indexed-object-style': 'off',
      'typescript/consistent-return': 'off',
      'typescript/explicit-function-return-type': 'off',
      'typescript/explicit-module-boundary-types': 'off',
      'typescript/method-signature-style': 'off',
      'typescript/no-confusing-void-expression': 'off',
      'typescript/no-explicit-any': 'off',
      'typescript/no-misused-promises': 'off',
      'typescript/no-unnecessary-type-conversion': 'off',
      'typescript/no-unsafe-argument': 'off',
      'typescript/no-unsafe-assignment': 'off',
      'typescript/no-unsafe-member-access': 'off',
      'typescript/prefer-readonly': 'off',
      'typescript/prefer-regexp-exec': 'off',
      'typescript/strict-void-return': 'off',
      'unicorn/consistent-function-scoping': 'off',
      'unicorn/no-negated-condition': 'off',
      'unicorn/no-object-as-default-parameter': 'off',
      'unicorn/no-useless-undefined': 'off',
      'unicorn/prefer-dom-node-append': 'off',
      'unicorn/prefer-dom-node-remove': 'off',
      'unicorn/prefer-number-coercion': 'off',
      'unicorn/prefer-number-properties': 'off',
      'unicorn/prefer-set-has': 'off',
      'unicorn/prefer-spread': 'off',
      'unicorn/prefer-string-raw': 'off',
      'unicorn/prefer-string-replace-all': 'off',
      'unicorn/prefer-ternary': 'off',
      'vue/define-props-destructuring': 'off',
      'vue/max-props': 'off',
      'vue/next-tick-style': 'off',
      'vue/require-default-prop': 'off',
      'vue/return-in-computed-property': 'off',
    },
  },
  // Composables rewritten on top of the native VuePress client APIs follow the
  // project rules (correctness included); only stylistic rules that would
  // reformat the remaining VitePress-shaped helpers are disabled. Hoisted
  // function declarations (used before their definition, as upstream does) are
  // allowed here as well.
  {
    files: ['themes/theme-default/src/client/theme-default/composables/**'],
    rules: {
      'arrow-body-style': 'off',
      'complexity': 'off',
      'curly': 'off',
      'func-style': 'off',
      'id-length': 'off',
      'max-lines-per-function': 'off',
      'no-control-regex': 'off',
      'no-use-before-define': 'off',
      'no-empty-function': 'off',
      'no-multi-assign': 'off',
      'no-negated-condition': 'off',
      'no-plusplus': 'off',
      'no-useless-return': 'off',
      'prefer-destructuring': 'off',
      'prefer-named-capture-group': 'off',
      'prefer-template': 'off',
      'require-unicode-regexp': 'off',
      'import/consistent-type-specifier-style': 'off',
      'import/no-unassigned-import': 'off',
      'import/unambiguous': 'off',
      'jsdoc/require-param': 'off',
      'jsdoc/require-returns': 'off',
      'oxc/no-map-spread': 'off',
      'typescript/consistent-indexed-object-style': 'off',
      'typescript/explicit-function-return-type': 'off',
      'typescript/explicit-module-boundary-types': 'off',
      'typescript/method-signature-style': 'off',
      'typescript/no-confusing-void-expression': 'off',
      'typescript/no-misused-promises': 'off',
      'typescript/prefer-readonly': 'off',
      'typescript/prefer-regexp-exec': 'off',
      'typescript/strict-void-return': 'off',
      'unicorn/consistent-function-scoping': 'off',
      'unicorn/no-negated-condition': 'off',
      'unicorn/no-object-as-default-parameter': 'off',
      'unicorn/no-useless-undefined': 'off',
      'unicorn/prefer-dom-node-append': 'off',
      'unicorn/prefer-dom-node-remove': 'off',
      'unicorn/prefer-number-coercion': 'off',
      'unicorn/prefer-number-properties': 'off',
      'unicorn/prefer-set-has': 'off',
      'unicorn/prefer-spread': 'off',
      'unicorn/prefer-string-raw': 'off',
      'unicorn/prefer-string-replace-all': 'off',
      'unicorn/prefer-ternary': 'off',
      'vue/define-props-destructuring': 'off',
      'vue/max-props': 'off',
      'vue/next-tick-style': 'off',
    },
  },
  // client files
  {
    files: ['**/src/client/**/*.{ts,vue}'],
    plugins: ['vue'],
    rules: {
      'no-restricted-imports': [
        'error',
        '@vuepress/helper',
        '@vuepress/helper/node',
        'vuepress/core',
        'vuepress/markdown',
        'vuepress/utils',
      ],
      'typescript/no-floating-promises': [
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
    },
  },
  // component files
  {
    files: ['**/src/client/components/**/*.{ts,vue}'],
    plugins: ['vue'],
    rules: {
      'vue/require-default-prop': 'off',
      'unicorn/max-nested-calls': 'off',
    },
  },
  {
    files: ['tools/**/*.ts'],
    plugins: ['node'],
    rules: {
      // alow accessing env variables in tools
      'node/no-process-env': 'off',
    },
  },
  {
    files: ['tools/create-vuepress/**/*.ts', 'tools/vp-update/**/*.ts'],
    plugins: ['node'],
    rules: {
      'node/no-sync': 'off',
    },
  },
  {
    files: ['**/template/**'],
    rules: {
      // to simplify template code, we use some single-word component names
      // 'vue/multi-word-component-names': [
      //   'error',
      //   {
      //     ignores: ['Article', 'Category', 'Tag', 'Timeline'],
      //   },
      // ],
    },
  },
  {
    files: ['**/declare.ts'],
    rules: {
      // export {} are needed to become a module
      'unicorn/require-module-specifiers': 'off',
    },
  },
  {
    files: ['**/src/node/*Plugin.ts', '**/src/node/*Theme.ts'],
    rules: {
      // plugin entrypoints can be complex and have many dependencies,
      // as they need to export a function that returns a VuePress plugin
      'complexity': 'off',
      'max-dependencies': 'off',
      'max-lines-per-function': 'off',
      'import/max-dependencies': 'off',

      // jsdoc is not needed for plugin entrypoints, as the options are already typed
      // and a VuePress plugin type is expected to be returned
      'jsdoc/require-param': 'off',
      'jsdoc/require-returns': 'off',

      // avoid redundant return type annotations in plugin objects
      'typescript/explicit-function-return-type': [
        'warn',
        { allowExpressions: true },
      ],
    },
  },
)
