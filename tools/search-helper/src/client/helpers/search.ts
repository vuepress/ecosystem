import { watchImmediate } from '@vueuse/core'
import type { App, ComputedRef, InjectionKey, MaybeRefOrGetter, Ref } from 'vue'
import { computed, inject, isRef, readonly, ref } from 'vue'
import type { PageData } from 'vuepress/client'
import { useLang, useRouteLocale } from 'vuepress/client'
import { isFunction } from 'vuepress/shared'

import type { SearchResult, WorkerSearchOptions } from '../../shared/index.js'
import { getSearchClientConfig } from '../define.js'

declare const __VUEPRESS_DEV__: boolean

/** Options of the search box for a locale. 某个语言环境的搜索框选项。 */
export interface SearchLocaleOptions extends WorkerSearchOptions {
  /**
   * A function to split the query into words
   *
   * It must split words the same way the tokenizer of the index does, otherwise
   * the queries will not match the index.
   *
   * 用于将搜索词拆分为单词的函数
   *
   * 它必须以与索引的分词器相同的方式拆分单词，否则查询将无法匹配索引。
   *
   * @param query - Search query 搜索词
   * @param lang - Language of the locale 语言环境的语言
   * @returns Split words 拆分后的单词
   */
  querySplitter?: (query: string, lang: string) => Promise<string[]>

  /**
   * A function to filter suggestions
   *
   * 用于过滤建议的函数
   *
   * @param suggestions - Suggestions of the query 搜索词的建议
   * @param query - Search query 搜索词
   * @param locale - Path of the locale 语言环境的路径
   * @param pageData - Data of the page 页面的数据
   * @returns Filtered suggestions 过滤后的建议
   */
  suggestionsFilter?: (
    suggestions: string[],
    query: string,
    locale: string,
    pageData: PageData,
  ) => string[]

  /**
   * A function to filter search results
   *
   * 用于过滤搜索结果的函数
   *
   * @param results - Search results 搜索结果
   * @param query - Search query 搜索词
   * @param locale - Path of the locale 语言环境的路径
   * @param pageData - Data of the page 页面的数据
   * @returns Filtered search results 过滤后的搜索结果
   */
  resultsFilter?: (
    results: SearchResult[],
    query: string,
    locale: string,
    pageData: PageData,
  ) => SearchResult[]
}

/** Options of the search box. 搜索框的选项。 */
export interface SearchOptions extends SearchLocaleOptions {
  /** Options of each locale 各语言环境的选项 */
  locales?: Record<string, SearchLocaleOptions>
}

const searchOptions: Ref<SearchOptions> = ref({})

const searchSymbol: InjectionKey<Ref<SearchOptions>> = Symbol(
  __VUEPRESS_DEV__ ? 'search' : '',
)

/**
 * Define options of the search box.
 *
 * 定义搜索框的选项。
 *
 * @param options - Options of the search box 搜索框的选项
 */
export const defineSearchConfig = (
  options: MaybeRefOrGetter<SearchOptions>,
): void => {
  if (isRef(options)) {
    watchImmediate(
      () => options.value,
      (value) => {
        searchOptions.value = value
      },
    )
  } else if (isFunction(options)) {
    watchImmediate(computed(options), (value) => {
      searchOptions.value = value
    })
  } else {
    searchOptions.value = options
  }
}

/**
 * Get options of the search box of the current locale.
 *
 * Engine specific defaults provided by the plugin are merged first, so that
 * user options always take precedence.
 *
 * 获取当前语言环境的搜索框选项。
 *
 * 由插件提供的引擎特有默认值会先被合并，因此用户选项始终优先。
 *
 * @returns Options of the search box 搜索框的选项
 */
export const useSearchOptions = (): ComputedRef<SearchLocaleOptions> => {
  const lang = useLang()
  const routeLocale = useRouteLocale()
  const options = inject(searchSymbol)!

  return computed(() => {
    const { locales = {}, ...rest } = options.value

    return {
      ...getSearchClientConfig().getLocaleSearchOptions?.(lang.value),
      ...rest,
      ...locales[routeLocale.value],
    }
  })
}

/**
 * Provide options of the search box to the app.
 *
 * 向应用提供搜索框的选项。
 *
 * @param app - Vue app Vue 应用
 */
export const injectSearchConfig = (app: App): void => {
  app.provide(searchSymbol, readonly(searchOptions))
}
