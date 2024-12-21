import type { Plugin } from 'vuepress/core'
import { getDirname, path } from 'vuepress/utils'

import { preview } from './demo.js'
import type { MarkdownPreviewPluginOptions } from './options.js'

const PLUGIN_NAME = '@vuepress/plugin-markdown-demo'

const __dirname = getDirname(import.meta.url)

export const markdownPreviewPlugin = ({
  delay = 500,
}: MarkdownPreviewPluginOptions): Plugin => {
  return {
    name: PLUGIN_NAME,

    define: {
      __PREVIEW_DELAY__: delay,
    },

    extendsMarkdown: (md) => {
      md.use(preview)
    },

    clientConfigFile: path.resolve(__dirname, '../client/config.js'),
  }
}
