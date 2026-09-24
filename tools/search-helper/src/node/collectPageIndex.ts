import type { App, Page } from 'vuepress/core'

import type { IndexItem, LocaleIndex } from '../shared/index.js'
import { generatePageIndex } from './pageIndex.js'
import type { GeneratePageIndexOptions } from './pageIndex.js'
import type { PathStore } from './pathStore.js'

/** Options for collecting the page indexes. 收集页面索引的选项。 */
export interface CollectPageIndexOptions extends GeneratePageIndexOptions {
  /**
   * Filter pages to be indexed
   *
   * 过滤需要索引的页面
   *
   * @param page - VuePress page VuePress 页面
   * @returns Whether the page should be indexed 是否索引该页面
   */
  filter?: (page: Page) => boolean
}

/** Collected page indexes. 收集到的页面索引。 */
export interface CollectedPageIndex {
  /** Index items group by locale path 按语言环境路径分组的索引项 */
  indexesByLocale: LocaleIndex
  /**
   * Index ids of each page, used to remove stale items on update 每个页面的索引
   * id，用于在更新时移除过期项
   */
  indexesByPage: Map<string, string[]>
}

/**
 * Generate the index items of every indexable page, grouped by locale path.
 *
 * A page is skipped when it is filtered out or when it sets `search: false` in
 * its frontmatter.
 *
 * 生成每个可索引页面的索引项，并按语言环境路径分组。
 *
 * 页面被过滤掉或在其 frontmatter 中设置 `search: false` 时会被跳过。
 *
 * @param app - VuePress app VuePress 应用实例
 * @param options - Plugin options 插件选项
 * @param store - Path store 路径存储
 * @param indexesByPage - Map to fill with the index ids of each page 用于填充每个页面索引
 *   id 的映射
 * @returns Collected page indexes 收集到的页面索引 * @example import { collectPageIndex
 *   } from '@vuepress/search-helper' const { indexesByLocale, indexesByPage } =
 *   collectPageIndex( app, options, store, )
 */
export const collectPageIndex = (
  app: App,
  {
    customFields,
    filter = (): boolean => true,
    indexContent,
    preserveTags,
  }: CollectPageIndexOptions,
  store: PathStore,
  indexesByPage = new Map<string, string[]>(),
): CollectedPageIndex => {
  const indexesByLocale: LocaleIndex = {}

  app.pages.forEach((page) => {
    if (filter(page) && page.frontmatter.search !== false) {
      const pageIndexes: IndexItem[] = generatePageIndex(page, store, {
        customFields,
        indexContent,
        preserveTags,
      })

      // Track the document ids of each page, so that HMR can remove the stale
      // documents of a page on update or delete
      indexesByPage.set(
        page.path,
        pageIndexes.map(({ id }) => id),
      )
      ;(indexesByLocale[page.pathLocale] ??= []).push(...pageIndexes)
    }
  })

  return { indexesByLocale, indexesByPage }
}
