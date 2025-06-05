import {
  codeBlockTitle as codeBlockTitlePlugin,
  collapsedLines as collapsedLinesPlugin,
  lineNumbers as lineNumbersPlugin,
} from '@vuepress/highlighter-helper'
import type { Plugin } from 'vuepress/core'
import { loadLanguages } from './loadLanguages.js'
import { highlightPlugin, preWrapperPlugin } from './markdown/index.js'
import type { PrismjsPluginOptions } from './options.js'
import { prepareClientConfigFile } from './prepareClientConfigFile.js'
import { resolveHighlighter } from './resolveHighlighter.js'

/**
 * VuePress plugin - prismjs
 *
 * VuePress 插件 - prismjs
 *
 * @param options - Plugin options / 插件选项
 * @returns VuePress plugin / VuePress 插件
 * @example
 * ```ts
 * import { prismjsPlugin } from '@vuepress/plugin-prismjs'
 *
 * export default {
 *   plugins: [
 *     prismjsPlugin({
 *       theme: 'nord',
 *       lineNumbers: true
 *     })
 *   ]
 * }
 * ```
 */
export const prismjsPlugin = (options: PrismjsPluginOptions = {}): Plugin => {
  const opt: PrismjsPluginOptions = {
    preloadLanguages: ['markdown', 'jsdoc', 'yaml'],
    preWrapper: true,
    lineNumbers: true,
    collapsedLines: 'disable',
    codeBlockTitle: true,
    ...options,
  }

  return {
    name: '@vuepress/plugin-prismjs',

    extendsMarkdown(md) {
      const {
        preloadLanguages,
        preWrapper,
        lineNumbers,
        collapsedLines,
        codeBlockTitle,
      } = opt

      if (preloadLanguages?.length) {
        loadLanguages(preloadLanguages)
      }

      md.options.highlight = (code, lang) => {
        const highlighter = resolveHighlighter(lang)
        return highlighter?.(code) || ''
      }

      md.use(highlightPlugin, opt)
      md.use(preWrapperPlugin, { preWrapper })
      if (preWrapper) {
        if (lineNumbers !== 'disable')
          md.use(lineNumbersPlugin, { lineNumbers, removeLastLine: true })
        if (collapsedLines !== 'disable')
          md.use(collapsedLinesPlugin, { collapsedLines, removeLastLine: true })

        md.use(codeBlockTitlePlugin, { codeBlockTitle })
      }
    },

    clientConfigFile: (app) => prepareClientConfigFile(app, opt),
  }
}
