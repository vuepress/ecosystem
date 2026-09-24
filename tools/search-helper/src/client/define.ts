import type { ExactLocaleConfig, KeyOptions } from '@vuepress/helper/client'

import type {
  SearchCustomFieldFormatter,
  SearchLocaleData,
  WorkerSearchOptions,
} from '../shared/index.js'

/** Options of the search client. 搜索客户端的选项。 */
export interface SearchClientOptions {
  /** Delay to start searching after input 结束输入到开始搜索的延时 */
  searchDelay: number
  /** Delay to start auto-suggesting after input 结束输入到开始自动建议的延时 */
  suggestDelay: number
  /** Max stored query history count 存储查询历史的最大数量 */
  queryHistoryCount: number
  /** Max stored result history count 存储结果历史的最大数量 */
  resultHistoryCount: number
  /** Hotkeys of the search box 搜索框的热键 */
  hotKeys: KeyOptions[]
  /** Filename of the search worker 搜索工作线程的文件名 */
  worker: string
}

/**
 * Config of the search client.
 *
 * It is injected by the plugin on the client entry, since the values are
 * resolved on the node side and injected through `define`.
 *
 * 搜索客户端的配置。
 *
 * 它由插件在客户端入口注入，因为其值在 node 侧解析，并通过 `define` 注入。
 */
export interface SearchClientConfig {
  /** Options of the search client 搜索客户端的选项 */
  options: SearchClientOptions
  /** Locales of the search box 搜索框的多语言配置 */
  locales: ExactLocaleConfig<SearchLocaleData>
  /** Formatters of the custom fields 自定义字段的格式化配置 */
  customFieldConfig?: Record<string, SearchCustomFieldFormatter>
  /** Path store, which maps the page id to its path 路径存储，将页面 id 映射到其路径 */
  store: Record<number, string>
  /**
   * URL of the search worker in dev server
   *
   * It is resolved by the plugin, so that the relative path of the worker can
   * be resolved against the plugin itself.
   *
   * 开发服务器中搜索工作线程的 URL
   *
   * 它由插件解析，以便工作线程的相对路径能够相对插件本身解析。
   */
  devWorker?: URL

  /**
   * Engine specific default search options of a locale
   *
   * The returned options are merged before the user options, so that user
   * options always take precedence.
   *
   * 引擎特有的语言环境默认搜索选项
   *
   * 返回的选项会在用户选项之前合并，因此用户选项始终优先。
   *
   * @param lang - Language of the locale 语言环境的语言
   * @returns Default search options 默认搜索选项
   */
  getLocaleSearchOptions?: (lang: string) => WorkerSearchOptions
}

let clientConfig: SearchClientConfig | null = null

/**
 * Set the config of the search client.
 *
 * This must be called before any search component is used, which the client
 * config of the plugin does.
 *
 * 设置搜索客户端的配置。
 *
 * 它必须在任何搜索组件被使用前调用，插件的客户端配置会完成这件事。
 *
 * @param config - Config of the search client 搜索客户端的配置
 */
export const setSearchClientConfig = (config: SearchClientConfig): void => {
  clientConfig = config
}

/**
 * Get the config of the search client.
 *
 * 获取搜索客户端的配置。
 *
 * @returns Config of the search client 搜索客户端的配置
 */
export const getSearchClientConfig = (): SearchClientConfig => {
  if (!clientConfig) {
    throw new Error(
      'Search client config is not set. Make sure the search plugin is used.',
    )
  }

  return clientConfig
}
