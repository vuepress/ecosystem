import { isFunction } from '@vuepress/helper/client'
import { watchImmediate } from '@vueuse/core'
import type { PhotoSwipeOptions as OriginalPhotoSwipeOptions } from 'photoswipe'
import type { App, InjectionKey, MaybeRefOrGetter, Ref } from 'vue'
import { computed, inject, isRef, ref } from 'vue'

/**
 * PhotoSwipe options for VuePress
 *
 * VuePress 中的 PhotoSwipe 选项
 */
export type PhotoSwipeOptions = Omit<
  OriginalPhotoSwipeOptions,
  // These are handled internally
  'dataSource' | 'index'
>

/**
 * PhotoSwipe options ref
 *
 * PhotoSwipe 选项响应式引用
 */
export type PhotoSwipeOptionsRef = Ref<PhotoSwipeOptions>

declare const __VUEPRESS_DEV__: boolean

const photoswipeOptions: PhotoSwipeOptionsRef = ref({})

const photoswipeSymbol: InjectionKey<PhotoSwipeOptionsRef> = Symbol(
  __VUEPRESS_DEV__ ? 'photoswipe' : '',
)

/**
 * Define PhotoSwipe config
 *
 * 定义 PhotoSwipe 配置
 *
 * @param options - PhotoSwipe options / PhotoSwipe 选项
 *
 * @example
 * ```ts
 * import { definePhotoSwipeConfig } from '@vuepress/plugin-photo-swipe/client'
 *
 * definePhotoSwipeConfig({
 *   bgOpacity: 0.8,
 *   spacing: 0.1,
 * })
 * ```
 */
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

/**
 * Get PhotoSwipe options
 *
 * 获取 PhotoSwipe 选项
 *
 * @returns PhotoSwipe options / PhotoSwipe 选项
 */
export const usePhotoSwipeOptions = (): PhotoSwipeOptionsRef =>
  inject(photoswipeSymbol)!

export const injectPhotoSwipeConfig = (app: App): void => {
  app.provide(photoswipeSymbol, photoswipeOptions)
}
