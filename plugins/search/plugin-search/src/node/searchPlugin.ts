import { getFullLocaleConfig } from '@vuepress/helper'
import type { Plugin } from 'vuepress/core'
import { getDirname, path } from 'vuepress/utils'
import type { SearchIndex } from '../shared/index.js'
import { searchLocaleInfo } from './locales.js'
import type { SearchPluginOptions } from './options.js'
import {
  prepareSearchIndex,
  removeSearchIndexItem,
  updateSearchIndexItem,
} from './prepareSearchIndex.js'

const __dirname = import.meta.dirname || getDirname(import.meta.url)

const PLUGIN_NAME = '@vuepress/plugin-search'

export const searchPlugin = ({
  locales = {},
  hotKeys = ['s', '/'],
  maxSuggestions = 5,
  isSearchable = () => true,
  getExtraFields = () => [],
}: SearchPluginOptions = {}): Plugin => {
  const searchIndex: SearchIndex = []

  return {
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
      await prepareSearchIndex({
        app,
        isSearchable,
        getExtraFields,
        searchIndex,
      })
    },

    onPageUpdated: async (app, type, page) => {
      if (type === 'delete') {
        await removeSearchIndexItem(app, page, searchIndex)
      } else {
        await updateSearchIndexItem(
          app,
          page,
          isSearchable,
          getExtraFields,
          searchIndex,
        )
      }
    },
  }
}
