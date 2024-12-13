import { useEventListener } from '@vueuse/core'
import type PhotoSwipe from 'photoswipe'
import type { SlideData } from 'photoswipe'
import type { PhotoSwipeOptions } from '../helpers/index.js'
import type { PhotoSwipeBehaviorOptions } from '../typings.js'
import { resolveImageInfoFromLink } from './images.js'
import { LOADING_ICON } from './loadingIcon.js'
import { setupPhotoSwipe } from './setupPhotoSwipe.js'

export interface PhotoSwipeState {
  open: (index: number) => void
  close: () => void
  destroy: () => void
}

const getDataSource = (
  imageLinks: string[],
  photoswipe: PhotoSwipe | null = null,
): SlideData[] => {
  const dataSource = imageLinks.map<SlideData>((link) => ({
    html: LOADING_ICON,
    msrc: link,
  }))

  imageLinks.forEach((link, index) => {
    void resolveImageInfoFromLink(link).then((data) => {
      dataSource.splice(index, 1, data)
      photoswipe?.refreshSlideContent(index)
    })
  })

  return dataSource
}

export const createPhotoSwipe = async (
  images: string[],
  {
    scrollToClose = true,
    download = true,
    fullscreen = true,
    ...photoSwipeOptions
  }: PhotoSwipeBehaviorOptions & PhotoSwipeOptions,
): Promise<PhotoSwipeState> => {
  const { default: PhotoSwipe } = await import(
    /* webpackChunkName: "photo-swipe" */ 'photoswipe'
  )
  let currentPhotoSwipe: PhotoSwipe | null = null

  return {
    open: (index: number): void => {
      currentPhotoSwipe = new PhotoSwipe({
        preloaderDelay: 0,
        showHideAnimationType: 'zoom',
        ...photoSwipeOptions,
        index,
        ...(scrollToClose
          ? { closeOnVerticalDrag: true, wheelToZoom: false }
          : {}),
      })

      setupPhotoSwipe(currentPhotoSwipe, { download, fullscreen })

      currentPhotoSwipe.options.dataSource = getDataSource(
        images,
        currentPhotoSwipe,
      )

      // photoSwipe.addFilter('placeholderSrc', () => images[index])
      currentPhotoSwipe.init()
    },

    close: (): void => {
      currentPhotoSwipe?.close()
    },

    destroy: useEventListener('wheel', () => {
      currentPhotoSwipe?.close()
    }),
  }
}
