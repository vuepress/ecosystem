import { createTestApp } from '@vuepress/test-utils'
import { describe, expect, it } from 'vitest'

import { getSidebarInfo } from '../../src/node/getSidebarInfo.js'
import { getSidebarSorter } from '../../src/node/getSidebarSorter.js'
import type { SidebarDirInfo } from '../../src/shared/index.js'

const sorters = getSidebarSorter(['filename'])

describe(getSidebarInfo, () => {
  it('should resolve the information of the pages and skip the hidden ones', async () => {
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
          title: 'Page 1',
          order: 1,
          path: '/page1.html',
        },
        {
          type: 'file',
          filename: 'page2.md',
          title: 'P2',
          order: 2,
          path: '/page2.html',
          frontmatter: { icon: 'page-icon', shortTitle: 'P2' },
        },
        {
          type: 'file',
          filename: 'README.md',
          title: 'Home',
          order: null,
          path: '/',
        },
      ])
      expect(items).toHaveLength(3)

      expect(items[2].pageData).toMatchObject({ path: '/' })
    } finally {
      app.cleanup()
    }
  })

  it('should resolve the group of a directory from its README.md', async () => {
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
          title: 'Guide Group',
          order: 3,
          groupInfo: {
            collapsible: false,
            icon: 'guide-icon',
            link: '/guide/',
          },
          children: [
            {
              type: 'file',
              filename: 'a.md',
              title: 'A',
              path: '/guide/a.html',
            },
            {
              type: 'file',
              filename: 'b.md',
              title: 'B',
              path: '/guide/b.html',
              frontmatter: { title: 'B', icon: 'b-icon' },
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
          groupInfo: { collapsible: true, expanded: true },
        },
        {
          dirname: 'not-expanded',
          groupInfo: { collapsible: false },
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
          title: 'No Readme',
          order: null,
          groupInfo: { collapsible: true },
          frontmatter: null,
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
})
