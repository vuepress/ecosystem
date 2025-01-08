import { addViteSsrNoExternal, getFullLocaleConfig } from '@vuepress/helper'
import type { Page, PluginFunction } from 'vuepress/core'
import type { ReadingTime } from '../shared/index.js'
import { getReadingTime } from './getReadingTime.js'
import { readingTimeLocaleInfo } from './locales.js'
import { PLUGIN_NAME, logger } from './logger.js'
import type { ReadingTimePluginOptions } from './options.js'

/** Reading time plugin */
export const readingTimePlugin =
  (options: ReadingTimePluginOptions = {}): PluginFunction =>
  (app) => {
    if (app.env.isDebug) logger.info('Options:', options)

    return {
      name: PLUGIN_NAME,

      define: (): Record<string, unknown> => ({
        __READING_TIME_LOCALES__: getFullLocaleConfig({
          app,
          name: PLUGIN_NAME,
          default: readingTimeLocaleInfo,
          config: options.locales,
        }),
      }),

      extendsPage: (page: Page<{ readingTime?: ReadingTime }>): void => {
        page.data.readingTime = getReadingTime(
          page.content,
          options.wordPerMinute ?? 300,
        )
      },

      extendsBundlerOptions: (bundlerOptions: unknown): void => {
        addViteSsrNoExternal(bundlerOptions, app, '@vuepress/helper')
      },
    }
  }
