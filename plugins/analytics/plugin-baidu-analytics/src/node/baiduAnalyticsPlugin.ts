import { Logger } from '@vuepress/helper'
import type { Plugin, PluginObject } from 'vuepress/core'
import { colors, getDirname, path } from 'vuepress/utils'
import type { BaiduAnalyticsPluginOptions } from './options.js'

const __dirname = import.meta.dirname || getDirname(import.meta.url)

const PLUGIN_NAME = '@vuepress/plugin-baidu-analytics'

const logger = new Logger(PLUGIN_NAME)

/**
 * Baidu Analytics plugin for VuePress
 *
 * VuePress 的百度统计插件
 *
 * @param options - Plugin options
 * @returns VuePress plugin
 *
 * @description Integrates Baidu Analytics tracking into VuePress applications.
 * Only active in production builds when a valid tracking ID is provided.
 *
 * 集成百度统计追踪到 VuePress 应用中。
 * 仅在生产构建且提供有效追踪 ID 时启用。
 *
 * @example
 * ```ts
 * import { baiduAnalyticsPlugin } from '@vuepress/plugin-baidu-analytics'
 *
 * export default {
 *   plugins: [
 *     baiduAnalyticsPlugin({
 *       id: 'your-baidu-analytics-id'
 *     })
 *   ]
 * }
 * ```
 */
export const baiduAnalyticsPlugin =
  ({ id }: BaiduAnalyticsPluginOptions): Plugin =>
  (app) => {
    const plugin: PluginObject = {
      name: PLUGIN_NAME,
    }

    if (!id) {
      logger.warn(`${colors.cyan('id')} is required!`)

      return plugin
    }

    // returns an empty plugin in dev mode when debug mode is not enabled
    if (app.env.isDev) {
      return plugin
    }

    return {
      ...plugin,

      clientConfigFile: path.resolve(__dirname, '../client/config.js'),

      define: {
        __BD_ID__: id,
      },
    }
  }
