import { watchImmediate } from '@vueuse/core'

import type Reveal from 'reveal.js'
import type { App, InjectionKey, MaybeRefOrGetter, Ref } from 'vue'
import { computed, inject, isRef, ref } from 'vue'
import { isFunction } from 'vuepress/shared'

declare const __VUEPRESS_DEV__: boolean

/**
 * Reveal.js options
 *
 * Reveal.js 选项
 */
export type RevealJsOptions = Partial<Omit<Reveal.Options, 'embedded'>>

/**
 * Reveal.js options ref
 *
 * Reveal.js 选项响应式引用
 */
export type RevealJsOptionsRef = Ref<RevealJsOptions>

const revealOptions: RevealJsOptionsRef = ref({})

const revealJsSymbol: InjectionKey<RevealJsOptionsRef> = Symbol(
  __VUEPRESS_DEV__ ? 'revealjs' : '',
)

/**
 * Define reveal.js configuration
 *
 * 定义 reveal.js 配置
 *
 * @param options - Reveal.js options / Reveal.js 选项
 *
 * @example
 * ```ts
 * import { defineRevealJsConfig } from '@vuepress/plugin-revealjs/client'
 *
 * defineRevealJsConfig({
 *   hash: true,
 *   keyboard: true,
 *   overview: true
 * })
 * ```
 */
export const defineRevealJsConfig = (
  options: MaybeRefOrGetter<RevealJsOptions>,
): void => {
  if (isRef(options)) {
    watchImmediate(
      () => options.value,
      (value) => {
        revealOptions.value = value
      },
    )
  } else if (isFunction(options)) {
    watchImmediate(computed(options), (value) => {
      revealOptions.value = value
    })
  } else {
    revealOptions.value = options
  }
}

/**
 * @internal
 *
 * @returns Reveal.js options ref
 */
export const useRevealJsConfig = (): RevealJsOptionsRef =>
  inject(revealJsSymbol)!

/**
 * @internal
 *
 * @param app - Vue application instance
 */
export const injectRevealJsConfig = (app: App): void => {
  app.provide(revealJsSymbol, revealOptions)
}
