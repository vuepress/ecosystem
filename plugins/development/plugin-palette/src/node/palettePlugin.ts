import { addViteConfig, chainWebpack } from '@vuepress/helper'
import { watch } from 'chokidar'
import type { Plugin } from 'vuepress/core'

import { preparePaletteFile } from './preparePaletteFile.js'
import { presetOptions } from './presetOptions.js'

/**
 * Options of `@vuepress/plugin-palette`
 *
 * `@vuepress/plugin-palette` 插件配置项
 */
export interface PalettePluginOptions {
  /**
   * Preset of the palette
   *
   * 调色板预设
   *
   * @default 'css'
   */
  preset?: 'css' | 'less' | 'sass' | 'stylus'

  /**
   * File path of the user palette file, relative to source directory
   *
   * 用户调色板文件的路径，相对于源文件目录
   */
  userPaletteFile?: string

  /**
   * File path of the generated palette temp file, relative to temp directory
   *
   * 生成的调色板临时文件的路径，相对于临时文件目录
   */
  tempPaletteFile?: string

  /**
   * Function to generate import code
   *
   * 生成引入代码的函数
   */
  importCode?: (filePath: string) => string
}

/**
 * Create a palette plugin
 *
 * 创建调色板插件
 *
 * @example
 *   import { palettePlugin } from '@vuepress/plugin-palette'
 *
 *   export default {
 *     plugins: [
 *       palettePlugin({
 *         preset: 'sass',
 *       }),
 *     ],
 *   }
 */
export const palettePlugin = ({
  preset = 'css',
  userPaletteFile = presetOptions[preset].userPaletteFile,
  tempPaletteFile = presetOptions[preset].tempPaletteFile,
  importCode = presetOptions[preset].importCode,
}: PalettePluginOptions = {}): Plugin => ({
  name: '@vuepress/plugin-palette',

  alias: (app) => ({
    '@vuepress/plugin-palette/palette': app.dir.temp(tempPaletteFile),
  }),

  extendsBundlerOptions: (bundlerOptions, app) => {
    if (preset !== 'sass') return

    // silent import deprecation for vite
    addViteConfig(bundlerOptions, app, {
      css: {
        preprocessorOptions: {
          sass: {
            silenceDeprecations: ['import'],
          },
          scss: {
            silenceDeprecations: ['import'],
          },
        },
      },
    })
    // silent import deprecation for webpack
    chainWebpack(bundlerOptions, app, (webpackOptions) => {
      webpackOptions.module
        .rule('scss')
        .use('sass-loader')
        .tap((loaderOptions) => ({
          ...loaderOptions,
          // oxlint-disable-next-line typescript/no-unsafe-assignment
          sassOptions: {
            ...loaderOptions.sassOptions,
            silenceDeprecations: [
              'import',
              // oxlint-disable-next-line typescript/no-unsafe-assignment, typescript/no-unsafe-member-access
              ...(loaderOptions.sassOptions?.silenceDeprecations ?? []),
            ],
          },
        }))
    })
  },

  onPrepared: async (app) => {
    await preparePaletteFile(app, {
      userPaletteFile,
      tempPaletteFile,
      importCode,
    })
  },

  onWatched: (app, watchers) => {
    const paletteWatcher = watch(userPaletteFile, {
      cwd: app.dir.source(),
      ignoreInitial: true,
    })

    const handlePaletteChange = (): void => {
      void preparePaletteFile(app, {
        userPaletteFile,
        tempPaletteFile,
        importCode,
      })
    }

    paletteWatcher.on('add', handlePaletteChange)
    paletteWatcher.on('unlink', handlePaletteChange)

    watchers.push(paletteWatcher)
  },
})
