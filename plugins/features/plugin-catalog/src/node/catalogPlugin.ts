import { addViteSsrNoExternal, getFullLocaleConfig } from '@vuepress/helper'
import type { PluginFunction } from 'vuepress/core'
import { getDirname, path } from 'vuepress/utils'
import { generateCatalogPage } from './generateCatalogPage.js'
import { catalogLocaleInfo } from './locales.js'
import { PLUGIN_NAME, logger } from './logger.js'
import type { CatalogPluginOptions } from './options.js'

const __dirname = import.meta.dirname || getDirname(import.meta.url)

export const catalogPlugin =
  (options: CatalogPluginOptions = {}): PluginFunction =>
  (app) => {
    if (app.env.isDebug) logger.info('Options:', options)

    const { component, locales } = options

    return {
      name: PLUGIN_NAME,

      define: (): Record<string, unknown> => ({
        __CATALOG_LOCALES__: getFullLocaleConfig({
          app,
          name: PLUGIN_NAME,
          default: catalogLocaleInfo,
          config: locales,
        }),
      }),

      onInitialized: (): Promise<void> => generateCatalogPage(app, options),

      extendsBundlerOptions: (bundlerOptions: unknown): void => {
        addViteSsrNoExternal(bundlerOptions, app, '@vuepress/helper')
      },

      ...(component
        ? {}
        : { clientConfigFile: path.join(__dirname, '../client/config.js') }),
    }
  }
