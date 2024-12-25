import type { DocSearchProps } from '@docsearch/react'
import { deepAssign, isFunction } from '@vuepress/helper/client'
import { watchImmediate } from '@vueuse/core'
import type { App, ComputedRef, InjectionKey, MaybeRefOrGetter, Ref } from 'vue'
import { computed, inject, isRef, readonly, ref } from 'vue'
import { useRouteLocale } from 'vuepress/client'
import type { DocSearchOptions } from '../../shared/index.js'

declare const __VUEPRESS_DEV__: boolean
declare const __DOCSEARCH_OPTIONS__: DocSearchOptions

const docSearchDefineOptions: Partial<DocSearchProps> = __DOCSEARCH_OPTIONS__

type DocSearchRef = Ref<
  DocSearchProps & {
    locales?: Record<string, DocSearchProps>
  }
>

// @ts-expect-error: Types loop back
const docsearchOptions: DocSearchRef = ref(
  docSearchDefineOptions as DocSearchProps,
)

const docsearchSymbol: InjectionKey<Readonly<DocSearchRef>> = Symbol(
  __VUEPRESS_DEV__ ? 'docsearch' : '',
)

export type DocSearchClientLocaleOptions = Partial<DocSearchProps>

export interface DocSearchClientOptions extends DocSearchClientLocaleOptions {
  locales?: Record<string, DocSearchClientLocaleOptions>
}

export const defineDocSearchConfig = (
  options: MaybeRefOrGetter<DocSearchClientOptions>,
): void => {
  if (isRef(options)) {
    watchImmediate(
      () => options.value,
      (value) => {
        docsearchOptions.value = deepAssign({}, docSearchDefineOptions, value)
      },
    )
  } else if (isFunction(options)) {
    watchImmediate(computed(options), (value) => {
      docsearchOptions.value = deepAssign({}, docSearchDefineOptions, value)
    })
  } else {
    docsearchOptions.value = deepAssign({}, docSearchDefineOptions, options)
  }
}

export const useDocSearchOptions = (): ComputedRef<DocSearchProps> => {
  const options = inject(docsearchSymbol)!
  const routeLocale = useRouteLocale()

  return computed(() => ({
    ...options.value,
    ...options.value.locales?.[routeLocale.value],
  }))
}

export const injectDocSearchConfig = (app: App): void => {
  // @ts-expect-error: Types loop back
  app.provide(docsearchSymbol, readonly(docsearchOptions))
}
