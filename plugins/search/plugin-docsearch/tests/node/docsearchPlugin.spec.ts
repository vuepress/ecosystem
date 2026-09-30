import { readFile } from 'node:fs/promises'

import { collectClientDefines, createTestApp } from '@vuepress/test-utils'
import { describe, expect, it } from 'vitest'

import { docsearchPlugin } from '../../src/node/index.js'
import { prepareClientConfig } from '../../src/node/prepareClientConfig.js'

interface ResolvedDocSearchOptions {
  apiKey?: string
  appId?: string
  indices?: unknown[]
  locales: Record<
    string,
    {
      placeholder?: string
      translations?: { button?: { buttonText?: string } }
    }
  >
}

describe('docsearch plugin', () => {
  it('should resolve the options and the locale data into the client defines', async () => {
    const app = await createTestApp({
      locales: {
        '/': { lang: 'en-US', title: 'Home' },
        '/zh/': { lang: 'zh-CN', title: '首页' },
      },
      plugins: [
        docsearchPlugin({
          apiKey: 'API_KEY',
          appId: 'APP_ID',
          indices: ['docs'],
          locales: { '/zh/': { placeholder: '自定义搜索' } },
        }),
      ],
    })

    try {
      const defines = await collectClientDefines(app)

      expect(defines.__DOCSEARCH_INDEX_BASE__).toBe('/')

      const options = defines.__DOCSEARCH_OPTIONS__ as ResolvedDocSearchOptions

      expect(options).toMatchObject({
        apiKey: 'API_KEY',
        appId: 'APP_ID',
        indices: ['docs'],
      })
      // The user locale is merged over the built-in one
      expect(options.locales['/zh/'].placeholder).toBe('自定义搜索')
      expect(options.locales['/zh/'].translations?.button?.buttonText).toBe(
        '搜索文档',
      )
      // English has no built-in strings
      expect(options.locales['/']).toStrictEqual({})
    } finally {
      app.cleanup()
    }
  })

  it('should use the given index base instead of the site base', async () => {
    const app = await createTestApp({
      base: '/base/',
      plugins: [
        docsearchPlugin({
          apiKey: 'API_KEY',
          appId: 'APP_ID',
          indices: ['docs'],
          indexBase: '/index/',
        }),
      ],
    })

    try {
      const defines = await collectClientDefines(app)

      expect(defines.__DOCSEARCH_INDEX_BASE__).toBe('/index/')
    } finally {
      app.cleanup()
    }
  })

  it('should fall back to the site base as the index base', async () => {
    const app = await createTestApp({
      base: '/base/',
      plugins: [
        docsearchPlugin({
          apiKey: 'API_KEY',
          appId: 'APP_ID',
          indices: ['docs'],
        }),
      ],
    })

    try {
      const defines = await collectClientDefines(app)

      expect(defines.__DOCSEARCH_INDEX_BASE__).toBe('/base/')
    } finally {
      app.cleanup()
    }
  })

  it('should be a no-op when the required options are missing', async () => {
    const app = await createTestApp({
      plugins: [docsearchPlugin({})],
    })

    try {
      const defines = await collectClientDefines(app)

      expect(defines).not.toHaveProperty('__DOCSEARCH_OPTIONS__')
      expect(defines).not.toHaveProperty('__DOCSEARCH_INDEX_BASE__')
    } finally {
      app.cleanup()
    }
  })

  it('should register the search box and inject the styles by default', async () => {
    const app = await createTestApp({})

    try {
      const configPath = await prepareClientConfig(app, true)
      const content = await readFile(configPath, 'utf8')

      expect(content).toContain('injectDocSearchConfig(app)')
      expect(content).toContain("app.component('SearchBox', DocSearch)")
      expect(content).toContain('@docsearch/css')
      expect(content).toContain('styles/docsearch.css')
    } finally {
      app.cleanup()
    }
  })

  it('should not inject the styles when it is disabled', async () => {
    const app = await createTestApp({})

    try {
      const configPath = await prepareClientConfig(app, false)
      const content = await readFile(configPath, 'utf8')

      expect(content).toContain("app.component('SearchBox', DocSearch)")
      expect(content).not.toContain('@docsearch/css')
      expect(content).not.toContain('styles/docsearch.css')
    } finally {
      app.cleanup()
    }
  })
})
