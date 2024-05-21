import type { PluginFunction } from 'vuepress/core'
import type { CopyCodeOptions } from '../shared/index.js'
import { prepareClientConfigFile } from './prepareClientConfigFile.js'
import { logger, PLUGIN_NAME } from './utils.js'

export interface CopyCodePluginOptions extends CopyCodeOptions {
  /**
   * Whether to use the default style
   *
   * 是否使用默认样式
   *
   * @default true
   */
  defaultStyle?: boolean
}

export const copyCodePlugin =
  (options: CopyCodePluginOptions = {}): PluginFunction =>
  (app) => {
    if (app.env.isDebug) logger.info('Options:', options)

    return {
      name: PLUGIN_NAME,

      define: {
        __CC_DURATION__: options.duration || 2000,
        __CC_SELECTOR__:
          options.selector ?? 'div[class*="language-"] > button.copy',
      },

      clientConfigFile: (app) =>
        prepareClientConfigFile(app, options.defaultStyle),
    }
  }
