import type { DocSearchProps } from '@docsearch/react'
import { deepAssign, isFunction } from '@vuepress/helper/client'
import type { App, ComputedRef, InjectionKey, MaybeRefOrGetter, Ref } from 'vue'
import { computed, inject, isRef, readonly, ref, watch } from 'vue'
import { useRouteLocale } from 'vuepress/client'
import type { DocSearchOptions } from '../../shared/index.js'

declare const __VUEPRESS_DEV__: boolean
declare const __DOCSEARCH_OPTIONS__: DocSearchOptions

const docSearchDefineOptions: Partial<DocSearchProps> = __DOCSEARCH_OPTIONS__

const docsearchOptions = ref(docSearchDefineOptions as DocSearchProps)

const docsearchSymbol: InjectionKey<
  Ref<
    DocSearchProps & {
      locales?: Record<string, DocSearchProps>
    }
  >
> = Symbol(__VUEPRESS_DEV__ ? 'docsearch' : '')

export type DocSearchClientLocaleOptions = Partial<DocSearchProps>

export interface DocSearchClientOptions extends DocSearchClientLocaleOptions {
  locales?: Record<string, DocSearchClientLocaleOptions>
}

export const defineDocSearchConfig = (
  options: MaybeRefOrGetter<DocSearchClientOptions>,
): void => {
  if (isRef(options)) {
    watch(
      () => options.value,
      (value) => {
        docsearchOptions.value = deepAssign({}, docSearchDefineOptions, value)
      },
      { immediate: true },
    )
  } else if (isFunction(options)) {
    watch(computed(options), (value) => {
      docsearchOptions.value = deepAssign({}, docSearchDefineOptions, value)
    })
  } else {
    // @ts-expect-error: Types loop back
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
  app.provide(docsearchSymbol, readonly(docsearchOptions))
}
