import type { Plugin } from 'vuepress/core'
import { getDirname, path } from 'vuepress/utils'
import type { MediaPluginOptions } from './options.js'

const __dirname = import.meta.dirname || getDirname(import.meta.url)

export const mediaPlugin = (options: MediaPluginOptions = {}): Plugin => ({
  name: '@vuepress/plugin-media',

  clientConfigFile: path.resolve(__dirname, '../client/config.js'),

  define: getDefine(options),
})
