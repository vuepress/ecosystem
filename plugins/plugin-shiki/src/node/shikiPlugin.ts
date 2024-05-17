import type { Plugin } from 'vuepress/core'
import { isPlainObject } from 'vuepress/shared'
import { colors, logger } from 'vuepress/utils'
import { highlight } from './highlight.js'
import {
  highlightLinesPlugin,
  lineNumberPlugin,
  preWrapperPlugin,
} from './markdown/index.js'
import type { ShikiPluginOptions } from './types.js'

export const shikiPlugin = (options: ShikiPluginOptions = {}): Plugin => ({
  name: '@vuepress/plugin-shiki',

  extendsMarkdownOptions(options) {
    if (options.code) {
      logger.warn(
        `${colors.magenta('markdown.code')} options is deprecated, see ${colors.cyan('https://v2.vuepress.vuejs.org/reference/config.html#markdown-code')}`,
      )
    }
  },

  extendsMarkdown: async (md, app) => {
    const { code } = app.options.markdown

    md.options.highlight = await highlight({
      ...(isPlainObject(code) ? code : {}),
      ...options,
    })

    md.use(highlightLinesPlugin)
    md.use(preWrapperPlugin, options)
    if (options.preWrapper ?? true) {
      md.use(lineNumberPlugin, options.lineNumbers)
    }
  },
})
