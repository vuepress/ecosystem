import {
  Logger,
  addViteSsrExternal,
  entries,
  fromEntries,
  getFullLocaleConfig,
} from '@vuepress/helper'
import type { Plugin } from 'vuepress'
import { colors, getDirname, path } from 'vuepress/utils'
import type { MeiliSearchOptions } from '../shared/index.js'
import { localeInfo } from './locales.js'

export type MeiliSearchPluginOptions = MeiliSearchOptions

const __dirname = getDirname(import.meta.url)

const PLUGIN_NAME = '@vuepress/plugin-meilisearch'

const logger = new Logger(PLUGIN_NAME)

export const meilisearchPlugin =
  ({
    locales = {},
    translations: rootTranslations,
    ...options
  }: MeiliSearchPluginOptions): Plugin =>
  (app) => {
    if (!options.host || !options.apiKey || !options.indexUid) {
      logger.error(
        `${colors.cyan('host')}, ${colors.cyan('apiKey')} and ${colors.cyan('indexUid')} options are required!`,
      )

      return { name: PLUGIN_NAME }
    }

    return {
      name: PLUGIN_NAME,

      define: {
        __ML_SEARCH_LOCALES__: getFullLocaleConfig({
          app,
          name: PLUGIN_NAME,
          default: localeInfo,
          config: fromEntries(
            entries({
              '/': { translations: rootTranslations },
              ...locales,
            }).map(([key, { translations = {} }]) => [key, translations]),
          ),
        }),
        __ML_SEARCH_OPTIONS__: options,
      },

      extendsBundlerOptions: (bundlerOptions) => {
        addViteSsrExternal(bundlerOptions, app, 'meilisearch-docsearch')
      },

      clientConfigFile: path.resolve(__dirname, '../client/config.js'),
    }
  }
