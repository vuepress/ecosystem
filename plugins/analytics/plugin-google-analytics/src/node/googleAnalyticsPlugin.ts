import type { Plugin, PluginObject } from 'vuepress/core'
import { getDirname, logger, path } from 'vuepress/utils'
import type { GoogleAnalyticsPluginOptions } from '../shared/index.js'

const __dirname = import.meta.dirname || getDirname(import.meta.url)

/**
 * Google Analytics plugin for VuePress
 *
 * VuePress 的 Google Analytics 插件
 *
 * @param options - Plugin options
 * @returns VuePress plugin
 *
 * @description Integrates Google Analytics 4 tracking into VuePress applications.
 * Only active in production builds unless debug mode is enabled.
 *
 * 集成 Google Analytics 4 追踪到 VuePress 应用中。
 * 仅在生产构建时启用，除非开启调试模式。
 *
 * @example
 * ```ts
 * import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'
 *
 * export default {
 *   plugins: [
 *     googleAnalyticsPlugin({
 *       id: 'G-XXXXXXXXXX'
 *     })
 *   ]
 * }
 * ```
 */
export const googleAnalyticsPlugin =
  (options: GoogleAnalyticsPluginOptions): Plugin =>
  (app) => {
    const plugin: PluginObject = {
      name: '@vuepress/plugin-google-analytics',
    }

    if (!options.id) {
      logger.warn(`[${plugin.name}] 'id' is required`)
      return plugin
    }

    // returns an empty plugin in dev mode when debug mode is not enabled
    if (app.env.isDev && !options.debug) {
      return plugin
    }

    return {
      ...plugin,

      clientConfigFile: path.resolve(__dirname, '../client/config.js'),

      define: {
        __GA_OPTIONS__: options,
      },
    }
  }
