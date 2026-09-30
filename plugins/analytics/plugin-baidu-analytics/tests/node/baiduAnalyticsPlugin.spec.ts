import { collectClientDefines, createTestApp } from '@vuepress/test-utils'
import { describe, expect, it } from 'vitest'

import { baiduAnalyticsPlugin } from '../../src/node/index.js'

describe('baidu analytics plugin', () => {
  it('should define the tracking id for the client', async () => {
    const app = await createTestApp({
      plugins: [baiduAnalyticsPlugin({ id: 'abc123' })],
    })

    await expect(collectClientDefines(app)).resolves.toHaveProperty(
      '__BD_ID__',
      'abc123',
    )

    app.cleanup()
  })

  it('should not define the tracking id when it is missing', async () => {
    const app = await createTestApp({
      plugins: [baiduAnalyticsPlugin({ id: '' })],
    })

    await expect(collectClientDefines(app)).resolves.not.toHaveProperty(
      '__BD_ID__',
    )

    app.cleanup()
  })
})
