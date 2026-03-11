import type { App, Page } from 'vuepress/core'
import type { SearchIndex, SearchIndexItem } from '../shared/index.js'
import type { SearchPluginOptions } from './searchPlugin.js'

const HMR_CODE = `
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSearchIndex) {
    __VUE_HMR_RUNTIME__.updateSearchIndex(searchIndex)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ searchIndex }) => {
    __VUE_HMR_RUNTIME__.updateSearchIndex(searchIndex)
  })
}
`

/**
 * Generate a search index entry for a single page
 *
 * 为单个页面生成搜索索引条目
 *
 * @param page - Page to index / 要索引的页面
 * @param getExtraFields - Function to extract extra fields / 提取额外字段的函数
 * @returns Search index item / 搜索索引条目
 */
const generateSearchIndexItem = (
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
 * Write the full search index to a temp file
 *
 * 将完整的搜索索引写入临时文件
 *
 * @param app - VuePress app instance / VuePress 应用实例
 * @param searchIndex - Complete search index / 完整的搜索索引
 * @returns Path to the temp file / 临时文件路径
 */
const writeSearchIndex = async (
  app: App,
  searchIndex: SearchIndex,
): Promise<string> => {
  let content = `\
export const SEARCH_INDEX = ${JSON.stringify(searchIndex, null, 2)}
`

  if (app.env.isDev) content += HMR_CODE

  return app.writeTemp('internal/searchIndex.js', content)
}

/**
 * Build full search index from all pages and write to temp file
 *
 * 从所有页面构建完整搜索索引并写入临时文件
 *
 * @param options - Search options / 搜索选项
 * @returns Path to the temp file / 临时文件路径
 */
export const prepareSearchIndex = async ({
  app,
  isSearchable,
  getExtraFields,
  searchIndex,
}: {
  app: App
  isSearchable: Required<SearchPluginOptions>['isSearchable']
  getExtraFields: Required<SearchPluginOptions>['getExtraFields']
  searchIndex: SearchIndex
}): Promise<string> => {
  // rebuild the full index
  searchIndex.length = 0
  searchIndex.push(
    ...app.pages
      .filter(isSearchable)
      .map((page) => generateSearchIndexItem(page, getExtraFields)),
  )

  return writeSearchIndex(app, searchIndex)
}

/**
 * Update or add a single page's entry in the search index
 *
 * 更新或添加搜索索引中单个页面的条目
 *
 * @param app - VuePress app instance / VuePress 应用实例
 * @param page - Page to update / 要更新的页面
 * @param isSearchable - Filter function / 过滤函数
 * @param getExtraFields - Function to extract extra fields / 提取额外字段的函数
 * @param searchIndex - Mutable search index / 可变搜索索引
 */
export const updateSearchIndexItem = async (
  app: App,
  page: Page,
  isSearchable: Required<SearchPluginOptions>['isSearchable'],
  getExtraFields: Required<SearchPluginOptions>['getExtraFields'],
  searchIndex: SearchIndex,
): Promise<void> => {
  // Remove existing entry for this page path
  const existingIndex = searchIndex.findIndex((item) => item.path === page.path)

  if (existingIndex !== -1) searchIndex.splice(existingIndex, 1)

  // Add new entry if the page is searchable
  if (isSearchable(page))
    searchIndex.push(generateSearchIndexItem(page, getExtraFields))

  await writeSearchIndex(app, searchIndex)
}

/**
 * Remove a single page's entry from the search index
 *
 * 从搜索索引中移除单个页面的条目
 *
 * @param app - VuePress app instance / VuePress 应用实例
 * @param page - Page to remove / 要移除的页面
 * @param searchIndex - Mutable search index / 可变搜索索引
 */
export const removeSearchIndexItem = async (
  app: App,
  page: Page,
  searchIndex: SearchIndex,
): Promise<void> => {
  const existingIndex = searchIndex.findIndex((item) => item.path === page.path)

  if (existingIndex !== -1) {
    searchIndex.splice(existingIndex, 1)
    await writeSearchIndex(app, searchIndex)
  }
}
