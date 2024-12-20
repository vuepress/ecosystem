import { getFullLocaleConfig } from '@vuepress/helper'
import type { Plugin } from 'vuepress/core'
import { getDirname, logger, path } from 'vuepress/utils'
import { backToTopLocaleInfo } from './locales.js'
import { PLUGIN_NAME } from './logger.js'
import type { BackToTopPluginOptions } from './options.js'

const __dirname = import.meta.dirname || getDirname(import.meta.url)

export const backToTopPlugin =
  (options: BackToTopPluginOptions = {}): Plugin =>
  (app) => {
    if (app.env.isDebug) logger.info('Options', options)

    return {
      name: PLUGIN_NAME,

      define: () => ({
        __BACK_TO_TOP_LOCALES__: getFullLocaleConfig({
          app,
          name: 'back-to-top',
          default: backToTopLocaleInfo,
          config: options.locales,
        }),
        __BACK_TO_TOP_PROGRESS__: options.progress ?? true,
        __BACK_TO_TOP_THRESHOLD__: options.threshold ?? 100,
      }),

      clientConfigFile: path.resolve(__dirname, '../client/config.js'),
    }
  }
