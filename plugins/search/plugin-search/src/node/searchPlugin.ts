import { getFullLocaleConfig } from '@vuepress/helper'
import type { PluginObject } from 'vuepress/core'
import { path } from 'vuepress/utils'

import type { SearchIndex } from '../shared/index.js'
import { searchLocaleInfo } from './locales.js'
import type { SearchPluginOptions } from './options.js'
import {
  prepareSearchIndex,
  removeSearchIndex,
  updateSearchIndex,
} from './prepareSearchIndex.js'

const __dirname = import.meta.dirname

const PLUGIN_NAME = '@vuepress/plugin-search'

export const searchPlugin = ({
  locales = {},
  hotKeys = ['s', '/'],
  maxSuggestions = 5,
  isSearchable = () => true,
  getExtraFields = () => [],
  hotReload,
}: SearchPluginOptions = {}): PluginObject => {
  // keep the index in memory so that a single page can be updated without
  // rebuilding the whole index
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

    onPageUpdated: async (app, type, newPage, oldPage) => {
      if (!(hotReload ?? app.env.isDebug)) return

      if (type === 'delete') {
        await removeSearchIndex({ app, searchIndex, page: oldPage! })
      } else {
        await updateSearchIndex({
          app,
          isSearchable,
          getExtraFields,
          searchIndex,
          newPage: newPage!,
          oldPage,
        })
      }
    },
  }
}
