import {
  collapsedLines as collapsedLinesPlugin,
  lineNumbers as lineNumbersPlugin,
} from '@vuepress/highlighter-helper'
import type { Plugin } from 'vuepress/core'
import { loadLanguages } from './loadLanguages.js'
import { highlightPlugin, preWrapperPlugin } from './markdown/index.js'
import type { PrismjsPluginOptions } from './options.js'
import { prepareConfigFile } from './prepareConfigFile.js'
import { resolveHighlighter } from './resolveHighlighter.js'
import type { HighlightOptions, PreWrapperOptions } from './types.js'

export const prismjsPlugin = ({
  preloadLanguages = ['markdown', 'jsdoc', 'yaml'],
  preWrapper = true,
  lineNumbers = true,
  collapsedLines = false,
  ...options
}: PrismjsPluginOptions = {}): Plugin => ({
  name: '@vuepress/plugin-prismjs',

  extendsMarkdown(md) {
    if (preloadLanguages.length !== 0) {
      loadLanguages(preloadLanguages)
    }

    md.options.highlight = (code, lang) => {
      const highlighter = resolveHighlighter(lang)
      return highlighter?.(code) || ''
    }

    md.use<HighlightOptions>(highlightPlugin, options)
    md.use<PreWrapperOptions>(preWrapperPlugin, { preWrapper })
    if (preWrapper) {
      md.use(lineNumbersPlugin, { lineNumbers, removeLastLine: true })
      md.use(collapsedLinesPlugin, { collapsedLines })
    }
  },

  clientConfigFile: (app) => prepareConfigFile(app, options),
})
