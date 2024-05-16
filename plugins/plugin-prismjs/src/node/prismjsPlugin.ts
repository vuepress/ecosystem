import type { Plugin } from 'vuepress/core'
import { colors, logger } from 'vuepress/utils'
import { loadLanguages } from './loadLanguages.js'
import { preWrapperPlugin } from './markdown/index.js'
import { resolveHighlighter } from './resolveHighlighter.js'
import type { PreWrapperOptions } from './types.js'

/**
 * Options of @vuepress/plugin-prismjs
 */
export interface PrismjsPluginOptions extends PreWrapperOptions {
  /**
   * Languages to preload
   *
   * Workaround for prismjs language reloading issue
   *
   * @default ['markdown', 'jsdoc', 'yaml']
   * @see https://github.com/PrismJS/prism/issues/2716
   */
  preloadLanguages?: string[]
}

export const prismjsPlugin = ({
  preloadLanguages = ['markdown', 'jsdoc', 'yaml'],
  ...preWrapperOptions
}: PrismjsPluginOptions = {}): Plugin => ({
  name: '@vuepress/plugin-prismjs',

  extendsMarkdownOptions(options) {
    if (options.code) {
      logger.warn(
        `The \`markdown.code\` has been deprecated in vuepress, you should set it to \`false\`. see ${colors.cyan('https://v2.vuepress.vuejs.org/reference/config.html#markdown-code')}`,
      )
    }
  },

  extendsMarkdown(md) {
    if (preloadLanguages?.length !== 0) {
      loadLanguages(preloadLanguages)
    }

    md.options.highlight = (code, lang) => {
      const highlighter = resolveHighlighter(lang)
      return highlighter?.(code) || ''
    }

    md.use(preWrapperPlugin, preWrapperOptions)
  },
})
