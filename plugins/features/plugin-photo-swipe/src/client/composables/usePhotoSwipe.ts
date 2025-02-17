import { isArray, isString, useLocaleConfig } from '@vuepress/helper/client'
import { useEventListener } from '@vueuse/core'
import type PhotoSwipe from 'photoswipe'
import type { SlideData } from 'photoswipe'
import { computed, onMounted, onUnmounted } from 'vue'
import { usePageFrontmatter } from 'vuepress/client'
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

export interface UsePhotoSwipeOptions extends PhotoSwipeBehaviorOptions {
  selector: string[] | string
  locales: Record<
    string,
    Record<`${keyof PhotoSwipePluginLocaleData}Title`, string>
  >
}

export const usePhotoSwipe = ({
  selector,
  locales,
  download = true,
  fullscreen = true,
  scrollToClose = true,
}: UsePhotoSwipeOptions): void => {
  const photoSwipeOptions = usePhotoSwipeOptions()
  const locale = useLocaleConfig(locales)
  const frontmatter = usePageFrontmatter<{ photoSwipe: boolean | string }>()

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

    const images = Array.from(
      document.querySelectorAll<HTMLImageElement>(imageSelector.value),
    )
    const dataSource = images.map<SlideData>((image) => ({
      html: LOADING_ICON,
      element: image,
      msrc: image.src,
    }))

    const index = images.findIndex((image) => image === el)

    photoSwipe = new PhotoSwipeConstructor({
      preloaderDelay: 0,
      showHideAnimationType: 'zoom',
      ...options,
      dataSource,
      index,
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

  onMounted(() => {
    const rIC =
      'requestIdleCallback' in window ? window.requestIdleCallback : setTimeout

    useEventListener('click', initPhotoSwipe)
    useEventListener('wheel', () => {
      if (options.value.scrollToClose) photoSwipe?.close()
    })
    rIC(() => {
      photoSwipeLoader = import(
        /* webpackChunkName: "photo-swipe" */ 'photoswipe'
      ).then(({ default: _PhotoSwipe }) => {
        return _PhotoSwipe
      })
    })
  })

  onUnmounted(() => {
    photoSwipe?.destroy()
  })
}
