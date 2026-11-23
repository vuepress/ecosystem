import { createTestApp } from '@vuepress/test-utils'
import { describe, expect, it } from 'vitest'

import { getStructureInfo } from '../../src/node/getStructureInfo.js'

describe(getStructureInfo, () => {
  it('should build the nested structure of a scope', async () => {
    const app = await createTestApp({
      files: {
        'guide/README.md': '',
        'guide/nested/deep.md': '',
        'guide/page2.md': '',
        'guide/page10.md': '',
      },
    })

    try {
      // the entries are sorted by their path with a case-insensitive
      // collation, so the pages come before `README.md`
      expect(getStructureInfo(app.pages, 'guide/')).toStrictEqual([
        {
          type: 'dir',
          dirname: 'nested',
          path: 'nested',
          children: [
            { type: 'file', filename: 'deep.md', path: 'nested/deep.md' },
          ],
        },
        { type: 'file', filename: 'page2.md', path: 'page2.md' },
        { type: 'file', filename: 'page10.md', path: 'page10.md' },
        { type: 'file', filename: 'README.md', path: 'README.md' },
      ])
    } finally {
      app.cleanup()
    }
  })

  it('should sort the files naturally', async () => {
    const app = await createTestApp({
      files: { 'page2.md': '', 'page10.md': '' },
    })

    try {
      expect(getStructureInfo(app.pages, '')).toStrictEqual([
        { type: 'file', filename: 'page2.md', path: 'page2.md' },
        { type: 'file', filename: 'page10.md', path: 'page10.md' },
      ])
    } finally {
      app.cleanup()
    }
  })

  it('should filter the pages of other locales in the root scope', async () => {
    const app = await createTestApp({
      files: {
        'README.md': '',
        'guide/index.md': '',
        'zh/README.md': '',
        'zh/guide/index.md': '',
      },
      locales: { '/': { lang: 'en-US' }, '/zh/': { lang: 'zh-CN' } },
    })

    try {
      expect(getStructureInfo(app.pages, '')).toStrictEqual([
        {
          type: 'dir',
          dirname: 'guide',
          path: 'guide',
          children: [
            { type: 'file', filename: 'index.md', path: 'guide/index.md' },
          ],
        },
        { type: 'file', filename: 'README.md', path: 'README.md' },
      ])
      expect(getStructureInfo(app.pages, 'zh/')).toStrictEqual([
        {
          type: 'dir',
          dirname: 'guide',
          path: 'guide',
          children: [
            { type: 'file', filename: 'index.md', path: 'guide/index.md' },
          ],
        },
        { type: 'file', filename: 'README.md', path: 'README.md' },
      ])
    } finally {
      app.cleanup()
    }
  })
})
