import { collectClientDefines, createTestApp } from '@vuepress/test-utils'
import { describe, expect, it } from 'vitest'

import { redirectPlugin } from '../../src/node/index.js'
import type { RedirectPluginLocaleData } from '../../src/shared/index.js'

const locales = {
  '/': { lang: 'en-US', title: 'My Site' },
  '/zh/': { lang: 'zh-CN', title: '我的站点' },
}

describe('redirect plugin defines', () => {
  it('switches to the client component mode and forwards the locale config', async () => {
    const app = await createTestApp({
      locales,
      plugins: [redirectPlugin({ switchLocale: 'popup' })],
    })

    try {
      const defines = await collectClientDefines(app)

      expect(defines.__REDIRECT_DIRECT__).toBe(false)
      expect(defines.__REDIRECT_COMPONENT__).toBe(true)
      expect(defines.__REDIRECT_CONFIG__).toMatchObject({
        autoLocale: false,
        config: { '/': ['en-US'], '/zh/': ['zh-CN'] },
        defaultBehavior: 'defaultLocale',
        localeFallback: true,
      })
    } finally {
      app.cleanup()
    }
  })

  it('resolves the default locale to the last locale', async () => {
    const app = await createTestApp({
      locales,
      plugins: [redirectPlugin()],
    })

    try {
      const defines = await collectClientDefines(app)

      expect(defines.__REDIRECT_DIRECT__).toBe(false)
      expect(defines.__REDIRECT_COMPONENT__).toBe(false)
      expect(
        (defines.__REDIRECT_CONFIG__ as { defaultLocale: string })
          .defaultLocale,
      ).toBe('/zh/')
    } finally {
      app.cleanup()
    }
  })

  it('enables the direct mode only for the "direct" option', async () => {
    const app = await createTestApp({
      locales,
      plugins: [redirectPlugin({ switchLocale: 'direct' })],
    })

    try {
      const defines = await collectClientDefines(app)

      expect(defines.__REDIRECT_DIRECT__).toBe(true)
      expect(defines.__REDIRECT_COMPONENT__).toBe(false)
    } finally {
      app.cleanup()
    }
  })

  it('builds the full locale strings for every locale of the site', async () => {
    const app = await createTestApp({
      locales,
      plugins: [
        redirectPlugin({
          locales: { '/zh/': { switch: '前往 $1' } },
          switchLocale: 'modal',
        }),
      ],
    })

    try {
      const { __REDIRECT_LOCALES__: localesConfig } =
        (await collectClientDefines(app)) as {
          __REDIRECT_LOCALES__: Record<string, RedirectPluginLocaleData>
        }

      expect(localesConfig['/'].name).toBe('English')
      expect(localesConfig['/zh/'].name).toBe('简体中文')
      // the user provided value is merged over the built-in one
      expect(localesConfig['/zh/'].switch).toBe('前往 $1')
    } finally {
      app.cleanup()
    }
  })
})
