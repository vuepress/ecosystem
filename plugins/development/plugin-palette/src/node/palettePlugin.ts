import { addViteConfig } from '@vuepress/helper'
import { watch } from 'chokidar'
import type { Plugin } from 'vuepress/core'
import { preparePaletteFile } from './preparePaletteFile.js'
import { prepareStyleFile } from './prepareStyleFile.js'
import { presetOptions } from './presetOptions.js'

/**
 * Options of @vuepress/plugin-palette
 */
export interface PalettePluginOptions {
  /**
   * Preset of the palette
   *
   * @default 'css'
   */
  preset?: 'css' | 'less' | 'sass' | 'stylus'

  /**
   * File path of the user palette file, relative to source directory
   */
  userPaletteFile?: string

  /**
   * File path of the generated palette temp file, relative to temp directory
   */
  tempPaletteFile?: string

  /**
   * File path of the user style file, relative to source directory
   */
  userStyleFile?: string

  /**
   * File path of the generated style temp file, relative to temp directory
   */
  tempStyleFile?: string

  /**
   * Function to generate import code
   */
  importCode?: (filePath: string) => string
}

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
