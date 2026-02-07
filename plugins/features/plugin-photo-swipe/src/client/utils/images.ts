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
      imageElement.addEventListener('load', () => {
        resolveImageInfoFromElement(imageElement).then(resolve).catch(reject)
      })
      imageElement.addEventListener('error', (event) => {
        reject(new Error(event.message))
      })
    }
  })

export const resolveImageInfoFromLink = (
  imageLink: string,
): Promise<SlideData> =>
  new Promise<SlideData>((resolve, reject) => {
    const el = new Image()

    el.src = imageLink
    el.addEventListener('load', () => {
      resolveImageInfoFromElement(el).then(resolve).catch(reject)
    })
    el.addEventListener('error', (event) => {
      reject(new Error(event.message))
    })
  })
