import { Logger } from '@vuepress/helper'
import type { Plugin, PluginObject } from 'vuepress/core'
import { colors, getDirname, path } from 'vuepress/utils'
import type { ClarityOptions } from '../shared/index.js'

const __dirname = import.meta.dirname || getDirname(import.meta.url)

const PLUGIN_NAME = '@vuepress/plugin-clarity-analytics'

const logger = new Logger(PLUGIN_NAME)

/**
 * Clarity Analytics plugin for VuePress
 *
 * VuePress 的 Clarity Analytics 插件
 *
 * @description Integrates Clarity Analytics tracking into VuePress applications.
 * Only active in production builds when a valid project ID is provided.
 *
 * 集成 Clarity Analytics 追踪到 VuePress 应用中。
 * 仅在生产构建且提供有效项目 ID 时启用。
 *
 * @example
 * ```ts
 * import { clarityAnalyticsPlugin } from '@vuepress/plugin-clarity-analytics'
 *
 * export default {
 *   plugins: [
 *     clarityAnalyticsPlugin({
 *       id: 'your-project-id',
 *     })
 *   ]
 * }
 * ```
 */
export const clarityAnalyticsPlugin =
  ({ id, ...options }: ClarityOptions): Plugin =>
  (app) => {
    const plugin: PluginObject = {
      name: PLUGIN_NAME,
    }

    if (!id) {
      logger.warn(`${colors.cyan('id')} is required!`)

      return plugin
    }

    // returns an empty plugin in dev mode when debug mode is not enabled
    if (app.env.isDev) return plugin

    return {
      ...plugin,

      define: {
        __CLARITY_OPTIONS__: { id, ...options },
      },

      clientConfigFile: path.resolve(__dirname, '../client/config.js'),
    }
  }
