import { isArray } from '@vuepress/helper/client'
import type { SlideData } from 'photoswipe'

export const getImages = (selector: string[] | string): HTMLImageElement[] =>
  Array.from(
    document.querySelectorAll<HTMLImageElement>(
      isArray(selector) ? selector.join(', ') : selector,
    ),
  )

export const getImageElementInfo = (
  image: HTMLImageElement,
): Promise<SlideData> =>
  new Promise<SlideData>((resolve, reject) => {
    if (image.complete) {
      resolve({
        type: 'image',
        element: image,
        src: image.src,
        width: image.naturalWidth,
        height: image.naturalHeight,
        alt: image.alt,
        msrc: image.src,
      })
    } else {
      image.onload = (): void => {
        resolve(getImageElementInfo(image))
      }
      image.onerror = (): void => {
        reject()
      }
    }
  })

export const getImageUrlInfo = (image: string): Promise<SlideData> =>
  new Promise<SlideData>((resolve, reject) => {
    const el = new Image()

    el.src = image
    el.onload = (): void => {
      resolve(getImageElementInfo(el))
    }
    el.onerror = (): void => {
      reject()
    }
  })
