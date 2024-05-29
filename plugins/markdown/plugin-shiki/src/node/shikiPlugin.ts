import type { Plugin } from 'vuepress/core'
import { isPlainObject } from 'vuepress/shared'
import { createHighlightLogger } from './highlightLogger.js'
import {
  highlightLinesPlugin,
  lineNumberPlugin,
  preWrapperPlugin,
} from './markdown/index.js'
import type { ShikiPluginOptions } from './options.js'
import { resolveHighlight } from './resolveHighlight.js'

export const shikiPlugin = ({
  preWrapper = true,
  lineNumbers = true,
  logLevel: _logLevel,
  ...options
}: ShikiPluginOptions = {}): Plugin => ({
  name: '@vuepress/plugin-shiki',

  extendsMarkdown: async (md, app) => {
    const { code } = app.options.markdown
    const logLevel = _logLevel ?? (app.env.isDebug ? 'debug' : 'warn')

    md.options.highlight = await resolveHighlight(
      {
        ...(isPlainObject(code) ? code : {}),
        ...options,
      },
      createHighlightLogger(md, logLevel),
    )

    md.use(highlightLinesPlugin)
    md.use(preWrapperPlugin, { preWrapper })
    if (preWrapper) {
      md.use(lineNumberPlugin, { lineNumbers })
    }
  },
})
