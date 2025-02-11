import { isModuleAvailable } from '@vuepress/helper'
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
import { colors } from 'vuepress/utils'
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
import { logger } from './utils.js'

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

    if (
      options.twoslash &&
      !isModuleAvailable('@vuepress/shiki-twoslash', import.meta)
    ) {
      logger.error(
        `${colors.cyan('twoslash')} is enabled, but ${colors.magenta('@vuepress/shiki-twoslash')} is not installed, please install it manually`,
      )
      options.twoslash = false
    }

    return {
      name: '@vuepress/plugin-shiki',

      extendsMarkdown: async (md) => {
        const { preWrapper, lineNumbers, collapsedLines } = options

        const markdownFilePathGetter = createMarkdownFilePathGetter(md)
        const { highlighter, loadLang, extraTransformers } =
          await createShikiHighlighter(options)

        md.options.highlight = getHighLightFunction(
          highlighter,
          options,
          extraTransformers,
          loadLang,
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

      extendsMarkdownOptions: (opts) => {
        /**
         * After injecting twoslash & floating-vue,
         * it is necessary to turn off the `v-pre` configuration of the code block.
         */
        if (options.twoslash && opts.vPre !== false) {
          const vPre = isPlainObject(opts.vPre) ? opts.vPre : { block: true }
          if (vPre.block) {
            opts.vPre ??= {}
            opts.vPre.block = false
          }
        }
      },

      clientConfigFile: () => prepareClientConfigFile(app, options),
    }
  }
}
