import {
  addViteSsrNoExternal,
  getFullLocaleConfig,
  getModulePath,
} from '@vuepress/helper'
import type { PluginFunction } from 'vuepress/core'
import { getDirname, path } from 'vuepress/utils'
import { ensureRootHomePage } from './ensureRootHomePage.js'
import {
  generateAutoLocaleRedirectFiles,
  generateRedirectFiles,
} from './generate/index.js'
import { getRedirectBehaviorConfig } from './getRedirectLocaleConfig.js'
import { getRedirectMap } from './getRedirectMap.js'
import { handleRedirectTo } from './handleRedirectTo.js'
import { redirectLocaleInfo } from './locales.js'
import { PLUGIN_NAME, logger } from './logger.js'
import type { RedirectPluginOptions } from './types/index.js'

const { url } = import.meta
const __dirname = getDirname(url)

export const redirectPlugin =
  (options: RedirectPluginOptions = {}): PluginFunction =>
  (app) => {
    if (app.env.isDebug) logger.info('Options:', options)

    const behaviorConfig = getRedirectBehaviorConfig(app, options)
    let redirectMap: Record<string, string> | null = null

    return {
      name: PLUGIN_NAME,

      alias: {
        '@vuepress/plugin-redirect/modal':
          options.switchLocale === 'modal'
            ? path.resolve(__dirname, '../client/components/RedirectModal.js')
            : getModulePath('@vuepress/helper/noopComponent', import.meta),
      },

      define: {
        __REDIRECT_CONFIG__: behaviorConfig,
        __REDIRECT_DIRECT__: options.switchLocale === 'direct',
        __REDIRECT_MODAL__: options.switchLocale === 'modal',
        __REDIRECT_LOCALES__: getFullLocaleConfig({
          app,
          name: 'redirect',
          config: options.locales,
          default: redirectLocaleInfo,
        }),
      },

      extendsBundlerOptions: (bundlerOptions: unknown): void => {
        addViteSsrNoExternal(bundlerOptions, app, '@vuepress/helper')
      },

      extendsPage: (page) => {
        handleRedirectTo(page, app)
      },

      onInitialized: async (): Promise<void> => {
        redirectMap = getRedirectMap(app, options)

        if (app.env.isDebug) logger.info('Redirect Map:', redirectMap)

        if (options.autoLocale && app.env.isDebug) await ensureRootHomePage(app)
      },

      onPrepared: async (): Promise<void> => {
        await app.writeTemp(
          'redirect/map.js',
          `\
export const redirectMap = ${
            app.env.isDev ? JSON.stringify(redirectMap, null, 2) : '{}'
          };
`,
        )
        // clean redirectMap reference in dev server
        if (app.env.isDev) redirectMap = null
      },

      onGenerated: async (): Promise<void> => {
        await generateRedirectFiles(app, redirectMap!)
        if (options.autoLocale)
          await generateAutoLocaleRedirectFiles(app, behaviorConfig)
      },

      clientConfigFile: path.join(__dirname, '../client/config.js'),
    }
  }
