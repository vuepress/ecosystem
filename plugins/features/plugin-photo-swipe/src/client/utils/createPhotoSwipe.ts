import { useEventListener } from '@vueuse/core'
import type PhotoSwipe from 'photoswipe'
import type { SlideData } from 'photoswipe'
import type { PhotoSwipeOptions } from '../helpers/index.js'
import type { PhotoSwipeBehaviorOptions } from '../typings.js'
import { resolveImageInfoFromLink } from './images.js'
import { LOADING_ICON } from './loadingIcon.js'
import { setupPhotoSwipe } from './setupPhotoSwipe.js'

/**
 * PhotoSwipe state interface
 *
 * PhotoSwipe 状态接口
 */
export interface PhotoSwipeState {
  /**
   * Open PhotoSwipe at specific index
   *
   * 在指定索引打开 PhotoSwipe
   *
   * @param index - Image index / 图片索引
   */
  open: (index: number) => void

  /**
   * Close PhotoSwipe
   *
   * 关闭 PhotoSwipe
   */
  close: () => void

  /**
   * Destroy PhotoSwipe instance
   *
   * 销毁 PhotoSwipe 实例
   */
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

/**
 * Create PhotoSwipe instance
 *
 * 创建 PhotoSwipe 实例
 *
 * @param images - Image links / 图片链接
 * @param options - PhotoSwipe options / PhotoSwipe 选项
 *
 * @example
 * ```ts
 * import { createPhotoSwipe } from '@vuepress/plugin-photo-swipe/client'
 *
 * const state = await createPhotoSwipe([
 *   'https://example.com/image1.jpg',
 *   'https://example.com/image2.jpg',
 * ], {
 *   download: true,
 *   fullscreen: true,
 * })
 *
 * // Open first image
 * state.open(0)
 * ```
 */
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
