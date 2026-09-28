import { isModuleAvailable } from '@vuepress/helper'
import type {
  MarkdownItCodeBlockTitleOptions,
  MarkdownItCollapsedLinesOptions,
  MarkdownItLineNumbersOptions,
} from '@vuepress/highlighter-helper'
import {
  codeBlockTitle as codeBlockTitlePlugin,
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
  highlightLinePlugin,
  preWrapperPlugin,
} from './markdown/index.js'
import type { ShikiPluginOptions } from './options.js'
import { prepareClientConfigFile } from './prepareClientConfigFile.js'
import type { CodeThemeColors } from './themeColors.js'
import { resolveCodeThemeColors } from './themeColors.js'
import { TWOSLASH_RE, logger } from './utils.js'

/**
 * Shiki plugin for VuePress
 *
 * VuePress 的 Shiki 插件
 *
 * @example
 *   import { shikiPlugin } from '@vuepress/plugin-shiki'
 *
 *   export default {
 *     plugins: [
 *       shikiPlugin({
 *         langs: ['ts', 'json', 'vue', 'md', 'bash', 'diff'],
 *         theme: 'nord',
 *         lineNumbers: true,
 *       }),
 *     ],
 *   }
 */
export const shikiPlugin =
  (options: ShikiPluginOptions = {}): Plugin =>
  (app) => {
    // TODO: Remove in stable version
    // oxlint-disable-next-line typescript/no-deprecated
    const { code } = app.options.markdown
    const shikiOptions = {
      ...(isPlainObject(code) ? code : {}),
      ...options,
    }

    shikiOptions.logLevel ??= app.env.isDebug ? 'debug' : 'warn'
    shikiOptions.preWrapper ??= true
    shikiOptions.lineNumbers ??= true
    shikiOptions.collapsedLines ??= 'disable'
    shikiOptions.codeBlockTitle ??= true

    if (
      shikiOptions.twoslash &&
      !isModuleAvailable('@vuepress/shiki-twoslash', import.meta)
    ) {
      logger.error(
        `${colors.cyan('twoslash')} is enabled, but ${colors.magenta('@vuepress/shiki-twoslash')} is not installed, please install it manually`,
      )
      shikiOptions.twoslash = false
    }

    /** Whether to enable the `v-pre` configuration of the code block */
    let enableVPre = true

    /**
     * Base colors of the code blocks of the themes
     *
     * They are resolved together with the highlighter, which reads the
     * background and the foreground of a theme. The `extendsMarkdown` hook runs
     * before `clientConfigFile`, which needs the colors to write them to the
     * temp folder.
     *
     * 主题中代码块的基础颜色
     *
     * 它们与高亮器一同解析，后者会读取主题的背景与前景颜色。`extendsMarkdown` 钩子在 `clientConfigFile`
     * 之前运行，而后者的写入临时目录需要这些颜色。
     */
    let codeThemeColors: {
      dark: CodeThemeColors | null
      light: CodeThemeColors | null
    } = { dark: null, light: null }

    return {
      name: '@vuepress/plugin-shiki',

      extendsMarkdownOptions: (opts) => {
        /** Turn off the `v-pre` configuration of the code block. */
        if (opts.vPre === false) {
          enableVPre = false
        } else {
          const vPre = isPlainObject(opts.vPre) ? opts.vPre : { block: true }
          if (vPre.block) {
            opts.vPre ??= {}
            opts.vPre.block = false
          }
          enableVPre = vPre.block ?? true
        }
      },

      extendsMarkdown: async (md) => {
        const { preWrapper, lineNumbers, collapsedLines, codeBlockTitle } =
          shikiOptions

        const markdownFilePathGetter = createMarkdownFilePathGetter(md)
        const { highlighter, loadLang, extraTransformers } =
          await createShikiHighlighter(app, shikiOptions, enableVPre)

        codeThemeColors = resolveCodeThemeColors(highlighter, shikiOptions)

        md.options.highlight = getHighLightFunction(
          highlighter,
          shikiOptions,
          extraTransformers,
          loadLang,
          markdownFilePathGetter,
        )
        md.use(highlightLinePlugin)
        md.use<MarkdownItPreWrapperOptions>(preWrapperPlugin, { preWrapper })
        if (preWrapper) {
          md.use<MarkdownItLineNumbersOptions>(lineNumbersPlugin, {
            lineNumbers,
            resolveLineNumbers(info) {
              return shikiOptions.twoslash && TWOSLASH_RE.test(info)
                ? false
                : undefined
            },
          })
          md.use<MarkdownItCollapsedLinesOptions>(collapsedLinesPlugin, {
            collapsedLines,
          })
          md.use<MarkdownItCodeBlockTitleOptions>(codeBlockTitlePlugin, {
            codeBlockTitle,
          })
        }
      },

      clientConfigFile: () =>
        prepareClientConfigFile(app, shikiOptions, codeThemeColors),
    }
  }
