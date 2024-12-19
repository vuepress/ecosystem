import { getFullLocaleConfig } from '@vuepress/helper'
import type { Plugin } from 'vuepress/core'
import { getDirname, path } from 'vuepress/utils'

import { alert } from './alert.js'
import { hint } from './hint.js'
import { hintLocaleInfo } from './locales.js'
import type { MarkdownHintPluginOptions } from './options.js'

const PLUGIN_NAME = '@vuepress/plugin-markdown-hint'

const __dirname = import.meta.dirname || getDirname(import.meta.url)

export const markdownHintPlugin = (
  options: MarkdownHintPluginOptions,
): Plugin => {
  if (!options.alert && options.hint === false)
    return {
      name: PLUGIN_NAME,
    }

  return {
    name: PLUGIN_NAME,

    extendsMarkdown: (md, app) => {
      const locale = getFullLocaleConfig({
        app,
        name: PLUGIN_NAME,
        default: hintLocaleInfo,
        config: options.locales,
      })

      if (options.alert) md.use(alert, locale)
      if (options.hint !== false) md.use(hint, locale)
    },

    clientConfigFile:
      options.injectStyles === false
        ? undefined
        : path.resolve(__dirname, '../client/config.js'),
  }
}
