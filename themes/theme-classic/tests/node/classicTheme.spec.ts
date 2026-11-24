import path from 'node:path'

import { createTestApp, createTestPage } from '@vuepress/test-utils'
import { describe, expect, it } from 'vitest'
import type { ThemeObject } from 'vuepress/core'

import { classicTheme } from '../../src/node/classicTheme.js'

const createTheme = (): ThemeObject => classicTheme()

describe(classicTheme, () => {
  it('should extend the page with client data', async () => {
    const app = await createTestApp()
    const page = await createTestPage(app, {
      filePath: path.join(app.dir.source(), 'guide/index.md'),
      frontmatter: { icon: 'lucide:book', title: 'Guide' },
    })

    await createTheme().extendsPage?.(page, app)

    expect(page.data.filePathRelative).toBe('guide/index.md')
    expect(page.routeMeta.title).toBe(page.title)
    expect(page.routeMeta.icon).toBe('lucide:book')
  })

  it('should only save a string icon into the route meta', async () => {
    const app = await createTestApp()
    const page = await createTestPage(app, {
      filePath: path.join(app.dir.source(), 'guide/svg.md'),
      frontmatter: { icon: { svg: '<svg></svg>' }, title: 'SVG' },
    })

    await createTheme().extendsPage?.(page, app)

    expect(page.routeMeta.icon).toBeUndefined()
  })
})
