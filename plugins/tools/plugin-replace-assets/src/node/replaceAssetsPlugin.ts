import { addViteConfig, configWebpack, getBundlerName } from '@vuepress/helper'
import type { Plugin } from 'vuepress/core'
import { PLUGIN_NAME } from './constants.js'
import { normalizeRules } from './normalizeRules.js'
import type { ReplaceAssetsPluginOptions } from './types.js'
import {
  createVitePluginReplaceAssets,
  createWebpackPluginReplaceAssets,
} from './unplugin.js'

/**
 * Plugin for replacing assets path
 *
 * 资源路径替换插件
 *
 * @example
 * ```
 * export default defineUserConfig({
 *   plugins: [
 *     replaceAssetsPlugin('https://cnd.example.com')
 *   ]
 * })
 * ```
 */
export const replaceAssetsPlugin = (
  options?: ReplaceAssetsPluginOptions,
): Plugin => {
  const EMPTY_PLUGIN = { name: PLUGIN_NAME }

  const rules = normalizeRules(options)

  if (rules.length === 0) return EMPTY_PLUGIN

  return {
    ...EMPTY_PLUGIN,

    extendsBundlerOptions(bundlerOptions, app) {
      const bundle = getBundlerName(app)

      if (bundle === 'vite') {
        const replaceAssets = createVitePluginReplaceAssets()
        addViteConfig(bundlerOptions, app, {
          plugins: [replaceAssets(rules)],
        })
      }

      if (bundle === 'webpack') {
        configWebpack(bundlerOptions, app, (config) => {
          config.plugins ??= []
          const replaceAssets = createWebpackPluginReplaceAssets()
          config.plugins.push(replaceAssets(rules))
        })
      }
    },
  }
}
