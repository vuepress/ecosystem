import { copyCodeButtonPlugin } from '@vuepress/highlight-helper'
import type { CopyCodeButtonOptions } from '@vuepress/highlight-helper'
import type { Plugin } from 'vuepress/core'
import { loadLanguages } from './loadLanguages.js'
import {
  highlightPlugin,
  lineNumbersPlugin,
  preWrapperPlugin,
} from './markdown/index.js'
import { resolveHighlighter } from './resolveHighlighter.js'
import type {
  HighlightOptions,
  LineNumbersOptions,
  PreWrapperOptions,
} from './types.js'

/**
 * Options of @vuepress/plugin-prismjs
 */
export interface PrismjsPluginOptions
  extends PreWrapperOptions,
    LineNumbersOptions,
    HighlightOptions {
  /**
   * Languages to preload
   *
   * Workaround for prismjs language reloading issue
   *
   * @default ['markdown', 'jsdoc', 'yaml']
   * @see https://github.com/PrismJS/prism/issues/2716
   */
  preloadLanguages?: string[]

  /**
   * Add copy code button
   *
   * @default true
   */
  copyCodeButton?: boolean | CopyCodeButtonOptions
}

export const prismjsPlugin = ({
  preloadLanguages = ['markdown', 'jsdoc', 'yaml'],
  preWrapper = true,
  lineNumbers = true,
  copyCodeButton = true,
  ...options
}: PrismjsPluginOptions = {}): Plugin => ({
  name: '@vuepress/plugin-prismjs',

  extendsMarkdown(md, app) {
    if (preloadLanguages?.length !== 0) {
      loadLanguages(preloadLanguages)
    }

    md.options.highlight = (code, lang) => {
      const highlighter = resolveHighlighter(lang)
      return highlighter?.(code) || ''
    }

    md.use<HighlightOptions>(highlightPlugin, options)
    md.use<PreWrapperOptions>(preWrapperPlugin, { preWrapper })

    if (preWrapper) {
      copyCodeButtonPlugin(md, app, copyCodeButton)
      md.use<LineNumbersOptions>(lineNumbersPlugin, { lineNumbers })
    }
  },
})
