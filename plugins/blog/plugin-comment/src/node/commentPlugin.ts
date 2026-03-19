import { getFullLocaleConfig, isModuleAvailable } from '@vuepress/helper'
import type { PluginFunction } from 'vuepress/core'
import { getAlias, getProviderPackage } from './getProvider.js'
import { walineLocalesInfo } from './locales.js'
import type { CommentPluginOptions } from './options.js'
import { CLIENT_FOLDER, PLUGIN_NAME, logger } from './utils.js'

/**
 * VuePress comment plugin
 *
 * VuePress 评论插件
 *
 * @example
 * ```ts
 * import { commentPlugin } from '@vuepress/plugin-comment'
 *
 * export default {
 *   plugins: [
 *     commentPlugin({
 *       provider: 'Waline',
 *       serverURL: 'https://waline.example.com',
 *     }),
 *   ],
 * }
 * ```
 */
export const commentPlugin =
  (options: CommentPluginOptions): PluginFunction =>
  (app) => {
    if (app.env.isDebug) logger.info('Options:', options)

    const pkg = getProviderPackage(options.provider)

    if (pkg && !isModuleAvailable(pkg, import.meta)) {
      logger.error(
        `Package ${pkg} is not installed, please install it manually!`,
      )

      return { name: PLUGIN_NAME }
    }

    return {
      name: PLUGIN_NAME,

      alias: getAlias(options),

      define: () => {
        const result: Record<string, unknown> = {
          __COMMENT_OPTIONS__: options,
        }

        // special handling for Waline locales
        if (options.provider === 'Waline') {
          result.WALINE_LOCALES = getFullLocaleConfig({
            app,
            name: 'waline',
            default: walineLocalesInfo,
            config: options.locales,
          })
          result.WALINE_META = options.metaIcon ?? true

          // Remove locales so that they won’t be injected in client twice
          if ('locales' in options) delete options.locales
        }

        return result
      },

      clientConfigFile: `${CLIENT_FOLDER}config.js`,
    }
  }
