import { collectClientDefines, createTestApp } from '@vuepress/test-utils'
import { describe, expect, it } from 'vitest'

import { mediumZoomPlugin } from '../../src/node/index.js'

describe('medium-zoom plugin', () => {
  it('should define the default selector and empty zoom options', async () => {
    const app = await createTestApp({ plugins: [mediumZoomPlugin()] })

    try {
      const defines = await collectClientDefines(app)

      expect(defines.__MZ_SELECTOR__).toBe(
        '[vp-content] > img, [vp-content] :not(a) > img',
      )
      expect(defines.__MZ_ZOOM_OPTIONS__).toStrictEqual({})
    } finally {
      app.cleanup()
    }
  })

  it('should define the selector and the zoom options given in Node', async () => {
    const app = await createTestApp({
      plugins: [
        mediumZoomPlugin({
          selector: 'img.zoomable',
          zoomOptions: { margin: 10 },
        }),
      ],
    })

    try {
      const defines = await collectClientDefines(app)

      expect(defines.__MZ_SELECTOR__).toBe('img.zoomable')
      expect(defines.__MZ_ZOOM_OPTIONS__).toStrictEqual({ margin: 10 })
    } finally {
      app.cleanup()
    }
  })
})
