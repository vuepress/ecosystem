import { getPageExcerpt } from '@vuepress/helper'
import { describe, expect, it } from 'vitest'
import type { Bundler, Page } from 'vuepress/core'
import { createBuildApp } from 'vuepress/core'
import { path } from 'vuepress/utils'

import { generatePageIndex } from '../src/node/generateIndex.js'
import { PathStore } from '../src/node/pathStore.js'
import { emptyTheme } from './__fixtures__/theme/empty.js'

const app = createBuildApp({
  bundler: {} as Bundler,
  source: path.resolve(__dirname, './__fixtures__/src'),
  theme: emptyTheme,
})

await app.init()

describe('generateIndex', () => {
  it('Should generate index', () => {
    const store = new PathStore()

    app.pages.forEach((page) => {
      page.data.excerpt = getPageExcerpt(app, page, {
        length: 0,
      })

      expect(generatePageIndex(page, store)).toMatchSnapshot()
    })
  })

  it('Should generate full index', () => {
    const store = new PathStore()

    app.pages.forEach((page) => {
      page.data.excerpt = getPageExcerpt(app, page, {
        length: 0,
      })

      expect(generatePageIndex(page, store, [], true)).toMatchSnapshot()
    })
  })

  it('Should support customFields', () => {
    const store = new PathStore()

    app.pages.forEach((page) => {
      page.data.excerpt = getPageExcerpt(app, page, {
        length: 0,
      })

      expect(
        generatePageIndex(page, store, [
          {
            getter: ({ frontmatter }: Page): string[] | string | null =>
              (frontmatter.tag as string[] | string) || null,
          },
        ]),
      ).toMatchSnapshot()
    })
  })

  it('Should support customFields with full index', () => {
    const store = new PathStore()

    app.pages.forEach((page) => {
      expect(
        generatePageIndex(
          page,
          store,
          [
            {
              getter: ({ frontmatter }: Page): string[] | string | null =>
                (frontmatter.tag as string[] | string) || null,
            },
          ],
          true,
        ),
      ).toMatchSnapshot()
    })
  })
})
