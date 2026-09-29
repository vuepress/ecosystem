// @vitest-environment happy-dom
import { describe, expect, it, vi } from 'vitest'

import { getScrollTop, scrollToTop } from '../../src/client/utils.js'

const originalScrollY = Object.getOwnPropertyDescriptor(window, 'scrollY')

/** Restore the `scrollY` property of the window to its original state */
const restoreScrollY = (): void => {
  if (originalScrollY) Object.defineProperty(window, 'scrollY', originalScrollY)
  else Reflect.deleteProperty(window, 'scrollY')
}

/** Reset the scroll positions of the document */
const resetDocumentScroll = (): void => {
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

describe('back to top utils', () => {
  it('should read the scroll position from the window', () => {
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      value: 120,
    })

    expect(getScrollTop()).toBe(120)

    restoreScrollY()
  })

  it('should fall back to the document scroll position', () => {
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 0 })
    document.documentElement.scrollTop = 30

    expect(getScrollTop()).toBe(30)

    restoreScrollY()
    resetDocumentScroll()
  })

  it('should scroll the window to the top smoothly', () => {
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})

    scrollToTop()

    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })

    scrollTo.mockRestore()
  })
})
