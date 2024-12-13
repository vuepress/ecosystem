import { useEventListener } from '@vueuse/core'
import type PhotoSwipe from 'photoswipe'
import type { SlideData } from 'photoswipe'
import type { PhotoSwipeOptions } from '../helpers/index.js'
import { LOADING_ICON } from './icon.js'
import { getImageElementInfo } from './images.js'
import { setupPhotoSwipe } from './setupPhotoSwipe.js'
import type { PhotoSwipeBehaviorOptions } from './typings.js'

export const registerPhotoSwipe = async (
  images: HTMLImageElement[],
  {
    scrollToClose = true,
    download = true,
    fullscreen = true,
    ...photoSwipeOptions
  }: PhotoSwipeBehaviorOptions & PhotoSwipeOptions,
): Promise<() => void> => {
  const { default: PhotoSwipe } = await import(
    /* webpackChunkName: "photo-swipe" */ 'photoswipe'
  )
  let currentPhotoSwipe: PhotoSwipe | null = null

  const dataSource = images.map<SlideData>((image) => ({
    html: LOADING_ICON,
    element: image,
    msrc: image.src,
  }))

  images.forEach((image, index) => {
    const handler = (): void => {
      currentPhotoSwipe?.destroy()
      currentPhotoSwipe = new PhotoSwipe({
        preloaderDelay: 0,
        showHideAnimationType: 'zoom',
        ...photoSwipeOptions,
        dataSource,
        index,
        ...(scrollToClose
          ? { closeOnVerticalDrag: true, wheelToZoom: false }
          : {}),
      })

      setupPhotoSwipe(currentPhotoSwipe, { download, fullscreen })

      currentPhotoSwipe.addFilter('thumbEl', () => image)
      currentPhotoSwipe.addFilter('placeholderSrc', () => image.src)
      currentPhotoSwipe.init()
    }

    if (!image.getAttribute('photo-swipe')) {
      image.style.cursor = 'zoom-in'
      image.addEventListener('click', () => {
        handler()
      })
      image.addEventListener('keypress', ({ key }) => {
        if (key === 'Enter') handler()
      })
      // avoid registering multiple times
      image.setAttribute('photo-swipe', '')
    }

    void getImageElementInfo(image).then((data) => {
      dataSource.splice(index, 1, data)
      currentPhotoSwipe?.refreshSlideContent(index)
    })
  })

  return scrollToClose
    ? useEventListener('wheel', () => {
        currentPhotoSwipe?.close()
      })
    : (): void => {
        // do nothing
      }
}
