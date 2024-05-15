import type { Plugin } from 'vuepress/core'
import { highlight } from './highlight.js'
import { highlightLinePlugin } from './markdown/highlightLines.js'
import { lineNumberPlugin } from './markdown/lineNumbers.js'
import { preWrapperPlugin } from './markdown/preWrapper.js'
import type { ShikiPluginOptions } from './types.js'

export const shikiPlugin = (options: ShikiPluginOptions = {}): Plugin => ({
  name: '@vuepress/plugin-shiki',

  extendsMarkdown: async (md) => {
    md.options.highlight = await highlight(options)

    md.use(highlightLinePlugin)
    md.use(preWrapperPlugin, options.vPre)
    md.use(lineNumberPlugin, options.lineNumbers)
  },
})
