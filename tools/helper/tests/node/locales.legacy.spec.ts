/* eslint-disable @typescript-eslint/no-deprecated */
import { describe, expect, it } from 'vitest'
import type { Bundler } from 'vuepress/core'
import { createBuildApp } from 'vuepress/core'
import { path } from 'vuepress/utils'
import {
  getLocaleConfig,
  getRootLang,
  inferLocaleLang,
  inferLocalePath,
} from '../../src/node/locales/helpers.js'
import { emptyTheme } from '../__fixtures__/theme/empty.js'

const defaultLocaleConfig = {
  '/en/': {
    text: 'English',
    fallback: 'English',
  },
  '/zh/': {
    text: '中文',
    fallback: '中文',
  },
  '/ja/': {
    text: '日本',
    fallback: '日本',
  },
  '/test/': {
    text: 'Test',
    fallback: 'Test',
  },
  '/id/': {
    text: 'Indonesia',
    fallback: 'Indonesia',
  },
  '/nl/': {
    text: 'Dutch',
    fallback: 'Dutch',
  },
}

it('lang2Path() should convert lang to path', () => {
  expect(inferLocalePath('en-US')).toEqual('/en/')
  expect(inferLocalePath('zh-CN')).toEqual('/zh/')
  expect(inferLocalePath('ja-JP')).toEqual('/ja/')
  expect(inferLocalePath('id-ID')).toEqual('/id/')
  expect(inferLocalePath('nl-NL')).toEqual('/nl/')
})

it('path2lang() should convert path to lang', () => {
  expect(inferLocaleLang('/en/')).toEqual('en-US')
  expect(inferLocaleLang('/zh/')).toEqual('zh-CN')
  expect(inferLocaleLang('/ja/')).toEqual('ja-JP')
  expect(inferLocaleLang('/id/')).toEqual('id-ID')
  expect(inferLocaleLang('/nl/')).toEqual('nl-NL')
})

