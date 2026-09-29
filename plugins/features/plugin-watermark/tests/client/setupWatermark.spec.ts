// @vitest-environment happy-dom
import type { VueWrapper } from '@vue/test-utils'
import { flushPromises } from '@vue/test-utils'
import {
  collectClientDefines,
  createTestApp,
  stubClientDefines,
} from '@vuepress/test-utils'
import type { TestApp, TestClientOptions } from '@vuepress/test-utils'
import { mountVuePress, renderVuePress } from '@vuepress/test-utils/client'
import { describe, expect, it } from 'vitest'

import watermarkClientConfig from '../../src/client/config.js'
import { defineWatermarkConfig } from '../../src/client/index.js'
import { watermarkPlugin } from '../../src/node/index.js'
import type { WatermarkPluginOptions } from '../../src/node/index.js'

// A minimal 2D canvas context, enough for `watermark-js-plus` to draw.
//
// happy-dom does not implement the canvas API, so `getContext('2d')` returns
// `null` and the library throws. Only the layer created from the options is
// asserted, not the pixels that are drawn into it.
const createCanvasContext = (): CanvasRenderingContext2D => {
  const target: Record<string | symbol, unknown> = {}

  return new Proxy(target, {
    get: (source, property) => {
      if (property in source) return source[property]

      switch (property) {
        case 'measureText': {
          return () => ({ width: 100 })
        }
        case 'createPattern': {
          return () => ({})
        }
        case 'createLinearGradient':
        case 'createRadialGradient': {
          return () => ({ addColorStop: (): void => {} })
        }
        case 'createImageData':
        case 'getImageData': {
          return () => ({ data: new Uint8ClampedArray(4) })
        }
        case 'getLineDash': {
          return () => []
        }
        case 'getTransform': {
          return () => ({ a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 })
        }
        case 'isPointInPath':
        case 'isPointInStroke': {
          return () => false
        }
        default: {
          return () => undefined
        }
      }
    },
    set: (source, property, value) => {
      source[property] = value

      return true
    },
  }) as unknown as CanvasRenderingContext2D
}

interface WatermarkContext {
  app: TestApp
  parent: HTMLElement
  restore: () => void
  wrapper: VueWrapper
}

HTMLCanvasElement.prototype.getContext = (() =>
  createCanvasContext()) as unknown as typeof HTMLCanvasElement.prototype.getContext

HTMLCanvasElement.prototype.toDataURL = (): string =>
  'data:image/png;base64,TEST'

const createParent = (): HTMLDivElement => {
  const parent = document.createElement('div')

  parent.id = 'wm-root'
  document.body.append(parent)

  return parent
}

// Mount the watermark client config with a dedicated parent element.
//
// `watermark-js-plus` keeps its layer in sync with a mutation observer, so the
// parent is created per test and removed afterwards, which isolates the tests
// from each other.
const mountWatermark = async (
  options: WatermarkPluginOptions = {},
  clientOptions: TestClientOptions = {},
): Promise<WatermarkContext> => {
  const parent = createParent()
  const app = await createTestApp({
    plugins: [
      watermarkPlugin({
        ...options,
        watermarkOptions: { parent: '#wm-root', ...options.watermarkOptions },
      }),
    ],
  })
  const restore = stubClientDefines(await collectClientDefines(app))

  const wrapper = await mountVuePress({
    attachTo: document.body,
    clientConfigs: [watermarkClientConfig],
    content: '<p class="content">Hello world</p>',
    // the default watermark content is the site title
    site: { title: 'Test Site' },
    ...clientOptions,
  })

  await flushPromises()

  return { app, parent, restore, wrapper }
}

const cleanupWatermark = ({
  app,
  parent,
  restore,
  wrapper,
}: WatermarkContext): void => {
  wrapper.unmount()
  parent.remove()
  defineWatermarkConfig({})
  restore()
  app.cleanup()
}

// The inner layer that `watermark-js-plus` creates inside its parent.
const getWatermarkLayer = (parent: HTMLElement): HTMLElement | null =>
  parent.querySelector<HTMLElement>('[style*="background-image"]')

describe('watermark client config', () => {
  it('should create a watermark layer with the configured options', async () => {
    const context = await mountWatermark({
      watermarkOptions: { content: 'Watermark Text', zIndex: 9999 },
    })

    try {
      const layer = getWatermarkLayer(context.parent)

      expect(layer).not.toBeNull()
      expect(layer!.style.getPropertyValue('z-index')).toBe('9999')
    } finally {
      cleanupWatermark(context)
    }
  })

  it('should not create a watermark layer when the plugin is disabled', async () => {
    const context = await mountWatermark({ enabled: false })

    try {
      expect(getWatermarkLayer(context.parent)).toBeNull()
    } finally {
      cleanupWatermark(context)
    }
  })

  it('should not create a watermark layer when the page disables it', async () => {
    const context = await mountWatermark(
      { watermarkOptions: { content: 'Watermark Text' } },
      { page: { path: '/', frontmatter: { watermark: false } } },
    )

    try {
      expect(getWatermarkLayer(context.parent)).toBeNull()
    } finally {
      cleanupWatermark(context)
    }
  })

  it('should let the frontmatter override the Node options', async () => {
    const context = await mountWatermark(
      { watermarkOptions: { content: 'Watermark Text', zIndex: 9999 } },
      {
        page: {
          path: '/',
          frontmatter: { watermark: { parent: '#wm-root', zIndex: 1234 } },
        },
      },
    )

    try {
      expect(
        getWatermarkLayer(context.parent)!.style.getPropertyValue('z-index'),
      ).toBe('1234')
    } finally {
      cleanupWatermark(context)
    }
  })

  it('should let the client-side config override the Node options', async () => {
    defineWatermarkConfig({ zIndex: 4321 })

    const context = await mountWatermark({
      watermarkOptions: { content: 'Watermark Text', zIndex: 9999 },
    })

    try {
      expect(
        getWatermarkLayer(context.parent)!.style.getPropertyValue('z-index'),
      ).toBe('4321')
    } finally {
      cleanupWatermark(context)
    }
  })

  it('should not create a watermark layer during SSR', async () => {
    const parent = createParent()
    const app = await createTestApp({
      plugins: [
        watermarkPlugin({
          watermarkOptions: { content: 'Text', parent: '#wm-root' },
        }),
      ],
    })

    try {
      const restore = stubClientDefines(await collectClientDefines(app))

      try {
        const html = await renderVuePress({
          clientConfigs: [watermarkClientConfig],
          content: '<p class="content">Hello world</p>',
        })

        await flushPromises()

        expect(html).toContain('Hello world')
        expect(getWatermarkLayer(parent)).toBeNull()
      } finally {
        restore()
      }
    } finally {
      parent.remove()
      app.cleanup()
    }
  })
})
