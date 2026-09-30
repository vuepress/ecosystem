// @vitest-environment happy-dom
import { flushPromises } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import {
  collectClientDefines,
  createTestApp,
  stubClientDefines,
} from '@vuepress/test-utils'
import type { mountVuePress as mountVuePressFn } from '@vuepress/test-utils/client'
import type PhotoSwipeDefault from 'photoswipe'
import { describe, expect, it, vi } from 'vitest'
import type { ClientConfig } from 'vuepress/client'

import type { definePhotoSwipeConfig as definePhotoSwipeConfigFn } from '../../src/client/helpers/index.js'
import { photoSwipePlugin } from '../../src/node/index.js'

interface PhotoSwipeInstance {
  options: Record<string, unknown>
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

const content = `
  <img class="zoomable" src="/a.png" alt="A">
  <img class="zoomable" src="/b.png" alt="B">
  <img class="plain" src="/c.png" alt="C">
`

let clientConfig: ClientConfig
let definePhotoSwipeConfig: typeof definePhotoSwipeConfigFn
let mountVuePress: typeof mountVuePressFn
let wrapper: VueWrapper | undefined

let setupPromise: Promise<void> | undefined

/** Create the test app and load the client modules once for the suite */
const setup = async (): Promise<void> => {
  setupPromise ??= (async (): Promise<void> => {
    const app = await createTestApp({
      plugins: [
        photoSwipePlugin({
          selector: 'img.zoomable',
          download: false,
          fullscreen: false,
          scrollToClose: true,
        }),
      ],
    })

    stubClientDefines(await collectClientDefines(app))

    // The client config reads the defines at module scope, so everything that
    // depends on it must be imported after the defines are stubbed.
    vi.resetModules()

    const testUtils = await import('@vuepress/test-utils/client')

    ;({ mountVuePress } = testUtils)
    clientConfig = (await import('../../src/client/config.js')).default
    ;({ definePhotoSwipeConfig } =
      await import('../../src/client/helpers/index.js'))

    vi.spyOn(HTMLImageElement.prototype, 'decode').mockResolvedValue(undefined)
  })()

  await setupPromise
}

/** Reset the state left over by the previous test */
const resetState = (): void => {
  wrapper?.unmount()
  wrapper = undefined
  mocks.instances.length = 0
  document.body.innerHTML = ''
  definePhotoSwipeConfig({})
}

/**
 * Mount the client, wait for PhotoSwipe to be loaded and click an image
 *
 * @param options - The frontmatter of the page and the index of the clicked
 *   image
 */
const openPhotoSwipe = async (
  options: {
    frontmatter?: Record<string, unknown>
    index?: number
  } = {},
): Promise<void> => {
  await setup()

  const mounted = await mountVuePress({
    attachTo: document.body,
    clientConfigs: [clientConfig],
    content,
    page: { frontmatter: options.frontmatter ?? {}, path: '/' },
  })

  wrapper = mounted

  await flushPromises()
  // The composable loads PhotoSwipe in an idle callback
  await new Promise((resolve) => {
    setTimeout(resolve, 0)
  })

  await mounted.findAll('img')[options.index ?? 1].trigger('click')
  await flushPromises()
}

describe('photo swipe client config', () => {
  it('should open PhotoSwipe with the images matched by the selector', async () => {
    await setup()
    resetState()

    await openPhotoSwipe()

    expect(mocks.instances).toHaveLength(1)

    const [{ options }] = mocks.instances
    const dataSource = options.dataSource as { msrc: string }[]

    expect(dataSource).toHaveLength(2)
    expect(dataSource.map(({ msrc }) => new URL(msrc).pathname)).toStrictEqual([
      '/a.png',
      '/b.png',
    ])
    expect(options.index).toBe(1)
  })

  it('should pass the behavior options defined in Node', async () => {
    await setup()
    resetState()

    await openPhotoSwipe()

    const [{ options }] = mocks.instances

    expect(options.download).toBe(false)
    expect(options.fullscreen).toBe(false)
    expect(options.closeOnVerticalDrag).toBe(true)
    expect(options.wheelToZoom).toBe(false)
  })

  it('should merge the options defined on the client', async () => {
    await setup()
    resetState()

    definePhotoSwipeConfig({ bgOpacity: 0.8 })

    await openPhotoSwipe()

    expect(mocks.instances[0].options.bgOpacity).toBe(0.8)
  })

  it('should show the localized error message when an image cannot be decoded', async () => {
    await setup()
    resetState()

    const decode = vi.spyOn(HTMLImageElement.prototype, 'decode')
    decode.mockRejectedValue(new Error('broken'))

    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    try {
      await openPhotoSwipe()

      expect(warn).toHaveBeenCalledWith(
        expect.stringContaining('Image decoding failed'),
      )

      const [instance] = mocks.instances
      const dataSource = instance.options.dataSource as { html?: string }[]

      // the failed images are replaced with the error placeholder, using the
      // message of the resolved locale
      expect(instance.options.errorMsg).toBe('The image cannot be loaded')
      expect(dataSource[0].html).toBe(
        '<div class="photo-swipe-error"><div class="pswp__error-msg">The image cannot be loaded</div></div>',
      )
      expect(dataSource[1].html).toBe(
        '<div class="photo-swipe-error"><div class="pswp__error-msg">The image cannot be loaded</div></div>',
      )
      expect(instance.refreshSlideContent).toHaveBeenCalledWith(0)
      expect(instance.refreshSlideContent).toHaveBeenCalledWith(1)
    } finally {
      decode.mockResolvedValue(undefined)
      warn.mockRestore()
    }
  })

  it('should prefer the error message defined on the client', async () => {
    await setup()
    resetState()

    definePhotoSwipeConfig({ errorMsg: 'The image is broken' })

    const decode = vi.spyOn(HTMLImageElement.prototype, 'decode')
    decode.mockRejectedValue(new Error('broken'))

    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    try {
      await openPhotoSwipe()

      const [instance] = mocks.instances
      const dataSource = instance.options.dataSource as { html?: string }[]

      expect(instance.options.errorMsg).toBe('The image is broken')
      expect(dataSource[1].html).toBe(
        '<div class="photo-swipe-error"><div class="pswp__error-msg">The image is broken</div></div>',
      )
    } finally {
      decode.mockResolvedValue(undefined)
      warn.mockRestore()
    }
  })

  it('should not open PhotoSwipe when the frontmatter disables it', async () => {
    await setup()
    resetState()

    await openPhotoSwipe({ frontmatter: { photoSwipe: false } })

    expect(mocks.instances).toHaveLength(0)
  })

  it('should use the selector given in the frontmatter', async () => {
    await setup()
    resetState()

    await openPhotoSwipe({ frontmatter: { photoSwipe: 'img.plain' }, index: 2 })

    const [{ options }] = mocks.instances
    const dataSource = options.dataSource as { msrc: string }[]

    expect(dataSource).toHaveLength(1)
    expect(new URL(dataSource[0].msrc).pathname).toBe('/c.png')
  })
})
