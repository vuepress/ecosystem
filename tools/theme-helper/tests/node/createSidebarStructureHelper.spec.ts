import { readFileSync } from 'node:fs'
import path from 'node:path'

import { createTestApp } from '@vuepress/test-utils'
import { describe, expect, it } from 'vitest'

import { createSidebarStructureHelper } from '../../src/node/createSidebarStructureHelper.js'
import {
  dirInfoGetter,
  pageInfoGetter,
  skipPageInfoGetter,
} from '../fixtures/sidebarGetters.js'
import type { TestItem } from '../fixtures/sidebarGetters.js'

const createApp = (): ReturnType<typeof createTestApp> =>
  createTestApp({
    files: {
      'README.md': '---\ntitle: Home\n---\n',
      'guide/README.md':
        '---\ntitle: Guide\ndir:\n  text: Guide\n  icon: guide-icon\n  collapsible: false\n---\n',
      'guide/a.md': '---\ntitle: A\nicon: a-icon\n---\n',
      'guide/b.md': '---\ntitle: B\norder: 1\n---\n',
    },
  })

describe(createSidebarStructureHelper, () => {
  it('should generate the default structure items from the theme data', async () => {
    const app = await createApp()
    const helper = createSidebarStructureHelper({
      themeData: { sidebar: 'structure' },
    })

    try {
      expect(helper.scopes).toStrictEqual(['/'])
      expect(helper.getData(app)).toStrictEqual({
        '/': [
          { text: 'Home', link: '/' },
          {
            text: 'Guide',
            children: [
              { text: 'Guide', link: '/guide/' },
              { text: 'B', link: '/guide/b.html' },
              { text: 'A', link: '/guide/a.html' },
            ],
          },
        ],
      })
    } finally {
      app.cleanup()
    }
  })

  it('should generate the items customized by the getters', async () => {
    const app = await createApp()
    const helper = createSidebarStructureHelper<TestItem>({
      themeData: { sidebar: 'structure' },

      pageInfoGetter,
      dirInfoGetter,
    })

    try {
      expect(helper.getData(app)).toStrictEqual({
        '/': [
          { text: 'Home', link: '/' },
          {
            text: 'Guide',
            icon: 'guide-icon',
            children: [
              { text: 'Guide', link: '/guide/' },
              { text: 'B', link: '/guide/b.html' },
              { text: 'A', link: '/guide/a.html', icon: 'a-icon' },
            ],
          },
        ],
      })
    } finally {
      app.cleanup()
    }
  })

  it('should skip the items whose getter returns null', async () => {
    const app = await createTestApp({
      files: {
        'README.md': '---\ntitle: Home\n---\n',
        'guide.md': '---\ntitle: Guide\nhide: true\n---\n',
      },
    })
    const helper = createSidebarStructureHelper<TestItem>({
      themeData: { sidebar: 'structure' },

      pageInfoGetter: skipPageInfoGetter,
    })

    try {
      expect(helper.getData(app)).toStrictEqual({
        '/': [{ text: 'Home', link: '/' }],
      })
    } finally {
      app.cleanup()
    }
  })

  it('should use the custom children key and prefix key', async () => {
    const app = await createApp()
    const helper = createSidebarStructureHelper<TestItem>({
      themeData: {
        sidebar: [{ text: 'Docs', base: '/guide/', items: 'structure' }],
      },
      childrenKey: 'items',
      prefixKey: 'base',
    })

    try {
      expect(helper.scopes).toStrictEqual(['/guide/'])
      expect(helper.getData(app)).toStrictEqual({
        '/guide/': [
          { text: 'Guide', link: '/guide/' },
          { text: 'B', link: '/guide/b.html' },
          { text: 'A', link: '/guide/a.html' },
        ],
      })
    } finally {
      app.cleanup()
    }
  })

  it('should use the custom scopes', async () => {
    const app = await createApp()
    const helper = createSidebarStructureHelper<TestItem>({
      themeData: {},
      getScopes: (): string[] => ['guide'],
    })

    try {
      expect(helper.scopes).toStrictEqual(['/guide/'])
      expect(helper.getData(app)).toStrictEqual({
        '/guide/': [
          { text: 'Guide', link: '/guide/' },
          { text: 'B', link: '/guide/b.html' },
          { text: 'A', link: '/guide/a.html' },
        ],
      })
    } finally {
      app.cleanup()
    }
  })

  it('should apply the sorter option', async () => {
    const app = await createApp()
    const helper = createSidebarStructureHelper<TestItem>({
      themeData: { sidebar: 'structure' },
      sorter: 'filename',
    })

    try {
      expect(helper.getData(app)['/']).toStrictEqual([
        {
          text: 'Guide',
          children: [
            { text: 'A', link: '/guide/a.html' },
            { text: 'B', link: '/guide/b.html' },
            { text: 'Guide', link: '/guide/' },
          ],
        },
        { text: 'Home', link: '/' },
      ])
    } finally {
      app.cleanup()
    }
  })

  it('should prepare the generated data to the temp directory', async () => {
    const app = await createApp()
    const helper = createSidebarStructureHelper<TestItem>({
      themeData: { sidebar: 'structure' },
    })

    try {
      await helper.prepare(app)

      const content = readFileSync(
        path.join(app.dir.temp(), 'theme-helper/sidebar.js'),
        'utf8',
      )

      expect(content).toMatch(/^export const sidebarData = \{.*\};\n$/u)
      expect(
        JSON.parse(content.slice(content.indexOf('=') + 1, -2)),
      ).toStrictEqual(helper.getData(app))
    } finally {
      app.cleanup()
    }
  })

  it('should register a watcher only when there are scopes', async () => {
    const app = await createApp()
    const watchers: { close: () => void }[] = []
    const withScopes = createSidebarStructureHelper({
      themeData: { sidebar: 'structure' },
    })
    const withoutScopes = createSidebarStructureHelper({ themeData: {} })

    try {
      withScopes.watch(app, watchers)
      withoutScopes.watch(app, watchers)

      expect(watchers).toHaveLength(1)
    } finally {
      watchers.forEach((watcher) => watcher.close())
      app.cleanup()
    }
  })
})
