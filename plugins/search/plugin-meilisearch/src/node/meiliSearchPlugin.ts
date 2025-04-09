import { entries, fromEntries, getFullLocaleConfig } from '@vuepress/helper'
import type { Plugin } from 'vuepress'
import { getDirname, path } from 'vuepress/utils'
import type { MeiliSearchOptions } from '../shared/index.js'
import { localeInfo } from './locales.js'

export type MeiliSearchPluginOptions = MeiliSearchOptions

const __dirname = getDirname(import.meta.url)

const PLUGIN_NAME = '@vuepress/plugin-meilisearch'

export const meiliSearchPlugin =
  ({
    locales = {},
    translations: rootTranslations,
    ...options
  }: MeiliSearchPluginOptions): Plugin =>
  (app) => ({
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

    clientConfigFile: path.resolve(__dirname, '../client/config.js'),
  })
