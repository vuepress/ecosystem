import type { SlideData } from 'photoswipe'

export const resolveImageInfoFromElement = async (
  imageElement: HTMLImageElement,
): Promise<SlideData> => {
  try {
    await imageElement.decode()
  } catch {
    throw new Error(`Image decoding failed: ${imageElement.src}`)
  }

  return {
    type: 'image',
    element: imageElement,
    src: imageElement.src,
    width: imageElement.naturalWidth,
    height: imageElement.naturalHeight,
    alt: imageElement.alt,
    msrc: imageElement.src,
  }
}

export const resolveImageInfoFromLink = async (
  imageLink: string,
): Promise<SlideData> => {
  const el = new Image()
  el.crossOrigin = 'anonymous'
  el.src = imageLink

  return resolveImageInfoFromElement(el)
}
