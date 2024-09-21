import {
  addViteOptimizeDepsExclude,
  addViteSsrExternal,
} from '@vuepress/helper'
import type { Plugin } from 'vuepress/core'
import type { RevealJsPluginOptions } from './options.js'
import { prepareRevealJsEntry, prepareRevealJsStyles } from './prepare/index.js'
import { revealJs } from './revealJs.js'
import { CLIENT_FOLDER, PLUGIN_NAME } from './utils.js'

export const revealJsPlugin = ({
  plugins = [],
  themes = ['auto'],
  delay = 800,
}: RevealJsPluginOptions = {}): Plugin => {
  return {
    name: PLUGIN_NAME,

    define: {
      REVEAL_DELAY: delay,
    },

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

    onPrepared: async (app) => {
      await Promise.all([
        prepareRevealJsEntry(app, plugins),
        prepareRevealJsStyles(app, themes),
      ])
    },

    clientConfigFile: `${CLIENT_FOLDER}/config.js`,
  }
}
