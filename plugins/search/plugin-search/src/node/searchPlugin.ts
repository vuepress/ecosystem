import type { KeyOptions } from '@vuepress/helper'
import { getFullLocaleConfig } from '@vuepress/helper'
import type { Page, Plugin } from 'vuepress/core'
import type { LocaleConfig } from 'vuepress/shared'
import { getDirname, path } from 'vuepress/utils'
import type { SearchPluginLocaleData } from '../shared/index.js'
import { searchLocaleInfo } from './locales.js'
import { prepareSearchIndex } from './prepareSearchIndex.js'

const __dirname = import.meta.dirname || getDirname(import.meta.url)

/**
 * Options for `@vuepress/plugin-search`
 *
 * `@vuepress/plugin-search` 的配置项
 */
export interface SearchPluginOptions {
  /**
   * Locales config for search box
   */
  locales?: LocaleConfig<SearchPluginLocaleData>

  /**
   * Specify the [event.key](http://keycode.info/) of the hotkeys
   *
   * When hotkeys are pressed, the search box input will be focused
   *
   * Set to an empty array to disable hotkeys
   *
   * @default ['s', '/']
   */
  hotKeys?: (KeyOptions | string)[]

  /**
   * Specify the maximum number of search results
   *
   * @default 5
   */
  maxSuggestions?: number

  /**
   * A function to determine whether a page should be included in the search index
   */
  isSearchable?: (page: Page) => boolean

  /**
   * A function to add extra fields to the search index of a page
   */
  getExtraFields?: (page: Page) => string[]
}

const PLUGIN_NAME = '@vuepress/plugin-search'

export const searchPlugin = ({
  locales = {},
  hotKeys = ['s', '/'],
  maxSuggestions = 5,
  isSearchable = () => true,
  getExtraFields = () => [],
}: SearchPluginOptions = {}): Plugin => ({
  name: PLUGIN_NAME,

  clientConfigFile: path.resolve(__dirname, '../client/config.js'),

  define: (app) => ({
    __SEARCH_HOT_KEYS__: hotKeys,
    __SEARCH_LOCALES__: getFullLocaleConfig({
      app,
      name: PLUGIN_NAME,
      default: searchLocaleInfo,
      config: locales,
    }),
    __SEARCH_MAX_SUGGESTIONS__: maxSuggestions,
  }),

  onPrepared: async (app) => {
    await prepareSearchIndex({ app, isSearchable, getExtraFields })
  },

  onPageUpdated: async (app) => {
    await prepareSearchIndex({ app, isSearchable, getExtraFields })
  },
})
