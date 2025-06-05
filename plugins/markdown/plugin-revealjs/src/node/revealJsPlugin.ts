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

/**
 * reveal.js plugin for VuePress
 *
 * VuePress reveal.js 插件
 *
 * @param plugins - Built-in plugins to enable / 要启用的内置插件
 * @param themes - Themes to enable / 要启用的主题
 * @param layout - Layout component name / 布局组件名称
 *
 * @default plugins: []
 * @default themes: ['auto']
 * @default layout: 'SlidePage'
 *
 * @returns VuePress plugin / VuePress 插件
 *
 * @example
 * ```ts
 * import { revealJsPlugin } from '@vuepress/plugin-revealjs'
 *
 * export default {
 *   plugins: [
 *     revealJsPlugin({
 *       plugins: ['highlight', 'math'],
 *       themes: ['auto', 'black'],
 *       layout: 'SlidePage'
 *     })
 *   ]
 * }
 * ```
 */
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
