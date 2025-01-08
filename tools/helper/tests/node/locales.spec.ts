import { describe, expect, it } from 'vitest'
import type { Bundler } from 'vuepress/core'
import { createBuildApp } from 'vuepress/core'
import { path } from 'vuepress/utils'
import { getFullLocaleConfig } from '../../src/node/locales/getFullLocaleConfig.js'
import type { DefaultLocaleInfo } from '../../src/node/locales/types.js'
import { emptyTheme } from '../__fixtures__/theme/empty.js'

const defaultLocaleInfo: DefaultLocaleInfo<{ text: string; label: string }> = [
  [
    ['en', 'en-US'],
    {
      text: 'English',
      label: 'US English',
    },
  ],
  [
    ['zh', 'zh-CN', 'zh-Hans'],
    {
      text: '简体中文',
      label: '简体中文',
    },
  ],
  [
    ['zh-TW', 'zh-Hant'],
    {
      text: '繁體中文',
      label: '繁體中文',
    },
  ],
  [
    ['ja', 'ja-JP'],
    {
      text: '日本',
      label: '日本',
    },
  ],
  [
    ['id', 'id-ID'],
    {
      text: 'Indonesia',
      label: 'Indonesia',
    },
  ],
  [
    ['nl', 'nl-NL'],
    {
      text: 'Dutch',
      label: 'Dutch',
    },
  ],
]

