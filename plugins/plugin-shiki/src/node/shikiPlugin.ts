import type { Plugin } from 'vuepress/core'
import { isPlainObject } from 'vuepress/shared'
import { highlight } from './highlight.js'
import {
  highlightLinesPlugin,
  lineNumberPlugin,
  preWrapperPlugin,
} from './markdown/index.js'
import type { ShikiPluginOptions } from './types.js'

export const shikiPlugin = (options: ShikiPluginOptions = {}): Plugin => ({
  name: '@vuepress/plugin-shiki',

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
