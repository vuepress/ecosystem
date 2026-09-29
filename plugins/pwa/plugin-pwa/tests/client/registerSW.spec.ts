import { flushPromises } from '@vue/test-utils'
import mitt from 'mitt'
// @vitest-environment happy-dom
import type { Hooks } from 'register-service-worker'
import { describe, expect, it, vi } from 'vitest'

import type { PwaEvent } from '../../src/client/composables/usePwaEvent.js'
import { useRegisterSW } from '../../src/client/composables/useRegisterSW.js'
import { registerSW } from '../../src/client/utils/registerSW.js'

const { registerMock } = vi.hoisted(() => ({
  registerMock: vi.fn<(path: string, hooks?: Hooks) => void>(),
}))

vi.mock(import('register-service-worker'), () => ({ register: registerMock }))

const registration = {} as ServiceWorkerRegistration

const getServiceWorkerHooks = (): Hooks => registerMock.mock.calls[0][1]!

const getRegisteredPath = (): string => registerMock.mock.calls[0][0]

describe('service worker registration', () => {
  it('registers the service worker on the given path', async () => {
    registerMock.mockClear()

    await registerSW('/service-worker.js', {}, false)
    await flushPromises()

    expect(registerMock).toHaveBeenCalledTimes(1)
    expect(getRegisteredPath()).toBe('/service-worker.js')
  })

  it('forwards every service worker event to the hooks', async () => {
    registerMock.mockClear()

    const hooks: Hooks = {
      cached: vi.fn<(registration: ServiceWorkerRegistration) => void>(),
      error: vi.fn<(error: Error) => void>(),
      offline: vi.fn<() => void>(),
      ready: vi.fn<(registration: ServiceWorkerRegistration) => void>(),
      registered: vi.fn<(registration: ServiceWorkerRegistration) => void>(),
      updated: vi.fn<(registration: ServiceWorkerRegistration) => void>(),
      updatefound: vi.fn<(registration: ServiceWorkerRegistration) => void>(),
    }

    await registerSW('/service-worker.js', hooks, false)
    await flushPromises()

    const error = new Error('boom')
    const serviceWorkerHooks = getServiceWorkerHooks()

    serviceWorkerHooks.ready?.(registration)
    serviceWorkerHooks.registered?.(registration)
    serviceWorkerHooks.cached?.(registration)
    serviceWorkerHooks.updatefound?.(registration)
    serviceWorkerHooks.updated?.(registration)
    serviceWorkerHooks.offline?.()
    serviceWorkerHooks.error?.(error)

    expect(hooks.ready).toHaveBeenCalledWith(registration)
    expect(hooks.registered).toHaveBeenCalledWith(registration)
    expect(hooks.cached).toHaveBeenCalledWith(registration)
    expect(hooks.updatefound).toHaveBeenCalledWith(registration)
    expect(hooks.updated).toHaveBeenCalledWith(registration)
    expect(hooks.offline).toHaveBeenCalledTimes(1)
    expect(hooks.error).toHaveBeenCalledWith(error)
  })
})

describe('service worker event forwarding', () => {
  it('emits the service worker events through the PWA event emitter', async () => {
    registerMock.mockClear()

    const event: PwaEvent = mitt()
    const onReady = vi.fn<(registration: ServiceWorkerRegistration) => void>()
    const onOffline = vi.fn<() => void>()

    event.on('ready', onReady)
    event.on('offline', onOffline)

    await useRegisterSW('/service-worker.js', event)
    await flushPromises()

    const serviceWorkerHooks = getServiceWorkerHooks()

    serviceWorkerHooks.ready?.(registration)
    serviceWorkerHooks.offline?.()

    expect(onReady).toHaveBeenCalledWith(registration)
    expect(onOffline).toHaveBeenCalledTimes(1)
  })

  it('busts the cached service worker version when an update is applied', async () => {
    registerMock.mockClear()
    localStorage.clear()

    const event: PwaEvent = mitt()
    const onUpdated = vi.fn<(registration: ServiceWorkerRegistration) => void>()

    localStorage.setItem('service-worker-version', '2')
    localStorage.setItem('manifest', '{}')

    event.on('updated', onUpdated)

    await useRegisterSW('/service-worker.js', event)
    await flushPromises()

    getServiceWorkerHooks().updated?.(registration)

    expect(localStorage.getItem('service-worker-version')).toBe('3')
    expect(localStorage.getItem('manifest')).toBeNull()
    expect(onUpdated).toHaveBeenCalledWith(registration)
  })

  it('starts the version counter at 1 when nothing was cached', async () => {
    registerMock.mockClear()
    localStorage.clear()

    const event: PwaEvent = mitt()

    await useRegisterSW('/service-worker.js', event)
    await flushPromises()

    getServiceWorkerHooks().updated?.(registration)

    expect(localStorage.getItem('service-worker-version')).toBe('1')
  })
})
