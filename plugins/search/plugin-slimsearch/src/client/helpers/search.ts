import { watchImmediate } from '@vueuse/core'
import type { App, ComputedRef, InjectionKey, MaybeRefOrGetter, Ref } from 'vue'
import { computed, inject, isRef, readonly, ref } from 'vue'
import type { PageData } from 'vuepress/client'
import { useRouteLocale } from 'vuepress/client'

import { isFunction } from 'vuepress/shared'
import type { SearchResult, WorkerSearchOptions } from '../typings/index.js'
import { defaultQuerySplitter } from '../utils/index.js'

declare const __VUEPRESS_DEV__: boolean

export interface SearchLocaleOptions extends WorkerSearchOptions {
  /** A function to split words */
  querySplitter?: (query: string) => Promise<string[]>

  /** A function to filter suggestions */
  suggestionsFilter?: (
    suggestions: string[],
    query: string,
    locale: string,
    pageData: PageData,
  ) => string[]

  /** A function to filter search results */
  resultsFilter?: (
    results: SearchResult[],
    query: string,
    locale: string,
    pageData: PageData,
  ) => SearchResult[]
}

export interface SearchOptions extends SearchLocaleOptions {
  locales?: Record<string, SearchLocaleOptions>
}

const searchOptions: Ref<SearchOptions> = ref({
  querySplitter: (query) => Promise.resolve(defaultQuerySplitter(query)),
})

const slimsearchSymbol: InjectionKey<Ref<SearchOptions>> = Symbol(
  __VUEPRESS_DEV__ ? 'slimsearch' : '',
)

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

export const useSearchOptions = (): ComputedRef<SearchLocaleOptions> => {
  const routeLocale = useRouteLocale()
  const options = inject(slimsearchSymbol)!

  return computed(() => {
    const { locales = {}, ...rest } = options.value

    return {
      ...rest,
      ...locales[routeLocale.value],
    }
  })
}

export const injectSearchConfig = (app: App): void => {
  app.provide(slimsearchSymbol, readonly(searchOptions))
}
