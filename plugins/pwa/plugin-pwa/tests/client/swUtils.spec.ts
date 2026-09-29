// @vitest-environment happy-dom
import { describe, expect, it, vi } from 'vitest'

import { skipWaiting } from '../../src/client/utils/skipWaiting.js'
import { unregisterSW } from '../../src/client/utils/unregisterSW.js'

const stubServiceWorker = (value: unknown): void => {
  Object.defineProperty(window.navigator, 'serviceWorker', {
    configurable: true,
    value,
  })
}

describe('unregistering the service worker', () => {
  it('unregisters the active service worker', async () => {
    const unregister = vi.fn<() => Promise<boolean>>().mockResolvedValue(true)

    stubServiceWorker({
      getRegistration: vi
        .fn<() => Promise<{ unregister: () => Promise<boolean> }>>()
        .mockResolvedValue({ unregister }),
    })

    await expect(unregisterSW()).resolves.toBe(true)
    expect(unregister).toHaveBeenCalledTimes(1)
  })

  it('resolves to false when there is no registration', async () => {
    stubServiceWorker({
      getRegistration: vi
        .fn<() => Promise<undefined>>()
        .mockResolvedValue(undefined),
    })

    await expect(unregisterSW()).resolves.toBe(false)
  })

  it('resolves to false when unregistering fails', async () => {
    stubServiceWorker({
      getRegistration: vi
        .fn<() => Promise<never>>()
        .mockRejectedValue(new Error('boom')),
    })

    await expect(unregisterSW()).resolves.toBe(false)
  })
})

describe('activating a waiting service worker', () => {
  it('posts a SKIP_WAITING message to the waiting worker', () => {
    const postMessage = vi.fn<(message: unknown, transfer: unknown[]) => void>()

    skipWaiting({
      waiting: { postMessage },
    } as unknown as ServiceWorkerRegistration)

    expect(postMessage).toHaveBeenCalledTimes(1)
    expect(postMessage).toHaveBeenCalledWith(
      { type: 'SKIP_WAITING' },
      expect.any(Array),
    )
  })

  it('does nothing when there is no waiting worker', () => {
    const postMessage = vi.fn<(message: unknown, transfer: unknown[]) => void>()

    skipWaiting({
      waiting: null,
    } as unknown as ServiceWorkerRegistration)

    expect(postMessage).not.toHaveBeenCalled()
  })
})
