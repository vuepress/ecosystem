// @vitest-environment happy-dom
import { describe, expect, it, vi } from 'vitest'

import type { nprogress as NProgressObject } from '../../src/client/nprogress.js'

type Nprogress = typeof NProgressObject

/**
 * Import a fresh copy of the module
 *
 * The progress state is kept at module scope, so every test needs its own
 * instance.
 *
 * @returns The nprogress object of the freshly imported module
 */
const importNprogress = async (): Promise<Nprogress> => {
  vi.resetModules()

  return (await import('../../src/client/nprogress.js')).nprogress
}

/**
 * Remove the rendered bar and stop the trickle loop
 *
 * @param nprogress - The nprogress object to clean up
 */
const cleanup = (nprogress: Nprogress): void => {
  nprogress.remove()
  nprogress.percent = null
  document.documentElement.classList.remove('nprogress-busy')
  document.body.innerHTML = ''
}

describe('nprogress', () => {
  it('should render the bar and mark the document as busy on start', async () => {
    const nprogress = await importNprogress()

    try {
      nprogress.start()

      expect(nprogress.isRendered()).toBe(true)
      expect(document.querySelector('#nprogress [role="bar"]')).not.toBeNull()
      expect(
        document.documentElement.classList.contains('nprogress-busy'),
      ).toBe(true)
    } finally {
      cleanup(nprogress)
    }
  })

  it('should remove the bar once it is done', async () => {
    const nprogress = await importNprogress()

    try {
      nprogress.start()
      nprogress.done(true)

      await vi.waitFor(
        () => {
          expect(nprogress.isRendered()).toBe(false)
        },
        { interval: 20, timeout: 2000 },
      )

      expect(
        document.documentElement.classList.contains('nprogress-busy'),
      ).toBe(false)
    } finally {
      cleanup(nprogress)
    }
  })

  it('should do nothing when it is done without being started', async () => {
    const nprogress = await importNprogress()

    try {
      const result = nprogress.done()

      expect(result).toBe(nprogress)
      expect(nprogress.isRendered()).toBe(false)
    } finally {
      cleanup(nprogress)
    }
  })
})
