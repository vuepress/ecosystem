import type { PageHeader } from 'vuepress/shared'

/**
 * Search index entry for a single page
 *
 * 单个页面的搜索索引条目
 */
export interface SearchIndexItem {
  /**
   * Page title
   *
   * 页面标题
   */
  title: string

  /**
   * Page route path
   *
   * 页面路由路径
   */
  path: string

  /**
   * Page locale path
   *
   * 页面语言环境路径
   */
  pathLocale: string

  /**
   * Extra searchable fields extracted from the page
   *
   * 从页面提取的额外可搜索字段
   */
  extraFields: string[]

  /**
   * Page headers hierarchy
   *
   * 页面标题层级结构
   */
  headers: PageHeader[]
}

/**
 * Complete search index containing all searchable pages
 *
 * 包含所有可搜索页面的完整搜索索引
 */
export type SearchIndex = SearchIndexItem[]
