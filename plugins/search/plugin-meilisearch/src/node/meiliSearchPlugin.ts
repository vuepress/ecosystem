import type { Plugin } from 'vuepress'
import { getDirname, path } from 'vuepress/utils'

import type { MeiliSearchDocSearchOptions } from '../shared'

const __dirname = getDirname(import.meta.url)

export const meiliSearchPlugin = (
  options: MeiliSearchDocSearchOptions,
): Plugin => ({
  name: '@vuepress/plugin-meilisearch',

  define: {
    __MM_SEARCH__: options,
  },

  clientConfigFile: path.resolve(__dirname, '../client/config.js'),
})
