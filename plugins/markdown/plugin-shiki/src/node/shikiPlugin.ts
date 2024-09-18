import {
  collapsedLines as collapsedLinesPlugin,
  lineNumbers as lineNumbersPlugin,
} from '@vuepress/highlighter-helper'
import type { Plugin } from 'vuepress/core'
import { isPlainObject } from 'vuepress/shared'
import {
  applyHighlighter,
  highlightLinesPlugin,
  preWrapperPlugin,
} from './markdown/index.js'
import type { ShikiPluginOptions } from './options.js'
import { prepareConfigFile } from './prepareConfigFile.js'

export const shikiPlugin = (options: ShikiPluginOptions = {}): Plugin => {
  const opt: ShikiPluginOptions = {
    preWrapper: true,
    lineNumbers: true,
    collapsedLines: 'disable',
    ...options,
  }

  return {
    name: '@vuepress/plugin-shiki',

    extendsMarkdown: async (md, app) => {
      // FIXME: Remove in stable version
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      const { code } = app.options.markdown

      await applyHighlighter(md, app, {
        ...(isPlainObject(code) ? code : {}),
        ...options,
      })

      const { preWrapper, lineNumbers, collapsedLines } = opt

      md.use(highlightLinesPlugin)
      md.use(preWrapperPlugin, { preWrapper })
      if (preWrapper) {
        if (lineNumbers !== 'disable')
          md.use(lineNumbersPlugin, { lineNumbers })
        if (collapsedLines !== 'disable')
          md.use(collapsedLinesPlugin, { collapsedLines })
      }
    },

    clientConfigFile: (app) => prepareConfigFile(app, opt),
  }
}
