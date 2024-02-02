import { addViteSsrNoExternal, getLocaleConfig } from '@vuepress/helper'
import type { PluginFunction } from 'vuepress/core'
import { getDirname, path } from 'vuepress/utils'
import { ensureRootHomePage } from './ensureRootHomePage.js'
import { generateAutoLocaleRedirects, generateRedirects } from './generate.js'
import { getRedirectLocaleConfig } from './getRedirectLocaleConfig.js'
import { redirectLocales } from './locales.js'
import type { RedirectOptions } from './options.js'
import {
  getRedirectMap,
  handleRedirectTo,
  logger,
  PLUGIN_NAME,
} from './utils/index.js'

const __dirname = getDirname(import.meta.url)

export const redirectPlugin =
  (options: RedirectOptions = {}): PluginFunction =>
  (app) => {
    if (app.env.isDebug) logger.info('Options:', options)

    const redirectLocaleConfig = getRedirectLocaleConfig(app, options)
    let redirectMap: Record<string, string>

    return {
      name: PLUGIN_NAME,

      define: {
        REDIRECT_LOCALE_CONFIG: redirectLocaleConfig,
        REDIRECT_LOCALE_SWITCH: Boolean(redirectLocaleConfig.switchLocale),
        REDIRECT_LOCALES: getLocaleConfig({
          app,
          name: 'redirect',
          config: options.locales,
          default: redirectLocales,
        }),
      },

      extendsBundlerOptions: (bundlerOptions: unknown, app): void => {
        addViteSsrNoExternal(bundlerOptions, app, [
          '@vuepress/helper',
          'vuepress-shared',
        ])
      },

      onInitialized: async (app): Promise<void> => {
        redirectMap = getRedirectMap(app, options)

        if (app.env.isDebug) logger.info('Redirect Map:', redirectMap)

        handleRedirectTo(app, options)

        if (redirectLocaleConfig.autoLocale)
          await ensureRootHomePage(app, redirectLocaleConfig)
      },

      onPrepared: async (app): Promise<void> => {
        await app.writeTemp(
          'redirect/config.js',
          `\
export const redirectMap = ${
            app.env.isDev ? JSON.stringify(redirectMap, null, 2) : '{}'
          };
`,
        )
      },

      onGenerated: async (app): Promise<void> => {
        await generateRedirects(app, redirectMap)
        if (redirectLocaleConfig.autoLocale)
          await generateAutoLocaleRedirects(app, redirectLocaleConfig)
      },

      clientConfigFile: path.join(__dirname, '../client/config.js'),
    }
  }
