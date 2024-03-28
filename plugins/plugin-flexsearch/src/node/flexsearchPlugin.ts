import chokidar from 'chokidar'
import type { Page, Plugin } from 'vuepress/core'
import type { LocaleConfig } from 'vuepress/shared'
import { getDirname, path } from 'vuepress/utils'
import type { HotKeyOptions } from '../shared/index.js'
import { prepareSearchIndex } from './prepareSearchIndex.js'

const __dirname = getDirname(import.meta.url)

/**
 * Options for @vuepress/plugin-flexsearch
 */
export interface FlexsearchPluginOptions {
  /**
   * Locales config for search box
   */
  locales?: LocaleConfig<{
    placeholder: string
  }>

  /**
   * Specify the [event.key](http://keycode.info/) of the hotkeys
   *
   * When hotkeys are pressed, the search box input will be focused
   *
   * Set to an empty array to disable hotkeys
   *
   * @default ['s', '/']
   */
  hotKeys?: (string | HotKeyOptions)[]

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
}

export const flexsearchPlugin = ({
  locales = {},
  hotKeys = ['s', '/'],
  maxSuggestions = 5,
  isSearchable = () => true,
}: FlexsearchPluginOptions = {}): Plugin => ({
  name: '@vuepress/plugin-flexsearch',

  clientConfigFile: path.resolve(__dirname, '../client/config.js'),

  define: {
    __SEARCH_LOCALES__: locales,
    __SEARCH_HOT_KEYS__: hotKeys,
    __SEARCH_MAX_SUGGESTIONS__: maxSuggestions,
  },

  onPrepared: async (app) => {
    await prepareSearchIndex({ app, isSearchable })
  },

  onWatched: (app, watchers) => {
    // here we only watch the page data files
    const searchIndexWatcher = chokidar.watch('pages/**/*.js', {
      cwd: app.dir.temp(),
      ignoreInitial: true,
    })
    searchIndexWatcher.on('add', () => {
      prepareSearchIndex({ app, isSearchable })
    })
    searchIndexWatcher.on('change', () => {
      prepareSearchIndex({ app, isSearchable })
    })
    searchIndexWatcher.on('unlink', () => {
      prepareSearchIndex({ app, isSearchable })
    })
    watchers.push(searchIndexWatcher)
  },
})
