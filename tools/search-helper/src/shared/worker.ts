import type { SearchableProperty } from './data.js'
import type { QueryResult, SearchResult } from './result.js'
import type { SearchSortStrategy } from './sortStrategy.js'

/**
 * Search options that can be sent to the search worker.
 *
 * The fields declared here are the ones shared by every search engine. Engines
 * with extra options (e.g. fuzzy matching) may accept additional fields, which
 * is why the interface is open.
 *
 * 可以发送到搜索 Worker 的搜索选项。
 *
 * 这里声明的字段是各搜索引擎共有的字段。具有额外选项（如模糊匹配）的引擎可以接受更多字段，因此该接口是开放的。
 */
export interface WorkerSearchOptions {
  /**
   * Relevance boost of the searched properties
   *
   * 搜索属性的相关度权重
   */
  boost?: Record<string, number>

  /**
   * Whether to search for exact matches only
   *
   * 是否仅搜索精确匹配
   */
  exact?: boolean

  /**
   * Max count of the returned results
   *
   * 返回结果的最大数量
   */
  limit?: number

  /**
   * Offset of the returned results
   *
   * 返回结果的偏移量
   */
  offset?: number

  /**
   * Properties to search in
   *
   * Accepts a readonly array because the option may be made readonly when
   * injected through a readonly ref.
   *
   * 需要搜索的属性
   *
   * 接受只读数组，因为该选项在通过只读 ref 注入时可能会变为只读。
   */
  properties?: '*' | readonly SearchableProperty[]

  /**
   * Threshold of the matched terms
   *
   * 匹配词的阈值
   */
  threshold?: number

  /**
   * Tolerance of the typos
   *
   * 拼写错误的容忍度
   */
  tolerance?: number

  /** Options of a specific search engine 特定搜索引擎的选项 */
  [key: string]: unknown
}

/** Type of the worker request. 工作线程请求的类型。 */
export type WorkerRequestType = 'all' | 'search' | 'suggest'

/**
 * Get the entry of a lookup table, ignoring the inherited properties.
 *
 * The locale registries are plain objects, so a locale named like an inherited
 * property (`constructor`, `toString`, ...) would return a function of
 * `Object.prototype` instead of `undefined`, and calling it would throw instead
 * of returning empty results.
 *
 * 获取查找表中的条目，忽略继承的属性。
 *
 * 语言环境注册表是普通对象，因此名为继承属性（`constructor`、`toString` 等）的语言环境会返回 `Object.prototype`
 * 上的函数而非 `undefined`，调用它会抛错而不是返回空结果。
 *
 * @example
 *   import { getOwnEntry } from '@vuepress/search-helper/shared'
 *
 *   getOwnEntry({ '/': loader }, 'constructor') // undefined
 *
 * @param record - Lookup table 查找表
 * @param key - Key to look up 需要查找的键
 * @returns Entry, or `undefined` when the table has none 条目，表中不存在时返回
 *   `undefined`
 */
export const getOwnEntry = <TValue>(
  record: Record<string, TValue>,
  key: string,
): TValue | undefined => (Object.hasOwn(record, key) ? record[key] : undefined)

/** Data of the message sent to the search worker. 发送到搜索工作线程的消息数据。 */
export interface WorkerMessageData<TSearchOptions = WorkerSearchOptions> {
  /**
   * Type of the request
   *
   * 请求的类型
   *
   * @default 'all'
   */
  type?: WorkerRequestType

  /** Search query 搜索词 */
  query: string

  /** Locale of the index 索引的语言 */
  locale: string

  /** Search options 搜索选项 */
  options?: TSearchOptions

  /** Id of the request, used to match the response 请求的 id，用于匹配响应 */
  id: number
}

