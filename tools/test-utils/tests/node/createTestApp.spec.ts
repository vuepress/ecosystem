import { existsSync } from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

import {
  createTestApp,
  createTestPage,
  emptyTheme,
} from '../../src/node/index.js'

describe(createTestApp, () => {
  it('should create an app with pages generated from files', async () => {
    const app = await createTestApp({
      files: {
        'README.md': '# Home',
        'guide/index.md': '# Guide',
      },
    })

    expect(
      app.pages.map(({ path: pagePath }) => pagePath).sort(),
    ).toStrictEqual(['/', '/404.html', '/guide/'])

    app.cleanup()
  })

  it('should use the empty theme by default', async () => {
    const app = await createTestApp()

    expect(app.options.theme.name).toBe(emptyTheme.name)

    // vuepress core always generates a 404 page
    expect(app.pages.map(({ path: pagePath }) => pagePath)).toStrictEqual([
      '/404.html',
    ])

    app.cleanup()
  })

  it('should cleanup the temporary source directory', async () => {
    const app = await createTestApp()
    const source = app.dir.source()

    expect(existsSync(source)).toBe(true)

    app.cleanup()

    expect(existsSync(source)).toBe(false)
  })

  it('should keep the given source directory', async () => {
    const source = import.meta.dirname
    const app = await createTestApp({ source })

    app.cleanup()

    expect(existsSync(source)).toBe(true)
  })

  it('should skip initialization when `init` is false', async () => {
    const app = await createTestApp({ init: false })

    expect(app.pages).toBeUndefined()

    await app.init()

    expect(app.pages.map(({ path: pagePath }) => pagePath)).toStrictEqual([
      '/404.html',
    ])

    app.cleanup()
  })
})

describe(createTestPage, () => {
  it('should create a page without content', async () => {
    const app = await createTestApp()
    const page = await createTestPage(app, {
      filePath: path.join(app.dir.source(), 'guide/index.md'),
      frontmatter: { title: 'Guide' },
    })

    expect(page.path).toBe('/guide/')
    expect(page.frontmatter.title).toBe('Guide')

    app.cleanup()
  })
})
