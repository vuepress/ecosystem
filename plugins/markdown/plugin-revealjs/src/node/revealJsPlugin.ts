import {
  addViteOptimizeDepsExclude,
  addViteSsrExternal,
} from '@vuepress/helper'
import type { Plugin } from 'vuepress/core'
import type { RevealJsPluginOptions } from './options.js'
import {
  prepareClientConfigFile,
  prepareRevealJsEntry,
} from './prepare/index.js'
import { revealJs } from './revealJs.js'
import { PLUGIN_NAME } from './utils.js'

export const revealJsPlugin = ({
  plugins = [],
  themes = ['auto'],
  layout = 'SlidePage',
}: RevealJsPluginOptions = {}): Plugin => {
  return {
    name: PLUGIN_NAME,

    extendsBundlerOptions: (bundlerOptions, app) => {
      addViteOptimizeDepsExclude(bundlerOptions, app, [
        'reveal.js/dist/reveal.esm.js',
        'reveal.js/plugin/markdown/markdown.esm.js',
        ...plugins.map(
          (plugin) => `reveal.js/plugin/${plugin}/${plugin}.esm.js`,
        ),
      ])

      addViteSsrExternal(bundlerOptions, app, 'reveal.js')
    },

    extendsMarkdown: (md) => {
      md.use(revealJs)
    },

    onPrepared: async (app) => prepareRevealJsEntry(app, plugins),

    clientConfigFile: (app) => prepareClientConfigFile(app, themes, layout),
  }
}
