import { collectClientDefines, createTestApp } from '@vuepress/test-utils'
import { describe, expect, it } from 'vitest'

import { getRedirectMap } from '../../src/node/getRedirectMap.js'
import { handleRedirectTo } from '../../src/node/handleRedirectTo.js'
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

  it('resolves the default locale to the first locale', async () => {
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
      ).toBe('/')
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

describe('auto locale root home page', () => {
  it('creates the root home page in the dev server', async () => {
    const app = await createTestApp({
      init: false,
      locales,
      plugins: [redirectPlugin({ autoLocale: true })],
    })

    try {
      app.env.isDev = true
      await app.init()

      expect(app.pages.map(({ path }) => path)).toContain('/')
    } finally {
      app.cleanup()
    }
  })

  it('keeps the root path empty for the build output', async () => {
    const app = await createTestApp({
      files: { 'zh/README.md': '# 首页' },
      init: false,
      locales,
      plugins: [redirectPlugin({ autoLocale: true })],
    })

    try {
      app.env.isBuild = true
      await app.init()

      expect(app.pages.map(({ path }) => path)).not.toContain('/')
    } finally {
      app.cleanup()
    }
  })

  it('respects the root home page provided by the user', async () => {
    const app = await createTestApp({
      files: { 'README.md': '# Home' },
      init: false,
      locales,
      plugins: [redirectPlugin({ autoLocale: true })],
    })

    try {
      app.env.isDev = true
      await app.init()

      const rootPage = app.pages.find(({ path }) => path === '/')!

      expect(rootPage.filePathRelative).toBe('README.md')
    } finally {
      app.cleanup()
    }
  })
})

describe('redirect map', () => {
  it('resolves the map from the frontmatter and the config option', async () => {
    const app = await createTestApp({
      files: {
        'a.md': '---\nredirectFrom: /old-a.html\n---\n# A',
        'b.md':
          '---\nredirectFrom:\n  - /old-b.html\n  - /older-b.html\n---\n# B',
        'c.md': '# C',
      },
      prepare: true,
    })

    try {
      expect(
        getRedirectMap(app, { config: { '/old-c.html': '/c.html' } }),
      ).toStrictEqual({
        '/old-a.html': '/a.html',
        '/old-b.html': '/b.html',
        '/older-b.html': '/b.html',
        '/old-c.html': '/c.html',
      })
    } finally {
      app.cleanup()
    }
  })

  it('resolves the map from a config function', async () => {
    const app = await createTestApp({
      files: { 'posts/a.md': '# A' },
      prepare: true,
    })

    try {
      expect(
        getRedirectMap(app, {
          config: (configApp) =>
            Object.fromEntries(
              configApp.pages
                .filter(({ path }) => path.startsWith('/posts/'))
                .map(({ path }) => [
                  path.replace(/^\/posts\//u, '/post/'),
                  path,
                ]),
            ),
        }),
      ).toStrictEqual({ '/post/a.html': '/posts/a.html' })
    } finally {
      app.cleanup()
    }
  })

  it('injects the redirect script for the redirectTo frontmatter', async () => {
    const app = await createTestApp({
      files: { 'a.md': '---\nredirectTo: /target/\n---\n# A' },
      prepare: true,
    })

    try {
      const page = app.pages.find(({ path }) => path === '/a.html')!

      handleRedirectTo(page, app)

      expect(page.frontmatter.head).toStrictEqual([
        ['script', {}, expect.stringContaining('/target/')],
      ])
    } finally {
      app.cleanup()
    }
  })
})
