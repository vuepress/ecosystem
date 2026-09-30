// @vitest-environment happy-dom
import type PhotoSwipe from 'photoswipe'
import type { Mock } from 'vitest'
import { describe, expect, it, vi } from 'vitest'

import { setupPhotoSwipe } from '../../src/client/utils/setupPhotoSwipe.js'

interface RegisteredElement {
  name: string
  onInit?: (el: HTMLElement) => void
}

interface PhotoSwipeStub {
  currIndex: number
  currSlide: { data: { src?: string } }
  close: Mock<() => void>
  destroy: Mock<() => void>
  getNumItems: Mock<() => number>
  goTo: Mock<(index: number) => void>
  on: Mock<(event: string, handler: () => void) => void>
  refreshSlideContent: Mock<() => void>
  ui: {
    registerElement: Mock<(element: RegisteredElement) => RegisteredElement>
  }
}

interface PhotoSwipeStubFactory {
  elements: RegisteredElement[]
  emit: (event: string) => void
  names: () => string[]
  setup: (options: { download?: boolean; fullscreen?: boolean }) => void
  stub: PhotoSwipeStub
}

const createPhotoSwipeStub = (numItems = 2): PhotoSwipeStubFactory => {
  const handlers = new Map<string, (() => void)[]>()
  const elements: RegisteredElement[] = []
  const stub: PhotoSwipeStub = {
    currIndex: 0,
    currSlide: { data: { src: 'https://example.com/a.png' } },
    close: vi.fn<() => void>(),
    destroy: vi.fn<() => void>(),
    getNumItems: vi.fn<() => number>(() => numItems),
    goTo: vi.fn<(index: number) => void>(),
    on: vi.fn<(event: string, handler: () => void) => void>(
      (event, handler) => {
        handlers.set(event, [...(handlers.get(event) ?? []), handler])
      },
    ),
    refreshSlideContent: vi.fn<() => void>(),
    ui: {
      registerElement: vi.fn<(element: RegisteredElement) => RegisteredElement>(
        (element) => {
          elements.push(element)

          return element
        },
      ),
    },
  }

  return {
    elements,
    emit: (event: string): void => {
      for (const handler of handlers.get(event) ?? []) handler()
    },
    names: (): string[] => elements.map(({ name }) => name),
    setup: (options: { download?: boolean; fullscreen?: boolean }): void => {
      setupPhotoSwipe(stub as unknown as PhotoSwipe, options)
      handlers.get('uiRegister')?.forEach((handler) => handler())
    },
    stub,
  }
}

describe('setup photo swipe', () => {
  it('should register a bullets indicator and a download button', () => {
    const photoSwipe = createPhotoSwipeStub()

    photoSwipe.setup({ download: true, fullscreen: false })

    expect(photoSwipe.names()).toContain('bulletsIndicator')
    expect(photoSwipe.names()).toContain('download')
    expect(photoSwipe.names()).not.toContain('fullscreen')
  })

  it('should not register a download button when download is disabled', () => {
    const photoSwipe = createPhotoSwipeStub()

    photoSwipe.setup({ download: false, fullscreen: false })

    expect(photoSwipe.names()).toContain('bulletsIndicator')
    expect(photoSwipe.names()).not.toContain('download')
  })

  it('should keep the download link in sync with the current slide', () => {
    const photoSwipe = createPhotoSwipeStub()

    photoSwipe.setup({ download: true, fullscreen: false })

    const element = photoSwipe.elements.find(({ name }) => name === 'download')!
    const link = document.createElement('a')

    element.onInit!(link)

    expect(link.getAttribute('download')).toBe('')
    expect(link.getAttribute('target')).toBe('_blank')
    expect(link.getAttribute('rel')).toBe('noopener')

    photoSwipe.stub.currSlide.data.src = 'https://example.com/next.png'
    photoSwipe.emit('change')

    expect(link.getAttribute('href')).toBe('https://example.com/next.png')
  })

  it('should drop the download link when the current slide has no source', () => {
    const photoSwipe = createPhotoSwipeStub()

    photoSwipe.setup({ download: true, fullscreen: false })

    const element = photoSwipe.elements.find(({ name }) => name === 'download')!
    const link = document.createElement('a')

    element.onInit!(link)

    photoSwipe.emit('change')
    expect(link.getAttribute('href')).toBe('https://example.com/a.png')

    // the image of the slide failed to load and an error placeholder is shown
    photoSwipe.stub.currSlide.data = {}
    photoSwipe.emit('change')

    expect(link.hasAttribute('href')).toBe(false)
    expect(link.getAttribute('aria-disabled')).toBe('true')
  })

  it('should render one bullet per image and highlight the current one', () => {
    const photoSwipe = createPhotoSwipeStub(3)

    photoSwipe.setup({ download: false, fullscreen: false })

    const element = photoSwipe.elements.find(
      ({ name }) => name === 'bulletsIndicator',
    )!
    const wrapper = document.createElement('div')

    element.onInit!(wrapper)

    const bullets = [...wrapper.querySelectorAll('.photo-swipe-bullet')]

    expect(bullets).toHaveLength(3)

    ;(bullets[2] as HTMLElement).click()
    expect(photoSwipe.stub.goTo).toHaveBeenCalledWith(2)

    photoSwipe.stub.currIndex = 2
    photoSwipe.emit('change')

    expect(bullets[2].classList.contains('active')).toBe(true)
    expect(bullets[0].classList.contains('active')).toBe(false)
  })
})
