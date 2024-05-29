import type { Plugin } from 'vuepress/core'
import { isPlainObject } from 'vuepress/shared'
import {
  highlightLinesPlugin,
  lineNumberPlugin,
  preWrapperPlugin,
} from './markdown/index.js'
import { resolveHighlight } from './resolveHighlight.js'
import type {
  LineNumberOptions,
  PreWrapperOptions,
  ShikiHighlightOptions,
} from './types.js'

/**
 * Options of @vuepress/plugin-shiki
 */
export type ShikiPluginOptions = ShikiHighlightOptions &
  PreWrapperOptions &
  LineNumberOptions

export const shikiPlugin = ({
  preWrapper = true,
  lineNumbers = true,
  ...options
}: ShikiPluginOptions = {}): Plugin => ({
  name: '@vuepress/plugin-shiki',

  extendsMarkdown: async (md, app) => {
    const { code } = app.options.markdown

    md.options.highlight = await resolveHighlight({
      ...(isPlainObject(code) ? code : {}),
      ...options,
    })

    md.use(highlightLinesPlugin)
    md.use<PreWrapperOptions>(preWrapperPlugin, { preWrapper })
    if (preWrapper) {
      md.use<LineNumberOptions>(lineNumberPlugin, { lineNumbers })
    }
  },
})
