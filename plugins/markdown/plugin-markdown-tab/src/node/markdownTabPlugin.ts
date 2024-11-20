import type { Plugin } from 'vuepress/core'

import { codeTabs } from './codeTabs.js'
import type { MarkdownTabPluginOptions } from './options.js'
import { prepareClientConfigFile } from './prepareClientConfigFile.js'
import { tabs } from './tabs.js'

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

    clientConfigFile: (app) => prepareClientConfigFile(app, options),
  }
}
