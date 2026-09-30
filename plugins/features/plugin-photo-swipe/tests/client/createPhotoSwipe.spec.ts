// @vitest-environment happy-dom
import { flushPromises } from '@vue/test-utils'
import type PhotoSwipeDefault from 'photoswipe'
import { describe, expect, it, vi } from 'vitest'

import { createPhotoSwipe } from '../../src/client/utils/createPhotoSwipe.js'
import { LOADING_ICON } from '../../src/client/utils/loadingIcon.js'

interface PhotoSwipeInstance {
  options: Record<string, unknown>
  close: () => void
  destroy: () => void
  refreshSlideContent: (index: number) => void
}

const mocks = vi.hoisted(() => ({ instances: [] as PhotoSwipeInstance[] }))

vi.mock(import('photoswipe'), () => {
  class MockPhotoSwipe {
    close = vi.fn<() => void>()
    destroy = vi.fn<() => void>()
    getNumItems = vi.fn<() => number>(() => 0)
    goTo = vi.fn<(index: number) => void>()
    init = vi.fn<() => void>()
    on = vi.fn<(event: string, handler: () => void) => void>()
    refreshSlideContent = vi.fn<() => void>()
    ui = { registerElement: vi.fn<(element: unknown) => void>() }

    constructor(public options: Record<string, unknown>) {
      mocks.instances.push(this)
    }
  }

  return {
    default: MockPhotoSwipe,
  } as unknown as Partial<{ default: typeof PhotoSwipeDefault }>
})

/**
 * Create an instance, open it at the given image and wait for the resolution
 *
 * 创建实例，在指定图片处打开并等待解析完成
 *
 * @param images - Image links to open / 待打开的图片链接
 * @param options - Extra PhotoSwipe options / 额外的 PhotoSwipe 选项
 * @returns The created PhotoSwipe instance / 创建的 PhotoSwipe 实例
 */
const openPhotoSwipe = async (
  images: string[],
  options: Record<string, unknown> = {},
): Promise<PhotoSwipeInstance> => {
  mocks.instances.length = 0

  const state = await createPhotoSwipe(images, {
    download: false,
    fullscreen: false,
    ...options,
  })

  state.open(0)
  await flushPromises()

  return mocks.instances[0]
}

describe('create photo swipe', () => {
  it('should show the loading icon until the images are resolved', async () => {
    mocks.instances.length = 0
    vi.spyOn(HTMLImageElement.prototype, 'decode').mockResolvedValue(undefined)

    const state = await createPhotoSwipe(['https://example.com/a.png'], {
      download: false,
      fullscreen: false,
    })

    state.open(0)

    const [instance] = mocks.instances
    const dataSource = instance.options.dataSource as {
      html?: string
      src?: string
    }[]

    expect(dataSource[0]).toStrictEqual({
      html: LOADING_ICON,
      msrc: 'https://example.com/a.png',
    })

    await flushPromises()

    expect(dataSource[0]).toMatchObject({
      type: 'image',
      src: 'https://example.com/a.png',
      msrc: 'https://example.com/a.png',
    })
    expect(instance.refreshSlideContent).toHaveBeenCalledWith(0)
  })

  it('should keep the working images when another image fails to load', async () => {
    vi.spyOn(HTMLImageElement.prototype, 'decode')
      .mockRejectedValueOnce(new Error('broken'))
      .mockResolvedValue(undefined)

    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    try {
      const instance = await openPhotoSwipe(
        ['https://example.com/broken.png', 'https://example.com/b.png'],
        { errorMsg: 'The image is broken' },
      )
      const dataSource = instance.options.dataSource as {
        html?: string
        src?: string
      }[]

      expect(warn).toHaveBeenCalledWith(
        expect.stringContaining('Image decoding failed'),
      )
      expect(dataSource[0].html).toBe(
        '<div class="photo-swipe-error"><div class="pswp__error-msg">The image is broken</div></div>',
      )
      expect(dataSource[1].src).toBe('https://example.com/b.png')
      expect(instance.refreshSlideContent).toHaveBeenCalledWith(0)
      expect(instance.refreshSlideContent).toHaveBeenCalledWith(1)
    } finally {
      warn.mockRestore()
    }
  })

  it('should destroy the created instance', async () => {
    mocks.instances.length = 0
    vi.spyOn(HTMLImageElement.prototype, 'decode').mockResolvedValue(undefined)

    const state = await createPhotoSwipe(['https://example.com/a.png'], {
      download: false,
      fullscreen: false,
    })

    state.open(0)
    await flushPromises()

    const [instance] = mocks.instances

    state.close()
    expect(instance.close).toHaveBeenCalledTimes(1)

    state.destroy()
    expect(instance.destroy).toHaveBeenCalledTimes(1)

    // the instance is gone, so closing again does nothing
    state.close()
    expect(instance.close).toHaveBeenCalledTimes(1)
  })
})
