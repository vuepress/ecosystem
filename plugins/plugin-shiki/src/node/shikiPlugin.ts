import type { Plugin } from 'vuepress/core'
import { colors, logger } from 'vuepress/utils'
import { highlight } from './highlight.js'
import { highlightLinePlugin } from './markdown/highlightLines.js'
import { lineNumberPlugin } from './markdown/lineNumbers.js'
import { preWrapperPlugin } from './markdown/preWrapper.js'
import type { ShikiPluginOptions } from './types.js'

export const shikiPlugin = (options: ShikiPluginOptions = {}): Plugin => ({
  name: '@vuepress/plugin-shiki',

  extendsMarkdownOptions(options) {
    if (options.code) {
      logger.warn(
        `The \`markdown.code\` has been deprecated in vuepress, you should set it to \`false\`. see ${colors.cyan('https://v2.vuepress.vuejs.org/reference/config.html#markdown-code')}`,
      )
    }
  },

  extendsMarkdown: async (md) => {
    md.options.highlight = await highlight(options)

    md.use(highlightLinePlugin)
    md.use(preWrapperPlugin, options.vPre)
    md.use(lineNumberPlugin, options.lineNumbers)
  },
})
