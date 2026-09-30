import { collectClientDefines, createTestApp } from '@vuepress/test-utils'
import { describe, expect, it } from 'vitest'

import { umamiAnalyticsPlugin } from '../../src/node/index.js'

describe('umami analytics plugin', () => {
  it('should define the options for the client', async () => {
    const app = await createTestApp({
      plugins: [
        umamiAnalyticsPlugin({
          autoTrack: false,
          id: 'abc',
          link: 'https://umami.example.com/script.js',
        }),
      ],
    })

    await expect(collectClientDefines(app)).resolves.toHaveProperty(
      '__UMM_OPTIONS__',
      {
        autoTrack: false,
        id: 'abc',
        link: 'https://umami.example.com/script.js',
      },
    )

    app.cleanup()
  })

  it('should not define the options when the id is missing', async () => {
    const app = await createTestApp({
      plugins: [umamiAnalyticsPlugin({ id: '' })],
    })

    await expect(collectClientDefines(app)).resolves.not.toHaveProperty(
      '__UMM_OPTIONS__',
    )

    app.cleanup()
  })
})
