import {
  addViteSsrNoExternal,
  getFullLocaleConfig,
  isArray,
  isString,
} from '@vuepress/helper'
import type { PluginFunction } from 'vuepress/core'
import { getDirname, path } from 'vuepress/utils'
import { copyCodeLocaleInfo } from './locales.js'
import { PLUGIN_NAME, logger } from './logger.js'
import type { CopyCodePluginOptions } from './options.js'

const __dirname = import.meta.dirname || getDirname(import.meta.url)

/**
 * Copy code plugin for VuePress
 *
 * VuePress 复制代码插件
 *
 * @example
 * ```ts
 * import { copyCodePlugin } from '@vuepress/plugin-copy-code'
 *
 * export default {
 *   plugins: [
 *     copyCodePlugin({
 *       // options
 *     }),
 *   ],
 * }
 * ```
 */
export const copyCodePlugin =
  (options: CopyCodePluginOptions = {}): PluginFunction =>
  (app) => {
    if (app.env.isDebug) logger.info('Options:', options)

    return {
      name: PLUGIN_NAME,

      define: () => ({
        __CC_SELECTOR__: isArray(options.selector)
          ? options.selector.join(',')
          : (options.selector ?? '[vp-content] div[class*="language-"] pre'),
        __CC_IGNORE_SELECTOR__: Array.isArray(options.ignoreSelector)
          ? options.ignoreSelector.join(',')
          : (options.ignoreSelector ?? ''),
        __CC_INLINE_SELECTOR__: Array.isArray(options.inline)
          ? options.inline.join(',')
          : isString(options.inline)
            ? options.inline
            : options.inline
              ? '[vp-content] :not(pre) > code'
              : '',
        __CC_LOCALES__: getFullLocaleConfig({
          app,
          name: PLUGIN_NAME,
          default: copyCodeLocaleInfo,
          config: options.locales,
        }),
        __CC_DURATION__: options.duration ?? 2000,
        __CC_SHOW_IN_MOBILE__: options.showInMobile ?? false,
      }),

      extendsBundlerOptions: (bundlerOptions: unknown): void => {
        addViteSsrNoExternal(bundlerOptions, app, '@vuepress/helper')
      },

      clientConfigFile: path.resolve(__dirname, '../client/config.js'),
    }
  }
