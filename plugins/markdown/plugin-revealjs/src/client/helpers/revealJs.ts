// eslint-disable-next-line import/no-rename-default
import type Reveal from 'reveal.js'
import type { App, MaybeRefOrGetter, Ref } from 'vue'
import { computed, inject, isRef, ref, watch } from 'vue'
import { isFunction } from 'vuepress/shared'

declare const __VUEPRESS_DEV__: boolean

export type RevealJsOptions = Partial<Omit<Reveal.Options, 'embedded'>>

const revealOptions: Ref<RevealJsOptions> = ref({})

const revealJsSymbol = Symbol(__VUEPRESS_DEV__ ? 'revealjs' : '')

export const defineRevealJsConfig = (
  options: MaybeRefOrGetter<RevealJsOptions>,
): void => {
  if (isRef(options)) {
    watch(
      () => options.value,
      (value) => {
        revealOptions.value = value
      },
      { immediate: true },
    )
  } else if (isFunction(options)) {
    watch(computed(options), (value) => {
      revealOptions.value = value
    })
  } else {
    revealOptions.value = options
  }
}

export const useRevealJsConfig = (): Ref<RevealJsOptions> =>
  inject(revealJsSymbol)!

export const injectRevealJsConfig = (app: App): void => {
  app.provide(revealJsSymbol, revealOptions)
}
