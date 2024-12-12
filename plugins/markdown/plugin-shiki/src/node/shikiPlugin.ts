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
import { createMarkdownFilePathGetter } from './markdown/highlighter/createMarkdownFilePathGetter.js'
import type { MarkdownItPreWrapperOptions } from './markdown/index.js'
import {
  createShikiHighlighter,
  getHighLightFunction,
  highlightLinesPlugin,
  preWrapperPlugin,
} from './markdown/index.js'
import type { ShikiPluginOptions } from './options.js'
import { prepareClientConfigFile } from './prepareClientConfigFile.js'

export const shikiPlugin = (_options: ShikiPluginOptions = {}): Plugin => {
  return (app) => {
    // FIXME: Remove in stable version
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    const { code } = app.options.markdown
    const options = {
      ...(isPlainObject(code) ? code : {}),
      ..._options,
    }

    options.logLevel ??= app.env.isDebug ? 'debug' : 'warn'
    options.preWrapper ??= true
    options.lineNumbers ??= true
    options.collapsedLines ??= 'disable'

    return {
      name: '@vuepress/plugin-shiki',

      extendsMarkdown: async (md) => {
        const { preWrapper, lineNumbers, collapsedLines } = options

        const markdownFilePathGetter = createMarkdownFilePathGetter(md)
        const shikiHighlighter = await createShikiHighlighter(options)

        md.options.highlight = getHighLightFunction(
          shikiHighlighter,
          options,
          markdownFilePathGetter,
        )

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

      clientConfigFile: (app) => prepareClientConfigFile(app, options),
    }
  }
}
