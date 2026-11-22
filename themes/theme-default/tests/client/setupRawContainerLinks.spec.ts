// @vitest-environment happy-dom
import { describe, expect, it, vi } from 'vitest'

import { setupRawContainerLinks } from '../../src/client/composables/setupRawContainerLinks.js'

const createLink = (
  href: string,
  inRawContainer: boolean,
): HTMLAnchorElement => {
  const link = document.createElement('a')

  link.href = href

  if (inRawContainer) {
    const container = document.createElement('div')

    container.className = 'vp-raw'
    container.append(link)
    document.body.append(container)
  } else {
    document.body.append(link)
  }

  return link
}

const click = (link: HTMLAnchorElement, init: MouseEventInit = {}): boolean =>
  !link.dispatchEvent(
    new MouseEvent('click', { bubbles: true, cancelable: true, ...init }),
  )

const resetDom = (): void => {
  document.body.innerHTML = ''
  vi.restoreAllMocks()
}

// oxlint-disable-next-line vitest/require-hook -- the listener is installed once for all the cases
setupRawContainerLinks()

describe('setup raw container links', () => {
  it('should keep the normal links for the SPA router', () => {
    resetDom()
    const assign = vi
      .spyOn(window.location, 'assign')
      .mockImplementation(() => {})

    const link = createLink('/guide.html', false)

    expect(click(link)).toBe(false)
    expect(assign).not.toHaveBeenCalled()
  })

  it('should take the links inside the raw container over', () => {
    resetDom()
    const assign = vi
      .spyOn(window.location, 'assign')
      .mockImplementation(() => {})

    const link = createLink('/guide.html', true)
    const onClick = vi.fn<(event: MouseEvent) => void>()

    link.addEventListener('click', onClick)

    expect(click(link)).toBe(true)
    expect(assign).toHaveBeenCalledWith(`${window.location.origin}/guide.html`)
    // the click still reaches the listeners of the page, only the router
    // navigation is skipped
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('should keep the native hash navigation inside the raw container', () => {
    resetDom()
    const assign = vi
      .spyOn(window.location, 'assign')
      .mockImplementation(() => {})

    const link = createLink('#section', true)

    expect(click(link)).toBe(true)
    expect(assign).not.toHaveBeenCalled()
    expect(window.location.hash).toBe('#section')
  })

  it('should not take the modified clicks over', () => {
    resetDom()
    const assign = vi
      .spyOn(window.location, 'assign')
      .mockImplementation(() => {})

    const link = createLink('/guide.html', true)

    expect(click(link, { ctrlKey: true })).toBe(false)
    expect(click(link, { metaKey: true })).toBe(false)
    expect(click(link, { shiftKey: true })).toBe(false)
    expect(click(link, { altKey: true })).toBe(false)
    expect(click(link, { button: 1 })).toBe(false)
    expect(assign).not.toHaveBeenCalled()
  })

  it('should not take the links opened in another context over', () => {
    resetDom()
    const assign = vi
      .spyOn(window.location, 'assign')
      .mockImplementation(() => {})

    const blankLink = createLink('/guide.html', true)

    blankLink.target = '_blank'
    expect(click(blankLink)).toBe(false)

    const parentLink = createLink('/guide.html', true)

    parentLink.target = '_parent'
    expect(click(parentLink)).toBe(false)

    const namedLink = createLink('/guide.html', true)

    namedLink.target = 'docs'
    expect(click(namedLink)).toBe(false)

    const downloadLink = createLink('/guide.pdf', true)

    downloadLink.setAttribute('download', '')
    expect(click(downloadLink)).toBe(false)
    expect(assign).not.toHaveBeenCalled()
  })

  it('should not take the external links over', () => {
    resetDom()
    const assign = vi
      .spyOn(window.location, 'assign')
      .mockImplementation(() => {})

    const link = createLink('https://example.com/guide.html', true)

    expect(click(link)).toBe(false)
    expect(assign).not.toHaveBeenCalled()
  })
})
