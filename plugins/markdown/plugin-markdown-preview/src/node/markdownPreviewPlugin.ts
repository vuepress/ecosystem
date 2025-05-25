import type { Plugin } from 'vuepress/core'
import { getDirname, path } from 'vuepress/utils'

import { preview } from './preview.js'

const PLUGIN_NAME = '@vuepress/plugin-markdown-preview'

const __dirname = getDirname(import.meta.url)

export const markdownPreviewPlugin = (): Plugin => {
  return {
    name: PLUGIN_NAME,

    extendsMarkdown: (md) => {
      md.use(preview)
    },

    clientConfigFile: path.resolve(__dirname, '../client/config.js'),
  }
}
