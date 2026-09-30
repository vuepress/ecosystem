// @vitest-environment happy-dom
import { flushPromises } from '@vue/test-utils'
import {
  collectClientDefines,
  createTestApp,
  stubClientDefines,
} from '@vuepress/test-utils'
import type {
  mountVuePress as mountVuePressFn,
  renderVuePress as renderVuePressFn,
} from '@vuepress/test-utils/client'
import type mediumZoomDefault from 'medium-zoom'
import type { Mock } from 'vitest'
import { describe, expect, it, vi } from 'vitest'
import type { Component } from 'vue'
import { defineComponent, h } from 'vue'
import type { ClientConfig } from 'vuepress/client'

import { useMediumZoom } from '../../src/client/composables/index.js'
import { mediumZoomPlugin } from '../../src/node/index.js'

interface ZoomMock {
  attach: Mock<(selector?: string) => void>
  detach: Mock<() => void>
  refresh: Mock<(selector?: string) => void>
}

vi.mock(
  import('medium-zoom'),
  () =>
    ({
      default: vi.fn<() => ZoomMock>(() => ({
        attach: vi.fn<(selector?: string) => void>(),
        detach: vi.fn<() => void>(),
        refresh: vi.fn<(selector?: string) => void>(),
      })),
    }) as unknown as Partial<{ default: typeof mediumZoomDefault }>,
)

/** Probe that renders whether the composable returned a zoom instance */
const ZoomProbe: Component = defineComponent({
  name: 'ZoomProbe',
  setup() {
    const zoom = useMediumZoom()

    return () => h('div', { class: 'zoom-probe' }, zoom ? 'instance' : 'null')
  },
})

let clientConfig: ClientConfig
let mountVuePress: typeof mountVuePressFn
let renderVuePress: typeof renderVuePressFn
let mediumZoom: Mock<() => ZoomMock>

let setupPromise: Promise<void> | undefined

/** Create the test app and load the client modules once for the suite */
const setup = async (): Promise<void> => {
  setupPromise ??= (async (): Promise<void> => {
    const app = await createTestApp({
      plugins: [
        mediumZoomPlugin({
          selector: 'img.zoomable',
          zoomOptions: { margin: 10 },
        }),
      ],
    })

    stubClientDefines(await collectClientDefines(app))

    // The client config reads the defines at module scope, so everything that
    // depends on it must be imported after the defines are stubbed.
    vi.resetModules()

    const testUtils = await import('@vuepress/test-utils/client')

    ;({ mountVuePress, renderVuePress } = testUtils)
    clientConfig = (await import('../../src/client/config.js')).default
    mediumZoom = (await import('medium-zoom')).default as unknown as Mock<
      () => ZoomMock
    >
  })()

  await setupPromise
}

describe('medium zoom client config', () => {
  it('should create the zoom instance with the resolved zoom options', async () => {
    await setup()
    mediumZoom.mockClear()

    await mountVuePress({ clientConfigs: [clientConfig], content: '<p>hi</p>' })
    await flushPromises()

    expect(mediumZoom).toHaveBeenCalledWith({ margin: 10 })
  })

  it('should refresh the zoom with the resolved selector', async () => {
    await setup()

    await mountVuePress({ clientConfigs: [clientConfig], content: '<p>hi</p>' })
    await flushPromises()

    const zoom = mediumZoom.mock.results.at(-1)!.value as ZoomMock

    zoom.refresh()

    expect(zoom.detach).toHaveBeenCalledWith()
    expect(zoom.attach).toHaveBeenCalledWith('img.zoomable')
  })

  it('should not create a zoom instance in SSR', async () => {
    await setup()
    mediumZoom.mockClear()

    const html = await renderVuePress({
      clientConfigs: [clientConfig],
      content: '<p>hi</p>',
    })

    expect(html).toContain('hi')
    expect(mediumZoom).not.toHaveBeenCalled()
  })

  it('should return null from the composable in SSR', async () => {
    await setup()

    const html = await renderVuePress({
      clientConfigs: [clientConfig],
      rootComponent: ZoomProbe,
    })

    expect(html).toContain('>null<')
  })

  it('should throw when the composable is used without a provider', async () => {
    await setup()

    // Vue warns about the missing injection while the failed setup makes it
    // warn about the missing render function as well, so keep both out of the
    // output and assert the injection warning instead
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    try {
      await expect(mountVuePress({ rootComponent: ZoomProbe })).rejects.toThrow(
        'useMediumZoom() is called without provider.',
      )

      expect(
        warn.mock.calls.some(([message]) =>
          String(message).includes('injection "Symbol(mediumZoom)" not found'),
        ),
      ).toBe(true)
    } finally {
      warn.mockRestore()
    }
  })
})
