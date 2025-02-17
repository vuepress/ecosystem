import type { SlideData } from 'photoswipe'

export const resolveImageInfoFromElement = (
  imageElement: HTMLImageElement,
): Promise<SlideData> =>
  new Promise<SlideData>((resolve, reject) => {
    if (imageElement.complete) {
      resolve({
        type: 'image',
        element: imageElement,
        src: imageElement.src,
        width: imageElement.naturalWidth,
        height: imageElement.naturalHeight,
        alt: imageElement.alt,
        msrc: imageElement.src,
      })
    } else {
      imageElement.onload = (): void => {
        resolve(resolveImageInfoFromElement(imageElement))
      }
      imageElement.onerror = (): void => {
        reject()
      }
    }
  })

export const resolveImageInfoFromLink = (
  imageLink: string,
): Promise<SlideData> =>
  new Promise<SlideData>((resolve, reject) => {
    const el = new Image()

    el.src = imageLink
    el.onload = (): void => {
      resolve(resolveImageInfoFromElement(el))
    }
    el.onerror = (): void => {
      reject()
    }
  })
