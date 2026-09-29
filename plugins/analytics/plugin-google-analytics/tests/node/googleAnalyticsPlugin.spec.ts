import { collectClientDefines, createTestApp } from '@vuepress/test-utils'
import { describe, expect, it } from 'vitest'

import { googleAnalyticsPlugin } from '../../src/node/index.js'

describe('google analytics plugin', () => {
  it('should define the options for the client', async () => {
    const app = await createTestApp({
      plugins: [googleAnalyticsPlugin({ debug: true, id: 'G-ABC' })],
    })

    await expect(collectClientDefines(app)).resolves.toHaveProperty(
      '__GA_OPTIONS__',
      { debug: true, id: 'G-ABC' },
    )

    app.cleanup()
  })

  it('should not define the options when the id is missing', async () => {
    const app = await createTestApp({
      plugins: [googleAnalyticsPlugin({ id: '' })],
    })

    await expect(collectClientDefines(app)).resolves.not.toHaveProperty(
      '__GA_OPTIONS__',
    )

    app.cleanup()
  })
})
