import { isArray, isString, useLocale } from '@vuepress/helper/client'
import { useEventListener } from '@vueuse/core'
import type PhotoSwipe from 'photoswipe'
import type { SlideData } from 'photoswipe'
import { computed, onMounted, onUnmounted } from 'vue'
import { useFrontmatter } from 'vuepress/client'
import type { PhotoSwipePluginLocaleData } from '../../shared/index.js'
import { usePhotoSwipeOptions } from '../helpers/index.js'
import type { PhotoSwipeBehaviorOptions } from '../typings.js'
import {
  LOADING_ICON,
  resolveImageInfoFromElement,
  setupPhotoSwipe,
} from '../utils/index.js'

import 'photoswipe/dist/photoswipe.css'
import '../styles/photo-swipe.css'

/**
 * Options for usePhotoSwipe composable
 *
 * usePhotoSwipe 组合式函数的选项
 */
export interface UsePhotoSwipeOptions extends PhotoSwipeBehaviorOptions {
  /**
   * Image selector
   *
   * 图片选择器
   */
  selector: string[] | string

  /**
   * Locale data
   *
   * 多语言数据
   */
  locales: Record<
    string,
    Record<`${keyof PhotoSwipePluginLocaleData}Title`, string>
  >
}

/**
 * Use PhotoSwipe composable
 *
 * 使用 PhotoSwipe 组合式函数
 *
 * @param options - PhotoSwipe options / PhotoSwipe 选项
 *
 * @example
 * ```ts
 * import { usePhotoSwipe } from '@vuepress/plugin-photo-swipe/client'
 *
 * usePhotoSwipe({
 *   selector: 'img',
 *   locales: {
 *     '/': {
 *       closeTitle: 'Close',
 *       downloadTitle: 'Download',
 *     },
 *   },
 *   download: true,
 *   fullscreen: true,
 * })
 * ```
 */
export const usePhotoSwipe = ({
  selector,
  locales,
  download = true,
  fullscreen = true,
  scrollToClose = true,
}: UsePhotoSwipeOptions): void => {
  const photoSwipeOptions = usePhotoSwipeOptions()
  const locale = useLocale(locales)
  const frontmatter = useFrontmatter<{ photoSwipe: boolean | string }>()

  const imageSelector = computed(() => {
    const { photoSwipe } = frontmatter.value

    return photoSwipe === false
      ? null
      : isString(photoSwipe)
        ? photoSwipe
        : isArray(selector)
          ? selector.join(', ')
          : selector
  })

  const options = computed(() => ({
    ...photoSwipeOptions.value,
    ...locale.value,
    download,
    fullscreen,
    scrollToClose,
  }))

  let photoSwipeLoader: Promise<typeof PhotoSwipe> | null = null
  let photoSwipeId = 0
  let photoSwipe: PhotoSwipe | null = null

  const initPhotoSwipe = async (event: MouseEvent): Promise<void> => {
    const el = event.target as HTMLImageElement

    if (
      // not enabled
      !imageSelector.value ||
      // Photoswipe is not being loaded
      !photoSwipeLoader ||
      // not an matched element
      !el.matches(imageSelector.value)
    )
      return

    // there is an active instance
    if (photoSwipeId !== 0) photoSwipe!.destroy()

    const id = Date.now()
    const PhotoSwipeConstructor = await photoSwipeLoader

    const images = [
      ...document.querySelectorAll<HTMLImageElement>(imageSelector.value),
    ]
    const dataSource = images.map<SlideData>((image) => ({
      html: LOADING_ICON,
      element: image,
      msrc: image.src,
    }))

    photoSwipe = new PhotoSwipeConstructor({
      preloaderDelay: 0,
      showHideAnimationType: 'zoom',
      ...options.value,
      dataSource,
      index: images.indexOf(el),
      ...(scrollToClose
        ? { closeOnVerticalDrag: true, wheelToZoom: false }
        : {}),
    })
    photoSwipeId = id

    setupPhotoSwipe(photoSwipe, { download, fullscreen })

    photoSwipe.init()

    photoSwipe.on('destroy', () => {
      photoSwipe = null
      photoSwipeId = 0
    })

    void images.map((image, imageIndex) =>
      resolveImageInfoFromElement(image).then((data) => {
        if (photoSwipeId !== id) return
        dataSource.splice(imageIndex, 1, data)
        photoSwipe?.refreshSlideContent(imageIndex)
      }),
    )
  }

  useEventListener('click', initPhotoSwipe, { passive: true })
  useEventListener('wheel', () => {
    if (options.value.scrollToClose) photoSwipe?.close()
  })

  onMounted(() => {
    if (__VUEPRESS_SSR__) return

    const rIC =
      'requestIdleCallback' in window ? window.requestIdleCallback : setTimeout

    rIC(() => {
      photoSwipeLoader = import(
        /* webpackChunkName: "photo-swipe" */ 'photoswipe'
      ).then(({ default: _PhotoSwipe }) => _PhotoSwipe)
    })
  })

  onUnmounted(() => {
    photoSwipe?.destroy()
  })
}
