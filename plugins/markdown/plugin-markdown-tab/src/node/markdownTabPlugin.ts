import type { Plugin } from 'vuepress/core'

import { codeTabs } from './codeTabs.js'
import type { MarkdownTabPluginOptions } from './options.js'
import { prepareClientConfigFile } from './prepareClientConfigFile.js'
import { tabs } from './tabs.js'

const PLUGIN_NAME = '@vuepress/plugin-markdown-tab'

/**
 * Markdown tab plugin
 *
 * Markdown 选项卡插件
 *
 * @param options - Plugin options / 插件选项
 * @returns VuePress plugin / VuePress 插件
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
export const markdownTabPlugin = (
  options: MarkdownTabPluginOptions,
): Plugin => {
  if (!options.codeTabs && !options.tabs)
    return {
      name: PLUGIN_NAME,
    }

  return {
    name: PLUGIN_NAME,

    extendsMarkdown: (md) => {
      if (options.codeTabs) md.use(codeTabs)
      if (options.tabs) md.use(tabs)
    },

    clientConfigFile: (app) => prepareClientConfigFile(app, options),
  }
}
