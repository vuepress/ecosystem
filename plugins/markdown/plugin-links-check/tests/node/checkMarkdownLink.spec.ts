import MarkdownIt from 'markdown-it'
import { describe, expect, it, vi } from 'vitest'
import type { App, Page, PluginFunction, PluginObject } from 'vuepress/core'
import type { MarkdownEnv, MarkdownLink } from 'vuepress/markdown'
import { logger } from 'vuepress/utils'

import { checkMarkdownLink } from '../../src/node/checkMarkdownLink.js'
import { linksCheckPlugin } from '../../src/node/linksCheckPlugin.js'
import type { LinksCheckPluginOptions } from '../../src/node/options.js'

const mockWarn = (): void => {
  vi.spyOn(logger, 'warn').mockImplementation(() => {})
}

const createPage = (
  filePathRelative: string,
  {
    links = [],
    markdownEnv = {},
  }: {
    links?: MarkdownLink[]
    markdownEnv?: Record<string, unknown>
  } = {},
): Page =>
  ({
    filePathRelative,
    links,
    markdownEnv,
    path: `/${filePathRelative}`,
  }) as unknown as Page

const createApp = (pages: Page[]): App =>
  ({
    env: { isBuild: false, isDev: true },
    pages,
    siteData: { base: '/' },
  }) as unknown as App

const createLink = (
  raw: string,
  relative: string,
  absolute: string | null,
): MarkdownLink => ({ absolute, raw, relative })

const createPlugin = (options: LinksCheckPluginOptions = {}): PluginObject =>
  (linksCheckPlugin(options) as PluginFunction)(createApp([]))

const createMarkdownIt = (
  options: LinksCheckPluginOptions = {},
): MarkdownIt => {
  const md = new MarkdownIt()
  const { extendsMarkdown } = createPlugin(options)

  if (typeof extendsMarkdown === 'function')
    (extendsMarkdown as unknown as (md: MarkdownIt) => void)(md)

  return md
}

describe(checkMarkdownLink, () => {
  it('should not check anchors by default', () => {
    mockWarn()

    const page = createPage('guide/a.md', {
      markdownEnv: { markdownAnchors: [], markdownAnchorLinks: ['#missing'] },
    })

    expect(checkMarkdownLink(page, createApp([page]), () => false)).toBe(false)
    expect(logger.warn).not.toHaveBeenCalled()
  })

  it('should check anchors of the current page', () => {
    mockWarn()

    const page = createPage('guide/a.md', {
      markdownEnv: {
        markdownAnchors: ['title'],
        markdownAnchorLinks: ['#title', '#missing'],
      },
    })

    expect(checkMarkdownLink(page, createApp([page]), () => false, true)).toBe(
      true,
    )
    expect(logger.warn).toHaveBeenCalledWith(
      'Broken anchors found in guide/a.md: #missing',
    )
  })

  it('should check anchors of the target page', () => {
    mockWarn()

    const target = createPage('guide/b.md', {
      markdownEnv: { markdownAnchors: ['title'] },
    })
    const page = createPage('guide/a.md', {
      links: [createLink('./b.md#title', 'guide/b.md', '/guide/b.md')],
      markdownEnv: { markdownAnchors: [] },
    })
    const app = createApp([page, target])

    expect(checkMarkdownLink(page, app, () => false, true)).toBe(false)

    page.links = [createLink('./b.md#missing', 'guide/b.md', '/guide/b.md')]

    expect(checkMarkdownLink(page, app, () => false, true)).toBe(true)
  })

  it('should check anchors of an absolute link', () => {
    mockWarn()

    const target = createPage('guide/b.md', {
      markdownEnv: { markdownAnchors: ['title'] },
    })
    const page = createPage('guide/a.md', {
      links: [createLink('/guide/b.md#title', 'guide/b.md', '/guide/b.md')],
      markdownEnv: { markdownAnchors: [] },
    })

    expect(
      checkMarkdownLink(page, createApp([page, target]), () => false, true),
    ).toBe(false)
  })

  it('should support encoded anchors', () => {
    mockWarn()

    const page = createPage('guide/a.md', {
      markdownEnv: {
        markdownAnchors: ['中文'],
        markdownAnchorLinks: ['#%E4%B8%AD%E6%96%87'],
      },
    })

    expect(checkMarkdownLink(page, createApp([page]), () => false, true)).toBe(
      false,
    )
  })

  it('should only check anchors of the current page in same-page mode', () => {
    mockWarn()

    const target = createPage('guide/b.md', {
      markdownEnv: { markdownAnchors: [] },
    })
    const page = createPage('guide/a.md', {
      links: [createLink('./b.md#missing', 'guide/b.md', '/guide/b.md')],
      markdownEnv: {
        markdownAnchors: ['title'],
        markdownAnchorLinks: ['#title'],
      },
    })
    const app = createApp([page, target])

    // Anchors of the current page are checked
    expect(checkMarkdownLink(page, app, () => false, 'same-page')).toBe(false)

    // Anchors of other pages are checked as well
    expect(checkMarkdownLink(page, app, () => false, true)).toBe(true)
  })

  it('should skip anchors of pages with unknown anchors', () => {
    mockWarn()

    const target = createPage('guide/b.md')
    const page = createPage('guide/a.md', {
      links: [createLink('./b.md#missing', 'guide/b.md', '/guide/b.md')],
      markdownEnv: { markdownAnchors: [] },
    })

    expect(
      checkMarkdownLink(page, createApp([page, target]), () => false, true),
    ).toBe(false)
  })

  it('should ignore anchors of excluded links', () => {
    mockWarn()

    const page = createPage('guide/a.md', {
      markdownEnv: { markdownAnchors: [], markdownAnchorLinks: ['#missing'] },
    })
    const app = createApp([page])

    expect(checkMarkdownLink(page, app, () => false, true)).toBe(true)
    expect(
      checkMarkdownLink(page, app, (item) => item === '#missing', true),
    ).toBe(false)
  })

  it('should ignore anchors of excluded paths', () => {
    mockWarn()

    const target = createPage('guide/b.md', {
      markdownEnv: { markdownAnchors: [] },
    })
    const page = createPage('guide/a.md', {
      links: [createLink('./b.md#missing', 'guide/b.md', '/guide/b.md')],
      markdownEnv: { markdownAnchors: [] },
    })
    const app = createApp([page, target])

    expect(checkMarkdownLink(page, app, () => false, true)).toBe(true)
    expect(
      checkMarkdownLink(page, app, (item) => item === 'guide/b.md', true),
    ).toBe(false)
  })
})

describe(linksCheckPlugin, () => {
  it('should collect anchors by default', () => {
    const env: MarkdownEnv = {}

    createMarkdownIt().render('# Title', env)

    expect(env.markdownAnchors).toStrictEqual([])
    expect(env.markdownAnchorLinks).toStrictEqual([])
  })

  it('should not collect anchors when disabled', () => {
    const env: MarkdownEnv = {}

    createMarkdownIt({ anchors: false }).render('# Title', env)

    expect(env.markdownAnchors).toBeUndefined()
    expect(env.markdownAnchorLinks).toBeUndefined()
  })
})
