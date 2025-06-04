import { addViteConfig } from '@vuepress/helper'
import { watch } from 'chokidar'
import type { Plugin } from 'vuepress/core'
import { preparePaletteFile } from './preparePaletteFile.js'
import { prepareStyleFile } from './prepareStyleFile.js'
import { presetOptions } from './presetOptions.js'

/**
 * Options of @vuepress/plugin-palette
 *
 * @vuepress/plugin-palette 插件配置项
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
   * File path of the user style file, relative to source directory
   *
   * 用户样式文件的路径，相对于源文件目录
   */
  userStyleFile?: string

  /**
   * File path of the generated style temp file, relative to temp directory
   *
   * 生成的样式临时文件的路径，相对于临时文件目录
   */
  tempStyleFile?: string

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
 * @param [options={}] - plugin options / 插件选项
 *
 * @example
 * ```ts
 * import { palettePlugin } from '@vuepress/plugin-palette'
 *
 * export default {
 *   plugins: [
 *     palettePlugin({
 *       preset: 'sass'
 *     })
 *   ]
 * }
 * ```
 */
export const palettePlugin = ({
  preset = 'css',
  userPaletteFile = presetOptions[preset].userPaletteFile,
  tempPaletteFile = presetOptions[preset].tempPaletteFile,
  userStyleFile = presetOptions[preset].userStyleFile,
  tempStyleFile = presetOptions[preset].tempStyleFile,
  importCode = presetOptions[preset].importCode,
}: PalettePluginOptions = {}): Plugin => ({
  name: '@vuepress/plugin-palette',

  alias: (app) => ({
    '@vuepress/plugin-palette/palette': app.dir.temp(tempPaletteFile),
    '@vuepress/plugin-palette/style': app.dir.temp(tempStyleFile),
  }),

  extendsBundlerOptions: (bundlerOptions: unknown, app): void => {
    if (preset === 'sass') {
      // switch to modern api for vite
      addViteConfig(bundlerOptions, app, {
        css: {
          preprocessorOptions: {
            sass: {
              api: 'modern',
            },
            scss: {
              api: 'modern',
            },
          },
        },
      })
    }
  },

  onPrepared: async (app) => {
    await Promise.all([
      preparePaletteFile(app, {
        userPaletteFile,
        tempPaletteFile,
        importCode,
      }),
      prepareStyleFile(app, {
        userStyleFile,
        tempStyleFile,
        importCode,
      }),
    ])
  },

  onWatched: (app, watchers) => {
    const paletteWatcher = watch(userPaletteFile, {
      cwd: app.dir.source(),
      ignoreInitial: true,
    })
    paletteWatcher.on('add', () => {
      void preparePaletteFile(app, {
        userPaletteFile,
        tempPaletteFile,
        importCode,
      })
    })
    paletteWatcher.on('unlink', () => {
      void preparePaletteFile(app, {
        userPaletteFile,
        tempPaletteFile,
        importCode,
      })
    })
    watchers.push(paletteWatcher)

    const styleWatcher = watch(userStyleFile, {
      cwd: app.dir.source(),
      ignoreInitial: true,
    })
    styleWatcher.on('add', () => {
      void prepareStyleFile(app, {
        userStyleFile,
        tempStyleFile,
        importCode,
      })
    })
    styleWatcher.on('unlink', () => {
      void prepareStyleFile(app, {
        userStyleFile,
        tempStyleFile,
        importCode,
      })
    })
    watchers.push(styleWatcher)
  },
})
