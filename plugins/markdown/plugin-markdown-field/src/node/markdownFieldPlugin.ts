import { deepAssign, getFullLocaleConfig } from '@vuepress/helper'
import type { Plugin } from 'vuepress/core'

import { field } from './field.js'
import { fieldLocaleInfo } from './locales.js'
import type { MarkdownFieldPluginOptions } from './options.js'
import { prepareClientConfigFile } from './prepareClientConfigFile.js'

declare module 'vuepress/markdown' {
  interface MarkdownOptions {
    field?: MarkdownFieldPluginOptions
  }
}

const PLUGIN_NAME = '@vuepress/plugin-markdown-field'

/**
 * Markdown field plugin
 *
 * Markdown 字段容器插件
 *
 * @example
 *   import { markdownFieldPlugin } from '@vuepress/plugin-markdown-field'
 *
 *   export default {
 *     plugins: [
 *       markdownFieldPlugin({
 *         fields: true,
 *       }),
 *     ],
 *   }
 */
export const markdownFieldPlugin =
  (options: MarkdownFieldPluginOptions): Plugin =>
  (app) => {
    const mergedOptions = deepAssign({}, app.options.markdown.field, options)
    app.options.markdown.field = mergedOptions

    if (!mergedOptions.fields) {
      return {
        name: PLUGIN_NAME,
      }
    }

    const locale = getFullLocaleConfig({
      app,
      name: PLUGIN_NAME,
      default: fieldLocaleInfo,
      config: mergedOptions.locales,
    })

    return {
      name: PLUGIN_NAME,

      extendsMarkdown: (md) => {
        md.use(field, locale)
      },

      clientConfigFile: () => prepareClientConfigFile(app, mergedOptions),
    }
  }
