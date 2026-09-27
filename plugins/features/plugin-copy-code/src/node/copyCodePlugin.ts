import { addViteSsrNoExternal, getFullLocaleConfig } from '@vuepress/helper'
import type { PluginFunction } from 'vuepress/core'
import { path } from 'vuepress/utils'

import { copyCodeLocaleInfo } from './locales.js'
import { PLUGIN_NAME, logger } from './logger.js'
import type { CopyCodePluginOptions } from './options.js'

const __dirname = import.meta.dirname

/**
 * Copy code plugin for VuePress
 *
 * VuePress 复制代码插件
 *
 * @example
 *   import { copyCodePlugin } from '@vuepress/plugin-copy-code'
 *
 *   export default {
 *     plugins: [
 *       copyCodePlugin({
 *         // options
 *       }),
 *     ],
 *   }
 */
export const copyCodePlugin =
  (options: CopyCodePluginOptions = {}): PluginFunction =>
  (app) => {
    if (app.env.isDebug) logger.info('Options:', options)

    return {
      name: PLUGIN_NAME,

      define: () => ({
        __CC_OPTIONS__: {
          selector: options.selector,
          ignoreSelector: options.ignoreSelector,
          inline: options.inline,
          duration: options.duration,
          showInMobile: options.showInMobile,
        },
        __CC_LOCALES__: getFullLocaleConfig({
          app,
          name: PLUGIN_NAME,
          default: copyCodeLocaleInfo,
          config: options.locales,
        }),
      }),

      extendsBundlerOptions: (bundlerOptions: unknown) => {
        addViteSsrNoExternal(bundlerOptions, app, '@vuepress/helper')
      },

      clientConfigFile: path.resolve(__dirname, '../client/config.js'),
    }
  }
