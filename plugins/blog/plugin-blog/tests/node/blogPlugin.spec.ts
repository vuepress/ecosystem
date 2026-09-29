import { readFileSync } from 'node:fs'

import { createTestApp } from '@vuepress/test-utils'
import { describe, expect, it } from 'vitest'
import type { Page } from 'vuepress/core'

import { blogPlugin } from '../../src/node/index.js'
import type { BlogCategoryOptions } from '../../src/node/index.js'

interface BlogFrontmatter {
  blog?: {
    key: string
    name?: string
    type: 'category' | 'type'
  }
}

interface BlogPageData {
  excerpt?: string
}

// The exact page type that the plugin option callbacks receive.
type BlogPage = Parameters<BlogCategoryOptions['getter']>[0]

// The generated module is `export const store = JSON.parse("<json>")`.
const readStore = (tempFilePath: string): Record<string, string> => {
  const content = readFileSync(tempFilePath, 'utf-8')
  const raw =
    /JSON\.parse\((?<value>.*)\);/u.exec(content)?.groups?.value ?? '""'
  const value = JSON.parse(raw) as string

  return JSON.parse(value) as Record<string, string>
}

const getCategories = (page: BlogPage): string[] =>
  Array.isArray(page.frontmatter.category)
    ? (page.frontmatter.category as string[])
    : []

const isPost = (page: BlogPage): boolean =>
  page.frontmatter.category !== undefined

describe('blog plugin', () => {
  it('should generate the type and category index pages and their store', async () => {
    const app = await createTestApp({
      files: {
        'README.md': '# Home',
        'posts/a.md': '---\ntitle: A\ncategory:\n  - foo\n---\n# A\n\nAlpha',
        'posts/b.md': '---\ntitle: B\ncategory:\n  - bar\n---\n# B\n\nBeta',
      },
      plugins: [
        blogPlugin({
          category: [
            {
              getter: getCategories,
              itemPath: '/category/:name/',
              key: 'category',
              path: '/category/',
            },
          ],
          type: [{ filter: isPost, key: 'article', path: '/article/' }],
        }),
      ],
      prepare: true,
    })

    try {
      const paths = app.pages.map(({ path }) => path)

      expect(paths).toContain('/article/')
      expect(paths).toContain('/category/')
      expect(paths).toContain('/category/foo/')
      expect(paths).toContain('/category/bar/')

      const articlePage = app.pages.find(
        ({ path }) => path === '/article/',
      ) as Page
      const categoryItemPage = app.pages.find(
        ({ path }) => path === '/category/foo/',
      ) as Page

      expect((articlePage.frontmatter as BlogFrontmatter).blog).toStrictEqual({
        key: 'article',
        type: 'type',
      })
      expect(articlePage.frontmatter.layout).toBe('Layout')
      expect(
        (categoryItemPage.frontmatter as BlogFrontmatter).blog,
      ).toStrictEqual({ key: 'category', name: 'foo', type: 'category' })

      // The generated index pages are not collected as articles.
      const stored = readStore(app.dir.temp('blog/store.js'))

      expect(Object.values(stored).sort()).toStrictEqual([
        '/posts/a.html',
        '/posts/b.html',
      ])
    } finally {
      app.cleanup()
    }
  })

  it('should generate an excerpt only for the filtered pages', async () => {
    const app = await createTestApp({
      files: {
        'README.md': '---\nhome: true\n---\n# Home\n\nWelcome',
        'posts/a.md':
          '---\ntitle: A\ncategory:\n  - foo\n---\n# A\n\nAlpha content',
      },
      plugins: [blogPlugin({ type: [{ filter: isPost, key: 'article' }] })],
      prepare: true,
    })

    try {
      const homePage = app.pages.find(({ path }) => path === '/') as Page
      const articlePage = app.pages.find(
        ({ path }) => path === '/posts/a.html',
      ) as Page

      expect((homePage.data as BlogPageData).excerpt).toBeUndefined()
      expect((articlePage.data as BlogPageData).excerpt).toContain(
        'Alpha content',
      )
    } finally {
      app.cleanup()
    }
  })

  it('should inject getInfo into the route meta of the matched pages', async () => {
    const app = await createTestApp({
      files: {
        'README.md': '# Home',
        'posts/a.md': '---\ntitle: A\ncategory:\n  - foo\n---\n# A',
      },
      plugins: [
        blogPlugin({
          getInfo: (page): Record<string, string> => ({ title: page.title }),
          metaScope: '_blog',
          type: [{ filter: isPost, key: 'article' }],
        }),
      ],
      prepare: true,
    })

    try {
      const articlePage = app.pages.find(
        ({ path }) => path === '/posts/a.html',
      ) as Page

      expect(articlePage.routeMeta).toStrictEqual({ _blog: { title: 'A' } })
    } finally {
      app.cleanup()
    }
  })
})
