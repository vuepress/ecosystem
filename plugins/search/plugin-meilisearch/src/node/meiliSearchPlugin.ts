import type { Plugin } from 'vuepress'
import { getDirname, path } from 'vuepress/utils'

import type { MeiliSearchPluginOptions } from './option.js'

const __dirname = getDirname(import.meta.url)

export const MeiliSearchPlugin = (
  options: MeiliSearchPluginOptions,
): Plugin => ({
  name: '@vuepress/plugin-meilisearch',

  define: {
    __MM_SEARCH__: options,
  },

  clientConfigFile: path.resolve(__dirname, '../client/config.js'),
})
