import { watchImmediate } from '@vueuse/core'
import type { App, ComputedRef, InjectionKey, MaybeRefOrGetter, Ref } from 'vue'
import { computed, inject, isRef, readonly, ref } from 'vue'
import type { PageData } from 'vuepress/client'
import { useRouteLocale } from 'vuepress/client'
import { isFunction } from 'vuepress/shared'

import type { SearchResult, WorkerSearchOptions } from '../../shared/index.js'

declare const __VUEPRESS_DEV__: boolean

export interface SearchLocaleOptions extends WorkerSearchOptions {
  /**
   * A function to split words
   *
   * 用于分词的函数
   */
  querySplitter?: (query: string, lang: string) => Promise<string[]>

  /**
   * A function to filter suggestions
   *
   * 用于过滤建议的函数
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
   */
  resultsFilter?: (
    results: SearchResult[],
    query: string,
    locale: string,
    pageData: PageData,
  ) => SearchResult[]
}

export interface SearchOptions extends SearchLocaleOptions {
  /**
   * Setting different options per locale
   *
   * 为每个语言环境设置不同的选项
   */
  locales?: Record<string, SearchLocaleOptions>
}

const searchOptions: Ref<SearchOptions> = ref({})

const oramaSymbol: InjectionKey<Ref<SearchOptions>> = Symbol(
  __VUEPRESS_DEV__ ? 'orama' : '',
)

/**
 * Set the global search options for the plugin.
 *
 * Accepts a plain object, a ref, or a getter function.
 *
 * 设置插件的全局搜索选项。
 *
 * 接受普通对象、Ref 或 Getter 函数作为参数。
 *
 * @param options - Search options 搜索选项
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
 * Get the search options for the current route locale.
 *
 * 获取当前路由语言环境的搜索选项。
 *
 * @returns Search options 搜索选项
 */
export const useSearchOptions = (): ComputedRef<SearchLocaleOptions> => {
  const routeLocale = useRouteLocale()
  const options = inject(oramaSymbol)!

  return computed(() => {
    const { locales = {}, ...rest } = options.value

    return {
      ...rest,
      ...locales[routeLocale.value],
    }
  })
}

/**
 * Provide the search options to the app.
 *
 * 向应用提供搜索选项。
 *
 * @param app - Vue app Vue 应用实例
 */
export const injectSearchConfig = (app: App): void => {
  app.provide(oramaSymbol, readonly(searchOptions))
}