describe('getRootLang() should get root locale lang', () => {
  it('should get actual root lang', () => {
    const app1 = createBuildApp({
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

    const app2 = createBuildApp({
      locales: {
        '/': { lang: 'en-US' },
        '/zh/': { lang: 'zh-CN' },
        '/ja/': { lang: 'ja-JP' },
        '/id/': { lang: 'id-ID' },
        '/nl/': { lang: 'nl-NL' },
      },
      source: path.resolve(__dirname, './__fixtures__/src'),
      bundler: {} as Bundler,
      theme: emptyTheme,
    })

    expect(getRootLang(app1)).toEqual('zh-CN')
    expect(getRootLang(app2)).toEqual('en-US')
  })

  it('Should fallback to en-US if root locale is absent', () => {
    const app = createBuildApp({
      locales: {
        '/en/': { lang: 'en-US' },
        '/zh/': { lang: 'zh-CN' },
        '/ja/': { lang: 'ja-JP' },
        '/id/': { lang: 'id-ID' },
        '/nl/': { lang: 'nl-NL' },
      },
      source: path.resolve(__dirname, './__fixtures__/src'),
      bundler: {} as Bundler,
      theme: emptyTheme,
    })

    expect(getRootLang(app)).toEqual('en-US')
  })

  it('Should fallback to en-US if root language is absent', () => {
    const app = createBuildApp({
      locales: {
        '/': {},
        '/zh/': { lang: 'zh-CN' },
        '/ja/': { lang: 'ja-JP' },
        '/id/': { lang: 'id-ID' },
        '/nl/': { lang: 'nl-NL' },
      },
      source: path.resolve(__dirname, './__fixtures__/src'),
      bundler: {} as Bundler,
      theme: emptyTheme,
    })

    expect(getRootLang(app)).toEqual('en-US')
  })
})

describe('getLocaleConfig() should generate locale', () => {
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

    expect(getLocaleConfig({ app, default: defaultLocaleConfig })).toEqual({
      '/': {
        text: '中文',
        fallback: '中文',
      },
      '/en/': {
        text: 'English',
        fallback: 'English',
      },
      '/ja/': {
        text: '日本',
        fallback: '日本',
      },
      '/id/': {
        text: 'Indonesia',
        fallback: 'Indonesia',
      },
      '/nl/': {
        text: 'Dutch',
        fallback: 'Dutch',
      },
    })
  })

  it('Detect known language with different path', () => {
    const app = createBuildApp({
      locales: {
        '/': { lang: 'zh-CN' },
        '/en-us/': { lang: 'en-US' },
        '/ja-jp/': { lang: 'ja-JP' },
        '/id-id/': { lang: 'id-ID' },
        '/nl/': { lang: 'nl-NL' },
      },
      source: path.resolve(__dirname, './__fixtures__/src'),
      bundler: {} as Bundler,
      theme: emptyTheme,
    })

    expect(getLocaleConfig({ app, default: defaultLocaleConfig })).toEqual({
      '/': {
        text: '中文',
        fallback: '中文',
      },
      '/en-us/': {
        text: 'English',
        fallback: 'English',
      },
      '/ja-jp/': {
        text: '日本',
        fallback: '日本',
      },
      '/id-id/': {
        text: 'Indonesia',
        fallback: 'Indonesia',
      },
      '/nl/': {
        text: 'Dutch',
        fallback: 'Dutch',
      },
    })
  })

  it('use user config if exists', () => {
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
      '/': { text: '简体中文' },
      '/en/': { text: 'English (US)' },
      '/id/': { text: 'Indonesia' },
      '/nl/': { text: 'Dutch' },
    }

    const locales = getLocaleConfig({
      app,
      default: defaultLocaleConfig,
      config,
    })

    expect(locales).toEqual({
      '/': {
        text: '简体中文',
        fallback: '中文',
      },
      '/en/': {
        text: 'English (US)',
        fallback: 'English',
      },
      '/ja/': {
        text: '日本',
        fallback: '日本',
      },
      '/id/': {
        text: 'Indonesia',
        fallback: 'Indonesia',
      },
      '/nl/': {
        text: 'Dutch',
        fallback: 'Dutch',
      },
    })
  })

  describe('handle unknown locale', () => {
    it('unknown root language should fallback to first language in default config', () => {
      const app = createBuildApp({
        locales: {
          '/': { lang: 'unknown-Language' },
          '/en/': { lang: 'en-US' },
          '/ja/': { lang: 'ja-JP' },
          '/id/': { lang: 'id-ID' },
          '/nl/': { lang: 'nl-NL' },
        },
        source: path.resolve(__dirname, './__fixtures__/src'),
        bundler: {} as Bundler,
        theme: emptyTheme,
      })

      const locales = getLocaleConfig({ app, default: defaultLocaleConfig })

      expect(locales).toEqual({
        '/': {
          text: 'English',
          fallback: 'English',
        },
        '/en/': {
          text: 'English',
          fallback: 'English',
        },
        '/ja/': {
          text: '日本',
          fallback: '日本',
        },
        '/id/': {
          text: 'Indonesia',
          fallback: 'Indonesia',
        },
        '/nl/': {
          text: 'Dutch',
          fallback: 'Dutch',
        },
      })
    })

    it('fallback to root language if exists', () => {
      const app = createBuildApp({
        locales: {
          '/': { lang: 'zh-CN' },
          '/en/': { lang: 'en-US' },
          '/ja/': { lang: 'ja-JP' },
          '/id/': { lang: 'id-ID' },
          '/nl/': { lang: 'nl-NL' },
          '/unknown/': { lang: 'unknown-Language' },
        },
        source: path.resolve(__dirname, './__fixtures__/src'),
        bundler: {} as Bundler,
        theme: emptyTheme,
      })

      const locales = getLocaleConfig({ app, default: defaultLocaleConfig })

      expect(locales).toEqual({
        '/': {
          text: '中文',
          fallback: '中文',
        },
        '/en/': {
          text: 'English',
          fallback: 'English',
        },
        '/ja/': {
          text: '日本',
          fallback: '日本',
        },
        '/id/': {
          text: 'Indonesia',
          fallback: 'Indonesia',
        },
        '/nl/': {
          text: 'Dutch',
          fallback: 'Dutch',
        },
        '/unknown/': {
          text: '中文',
          fallback: '中文',
        },
      })
    })

    it('fallback to en-US without root language', () => {
      const app = createBuildApp({
        locales: {
          '/en/': { lang: 'en-US' },
          '/zh/': { lang: 'zh-CN' },
          '/ja/': { lang: 'ja-JP' },
          '/id/': { lang: 'id-ID' },
          '/nl/': { lang: 'nl-NL' },
          '/unknown/': { lang: 'unknown-Language' },
        },
        source: path.resolve(__dirname, './__fixtures__/src'),
        bundler: {} as Bundler,
        theme: emptyTheme,
      })

      const locales = getLocaleConfig({ app, default: defaultLocaleConfig })

      expect(locales).toEqual({
        '/': {
          text: 'English',
          fallback: 'English',
        },
        '/en/': {
          text: 'English',
          fallback: 'English',
        },
        '/zh/': {
          text: '中文',
          fallback: '中文',
        },
        '/ja/': {
          text: '日本',
          fallback: '日本',
        },
        '/id/': {
          text: 'Indonesia',
          fallback: 'Indonesia',
        },
        '/nl/': {
          text: 'Dutch',
          fallback: 'Dutch',
        },
        '/unknown/': {
          text: 'English',
          fallback: 'English',
        },
      })
    })
  })

  describe('handle new locale', () => {
    it('with default locale', () => {
      const app = createBuildApp({
        locales: {
          '/': { lang: 'zh-CN' },
          '/en/': { lang: 'en-US' },
          '/ja/': { lang: 'ja-JP' },
          '/id/': { lang: 'id-ID' },
          '/nl/': { lang: 'nl-NL' },
          '/test/': { lang: 'test-Language' },
        },
        source: path.resolve(__dirname, './__fixtures__/src'),
        bundler: {} as Bundler,
        theme: emptyTheme,
      })

      const locales = getLocaleConfig({ app, default: defaultLocaleConfig })

      expect(locales).toEqual({
        '/': {
          text: '中文',
          fallback: '中文',
        },
        '/en/': {
          text: 'English',
          fallback: 'English',
        },
        '/ja/': {
          text: '日本',
          fallback: '日本',
        },
        '/id/': {
          text: 'Indonesia',
          fallback: 'Indonesia',
        },
        '/nl/': {
          text: 'Dutch',
          fallback: 'Dutch',
        },
        '/test/': {
          text: 'Test',
          fallback: 'Test',
        },
      })
    })

    it('without default', () => {
      const app = createBuildApp({
        locales: {
          '/': { lang: 'zh-CN' },
          '/en/': { lang: 'en-US' },
          '/ja/': { lang: 'ja-JP' },
          '/id/': { lang: 'id-ID' },
          '/nl/': { lang: 'nl-NL' },
          '/unknown/': { lang: 'unknown-Language' },
        },
        source: path.resolve(__dirname, './__fixtures__/src'),
        bundler: {} as Bundler,
        theme: emptyTheme,
      })

      const config = {
        '/unknown/': { text: 'Unknown' },
      }

      const locales = getLocaleConfig({
        app,
        config,
        default: defaultLocaleConfig,
      })

      expect(locales).toEqual({
        '/': {
          text: '中文',
          fallback: '中文',
        },
        '/en/': {
          text: 'English',
          fallback: 'English',
        },
        '/ja/': {
          text: '日本',
          fallback: '日本',
        },
        '/id/': {
          text: 'Indonesia',
          fallback: 'Indonesia',
        },
        '/nl/': {
          text: 'Dutch',
          fallback: 'Dutch',
        },
        '/unknown/': {
          text: 'Unknown',
          fallback: '中文',
        },
      })
    })
  })
})
