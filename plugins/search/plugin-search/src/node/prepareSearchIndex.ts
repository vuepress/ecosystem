import type { App, Page } from 'vuepress/core'

import type { SearchIndex, SearchIndexItem } from '../shared/index.js'
import type { SearchPluginOptions } from './options.js'

const HMR_CODE = `
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSearchIndex) {
    __VUE_HMR_RUNTIME__.updateSearchIndex(SEARCH_INDEX)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ SEARCH_INDEX }) => {
    __VUE_HMR_RUNTIME__.updateSearchIndex(SEARCH_INDEX)
  })
}
`

/**
 * Create the search index entry of a page
 *
 * 创建页面的搜索索引条目
 *
 * @param page - Page to index / 要索引的页面
 * @param getExtraFields - Function to extract extra fields / 提取额外字段的函数
 * @returns Search index entry / 搜索索引条目
 */
const createSearchIndexItem = (
  page: Page,
  getExtraFields: Required<SearchPluginOptions>['getExtraFields'],
): SearchIndexItem => ({
  title: page.title,
  headers: page.headers,
  path: page.path,
  pathLocale: page.pathLocale,
  extraFields: getExtraFields(page),
})

/**
 * Drop the search index entry of a route path
 *
 * 移除某个路由路径的搜索索引条目
 *
 * @param searchIndex - Search index to modify / 要修改的搜索索引
 * @param path - Route path of the page / 页面的路由路径
 * @returns Whether an entry has been dropped / 是否移除了条目
 */
const removeEntryByPath = (searchIndex: SearchIndex, path: string): boolean => {
  const index = searchIndex.findIndex((item) => item.path === path)

  if (index === -1) return false

  searchIndex.splice(index, 1)

  return true
}

/**
 * Write the search index into a temp file
 *
 * 将搜索索引写入临时文件
 *
 * @param app - VuePress app / VuePress 应用实例
 * @param searchIndex - Search index to write / 要写入的搜索索引
 * @returns Path of the temp file / 临时文件路径
 */
export const writeSearchIndex = async (
  app: App,
  searchIndex: SearchIndex,
): Promise<string> => {
  let content = `\
export const SEARCH_INDEX = ${JSON.stringify(searchIndex, null, 2)}
`

  // inject HMR code
  if (app.env.isDev) content += HMR_CODE

  return app.writeTemp('internal/searchIndex.js', content)
}

/**
 * Options for preparing the search index
 *
 * 准备搜索索引的选项
 */
export interface PrepareSearchIndexOptions {
  /**
   * VuePress app
   *
   * VuePress 应用实例
   */
  app: App

  /**
   * Function to determine whether a page should be indexed
   *
   * 用于确定页面是否应被索引的函数
   */
  isSearchable: Required<SearchPluginOptions>['isSearchable']

  /**
   * Function to extract extra fields
   *
   * 提取额外字段的函数
   */
  getExtraFields: Required<SearchPluginOptions>['getExtraFields']

  /**
   * In memory search index, it is mutated in place
   *
   * 内存中的搜索索引，会被就地修改
   */
  searchIndex: SearchIndex
}

/**
 * Build the search index from all pages and write it into a temp file
 *
 * 从所有页面构建搜索索引并写入临时文件
 *
 * @param options - Options / 选项
 * @returns Path of the temp file / 临时文件路径
 */
export const prepareSearchIndex = async ({
  app,
  isSearchable,
  getExtraFields,
  searchIndex,
}: PrepareSearchIndexOptions): Promise<string> => {
  // rebuild the index in place
  searchIndex.length = 0
  searchIndex.push(
    ...app.pages
      .filter(isSearchable)
      .map((page) => createSearchIndexItem(page, getExtraFields)),
  )

  return writeSearchIndex(app, searchIndex)
}

/**
 * Options for updating the search index
 *
 * 更新搜索索引的选项
 */
export interface UpdateSearchIndexOptions extends PrepareSearchIndexOptions {
  /**
   * New revision of the page
   *
   * 页面的新版本
   */
  newPage: Page

  /**
   * Previous revision of the page, it is `null` when the page is created
   *
   * 页面的旧版本，页面被创建时为 `null`
   */
  oldPage: Page | null
}

/**
 * Replace the search index entry of a single page
 *
 * The entry of the previous revision is always dropped first, because the route
 * path of a page may change.
 *
 * 替换单个页面的搜索索引条目
 *
 * 总是先移除旧版本的条目，因为页面的路由路径可能发生变化。
 *
 * @param options - Options / 选项
 * @returns Path of the temp file / 临时文件路径
 */
export const updateSearchIndex = async ({
  app,
  isSearchable,
  getExtraFields,
  searchIndex,
  newPage,
  oldPage,
}: UpdateSearchIndexOptions): Promise<string> => {
  if (oldPage) removeEntryByPath(searchIndex, oldPage.path)

  if (isSearchable(newPage))
    searchIndex.push(createSearchIndexItem(newPage, getExtraFields))

  return writeSearchIndex(app, searchIndex)
}

/**
 * Options for removing a page from the search index
 *
 * 从搜索索引中删除页面的选项
 */
export interface RemoveSearchIndexOptions {
  /**
   * VuePress app
   *
   * VuePress 应用实例
   */
  app: App

  /**
   * In memory search index, it is mutated in place
   *
   * 内存中的搜索索引，会被就地修改
   */
  searchIndex: SearchIndex

  /**
   * Page that has been removed
   *
   * 已被移除的页面
   */
  page: Page
}

/**
 * Drop the search index entry of a removed page
 *
 * 移除已删除页面的搜索索引条目
 *
 * @param options - Options / 选项
 * @returns Path of the temp file / 临时文件路径
 */
export const removeSearchIndex = async ({
  app,
  searchIndex,
  page,
}: RemoveSearchIndexOptions): Promise<string> => {
  removeEntryByPath(searchIndex, page.path)

  return writeSearchIndex(app, searchIndex)
}
