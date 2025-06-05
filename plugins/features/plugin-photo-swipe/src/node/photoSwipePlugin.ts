import {
  addViteOptimizeDepsExclude,
  addViteSsrNoExternal,
  entries,
  fromEntries,
  getFullLocaleConfig,
} from '@vuepress/helper'
import type { PluginFunction } from 'vuepress/core'
import { getDirname, path } from 'vuepress/utils'
import { photoSwipeLocaleInfo } from './locales.js'
import { PLUGIN_NAME, logger } from './logger.js'
import type { PhotoSwipePluginOptions } from './options.js'

const __dirname = import.meta.dirname || getDirname(import.meta.url)

/**
 * VuePress PhotoSwipe plugin
 *
 * VuePress PhotoSwipe 插件
 *
 * @param [options={}] - Plugin options / 插件选项
 *
 * @example
 * ```ts
 * import { photoSwipePlugin } from '@vuepress/plugin-photo-swipe'
 *
 * export default {
 *   plugins: [
 *     photoSwipePlugin({
 *       selector: '[vp-content] :not(a) > img:not([no-view])',
 *       download: true,
 *       fullscreen: true,
 *       scrollToClose: true,
 *     }),
 *   ],
 * }
 * ```
 */
export const photoSwipePlugin =
  (options: PhotoSwipePluginOptions = {}): PluginFunction =>
  (app) => {
    if (app.env.isDebug) logger.info('Options:', options)

    return {
      name: PLUGIN_NAME,

      define: (): Record<string, unknown> => ({
        __PS_SELECTOR__:
          options.selector || '[vp-content] :not(a) > img:not([no-view])',
        __PS_DOWNLOAD__: options.download ?? true,
        __PS_FULLSCREEN__: options.fullscreen ?? true,
        __PS_SCROLL_TO_CLOSE__: options.scrollToClose ?? true,
        __PS_LOCALES__: fromEntries(
          entries(
            getFullLocaleConfig({
              app,
              name: PLUGIN_NAME,
              default: photoSwipeLocaleInfo,
              config: options.locales,
            }),
          ).map(([localePath, localeOptions]) => [
            localePath,
            fromEntries(
              entries(localeOptions).map(([key, value]) => [
                `${key}Title`,
                value,
              ]),
            ),
          ]),
        ),
      }),

      extendsBundlerOptions: (bundlerOptions: unknown): void => {
        addViteOptimizeDepsExclude(bundlerOptions, app, 'photoswipe')
        addViteSsrNoExternal(bundlerOptions, app, '@vuepress/helper')
      },

      clientConfigFile: path.resolve(__dirname, '../client/config.js'),
    }
  }
