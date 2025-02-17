import { isFunction } from '@vuepress/helper/client'
import { watchImmediate } from '@vueuse/core'
import type { PhotoSwipeOptions as OriginalPhotoSwipeOptions } from 'photoswipe'
import type { App, InjectionKey, MaybeRefOrGetter, Ref } from 'vue'
import { computed, inject, isRef, ref } from 'vue'

export type PhotoSwipeOptions = Omit<
  OriginalPhotoSwipeOptions,
  // These are handled internally
  'dataSource' | 'index'
>

export type PhotoSwipeOptionsRef = Ref<PhotoSwipeOptions>

declare const __VUEPRESS_DEV__: boolean

const photoswipeOptions: PhotoSwipeOptionsRef = ref({})

const photoswipeSymbol: InjectionKey<PhotoSwipeOptionsRef> = Symbol(
  __VUEPRESS_DEV__ ? 'photoswipe' : '',
)

export const definePhotoSwipeConfig = (
  options: MaybeRefOrGetter<PhotoSwipeOptions>,
): void => {
  if (isRef(options)) {
    watchImmediate(
      () => options.value,
      (value) => {
        photoswipeOptions.value = value
      },
    )
  } else if (isFunction(options)) {
    watchImmediate(computed(options), (value) => {
      photoswipeOptions.value = value
    })
  } else {
    photoswipeOptions.value = options
  }
}

export const usePhotoSwipeOptions = (): PhotoSwipeOptionsRef =>
  inject(photoswipeSymbol)!

export const injectPhotoSwipeConfig = (app: App): void => {
  app.provide(photoswipeSymbol, photoswipeOptions)
}
