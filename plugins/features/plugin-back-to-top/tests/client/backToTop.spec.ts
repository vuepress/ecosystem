// @vitest-environment happy-dom
import { flushPromises } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import {
  collectClientDefines,
  createTestApp,
  stubClientDefines,
} from '@vuepress/test-utils'
import { mountVuePress } from '@vuepress/test-utils/client'
import { describe, expect, it, vi } from 'vitest'

import backToTopClientConfig from '../../src/client/config.js'
import { backToTopPlugin } from '../../src/node/index.js'

let setupPromise: Promise<void> | undefined

/** Create the test app and stub the client defines once for the suite */
const setup = async (): Promise<void> => {
  setupPromise ??= (async (): Promise<void> => {
    const app = await createTestApp({ plugins: [backToTopPlugin()] })

    stubClientDefines(await collectClientDefines(app))
  })()

  await setupPromise
}

/**
 * Simulate a window scroll to the given position
 *
 * @param y - The vertical scroll position in pixels
 */
const scrollTo = async (y: number): Promise<void> => {
  // `useWindowScroll` reads the scroll position of the document element
  document.documentElement.scrollTop = y
  window.dispatchEvent(new Event('scroll'))

  await flushPromises()
}

const mountBackToTop = async (
  frontmatter: Record<string, unknown> = {},
): Promise<VueWrapper> => {
  await setup()

  const wrapper = await mountVuePress({
    clientConfigs: [backToTopClientConfig],
    content: '<p>content</p>',
    page: { frontmatter, path: '/' },
  })

  await flushPromises()

  return wrapper
}

describe('back to top button', () => {
  it('should not render the button before the threshold', async () => {
    const mounted = await mountBackToTop()

    await scrollTo(50)

    expect(mounted.find('.vp-back-to-top-button').exists()).toBe(false)
  })

  it('should render the button after the threshold', async () => {
    const mounted = await mountBackToTop()

    await scrollTo(150)

    const button = mounted.find('.vp-back-to-top-button')

    expect(button.exists()).toBe(true)
    expect(button.attributes('aria-label')).toBe('Back to top')
  })

  it('should scroll to the top when the button is clicked', async () => {
    const scrollToSpy = vi
      .spyOn(window, 'scrollTo')
      .mockImplementation(() => {})
    const mounted = await mountBackToTop()

    await scrollTo(150)
    await mounted.find('.vp-back-to-top-button').trigger('click')

    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })

  it('should hide the button when the frontmatter disables it', async () => {
    const mounted = await mountBackToTop({ backToTop: false })

    await scrollTo(150)

    expect(mounted.find('.vp-back-to-top-button').exists()).toBe(false)
  })

  it('should render the scroll progress by default', async () => {
    const mounted = await mountBackToTop()

    await scrollTo(150)

    expect(mounted.find('.vp-scroll-progress').exists()).toBe(true)
  })

  it('should not render the scroll progress when it is disabled', async () => {
    const progressApp = await createTestApp({
      plugins: [backToTopPlugin({ progress: false })],
    })
    const restoreProgress = stubClientDefines(
      await collectClientDefines(progressApp),
    )

    try {
      const mounted = await mountBackToTop()

      await scrollTo(150)

      expect(mounted.find('.vp-back-to-top-button').exists()).toBe(true)
      expect(mounted.find('.vp-scroll-progress').exists()).toBe(false)
    } finally {
      restoreProgress()
      progressApp.cleanup()
    }
  })

  it('should use the threshold given in Node', async () => {
    const thresholdApp = await createTestApp({
      plugins: [backToTopPlugin({ threshold: 500 })],
    })
    const restoreThreshold = stubClientDefines(
      await collectClientDefines(thresholdApp),
    )

    try {
      const mounted = await mountBackToTop()

      await scrollTo(150)
      expect(mounted.find('.vp-back-to-top-button').exists()).toBe(false)

      await scrollTo(600)
      expect(mounted.find('.vp-back-to-top-button').exists()).toBe(true)
    } finally {
      restoreThreshold()
      thresholdApp.cleanup()
    }
  })
})