describe('getFullLocaleConfig() should generate locale', () => {
  it('set default value for known language', () => {
    const app = createBuildApp({
      locales: {
        '/': { lang: 'zh-CN' },
        '/en/': { lang: 'en-US' },
        '/nl/': { lang: 'nl-NL' },
        '/ja/': { lang: 'ja-JP' },
        '/id/': { lang: 'id-ID' },
      },
      source: path.resolve(__dirname, './__fixtures__/src'),
      bundler: {} as Bundler,
      theme: emptyTheme,
    })

    expect(getFullLocaleConfig({ app, default: defaultLocaleInfo })).toEqual({
      '/': {
        text: '简体中文',
        label: '简体中文',
      },
      '/en/': {
        text: 'English',
        label: 'US English',
      },
      '/ja/': {
        text: '日本',
        label: '日本',
      },
      '/id/': {
        text: 'Indonesia',
        label: 'Indonesia',
      },
      '/nl/': {
        text: 'Dutch',
        label: 'Dutch',
      },
    })
  })

  it("Fallback to short lang if exact lang doesn't exist", () => {
    const app = createBuildApp({
      locales: {
        '/': { lang: 'zh-CN' },
        '/en/': { lang: 'en-CA' },
      },
      source: path.resolve(__dirname, './__fixtures__/src'),
      bundler: {} as Bundler,
      theme: emptyTheme,
    })

    expect(getFullLocaleConfig({ app, default: defaultLocaleInfo })).toEqual({
      '/': {
        text: '简体中文',
        label: '简体中文',
      },
      '/en/': {
        text: 'English',
        label: 'US English',
      },
    })
  })

  it('prefer user config if exists', () => {
    const app = createBuildApp({
      locales: {
        '/': { lang: 'zh-CN' },
        '/en/': { lang: 'en-US' },
        '/ja/': { lang: 'ja-JP' },
        '/id/': { lang: 'id-ID' },
        '/nl/': { lang: 'nl-NL' },
      },
      source: path.resolve(__dirname, './__fixtures__/src'),
      bundler: {} as Bundler,
      theme: emptyTheme,
    })

    const config = {
      '/': { text: '中文' },
      '/en/': { text: 'English' },
      '/id/': { text: 'Indonesia' },
      '/nl/': { text: 'Dutch' },
    }

    const locales = getFullLocaleConfig({
      app,
      default: defaultLocaleInfo,
      config,
    })

    expect(locales).toEqual({
      '/': {
        text: '中文',
        label: '简体中文',
      },
      '/en/': {
        text: 'English',
        label: 'US English',
      },
      '/ja/': {
        text: '日本',
        label: '日本',
      },
      '/id/': {
        text: 'Indonesia',
        label: 'Indonesia',
      },
      '/nl/': {
        text: 'Dutch',
        label: 'Dutch',
      },
    })
  })

  describe('handle unknown locale', () => {
    it('should fallback to en', () => {
      const app = createBuildApp({
        locales: {
          '/': { lang: 'unknown-Language' },
          '/en/': { lang: 'en-US' },
          '/ja/': { lang: 'ja-JP' },
          '/id/': { lang: 'id-ID' },
          '/nl/': { lang: 'nl-NL' },
          '/unknown/': { lang: 'unknown-Language2' },
        },
        source: path.resolve(__dirname, './__fixtures__/src'),
        bundler: {} as Bundler,
        theme: emptyTheme,
      })

      const locales = getFullLocaleConfig({ app, default: defaultLocaleInfo })

      expect(locales).toEqual({
        '/': {
          text: 'English',
          label: 'US English',
        },
        '/en/': {
          text: 'English',
          label: 'US English',
        },
        '/ja/': {
          text: '日本',
          label: '日本',
        },
        '/id/': {
          text: 'Indonesia',
          label: 'Indonesia',
        },
        '/nl/': {
          text: 'Dutch',
          label: 'Dutch',
        },
        '/unknown/': {
          text: 'English',
          label: 'US English',
        },
      })
    })

    it('should fallback to first language without en', () => {
      const app = createBuildApp({
        locales: {
          '/': { lang: 'unknown-Language' },
          '/en/': { lang: 'en-US' },
          '/zh/': { lang: 'zh-CN' },
          '/ja/': { lang: 'ja-JP' },
          '/id/': { lang: 'id-ID' },
          '/nl/': { lang: 'nl-NL' },
          '/unknown/': { lang: 'unknown-Language2' },
        },
        source: path.resolve(__dirname, './__fixtures__/src'),
        bundler: {} as Bundler,
        theme: emptyTheme,
      })

      const defaultLocaleInfoWithOutEn: DefaultLocaleInfo<{
        text: string
        label: string
      }> = [
        [
          ['zh', 'zh-CN', 'zh-Hans'],
          {
            text: '简体中文',
            label: '简体中文',
          },
        ],
        [
          ['zh-TW', 'zh-Hant'],
          {
            text: '繁體中文',
            label: '繁體中文',
          },
        ],
        [
          ['ja', 'ja-JP'],
          {
            text: '日本',
            label: '日本',
          },
        ],
        [
          ['id', 'id-ID'],
          {
            text: 'Indonesia',
            label: 'Indonesia',
          },
        ],
        [
          ['nl', 'nl-NL'],
          {
            text: 'Dutch',
            label: 'Dutch',
          },
        ],
      ]

      const locales = getFullLocaleConfig({
        app,
        default: defaultLocaleInfoWithOutEn,
      })

      expect(locales).toEqual({
        '/': {
          text: '简体中文',
          label: '简体中文',
        },
        '/en/': {
          text: '简体中文',
          label: '简体中文',
        },
        '/zh/': {
          text: '简体中文',
          label: '简体中文',
        },
        '/ja/': {
          text: '日本',
          label: '日本',
        },
        '/id/': {
          text: 'Indonesia',
          label: 'Indonesia',
        },
        '/nl/': {
          text: 'Dutch',
          label: 'Dutch',
        },
        '/unknown/': {
          text: '简体中文',
          label: '简体中文',
        },
      })
    })
  })

  it('drop unused options', () => {
    const app = createBuildApp({
      locales: {
        '/': { lang: 'zh-CN' },
        '/en/': { lang: 'en-US' },
      },
      source: path.resolve(__dirname, './__fixtures__/src'),
      bundler: {} as Bundler,
      theme: emptyTheme,
    })

    const locales = getFullLocaleConfig({
      app,
      default: defaultLocaleInfo,
      config: {
        '/': {
          text: '简体中文',
          label: '简体中文',
        },
        '/test/': {
          text: 'Test',
          label: 'Test',
        },
        '/test2/': {
          text: 'Test2',
        },
      },
    })

    expect(locales).toEqual({
      '/': {
        text: '简体中文',
        label: '简体中文',
      },
      '/en/': {
        text: 'English',
        label: 'US English',
      },
    })
  })

  it('handle new locale', () => {
    const app = createBuildApp({
      locales: {
        '/': { lang: 'zh-CN' },
        '/en/': { lang: 'en-US' },
        '/ja/': { lang: 'ja-JP' },
        '/id/': { lang: 'id-ID' },
        '/nl/': { lang: 'nl-NL' },
        '/test/': { lang: 'test-Language' },
        '/test2/': { lang: 'test-Language2' },
      },
      source: path.resolve(__dirname, './__fixtures__/src'),
      bundler: {} as Bundler,
      theme: emptyTheme,
    })

    const locales = getFullLocaleConfig({
      app,
      default: defaultLocaleInfo,
      config: {
        '/test/': {
          text: 'Test',
          label: 'Test',
        },
        '/test2/': {
          text: 'Test2',
        },
      },
    })

    expect(locales).toEqual({
      '/': {
        text: '简体中文',
        label: '简体中文',
      },
      '/en/': {
        text: 'English',
        label: 'US English',
      },
      '/ja/': {
        text: '日本',
        label: '日本',
      },
      '/id/': {
        text: 'Indonesia',
        label: 'Indonesia',
      },
      '/nl/': {
        text: 'Dutch',
        label: 'Dutch',
      },
      '/test/': {
        text: 'Test',
        label: 'Test',
      },
      '/test2/': {
        text: 'Test2',
        label: 'US English',
      },
    })
  })
})
