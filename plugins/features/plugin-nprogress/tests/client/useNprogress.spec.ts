// @vitest-environment happy-dom
import { createTestClient } from '@vuepress/test-utils/client'
import { describe, expect, it, vi } from 'vitest'

import nprogressClientConfig from '../../src/client/config.js'
import { nprogress } from '../../src/client/nprogress.js'

/**
 * Mount the client and spy on the progress bar
 *
 * @returns The test client, the spies and an unmount helper
 */
const setup = async (): Promise<{
  client: Awaited<ReturnType<typeof createTestClient>>
  doneSpy: ReturnType<typeof vi.spyOn>
  startSpy: ReturnType<typeof vi.spyOn>
  unmount: () => void
}> => {
  const startSpy = vi.spyOn(nprogress, 'start')
  const doneSpy = vi.spyOn(nprogress, 'done')
  const client = await createTestClient({
    clientConfigs: [nprogressClientConfig],
    content: 'home',
    page: { path: '/' },
    routes: { '/guide/': {} },
  })
  const wrapper = await client.mount()

  return {
    client,
    doneSpy,
    startSpy,
    unmount: (): void => {
      wrapper.unmount()
      startSpy.mockRestore()
      doneSpy.mockRestore()
      nprogress.remove()
      nprogress.percent = null
    },
  }
}

describe('nprogress client config', () => {
  it('should start and finish the bar when navigating to a new page', async () => {
    const { client, doneSpy, startSpy, unmount } = await setup()

    try {
      // The initial page is already loaded
      expect(startSpy).not.toHaveBeenCalled()

      await client.router.push('/guide/')

      expect(startSpy).toHaveBeenCalledTimes(1)
      expect(doneSpy).toHaveBeenCalledTimes(1)
    } finally {
      unmount()
    }
  })

  it('should not start the bar again for an already loaded page', async () => {
    const { client, startSpy, unmount } = await setup()

    try {
      await client.router.push('/guide/')
      expect(startSpy).toHaveBeenCalledTimes(1)

      // `/` and `/guide/` have both been loaded
      await client.router.push('/')
      await client.router.push('/guide/')

      expect(startSpy).toHaveBeenCalledTimes(1)
    } finally {
      unmount()
    }
  })
})
