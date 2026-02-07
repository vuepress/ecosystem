import type { MarkdownItKatexOptions } from '@mdit/plugin-katex-slim'
import { katex } from '@mdit/plugin-katex-slim'
import type { MathjaxInstance } from '@mdit/plugin-mathjax-slim'
import { createMathjaxInstance, mathjax } from '@mdit/plugin-mathjax-slim'
import {
  addCustomElement,
  deepAssign,
  isModuleAvailable,
} from '@vuepress/helper'
import type { Plugin } from 'vuepress/core'
import type { MarkdownEnv } from 'vuepress/markdown'
import { colors, logger } from 'vuepress/utils'
import type {
  MarkdownKatexPluginOptions,
  MarkdownMathPluginOptions,
  MarkdownMathjaxPluginOptions,
} from './options.js'
import {
  prepareClientConfigFile,
  prepareMathjaxStyle,
} from './prepare/index.js'
import { PLUGIN_NAME } from './utils.js'

declare module 'vuepress/markdown' {
  interface MarkdownOptions {
    math?: MarkdownMathPluginOptions
  }
}

/**
 * Math plugin for VuePress
 *
 * VuePress 数学插件
 *
 * @param [mathOptions={}] - Plugin options / 插件选项
 * @param mathOptions.type - Math renderer type / 数学渲染器类型
 *
 * @example
 * ```ts
 * import { markdownMathPlugin } from '@vuepress/plugin-markdown-math'
 *
 * export default {
 *   plugins: [
 *     markdownMathPlugin({
 *       type: 'katex'
 *     })
 *   ]
 * }
 * ```
 */
export const markdownMathPlugin =
  (mathOptions: MarkdownMathPluginOptions = {}): Plugin =>
  (app) => {
    const opts = deepAssign({}, app.options.markdown.math, mathOptions)
    app.options.markdown.math = opts

    const { type, ...options } = opts

    const isMathjaxInstalled = isModuleAvailable('@mathjax/src', import.meta)
    const isKatexInstalled = isModuleAvailable('katex', import.meta)

    const mathRenderer =
      type === 'katex' && isKatexInstalled
        ? 'katex'
        : type === 'mathjax' && isMathjaxInstalled
          ? 'mathjax'
          : isMathjaxInstalled
            ? 'mathjax'
            : isKatexInstalled
              ? 'katex'
              : null

    if (!mathRenderer || (type && mathRenderer !== type)) {
      const packages = { katex: 'katex', mathjax: '@mathjax/src' }
      logger.error(
        mathRenderer
          ? `type is "${type}", but "${packages[type!]}" is not installed`
          : 'No math renderer found, please install @mathjax/src or katex',
      )

      return {
        name: PLUGIN_NAME,
      }
    }

    let mathjaxInstance: MathjaxInstance | null

    return {
      name: PLUGIN_NAME,

      extendsBundlerOptions: (bundlerOptions) => {
        if (mathRenderer === 'mathjax') {
          addCustomElement(bundlerOptions, app, /^mjx-/)
        }
      },

      extendsMarkdown: async (md) => {
        if (mathRenderer === 'mathjax') {
          mathjaxInstance = await createMathjaxInstance({
            ...(options as MarkdownMathjaxPluginOptions),
            transformer: (content: string) =>
              content.replace(/^<mjx-container/, '<mjx-container v-pre'),
          })
          md.use(mathjax, mathjaxInstance)
          // Reset mathjax style in each render
          md.use((mdIt) => {
            const originalRender = mdIt.render.bind(mdIt)

            mdIt.render = (src: string, env: unknown): string => {
              const result = originalRender(src, env)

              // markdown render may be called after mathjaxInstance is released
              // but the style is already prepared in onPrepared hook
              // it's safe to use optional chaining here
              mathjaxInstance?.reset()

              return result
            }
          })
        } else {
          if ((options as MarkdownKatexPluginOptions).mhchem) {
            await import('@mdit/plugin-katex-slim/mhchem')
          }

          md.use<MarkdownItKatexOptions<MarkdownEnv>>(katex, {
            logger: (errorCode, errorMsg, token, { filePathRelative }) => {
              // Ignore this error
              if (errorCode === 'newLineInDisplayMode') return

              if (errorCode === 'unicodeTextInMathMode')
                logger.warn(
                  `Found unicode character ${token.text} inside tex${
                    filePathRelative
                      ? ` in ${colors.cyan(filePathRelative)}`
                      : ''
                  }. You should use ${colors.magenta(`\\text{${token.text}}`)}`,
                )
              else
                logger.warn(
                  `${errorMsg}.${
                    filePathRelative
                      ? `\nFound in ${colors.cyan(filePathRelative)}`
                      : ''
                  }`,
                )
            },
            ...(options as Omit<MarkdownKatexPluginOptions, 'type'>),
            transformer: (content) =>
              content.replaceAll(/^(<[a-z]+ )/g, '$1v-pre '),
          })
        }
      },

      onPrepared: async () => {
        if (mathRenderer === 'mathjax') {
          await prepareMathjaxStyle(app, mathjaxInstance!)
          // release mathjaxInstance in build mode to reduce memory
          if (app.env.isBuild) mathjaxInstance = null
        }
      },

      clientConfigFile: () =>
        prepareClientConfigFile(app, mathRenderer, options),
    }
  }
