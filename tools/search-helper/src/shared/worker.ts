import type { SearchableProperty } from './data.js'

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
