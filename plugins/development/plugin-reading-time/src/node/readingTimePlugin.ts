import { addViteSsrNoExternal, getFullLocaleConfig } from '@vuepress/helper'
import type { Page, PluginFunction } from 'vuepress/core'
import type { ReadingTime } from '../shared/index.js'
import { getReadingTime } from './getReadingTime.js'
import { readingTimeLocaleInfo } from './locales.js'
import { PLUGIN_NAME, logger } from './logger.js'
import type { ReadingTimePluginOptions } from './options.js'

/**
 * Reading time plugin
 *
 * 阅读时间插件
 *
 * @param options - plugin options
 * @returns VuePress plugin function
 *
 * @example
 * ```ts
 * import { readingTimePlugin } from '@vuepress/plugin-reading-time'
 *
 * export default {
 *   plugins: [
 *     readingTimePlugin({
 *       wordPerMinute: 300
 *     })
 *   ]
 * }
 * ```
 */
export const readingTimePlugin =
  (options: ReadingTimePluginOptions = {}): PluginFunction =>
  (app) => {
    if (app.env.isDebug) logger.info('Options:', options)

    return {
      name: PLUGIN_NAME,

      define: () => ({
        __READING_TIME_LOCALES__: getFullLocaleConfig({
          app,
          name: PLUGIN_NAME,
          default: readingTimeLocaleInfo,
          config: options.locales,
        }),
      }),

      extendsPage: (page: Page<{ readingTime?: ReadingTime }>) => {
        page.data.readingTime = getReadingTime(
          page.content,
          options.wordPerMinute ?? 300,
        )
      },

      extendsBundlerOptions: (bundlerOptions: unknown) => {
        addViteSsrNoExternal(bundlerOptions, app, '@vuepress/helper')
      },
    }
  }
