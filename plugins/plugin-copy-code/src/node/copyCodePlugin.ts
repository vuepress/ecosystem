import {
  addViteSsrNoExternal,
  getLocaleConfig,
  isArray,
  isString,
} from '@vuepress/helper/node'
import type { PluginFunction } from 'vuepress/core'
import { getDirname, path } from 'vuepress/utils'
import { copyCodeLocales } from './locales.js'
import { logger, PLUGIN_NAME } from './logger.js'
import type { CopyCodePluginOptions } from './options.js'

const __dirname = getDirname(import.meta.url)

export const copyCodePlugin =
  (options: CopyCodePluginOptions = {}): PluginFunction =>
  (app) => {
    if (app.env.isDebug) logger.info('Options:', options)

    return {
      name: PLUGIN_NAME,

      define: (app) => ({
        __COPY_CODE_DELAY__: options.delay || 800,
        __COPY_CODE_DURATION__: options.duration || 2000,
        __COPY_CODE_LOCALES__: getLocaleConfig({
          app,
          name: PLUGIN_NAME,
          default: copyCodeLocales,
          config: options.locales,
        }),
        __COPY_CODE_SELECTOR__: isArray(options.selector)
          ? options.selector
          : isString(options.selector)
            ? [options.selector]
            : ['.theme-default-content div[class*="language-"] pre'],
        __COPY_CODE_SHOW_IN_MOBILE__: options.showInMobile || false,
      }),

      extendsBundlerOptions: (bundlerOptions: unknown, app): void => {
        addViteSsrNoExternal(bundlerOptions, app, '@vuepress/helper')
      },

      clientConfigFile: path.resolve(__dirname, '../client/config.js'),
    }
  }
