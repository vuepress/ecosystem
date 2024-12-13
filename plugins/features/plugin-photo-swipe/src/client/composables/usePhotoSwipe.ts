import { isArray, isString, useLocaleConfig } from '@vuepress/helper/client'
import { useEventListener } from '@vueuse/core'
import type PhotoSwipe from 'photoswipe'
import type { SlideData } from 'photoswipe'
import { computed, onMounted, onUnmounted } from 'vue'
import { usePageFrontmatter } from 'vuepress/client'
import type { PhotoSwipePluginLocaleData } from '../../shared/index.js'
import { usePhotoSwipeOptions } from '../helpers/index.js'
import type { PhotoSwipeBehaviorOptions } from '../utils/index.js'
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

  let photoSwipeId = 0
  let photoSwipe: PhotoSwipe | null = null

  const handlePhotoSwipe = async (event: MouseEvent): Promise<void> => {
    const el = event.target as HTMLImageElement

    if (imageSelector.value && el.matches(imageSelector.value)) {
      photoSwipe?.destroy()

      const { default: PhotoSwipe } = await import(
        /* webpackChunkName: "photo-swipe" */ 'photoswipe'
      )

      const images = Array.from(
        document.querySelectorAll<HTMLImageElement>(imageSelector.value),
      )
      const currentIndex = images.findIndex((image) => image === el)

      const dataSource = images.map<SlideData>((image) => ({
        html: LOADING_ICON,
        element: image,
        msrc: image.src,
      }))

      dataSource.splice(currentIndex, 1, await resolveImageInfoFromElement(el))

      const id = Date.now()

      photoSwipeId = id
      photoSwipe = new PhotoSwipe({
        preloaderDelay: 0,
        showHideAnimationType: 'zoom',
        ...options,
        dataSource,
        index: currentIndex,
        ...(scrollToClose
          ? { closeOnVerticalDrag: true, wheelToZoom: false }
          : {}),
      })

      setupPhotoSwipe(photoSwipe, { download, fullscreen })

      photoSwipe.init()

      photoSwipe.on('destroy', () => {
        photoSwipe = null
        photoSwipeId = 0
      })

      images.forEach((image, index) => {
        if (index === currentIndex || photoSwipeId !== id) return

        void resolveImageInfoFromElement(image).then((data) => {
          dataSource.splice(index, 1, data)
          photoSwipe?.refreshSlideContent(index)
        })
      })
    }
  }

  onMounted(() => {
    useEventListener('click', handlePhotoSwipe)
    useEventListener('wheel', () => {
      if (options.value.scrollToClose) photoSwipe?.close()
    })
  })

  onUnmounted(() => {
    photoSwipe?.destroy()
  })
}
