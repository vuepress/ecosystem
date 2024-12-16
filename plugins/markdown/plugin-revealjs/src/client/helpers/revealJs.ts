// eslint-disable-next-line import/no-rename-default
import type Reveal from 'reveal.js'
import type { App, InjectionKey, MaybeRefOrGetter, Ref } from 'vue'
import { computed, inject, isRef, ref, watch } from 'vue'
import { isFunction } from 'vuepress/shared'

declare const __VUEPRESS_DEV__: boolean

export type RevealJsOptions = Partial<Omit<Reveal.Options, 'embedded'>>

export type RevealJsOptionsRef = Ref<RevealJsOptions>

const revealOptions: RevealJsOptionsRef = ref({})

const revealJsSymbol: InjectionKey<RevealJsOptionsRef> = Symbol(
  __VUEPRESS_DEV__ ? 'revealjs' : '',
)

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

export const useRevealJsConfig = (): RevealJsOptionsRef =>
  inject(revealJsSymbol)!

export const injectRevealJsConfig = (app: App): void => {
  app.provide(revealJsSymbol, revealOptions)
}
