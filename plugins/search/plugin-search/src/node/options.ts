import type { KeyOptions } from '@vuepress/helper'
import type { Page } from 'vuepress/core'
import type { LocaleConfig } from 'vuepress/shared'
import type { SearchPluginLocaleData } from '../shared/index.js'

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
