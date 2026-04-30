import { describe, expect, it } from 'vitest'
import type { Bundler } from 'vuepress/core'
import { createBuildApp } from 'vuepress/core'
import { path } from 'vuepress/utils'

import type { PageExcerptOptions } from '../../src/node/page/excerpt.js'
import { getPageExcerpt } from '../../src/node/page/excerpt.js'
import { emptyTheme } from '../__fixtures__/theme/empty.js'

describe(getPageExcerpt, async () => {
  const app = createBuildApp({
    bundler: {} as Bundler,
    source: path.resolve(__dirname, '../__fixtures__/src'),
    theme: emptyTheme,
  })

  await app.init()

  const getPageExcerpts = (
    options: PageExcerptOptions = {},
  ): { excerpt: string; pagePath: string }[] =>
    app.pages
      .filter((page) => page.path !== '/404.html')
      .map((page) => ({
        pagePath: page.path,
        excerpt: getPageExcerpt(app, page, options),
      }))

  describe('with default options', () => {
    const excerptData = getPageExcerpts()

    it('generate excerpt for all pages', () => {
      excerptData.forEach(({ excerpt, pagePath }) => {
        expect(excerpt.length).toBeGreaterThan(0)
        expect(excerpt).toMatchSnapshot(pagePath)
      })
    })

    describe('handle contents correctly', () => {
      const { excerpt } = getPageExcerpts({ length: Infinity }).find(
        ({ pagePath }) => pagePath === '/markdown.html',
      )!

      it('clean heading', () => {
        ;[1, 2, 3, 4, 5, 6].forEach((i) => {
          expect(excerpt).toContain(`<h${i}>Heading ${i}</h${i}>`)
        })

        expect(excerpt).toContain(
          '<h3>Heading with <strong>markdown</strong> and <span>html</span></h3>',
        )
      })

      it('handle inline tags', () => {
        expect(excerpt).toContain('<strong>bold</strong>')
        expect(excerpt).toContain('<em>italic</em>')
        expect(excerpt).toContain('<s>delete</s>')
      })

      it('handle block tags', () => {
        expect(excerpt).toContain('<p>')
        expect(excerpt).toContain('<ul>')
        expect(excerpt).toContain('<ol>')
        expect(excerpt).toContain('<li>')
        expect(excerpt).toContain('<blockquote>')
      })

      it('handle links', () => {
        expect(excerpt).toContain(
          '<a href="/excerpt.html" target="_blank">relative markdown link</a>',
        )
        expect(excerpt).toContain(
          '<a href="/excerpt.html" target="_blank">relative html link</a>',
        )
        expect(excerpt).toContain(
          '<a href="/" target="_blank">absolute markdown link</a>',
        )
        expect(excerpt).toContain(
          '<a href="/" target="_blank">absolute html link</a>',
        )
        expect(excerpt).toContain('<a href="#link">Anchor</a>')
      })

      it('remove relative image', () => {
        expect(excerpt).not.toContain('relative.jpg')
      })

      it('preserve image with url or absolute links', () => {
        expect(excerpt).toContain('src="https://exmaple.com/logo.png"')
        expect(excerpt).toContain('src="/logo.png"')
      })

      it('inline code', () => {
        expect(excerpt).toContain('<code>inline code</code>')
      })

      it('code fence', () => {
        expect(excerpt).toContain('<code>inline code</code>')
      })

      it('remove comment', () => {
        expect(excerpt).toContain('Sample text here...')
      })
    })

    it('remove unknown tags', () => {
      excerptData
        .filter(({ pagePath }) => pagePath === '/component.html')
        .forEach(({ excerpt }) => {
          expect(excerpt).not.toContain('custom-element')
          expect(excerpt).not.toContain('VueComponent')
        })
    })
  })

  describe('length option', () => {
    it('only generate when having marker with 0', () => {
      const data = getPageExcerpts({ length: 0 })

      data
        .filter(({ pagePath }) => pagePath === '/separator.html')
        .forEach(({ excerpt, pagePath }) => {
          expect(excerpt).toContain('article excerpt')
          expect(excerpt).not.toContain('main content')
          expect(excerpt).toMatchSnapshot(pagePath)
        })

      data
        .filter(({ pagePath }) => pagePath !== '/separator.html')
        .forEach(({ excerpt }) => {
          expect(excerpt.length).toBe(0)
        })
    })

    it('extract all content with Infinity', () => {
      const excerptData = getPageExcerpts({ length: Infinity })

      excerptData.forEach(({ excerpt, pagePath }) => {
        expect(excerpt.length).toBeGreaterThan(0)
        expect(excerpt).toMatchSnapshot(pagePath)
      })

      excerptData
        .filter(({ pagePath }) => pagePath === '/long-content.html')
        .forEach(({ excerpt }) => {
          expect(excerpt).toContain('Content ends.')
        })
    })
  })

  describe('separator option', () => {
    it('generate excerpt with default marker', () => {
      getPageExcerpts()
        .filter(({ pagePath }) => pagePath === '/separator.html')
        .forEach(({ excerpt, pagePath }) => {
          expect(excerpt).toContain('article excerpt')
          expect(excerpt).not.toContain('main content')
          expect(excerpt).toMatchSnapshot(pagePath)
        })
    })

    it('generate excerpt with custom marker', () => {
      getPageExcerpts({ separator: 'END_OF_EXCERPT' })
        .filter(({ pagePath }) => pagePath === '/custom-separator.html')
        .forEach(({ excerpt, pagePath }) => {
          expect(excerpt).toContain('article excerpt')
          expect(excerpt).not.toContain('main content')
          expect(excerpt).toMatchSnapshot(pagePath)
        })
    })
  })

  describe('isCustomElement option', () => {
    it('preserve custom element', () => {
      getPageExcerpts({
        isCustomElement: (tag) => tag.startsWith('custom-element'),
      })
        .filter(({ pagePath }) => pagePath === '/component.html')
        .forEach(({ excerpt }) => {
          expect(excerpt).toContain('custom-element1')
          expect(excerpt).toContain('custom-element2')
          expect(excerpt).toContain('custom-element3')
          expect(excerpt).toContain('custom-element4')
          expect(excerpt).toContain('text1')
          expect(excerpt).toContain('text2')
          expect(excerpt).not.toContain('VueComponent')
        })
    })
  })

  describe('keepPageTitle option', () => {
    it('remove first h1', () => {
      getPageExcerpts()
        .filter(({ pagePath }) => pagePath === '/markdown.html')
        .forEach(({ excerpt }) => {
          expect(excerpt).not.toContain('Content Example')
        })
    })

    it('not remove first h1', () => {
      getPageExcerpts({ keepPageTitle: true })
        .filter(({ pagePath }) => pagePath === '/markdown.html')
        .forEach(({ excerpt }) => {
          expect(excerpt).toContain('Content Example')
        })
    })
  })
})
