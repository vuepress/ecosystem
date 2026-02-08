import { deepAssign, getFullLocaleConfig } from '@vuepress/helper'
import type { Plugin } from 'vuepress/core'
import { getDirname, path } from 'vuepress/utils'

import { alert } from './alert.js'
import { hint } from './hint.js'
import { hintLocaleInfo } from './locales.js'
import type { MarkdownHintPluginOptions } from './options.js'

declare module 'vuepress/markdown' {
  interface MarkdownOptions {
    hint?: MarkdownHintPluginOptions
  }
}

const PLUGIN_NAME = '@vuepress/plugin-markdown-hint'

const __dirname = import.meta.dirname || getDirname(import.meta.url)

/**
 * Markdown hint plugin
 *
 * Markdown 提示插件
 *
 * @example
 * ```ts
 * import { markdownHintPlugin } from '@vuepress/plugin-markdown-hint'
 *
 * export default {
 *   plugins: [
 *     markdownHintPlugin({
 *       hint: true,
 *       alert: true,
 *     }),
 *   ],
 * }
 * ```
 */
export const markdownHintPlugin =
  (options: MarkdownHintPluginOptions): Plugin =>
  (app) => {
    const opts = deepAssign({}, app.options.markdown.hint, options)
    app.options.markdown.hint = opts

    if (!opts.alert && opts.hint === false)
      return {
        name: PLUGIN_NAME,
      }

    return {
      name: PLUGIN_NAME,

      extendsMarkdown: (md) => {
        const locale = getFullLocaleConfig({
          app,
          name: PLUGIN_NAME,
          default: hintLocaleInfo,
          config: opts.locales,
        })

        if (opts.alert) md.use(alert, locale)
        if (opts.hint ?? true) md.use(hint, locale)
      },

      clientConfigFile:
        (opts.injectStyles ?? true)
          ? path.resolve(__dirname, '../client/config.js')
          : undefined,
    }
  }
