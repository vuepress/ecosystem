import type { Plugin } from 'vuepress/core'
import { getDirname, path } from 'vuepress/utils'
import { fileTree } from './fileTree.js'

const __dirname = import.meta.dirname || getDirname(import.meta.url)

const PLUGIN_NAME = '@vuepress/plugin-markdown-file-tree'

export const markdownFileTreePlugin = (): Plugin => ({
  name: PLUGIN_NAME,

  extendsMarkdown: (md) => {
    md.use(fileTree)
  },

  clientConfigFile: path.resolve(__dirname, '../client/config.js'),
})
