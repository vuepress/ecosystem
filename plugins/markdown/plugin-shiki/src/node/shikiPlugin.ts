import type { Plugin } from 'vuepress/core'
import type { MarkdownEnv } from 'vuepress/markdown'
import { isPlainObject } from 'vuepress/shared'
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
    const logLevel = _logLevel ?? app.env.isDebug ? 'debug' : 'warn'
    const store: { path?: string | null } = {}

    md.options.highlight = await resolveHighlight(
      {
        ...(isPlainObject(code) ? code : {}),
        ...options,
      },
      logLevel,
      store,
    )

    md.use(highlightLinesPlugin)
    md.use(preWrapperPlugin, { preWrapper })
    if (preWrapper) {
      md.use(lineNumberPlugin, { lineNumbers })
    }

    if (logLevel === 'debug') {
      const rawRender = md.render

      md.render = (src, env: MarkdownEnv) => {
        // store file path before each render
        store.path = env.filePathRelative

        return rawRender(src, env)
      }
    }
  },
})
