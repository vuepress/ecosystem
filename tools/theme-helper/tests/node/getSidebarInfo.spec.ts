import { createTestApp } from '@vuepress/test-utils'
import { describe, expect, it } from 'vitest'

import { getSidebarInfo } from '../../src/node/getSidebarInfo.js'
import { getSidebarSorter } from '../../src/node/getSidebarSorter.js'
import type { SidebarDirInfo } from '../../src/shared/index.js'

const sorters = getSidebarSorter(['filename'])

describe(getSidebarInfo, () => {
  it('should resolve the normalized information of the pages and skip the hidden ones', async () => {
    const app = await createTestApp({
      files: {
        'README.md': '---\ntitle: Home\n---\n',
        'page2.md':
          '---\ntitle: Page 2\nshortTitle: P2\norder: 2\nicon: page-icon\n---\n',
        'page1.md': '---\ntitle: Page 1\norder: 1\n---\n',
        'hidden.md': '---\ntitle: Hidden\nindex: false\n---\n',
      },
    })

    try {
      const items = getSidebarInfo({ pages: app.pages, sorters, scope: '' })

      // the filename sorter compares case-insensitively, so the pages come
      // before `README.md` and the hidden page is skipped
      expect(items).toMatchObject([
        {
          type: 'file',
          filename: 'page1.md',
          text: 'Page 1',
          order: 1,
          link: '/page1.html',
        },
        {
          type: 'file',
          filename: 'page2.md',
          text: 'P2',
          order: 2,
          link: '/page2.html',
          icon: 'page-icon',
        },
        {
          type: 'file',
          filename: 'README.md',
          text: 'Home',
          order: null,
          link: '/',
        },
      ])
      expect(items).toHaveLength(3)

      expect(items[2].pageData).toMatchObject({ path: '/' })
    } finally {
      app.cleanup()
    }
  })

  it('should resolve the normalized group of a directory from its README.md', async () => {
    const app = await createTestApp({
      files: {
        'guide/README.md':
          '---\ntitle: Guide\ndir:\n  text: Guide Group\n  icon: guide-icon\n  collapsible: false\n  order: 3\n  link: true\n---\n',
        'guide/a.md': '---\ntitle: A\n---\n',
        'guide/b.md': '---\ntitle: B\nicon: b-icon\n---\n',
      },
    })

    try {
      expect(
        getSidebarInfo({ pages: app.pages, sorters, scope: '' }),
      ).toMatchObject([
        {
          type: 'dir',
          dirname: 'guide',
          text: 'Guide Group',
          link: '/guide/',
          icon: 'guide-icon',
          order: 3,
          collapsible: false,
          expanded: false,
          children: [
            {
              type: 'file',
              filename: 'a.md',
              text: 'A',
              link: '/guide/a.html',
            },
            {
              type: 'file',
              filename: 'b.md',
              text: 'B',
              link: '/guide/b.html',
              icon: 'b-icon',
            },
          ],
        },
      ])
    } finally {
      app.cleanup()
    }
  })

  it('should expand a collapsible group only when it is requested', async () => {
    const app = await createTestApp({
      files: {
        'expanded/README.md': '---\ndir:\n  expanded: true\n---\n',
        'expanded/a.md': '',
        'not-expanded/README.md':
          '---\ndir:\n  expanded: true\n  collapsible: false\n---\n',
        'not-expanded/a.md': '',
      },
    })

    try {
      const items = getSidebarInfo({ pages: app.pages, sorters, scope: '' })

      expect(items).toMatchObject([
        {
          dirname: 'expanded',
          collapsible: true,
          expanded: true,
        },
        {
          dirname: 'not-expanded',
          collapsible: false,
          expanded: false,
        },
      ])
    } finally {
      app.cleanup()
    }
  })

  it('should resolve a directory without README.md from its name', async () => {
    const app = await createTestApp({
      files: { 'no_readme/a.md': '' },
    })

    try {
      expect(
        getSidebarInfo({ pages: app.pages, sorters, scope: '' }),
      ).toMatchObject([
        {
          type: 'dir',
          dirname: 'no_readme',
          text: 'No Readme',
          order: null,
          collapsible: true,
          expanded: false,
          pageData: null,
        },
      ])
    } finally {
      app.cleanup()
    }
  })

  it('should skip the directories excluded by their README.md', async () => {
    const app = await createTestApp({
      files: {
        'hidden/README.md': '---\ndir:\n  index: false\n---\n',
        'hidden/a.md': '',
        'visible/a.md': '',
      },
    })

    try {
      const dirnames = getSidebarInfo({ pages: app.pages, sorters, scope: '' })
        .filter((item): item is SidebarDirInfo => item.type === 'dir')
        .map((item) => item.dirname)

      expect(dirnames).toStrictEqual(['visible'])
    } finally {
      app.cleanup()
    }
  })

  it('should normalize the date of the pages', async () => {
    const app = await createTestApp({
      files: {
        'a.md': '---\ndate: 2024-01-01\n---\n',
        'b.md': '---\ndate: not-a-date\n---\n',
      },
    })

    try {
      const items = getSidebarInfo({
        pages: app.pages,
        sorters: getSidebarSorter(['date']),
        scope: '',
      })

      expect(items[0]).toMatchObject({
        filename: 'a.md',
        date: new Date('2024-01-01'),
      })
      expect(items[0].date).toBeInstanceOf(Date)
      expect(items[1].date).toBeUndefined()
    } finally {
      app.cleanup()
    }
  })
})