/**
 * Response of a search worker.
 *
 * The three elements of the tuple are destructured by the client as `[type, id,
 * payload]`, so its shape is a contract between the worker and the client:
 * answering with an object instead of a tuple leaves the client waiting
 * forever.
 *
 * 搜索工作线程的响应。
 *
 * 客户端会按 `[type, id, payload]`
 * 解构该元组的三个元素，因此其形状是工作线程与客户端之间的契约：用对象而非元组作答会让客户端永远等待。
 */
export type WorkerResponse =
  | ['all', number, QueryResult]
  | ['search', number, SearchResult[]]
  | ['suggest', number, string[]]

/**
 * Handlers used to answer a request sent to the search worker.
 * 用于响应搜索工作线程请求的处理函数。
 */
export interface WorkerSearchHandlers<TIndex, TOptions> {
  /**
   * Get the suggestions of a query
   *
   * 获取搜索词的建议
   *
   * @param query - Search query 搜索词
   * @param localeIndex - Locale search index 语言搜索索引
   * @param options - Search options 搜索选项
   * @returns Search suggestions 搜索建议
   */
  getSuggestions: (
    query: string,
    localeIndex: TIndex,
    options?: TOptions,
  ) => string[]

  /**
   * Get the results of a query
   *
   * 获取搜索词的结果
   *
   * @param query - Search query 搜索词
   * @param localeIndex - Locale search index 语言搜索索引
   * @param options - Search options 搜索选项
   * @param sortStrategy - Strategy to sort the results 结果的排序策略
   * @returns Search results 搜索结果
   */
  getSearchResults: (
    query: string,
    localeIndex: TIndex,
    options: TOptions | undefined,
    sortStrategy: SearchSortStrategy,
  ) => SearchResult[]
}

/**
 * Build the response of a request sent to the search worker.
 *
 * The response is a tuple instead of a plain object, because the client relies
 * on its shape to resolve the pending promise of the request.
 *
 * A request for a locale without an index is answered with empty results rather
 * than throwing, so that an unknown locale can not break the client.
 *
 * 构建发送给搜索工作线程的请求的响应。
 *
 * 响应是元组而非普通对象，因为客户端依赖其形状来兑现该请求的待处理 Promise。
 *
 * 请求的索引不存在时，会以空结果作答而非抛错，因此未知的语言环境不会使客户端出错。
 *
 * @example
 *   import { createWorkerResponse } from '@vuepress/search-helper/shared'
 *
 *   self.postMessage(
 *     createWorkerResponse(
 *       data,
 *       searchIndex[data.locale],
 *       { getSuggestions, getSearchResults },
 *       'max',
 *     ),
 *   )
 *
 * @param data - Data of the request 请求的数据
 * @param localeIndex - Index of the requested locale, `undefined` when it has
 *   none 所请求语言环境的索引，不存在时为 `undefined`
 * @param handlers - Handlers of the search engine 搜索引擎的处理函数
 * @param sortStrategy - Strategy to sort the results 结果的排序策略
 * @returns Response to post back to the client 需要回传给客户端的响应
 */
export const createWorkerResponse = <TIndex, TOptions>(
  { id, options, query, type = 'all' }: WorkerMessageData<TOptions>,
  localeIndex: TIndex | undefined,
  { getSearchResults, getSuggestions }: WorkerSearchHandlers<TIndex, TOptions>,
  sortStrategy: SearchSortStrategy,
): WorkerResponse => {
  // Guard against locales without an index
  if (!localeIndex) {
    if (type === 'suggest') return [type, id, []]
    if (type === 'search') return [type, id, []]

    return [type, id, { suggestions: [], results: [] }]
  }

  if (type === 'suggest')
    return [type, id, getSuggestions(query, localeIndex, options)]

  if (type === 'search') {
    return [
      type,
      id,
      getSearchResults(query, localeIndex, options, sortStrategy),
    ]
  }

  return [
    type,
    id,
    {
      suggestions: getSuggestions(query, localeIndex, options),
      results: getSearchResults(query, localeIndex, options, sortStrategy),
    },
  ]
}
