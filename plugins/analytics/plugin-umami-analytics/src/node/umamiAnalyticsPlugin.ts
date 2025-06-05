import { Logger } from '@vuepress/helper'
import type { Plugin, PluginObject } from 'vuepress/core'
import { colors, getDirname, path } from 'vuepress/utils'
import type { UmamiOptions } from '../shared/index.js'

const __dirname = import.meta.dirname || getDirname(import.meta.url)

const PLUGIN_NAME = '@vuepress/plugin-umami-analytics'

const logger = new Logger(PLUGIN_NAME)

/**
 * Umami Analytics plugin for VuePress
 *
 * VuePress 的 Umami Analytics 插件
 *
 * @param options - Plugin options
 * @returns VuePress plugin
 *
 * @description Integrates Umami Analytics tracking into VuePress applications.
 * Only active in production builds when a valid website ID is provided.
 *
 * 集成 Umami Analytics 追踪到 VuePress 应用中。
 * 仅在生产构建且提供有效网站 ID 时启用。
 *
 * @example
 * ```ts
 * import { umamiAnalyticsPlugin } from '@vuepress/plugin-umami-analytics'
 *
 * export default {
 *   plugins: [
 *     umamiAnalyticsPlugin({
 *       id: 'your-website-id',
 *       link: 'https://your-umami-instance.com/script.js'
 *     })
 *   ]
 * }
 * ```
 */
export const umamiAnalyticsPlugin =
  ({ id, ...options }: UmamiOptions): Plugin =>
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

      define: {
        __UMM_OPTIONS__: { id, ...options },
      },

      clientConfigFile: path.resolve(__dirname, '../client/config.js'),
    }
  }
