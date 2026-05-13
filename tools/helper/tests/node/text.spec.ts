import { describe, expect, it } from 'vitest'
import type { Bundler } from 'vuepress/core'
import { createBuildApp } from 'vuepress/core'
import { path } from 'vuepress/utils'

import type { PageTextOptions } from '../../src/node/page/text.js'
import { getPageText } from '../../src/node/page/text.js'
import { emptyTheme } from '../__fixtures__/theme/empty.js'

describe(getPageText, async () => {
  const app = createBuildApp({
    bundler: {} as Bundler,
    source: path.resolve(__dirname, '../__fixtures__/src'),
    theme: emptyTheme,
  })

  await app.init()

  const getPagesText = (
    options: PageTextOptions = {},
  ): { pagePath: string; text: string }[] =>
    app.pages
      .filter((page) => page.path !== '/404.html')
      .map((page) => ({
        pagePath: page.path,
        text: getPageText(app, page, options),
      }))

  it('default', () => {
    const textData = getPagesText()

    textData.forEach(({ text, pagePath }) => {
      expect(text.length).toBeGreaterThan(0)
      expect(text).toMatchSnapshot(pagePath)
    })

    textData
      .filter(({ pagePath }) => pagePath === '/markdown.html')
      .forEach(({ text }) => {
        expect(text).not.toContain('console.log(foo(5))')
        expect(text).not.toContain('table text')
      })
  })

  it('singleLine', () => {
    const textData = getPagesText({ singleLine: true })

    textData.forEach(({ text, pagePath }) => {
      expect(text.length).toBeGreaterThan(0)
      expect(text).not.toContain('\n')
      expect(text).toMatchSnapshot(pagePath)
    })
  })

  it('removedTags', () => {
    const textData = getPagesText({ removedTags: [] })

    textData.forEach(({ text, pagePath }) => {
      expect(text.length).toBeGreaterThan(0)
      expect(text).toMatchSnapshot(pagePath)
    })

    textData
      .filter(({ pagePath }) => pagePath === '/markdown.html')
      .forEach(({ text }) => {
        expect(text).toContain('Create a list')
        expect(text).toContain('Integer molestie lorem at massa')
        expect(text).toContain('console.log(foo(5))')
        expect(text).toContain('table text')
      })

    const textDataWithRemovedTags = getPagesText({
      removedTags: ['table', 'pre', 'ol', 'ul', 'dl'],
    })

    textDataWithRemovedTags.forEach(({ text, pagePath }) => {
      expect(text.length).toBeGreaterThan(0)
      expect(text).toMatchSnapshot(pagePath)
    })

    textDataWithRemovedTags
      .filter(({ pagePath }) => pagePath === '/markdown.html')
      .forEach(({ text }) => {
        expect(text).not.toContain('Create a list')
        expect(text).not.toContain('Integer molestie lorem at massa')
        expect(text).not.toContain('console.log(foo(5))')
        expect(text).not.toContain('table text')
      })
  })
})
