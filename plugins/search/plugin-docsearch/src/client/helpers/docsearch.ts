import type { DocSearchProps } from '@docsearch/js'
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

/**
 * DocSearch client locale options
 *
 * DocSearch 客户端多语言选项
 */
export type DocSearchClientLocaleOptions = Partial<DocSearchProps>

/**
 * DocSearch client options
 *
 * DocSearch 客户端选项
 */
export interface DocSearchClientOptions extends DocSearchClientLocaleOptions {
  /**
   * Locale options
   *
   * 多语言选项
   */
  locales?: Record<string, DocSearchClientLocaleOptions>
}

/**
 * Customize DocSearch options
 *
 * 自定义 DocSearch 选项
 *
 * @param options - DocSearch options, support plain object, ref or getter / DocSearch 选项，支持普通对象，Ref 或 Getter
 *
 * @example
 * ```ts
 * import { defineDocSearchConfig } from '@vuepress/plugin-docsearch/client'
 *
 * // Use plain object
 * defineDocSearchConfig({
 *   translations: {
 *     button: {
 *       buttonText: 'Search',
 *     },
 *   },
 * })
 *
 * // Use ref
 * const options = ref({
 *   translations: {
 *     button: {
 *       buttonText: 'Search',
 *     },
 *   },
 * })
 * defineDocSearchConfig(options)
 *
 * // Use getter
 * defineDocSearchConfig(() => ({
 *   translations: {
 *     button: {
 *       buttonText: isDarkMode.value ? 'Search in dark' : 'Search in light',
 *     },
 *   },
 * }))
 * ```
 */
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

/**
 * @internal
 *
 * @returns DocSearch options with locale config / 包含多语言配置的 DocSearch 选项
 */
export const useDocSearchOptions = (): ComputedRef<DocSearchProps> => {
  const options = inject(docsearchSymbol)!
  const routeLocale = useRouteLocale()

  return computed(() => ({
    ...options.value,
    ...options.value.locales?.[routeLocale.value],
  }))
}

/**
 * @internal
 *
 * @param app - Vue app instance / Vue 应用实例
 */
export const injectDocSearchConfig = (app: App): void => {
  // @ts-expect-error: Types loop back
  app.provide(docsearchSymbol, readonly(docsearchOptions))
}
