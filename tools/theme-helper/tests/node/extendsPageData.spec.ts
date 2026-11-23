import path from 'node:path'

import { createTestApp, createTestPage } from '@vuepress/test-utils'
import { describe, expect, it } from 'vitest'

import { extendsPageData } from '../../src/node/extendsPageData.js'

describe(extendsPageData, () => {
  it('should save the relative file path and the title into the page', async () => {
    const app = await createTestApp()
    const page = await createTestPage(app, {
      filePath: path.join(app.dir.source(), 'guide/index.md'),
      frontmatter: { title: 'Guide' },
    })

    extendsPageData(page)

    expect(page.data.filePathRelative).toBe('guide/index.md')
    expect(page.routeMeta.title).toBe('Guide')
  })
})
