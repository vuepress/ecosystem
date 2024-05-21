import { copyCodeButtonPlugin } from '@vuepress/highlight-helper'
import type { CopyCodeButtonOptions } from '@vuepress/highlight-helper'
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
export interface ShikiPluginOptions
  extends ShikiHighlightOptions,
    PreWrapperOptions,
    LineNumberOptions {
  /**
   * Add copy code button
   *
   * @default true
   */
  copyCodeButton?: boolean | CopyCodeButtonOptions
}

export const shikiPlugin = ({
  preWrapper = true,
  lineNumbers = true,
  copyCodeButton = true,
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
    md.use<PreWrapperOptions>(preWrapperPlugin, {
      preWrapper,
    })
    if (preWrapper) {
      copyCodeButtonPlugin(md, app, copyCodeButton)
      md.use<LineNumberOptions>(lineNumberPlugin, { lineNumbers })
    }
  },
})
