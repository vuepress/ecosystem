import { collectClientDefines, createTestApp } from '@vuepress/test-utils'
import { describe, expect, it } from 'vitest'

import { clarityAnalyticsPlugin } from '../../src/node/index.js'

describe('clarity analytics plugin', () => {
  it('should define the options for the client', async () => {
    const app = await createTestApp({
      plugins: [
        clarityAnalyticsPlugin({ crossOrigin: 'anonymous', id: 'abc' }),
      ],
    })

    await expect(collectClientDefines(app)).resolves.toHaveProperty(
      '__CLARITY_OPTIONS__',
      { crossOrigin: 'anonymous', id: 'abc' },
    )

    app.cleanup()
  })

  it('should not define the options when the id is missing', async () => {
    const app = await createTestApp({
      plugins: [clarityAnalyticsPlugin({ id: '' })],
    })

    await expect(collectClientDefines(app)).resolves.not.toHaveProperty(
      '__CLARITY_OPTIONS__',
    )

    app.cleanup()
  })
})
