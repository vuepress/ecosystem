import { collectClientDefines, createTestApp } from '@vuepress/test-utils'
import { describe, expect, it } from 'vitest'

import { meilisearchPlugin } from '../../src/node/index.js'

interface ResolvedLocaleData {
  button: { buttonAriaLabel?: string; buttonText?: string }
  modal: { searchDocsPlaceHolder?: string }
}

describe('meilisearch plugin', () => {
  it('should resolve the options and the locale data into the client defines', async () => {
    const app = await createTestApp({
      locales: {
        '/': { lang: 'en-US', title: 'Home' },
        '/zh/': { lang: 'zh-CN', title: '首页' },
      },
      plugins: [
        meilisearchPlugin({
          apiKey: 'API_KEY',
          host: 'https://ms.example.com',
          indexUid: 'docs',
          translations: { button: { buttonText: 'Root Search' } },
          locales: {
            '/zh/': {
              apiKey: 'API_KEY',
              host: 'https://ms.example.com',
              indexUid: 'docs',
              translations: { button: { buttonText: '自定义搜索' } },
            },
          },
        }),
      ],
    })

    try {
      const defines = await collectClientDefines(app)
      const locales = defines.__ML_SEARCH_LOCALES__ as Record<
        string,
        ResolvedLocaleData
      >

      expect(defines.__ML_SEARCH_OPTIONS__).toMatchObject({
        apiKey: 'API_KEY',
        host: 'https://ms.example.com',
        indexUid: 'docs',
      })
      // The root translations are used for the root locale
      expect(locales['/'].button.buttonText).toBe('Root Search')
      // The user locale is merged over the built-in one
      expect(locales['/zh/'].button.buttonText).toBe('自定义搜索')
      expect(locales['/zh/'].modal.searchDocsPlaceHolder).toBe('搜索文档')
    } finally {
      app.cleanup()
    }
  })

  it('should be a no-op when the required options are missing', async () => {
    const app = await createTestApp({
      plugins: [meilisearchPlugin({ apiKey: '', host: '', indexUid: '' })],
    })

    try {
      const defines = await collectClientDefines(app)

      expect(defines).not.toHaveProperty('__ML_SEARCH_OPTIONS__')
      expect(defines).not.toHaveProperty('__ML_SEARCH_LOCALES__')
    } finally {
      app.cleanup()
    }
  })
})
