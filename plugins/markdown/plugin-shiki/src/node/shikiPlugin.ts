import type {
  MarkdownItCollapsedLinesOptions,
  MarkdownItLineNumbersOptions,
} from '@vuepress/highlighter-helper'
import {
  collapsedLines as collapsedLinesPlugin,
  lineNumbers as lineNumbersPlugin,
} from '@vuepress/highlighter-helper'
import type { Plugin } from 'vuepress/core'
import { isPlainObject } from 'vuepress/shared'
import type { MarkdownItPreWrapperOptions } from './markdown/index.js'
import {
  applyHighlighter,
  highlightLinesPlugin,
  preWrapperPlugin,
} from './markdown/index.js'
import type { ShikiPluginOptions } from './options.js'
import { prepareClientConfigFile } from './prepareClientConfigFile.js'

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
      md.use<MarkdownItPreWrapperOptions>(preWrapperPlugin, { preWrapper })
      if (preWrapper) {
        md.use<MarkdownItLineNumbersOptions>(lineNumbersPlugin, {
          lineNumbers,
        })
        md.use<MarkdownItCollapsedLinesOptions>(collapsedLinesPlugin, {
          collapsedLines,
        })
      }
    },

    clientConfigFile: (app) => prepareClientConfigFile(app, opt),
  }
}
