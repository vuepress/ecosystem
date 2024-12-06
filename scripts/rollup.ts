import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import type { ModuleSideEffectsOption, RollupOptions } from 'rollup'
import dts from 'rollup-plugin-dts'
// eslint-disable-next-line import/no-rename-default
import esbuild from 'rollup-plugin-esbuild'
import { shebang } from 'rollup-plugin-resolve-shebang'

export interface FileInfo {
  base: string
  files: string[]
  target?: string
}

export interface BundleOptions {
  dts?: boolean
  external?: (RegExp | string)[]
  dtsExternal?: (RegExp | string)[]
  resolve?: boolean
  output?: Record<string, unknown>
  inlineDynamicImports?: boolean
  moduleSideEffects?: ModuleSideEffectsOption
  preserveShebang?: boolean
  define?: Record<string, string>
}

export const rollupBundle = (
  filePath: FileInfo | string,
  {
    define,
    dts: enableDts = typeof filePath === 'object'
      ? !filePath.base.startsWith('cli/') && filePath.base !== 'cli'
      : !filePath.startsWith('cli/'),
    external = [],
    dtsExternal = [],
    resolve = false,
    output = {},
    inlineDynamicImports = typeof filePath !== 'object',
    moduleSideEffects = (id): boolean =>
      id.endsWith('.css') || id.endsWith('.scss'),
    preserveShebang = typeof filePath === 'object'
      ? filePath.base.startsWith('cli')
      : filePath.startsWith('cli/'),
  }: BundleOptions = {},
): RollupOptions[] => [
  {
    input:
      typeof filePath === 'object'
        ? Object.fromEntries(
            filePath.files.map((item) => [
              item,
              `./src/${filePath.base}/${item}.ts`,
            ]),
          )
        : `./src/${filePath}.ts`,

    output: [
      {
        ...(typeof filePath === 'object'
          ? {
              dir: `./lib/${filePath.target ?? filePath.base}`,
              entryFileNames: '[name].js',
            }
          : { file: `./lib/${filePath}.js` }),
        format: 'esm',
        sourcemap: true,
        exports: 'named',
        inlineDynamicImports,
        ...output,
      },
    ],

    plugins: [
      preserveShebang ? shebang() : null,
      ...(resolve ? [nodeResolve({ preferBuiltins: true }), commonjs()] : []),
      esbuild({
        charset: 'utf8',
        minify: true,
        target: 'node18.19.0',
        define,
        loaders: {
          '.json': 'json',
        },
      }),
    ],

    external: [
      resolve
        ? []
        : (
              typeof filePath === 'object'
                ? filePath.base.startsWith('client')
                : filePath.startsWith('client/')
            )
          ? [
              /^@temp/,
              '@vuepress/helper/client',
              '@vuepress/helper/shared',
              '@vueuse/core',
              'vue',
              'vuepress/client',
              'vuepress/shared',
              /\.s?css$/,
            ]
          : (
                typeof filePath === 'object'
                  ? filePath.base.startsWith('node') ||
                    filePath.base.startsWith('cli')
                  : filePath.startsWith('node/') || filePath.startsWith('cli/')
              )
            ? [
                /^node:/,
                '@vuepress/highlighter-helper',
                '@vuepress/helper',
                '@vuepress/helper/shared',
                /^@vuepress\/plugin-/,
                'vuepress/cli',
                'vuepress/core',
                'vuepress/markdown',
                'vuepress/shared',
                'vuepress/utils',
              ]
            : [],
      external,
    ].flat(),

    treeshake: {
      moduleSideEffects,
      preset: 'smallest',
    },
  },
  ...(enableDts
    ? [
        {
          input:
            typeof filePath === 'object'
              ? Object.fromEntries(
                  filePath.files.map((item) => [
                    item,
                    `./src/${filePath.base}/${item}.ts`,
                  ]),
                )
              : `./src/${filePath}.ts`,
          output: [
            {
              ...(typeof filePath === 'object'
                ? {
                    dir: `./lib/${filePath.target ?? filePath.base}`,
                    entryFileNames: '[name].d.ts',
                  }
                : { file: `./lib/${filePath}.d.ts` }),

              format: 'esm',
            },
          ],
          plugins: [
            dts({
              compilerOptions: {
                preserveSymlinks: false,
              },
            }),
          ],
          external: [
            resolve
              ? []
              : (
                    typeof filePath === 'object'
                      ? filePath.base.startsWith('client')
                      : filePath.startsWith('client/')
                  )
                ? [/^@temp/, 'vuepress/client', 'vuepress/shared', /\.s?css$/]
                : (
                      typeof filePath === 'object'
                        ? filePath.base.startsWith('node')
                        : filePath.startsWith('node/')
                    )
                  ? [
                      /^node:/,
                      'vuepress/cli',
                      'vuepress/core',
                      'vuepress/markdown',
                      'vuepress/shared',
                      'vuepress/utils',
                    ]
                  : [],
            dtsExternal,
          ].flat(),
        } as RollupOptions,
      ]
    : []),
]
