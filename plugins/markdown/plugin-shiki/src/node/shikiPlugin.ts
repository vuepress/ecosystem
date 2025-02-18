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
import { TWOSLASH_RE, logger } from './utils.js'

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

    /**
     * Whether to enable the `v-pre` configuration of the code block
     */
    let enableVPre = true

    return {
      name: '@vuepress/plugin-shiki',

      extendsMarkdownOptions: (opts) => {
        /**
         * Turn off the `v-pre` configuration of the code block.
         */
        if (opts.vPre !== false) {
          const vPre = isPlainObject(opts.vPre) ? opts.vPre : { block: true }
          if (vPre.block) {
            opts.vPre ??= {}
            opts.vPre.block = false
          }
          enableVPre = vPre.block ?? true
        } else {
          enableVPre = false
        }
      },

      extendsMarkdown: async (md) => {
        const { preWrapper, lineNumbers, collapsedLines } = options

        const markdownFilePathGetter = createMarkdownFilePathGetter(md)
        const { highlighter, loadLang, extraTransformers } =
          await createShikiHighlighter(app, options, enableVPre)

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
            resolveLineNumbers(info) {
              return options.twoslash && TWOSLASH_RE.test(info)
                ? false
                : undefined
            },
          })
          md.use<MarkdownItCollapsedLinesOptions>(collapsedLinesPlugin, {
            collapsedLines,
          })
        }
      },

      clientConfigFile: () => prepareClientConfigFile(app, options),
    }
  }
}
