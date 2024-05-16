import { katex } from '@mdit/plugin-katex-slim'
import { createMathjaxInstance, mathjax } from '@mdit/plugin-mathjax-slim'
import { getInstalledStatus } from '@vuepress/helper'
import type { Plugin } from 'vuepress/core'
import { colors, logger } from 'vuepress/utils'
import type {
  MarkdownMathjaxPluginOptions,
  MarkdownMathPluginOptions,
} from './options.js'
import {
  prepareClientConfigFile,
  prepareMathjaxStyle,
} from './prepare/index.js'
import { PLUGIN_NAME } from './utils.js'

export const markdownMathPlugin = ({
  type,
  ...options
}: MarkdownMathPluginOptions): Plugin => {
  const isMathjaxInstalled = getInstalledStatus('mathjax-full', import.meta.url)
  const isKatexInstalled = getInstalledStatus('katex', import.meta.url)

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

  if (!mathRenderer) {
    logger.error('No math renderer found, please install mathjax or katex')

    return {
      name: PLUGIN_NAME,
    }
  }

  const mathjaxInstance =
    mathRenderer === 'mathjax'
      ? createMathjaxInstance({
          ...(options as MarkdownMathjaxPluginOptions),
        })
      : null

  return {
    name: PLUGIN_NAME,

    extendsMarkdown: (md) => {
      if (mathRenderer === 'mathjax') {
        md.use(mathjax, mathjaxInstance!)
        // Reset mathjax style in each render
        md.use((md) => {
          const originalRender = md.render.bind(md)

          md.render = (src: string, env: unknown): string => {
            const result = originalRender(src, env)

            mathjaxInstance!.reset()

            return result
          }
        })
      } else {
        md.use(katex, {
          logger: (errorCode, errorMsg, token, { filePathRelative }) => {
            // Ignore this error
            if (errorCode === 'newLineInDisplayMode') return

            if (errorCode === 'unicodeTextInMathMode')
              logger.warn(
                `Found unicode character ${token.text} inside tex${
                  filePathRelative ? ` in ${colors.cyan(filePathRelative)}` : ''
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
          ...options,
        })
      }
    },

    onPrepared: async (app) => {
      if (mathRenderer === 'mathjax') {
        await prepareMathjaxStyle(app, mathjaxInstance!)
      }
    },

    clientConfigFile: (app) =>
      prepareClientConfigFile(app, mathRenderer, options),
  }
}
