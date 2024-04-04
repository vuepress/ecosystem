import type { DocSearchProps } from '@docsearch/react'
import { deepAssign } from '@vuepress/helper/client'
import type { App, ComputedRef, InjectionKey } from 'vue'
import { computed, inject } from 'vue'
import { useRouteLocale } from 'vuepress/client'
import type { DocsearchOptions } from '../../shared/index.js'

declare const __VUEPRESS_DEV__: boolean
declare const __DOCSEARCH_OPTIONS__: DocsearchOptions

const docSearchOptions: Partial<DocSearchProps> = __DOCSEARCH_OPTIONS__

let docsearch: Partial<DocSearchProps> = docSearchOptions

const docsearchSymbol: InjectionKey<
  DocSearchProps & {
    locales?: Record<string, DocSearchProps>
  }
> = Symbol(__VUEPRESS_DEV__ ? 'docsearch' : '')

export type DocSearchClientLocaleOptions = Partial<
  Omit<DocSearchProps, 'hitComponent' | 'navigator' | 'transformSearchClient'>
>

export interface DocSearchClientOptions extends DocSearchClientLocaleOptions {
  locales?: Record<string, DocSearchClientLocaleOptions>
}

export const defineDocSearchConfig = (
  options: DocSearchClientOptions,
): void => {
  docsearch = deepAssign({}, docSearchOptions, options)
}

export const useDocSearchOptions = (): ComputedRef<DocSearchProps> => {
  const options = inject(docsearchSymbol)!
  const routeLocale = useRouteLocale()

  return computed(() => ({
    ...options,
    ...options.locales?.[routeLocale.value],
  }))
}

export const injectDocSearchConfig = (app: App): void => {
  app.provide(docsearchSymbol, docsearch)
}
