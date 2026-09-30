import { collectClientDefines, createTestApp } from '@vuepress/test-utils'
import { describe, expect, it } from 'vitest'

import { photoSwipePlugin } from '../../src/node/index.js'

describe('photo swipe plugin', () => {
  it('should define the default options', async () => {
    const app = await createTestApp({ plugins: [photoSwipePlugin()] })

    try {
      const defines = await collectClientDefines(app)

      expect(defines.__PS_SELECTOR__).toBe(
        '[vp-content] :not(a) > img:not([no-view])',
      )
      expect(defines.__PS_DOWNLOAD__).toBe(true)
      expect(defines.__PS_FULLSCREEN__).toBe(true)
      expect(defines.__PS_SCROLL_TO_CLOSE__).toBe(true)
      expect(defines.__PS_LOCALES__).toMatchObject({
        '/': { closeTitle: 'Close', downloadTitle: 'Download Image' },
      })
      expect(defines.__PS_LOCALES__).toMatchObject({
        '/': { errorMsgTitle: 'The image cannot be loaded' },
      })
    } finally {
      app.cleanup()
    }
  })

  it('should define the options given in Node', async () => {
    const app = await createTestApp({
      plugins: [
        photoSwipePlugin({
          selector: ['img.a', 'img.b'],
          download: false,
          fullscreen: false,
          scrollToClose: false,
          locales: {
            '/': { close: 'Fermer', errorMsg: 'Échec de chargement' },
          },
        }),
      ],
    })

    try {
      const defines = await collectClientDefines(app)

      expect(defines.__PS_SELECTOR__).toStrictEqual(['img.a', 'img.b'])
      expect(defines.__PS_DOWNLOAD__).toBe(false)
      expect(defines.__PS_FULLSCREEN__).toBe(false)
      expect(defines.__PS_SCROLL_TO_CLOSE__).toBe(false)
      expect(defines.__PS_LOCALES__).toMatchObject({
        '/': { closeTitle: 'Fermer', errorMsgTitle: 'Échec de chargement' },
      })
    } finally {
      app.cleanup()
    }
  })
})
