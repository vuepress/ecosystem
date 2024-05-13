import type { Plugin } from 'vuepress/core'
import { highlight } from './highlight.js'
import type { ShikiPluginOptions } from './types.js'

export const shikiPlugin = (options: ShikiPluginOptions = {}): Plugin => ({
  name: '@vuepress/plugin-shiki',

  extendsMarkdown: async (md) => {
    md.options.highlight = await highlight(options)
  },
})
