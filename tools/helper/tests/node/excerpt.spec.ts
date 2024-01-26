import { describe, expect, it } from 'vitest'
import { createBaseApp } from 'vuepress/core'
import { path } from 'vuepress/utils'
import { getPageExcerpt } from '../../src/node/page/excerpt.js'
import { emptyTheme } from '../__fixtures__/theme/empty.js'

describe('Should generate page excerpt correctly', async () => {
  const app = createBaseApp({
    bundler: {} as any,
    source: path.resolve(__dirname, '../__fixtures__/src'),
    theme: emptyTheme,
  })

  await app.init()

  it('Should generate excerpt for all pages', () => {
    app.pages.forEach((page) => {
      expect(getPageExcerpt(app, page)).toMatchSnapshot()
    })
  })

  it('Should only generate excerpt for marker', () => {
    app.pages.forEach((page) => {
      expect(getPageExcerpt(app, page, { excerptLength: 0 })).toMatchSnapshot()
    })
  })
})
