import { describe, expect, it } from 'vitest'
import type { App } from 'vuepress'
import { createCopyCodeButtonRender } from '../../src/node/copy-code-button/index.js'

const createApp = (lang = '', locales: string[] = []) =>
  ({
    siteData: {
      lang,
      locales: Object.fromEntries(locales.map((locale) => [locale, {}])),
    },
    env: {},
  }) as App

describe('@vuepress/highlight-helper -> createCopyCodeButtonRender', () => {
  it('should work correctly when default options', () => {
    const render = createCopyCodeButtonRender(createApp())

    expect(render).toBeDefined()

    expect(render!('')).toBe(
      '<button class="copy" title="Copy code" data-copied="Copied"></button>',
    )
  })

  it('should work correctly when default options with `siteData.lang`', () => {
    const render = createCopyCodeButtonRender(createApp('zh-CN'))

    expect(render!('')).toBe(
      '<button class="copy" title="复制代码" data-copied="已复制"></button>',
    )
  })

  it('should work correctly when default options with `siteData.locales`', () => {
    const render = createCopyCodeButtonRender(
      createApp('en-US', ['/', '/zh/', '/fr/']),
    )

    expect(render!('')).toBe(
      '<button class="copy" title="Copy code" data-copied="Copied"></button>',
    )

    expect(render!('/zh/')).toBe(
      '<button class="copy" title="复制代码" data-copied="已复制"></button>',
    )

    expect(render!('fr/xxx')).toBe(
      '<button class="copy" title="Copier le code" data-copied="Copié"></button>',
    )
  })

  it('should work correctly when disable', () => {
    const render = createCopyCodeButtonRender(createApp(), false)

    expect(render).toBeNull()
  })

  it('should work correctly when custom className`', () => {
    const render = createCopyCodeButtonRender(createApp(), {
      className: 'copy-code',
    })

    expect(render!('')).toBe(
      '<button class="copy-code" title="Copy code" data-copied="Copied"></button>',
    )
  })

  it('should work correctly when custom locales`', () => {
    const render = createCopyCodeButtonRender(
      createApp('en-US', ['/', '/foo/']),
      {
        locales: {
          '/foo/': {
            title: 'Copy foo code',
            copied: 'Foo code copied',
          },
        },
      },
    )

    expect(render!('foo/')).toBe(
      '<button class="copy" title="Copy foo code" data-copied="Foo code copied"></button>',
    )
  })
})
