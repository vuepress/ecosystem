import { katex } from '@mdit/plugin-katex-slim'
import { createMathjaxInstance, mathjax } from '@mdit/plugin-mathjax-slim'
import { addCustomElement, getInstalledStatus } from '@vuepress/helper'
import type { Plugin } from 'vuepress/core'
import { colors, logger } from 'vuepress/utils'
import type {
  MarkdownMathPluginOptions,
  MarkdownMathjaxPluginOptions,
} from './options.js'
import {
  prepareClientConfigFile,
  prepareMathjaxStyle,
} from './prepare/index.js'
import { PLUGIN_NAME } from './utils.js'

export const markdownMathPlugin = ({
  type,
  ...options
}: MarkdownMathPluginOptions = {}): Plugin => {
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

  if (!mathRenderer || (type && mathRenderer !== type)) {
    const packages = { katex: 'katex', mathjax: 'mathjax-full' }
    logger.error(
      !mathRenderer
        ? 'No math renderer found, please install mathjax-full or katex'
        : `type is "${type}", but "${packages[type!]}" is not installed`,
    )

    return {
      name: PLUGIN_NAME,
    }
  }

  const mathjaxInstance =
    mathRenderer === 'mathjax'
      ? createMathjaxInstance({
          ...(options as MarkdownMathjaxPluginOptions),
          transformer: (content: string) =>
            content.replace(/^<mjx-container/, '<mjx-container v-pre'),
        })
      : null

  return {
    name: PLUGIN_NAME,

    extendsBundlerOptions: (bundlerOptions, app) => {
      if (mathRenderer === 'mathjax') {
        addCustomElement(bundlerOptions, app, /^mjx-/)
      }
    },

    extendsMarkdown: (md) => {
      if (mathRenderer === 'mathjax') {
        md.use(mathjax, mathjaxInstance!)
        // Reset mathjax style in each render
        md.use((mdIt) => {
          const originalRender = mdIt.render.bind(mdIt)

          mdIt.render = (src: string, env: unknown): string => {
            const result = originalRender(src, env)

            mathjaxInstance!.reset()

            return result
          }
        })
      } else {
        md.use(katex, {
          logger: (
            errorCode,
            errorMsg,
            token: Record<string, unknown> & { text: string },
            {
              filePathRelative,
            }: Record<string, unknown> & { filePathRelative?: string | null },
          ) => {
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
          transformer: (content: string) =>
            content.replace(/^(<[a-z]+ )/g, '$1v-pre '),
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
