// @vitest-environment happy-dom
import { describe, expect, it, vi } from 'vitest'

import {
  resolveImageInfoFromElement,
  resolveImageInfoFromLink,
} from '../../src/client/utils/images.js'

describe('resolve image info', () => {
  it('should resolve the source, the size and the alt text of an image element', async () => {
    const decode = vi
      .spyOn(HTMLImageElement.prototype, 'decode')
      .mockResolvedValue(undefined)

    const image = document.createElement('img')

    image.src = 'https://example.com/a.png'
    image.alt = 'An image'
    Object.defineProperty(image, 'naturalWidth', { value: 120 })
    Object.defineProperty(image, 'naturalHeight', { value: 80 })

    await expect(resolveImageInfoFromElement(image)).resolves.toStrictEqual({
      type: 'image',
      element: image,
      src: 'https://example.com/a.png',
      width: 120,
      height: 80,
      alt: 'An image',
      msrc: 'https://example.com/a.png',
    })

    decode.mockRestore()
  })

  it('should reject when the image cannot be decoded', async () => {
    const decode = vi
      .spyOn(HTMLImageElement.prototype, 'decode')
      .mockRejectedValue(new Error('broken'))

    const image = document.createElement('img')

    image.src = 'https://example.com/broken.png'

    await expect(resolveImageInfoFromElement(image)).rejects.toThrow(
      'Image decoding failed: https://example.com/broken.png',
    )

    decode.mockRestore()
  })

  it('should load a linked image without forcing a CORS request', async () => {
    const decode = vi
      .spyOn(HTMLImageElement.prototype, 'decode')
      .mockResolvedValue(undefined)

    const info = await resolveImageInfoFromLink(
      'https://example.com/linked.png',
    )

    expect(info).toMatchObject({
      type: 'image',
      src: 'https://example.com/linked.png',
      msrc: 'https://example.com/linked.png',
      alt: '',
    })

    // a cross-origin image without CORS headers must still load, so the
    // element must not be requested anonymously
    const image = info.element as HTMLImageElement

    expect(image.crossOrigin).not.toBe('anonymous')
    expect(image.src).toBe('https://example.com/linked.png')

    decode.mockRestore()
  })
})
