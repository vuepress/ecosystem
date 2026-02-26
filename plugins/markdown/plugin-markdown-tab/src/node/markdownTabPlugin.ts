import { deepAssign } from '@vuepress/helper'
import type { Plugin } from 'vuepress/core'

import { codeTabs } from './codeTabs.js'
import type { MarkdownTabPluginOptions } from './options.js'
import { prepareClientConfigFile } from './prepareClientConfigFile.js'
import { tabs } from './tabs.js'

declare module 'vuepress/markdown' {
  interface MarkdownOptions {
    tab?: MarkdownTabPluginOptions
  }
}

const PLUGIN_NAME = '@vuepress/plugin-markdown-tab'

/**
 * Markdown tab plugin
 *
 * Markdown 选项卡插件
 *
 * @example
 * ```ts
 * import { markdownTabPlugin } from '@vuepress/plugin-markdown-tab'
 *
 * export default {
 *   plugins: [
 *     markdownTabPlugin({
 *       codeTabs: true,
 *       tabs: true,
 *     }),
 *   ],
 * }
 * ```
 */
export const markdownTabPlugin =
  (options: MarkdownTabPluginOptions): Plugin =>
  (app) => {
    const mergedOptions = deepAssign({}, app.options.markdown.tab, options)
    app.options.markdown.tab = mergedOptions

    if (!mergedOptions.codeTabs && !mergedOptions.tabs) {
      return {
        name: PLUGIN_NAME,
      }
    }

    return {
      name: PLUGIN_NAME,

      extendsMarkdown: (md) => {
        if (mergedOptions.codeTabs) md.use(codeTabs)
        if (mergedOptions.tabs) md.use(tabs)
      },

      clientConfigFile: () => prepareClientConfigFile(app, mergedOptions),
    }
  }
