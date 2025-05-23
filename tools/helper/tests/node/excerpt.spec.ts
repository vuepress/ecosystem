import { describe, expect, it } from 'vitest'
import type { Bundler } from 'vuepress/core'
import { createBuildApp } from 'vuepress/core'
import { path } from 'vuepress/utils'
import type { PageExcerptOptions } from '../../src/node/page/excerpt.js'
import { getPageExcerpt } from '../../src/node/page/excerpt.js'
import { emptyTheme } from '../__fixtures__/theme/empty.js'

describe('getPageExcerpt', async () => {
  const app = createBuildApp({
    bundler: {} as Bundler,
    source: path.resolve(__dirname, '../__fixtures__/src'),
    theme: emptyTheme,
  })

  await app.init()

  const getExcerptData = (
    options: PageExcerptOptions = {},
  ): { excerpt: string; pagePath: string }[] =>
    app.pages
      .filter((page) => page.path !== '/404.html')
      .map((page) => ({
        pagePath: page.path,
        excerpt: getPageExcerpt(app, page, options),
      }))

  describe('default', () => {
    const excerptData = getExcerptData()

    it('generate excerpt for all pages', () => {
      excerptData.forEach(({ excerpt, pagePath }) => {
        expect(excerpt.length).toBeGreaterThan(0)
        expect(excerpt).toMatchSnapshot(pagePath)
      })
    })

    describe('handle contents correctly', () => {
      getExcerptData({ length: Infinity }).forEach(({ excerpt, pagePath }) => {
        if (pagePath === '/markdown.html') {
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
        }
      })
    })

    it('remove unknown tags', () => {
      excerptData.forEach(({ excerpt, pagePath }) => {
        if (pagePath === '/component.html') {
          expect(excerpt).not.toContain('custom-element')
          expect(excerpt).not.toContain('VueComponent')
        }
      })
    })
  })

  describe('excerptLength', () => {
    it('only generate when having marker with 0', () => {
      getExcerptData({ length: 0 }).forEach(({ excerpt, pagePath }) => {
        if (pagePath === '/separator.html') {
          expect(excerpt).toContain('article excerpt')
          expect(excerpt).not.toContain('main content')
          expect(excerpt).toMatchSnapshot(pagePath)
        } else {
          expect(excerpt.length).toBe(0)
        }
      })
    })

    it('extract all content with Infinity', () => {
      getExcerptData({ length: Infinity }).forEach(({ excerpt, pagePath }) => {
        expect(excerpt.length).toBeGreaterThan(0)
        expect(excerpt).toMatchSnapshot(pagePath)

        if (pagePath === '/long-content.html') {
          expect(excerpt).toContain('Content ends.')
        }
      })
    })
  })

  describe('excerptSeparator', () => {
    it('generate excerpt with default marker', () => {
      getExcerptData().forEach(({ excerpt, pagePath }) => {
        if (pagePath === '/separator.html') {
          expect(excerpt).toContain('article excerpt')
          expect(excerpt).not.toContain('main content')
          expect(excerpt).toMatchSnapshot(pagePath)
        }
      })
    })

    it('generate excerpt with custom marker', () => {
      getExcerptData({ separator: 'END_OF_EXCERPT' }).forEach(
        ({ excerpt, pagePath }) => {
          if (pagePath === '/custom-separator.html') {
            expect(excerpt).toContain('article excerpt')
            expect(excerpt).not.toContain('main content')
            expect(excerpt).toMatchSnapshot(pagePath)
          }
        },
      )
    })
  })

  describe('isCustomElement', () => {
    it('preserve custom element', () => {
      getExcerptData({
        isCustomElement: (tag) => tag.startsWith('custom-element'),
      }).forEach(({ excerpt, pagePath }) => {
        if (pagePath === '/component.html') {
          expect(excerpt).toContain('custom-element1')
          expect(excerpt).toContain('custom-element2')
          expect(excerpt).toContain('custom-element3')
          expect(excerpt).not.toContain('VueComponent')
        }
      })
    })
  })

  describe('keepPageTitle', () => {
    it('remove first h1', () => {
      getExcerptData().forEach(({ excerpt, pagePath }) => {
        if (pagePath === '/markdown.html') {
          expect(excerpt).not.toContain('Content Example')
        }
      })
    })

    it('not remove first h1', () => {
      getExcerptData({ keepPageTitle: true }).forEach(
        ({ excerpt, pagePath }) => {
          if (pagePath === '/markdown.html') {
            expect(excerpt).toContain('Content Example')
          }
        },
      )
    })
  })
})
