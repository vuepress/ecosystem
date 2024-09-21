import type { Plugin } from 'vuepress/core'

import type { MarkdownTabPluginOptions } from './options.js'
import { codeTabs } from './codeTabs.js'
import { tabs } from './tabs.js'
import { prepareConfigFile } from './prepareConfigFile.js'

const PLUGIN_NAME = '@vuepress/plugin-markdown-tab'

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

    clientConfigFile: (app) => prepareConfigFile(app, options),
  }
}