import type { KeyOptions } from '@vuepress/helper'
import { getFullLocaleConfig } from '@vuepress/helper'
import type { Page, Plugin } from 'vuepress/core'
import type { LocaleConfig } from 'vuepress/shared'
import { getDirname, path } from 'vuepress/utils'
import type { SearchIndex, SearchPluginLocaleData } from '../shared/index.js'
import { searchLocaleInfo } from './locales.js'
import {
  prepareSearchIndex,
  removeSearchIndexItem,
  updateSearchIndexItem,
} from './prepareSearchIndex.js'

const __dirname = import.meta.dirname || getDirname(import.meta.url)

/**
 * Options for `@vuepress/plugin-search`
 *
 * `@vuepress/plugin-search` 的配置项
 */
export interface SearchPluginOptions {
  /**
   * Locales config for search box
   *
   * 搜索框的多语言配置
   */
  locales?: LocaleConfig<SearchPluginLocaleData>

  /**
   * Specify the [event.key](http://keycode.info/) of the hotkeys
   *
   * 指定热键的 [event.key](http://keycode.info/)
   *
   * @description When hotkeys are pressed, the search box input will be focused.
   * Set to an empty array to disable hotkeys.
   *
   * 当热键被按下时，搜索框输入将获得焦点。设置为空数组以禁用热键。
   *
   * @default ['s', '/']
   */
  hotKeys?: (KeyOptions | string)[]

  /**
   * Specify the maximum number of search results
   *
   * 指定搜索结果的最大数量
   *
   * @default 5
   */
  maxSuggestions?: number

  /**
   * A function to determine whether a page should be included in the search index
   *
   * 用于确定页面是否应包含在搜索索引中的函数
   */
  isSearchable?: (page: Page) => boolean

  /**
   * A function to add extra fields to the search index of a page
   *
   * 用于向页面的搜索索引添加额外字段的函数
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

    onPageUpdated: async (_, type, page) => {
      if (type === 'delete') {
        await removeSearchIndexItem(_, page, searchIndex)
      } else {
        await updateSearchIndexItem(
          _,
          page,
          isSearchable,
          getExtraFields,
          searchIndex,
        )
      }
    },
  }
}
