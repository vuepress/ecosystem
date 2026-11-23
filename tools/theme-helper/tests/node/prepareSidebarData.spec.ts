import { readFileSync } from 'node:fs'
import path from 'node:path'

import { createTestApp } from '@vuepress/test-utils'
import { describe, expect, it } from 'vitest'

import { getSidebarStructureData } from '../../src/node/getSidebarStructureData.js'
import {
  prepareSidebarData,
  watchSidebarData,
} from '../../src/node/prepareSidebarData.js'

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

describe(getSidebarStructureData, () => {
  it('should generate the structure items of the scopes', async () => {
    const app = await createApp()

    try {
      expect(
        getSidebarStructureData(app, { scopes: ['/', '/guide/', '/missing/'] }),
      ).toStrictEqual({
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
        '/guide/': [
          { text: 'Guide', link: '/guide/' },
          { text: 'B', link: '/guide/b.html' },
          { text: 'A', link: '/guide/a.html', icon: 'a-icon' },
        ],
        '/missing/': [],
      })
    } finally {
      app.cleanup()
    }
  })
})

describe(prepareSidebarData, () => {
  it('should write the generated data to the temp directory', async () => {
    const app = await createApp()

    try {
      await prepareSidebarData(app, { scopes: ['/guide/'] })

      const content = readFileSync(
        path.join(app.dir.temp(), 'theme-helper/sidebar.js'),
        'utf8',
      )

      expect(content).toMatch(/^export const sidebarData = \{.*\};\n$/u)
      expect(
        JSON.parse(content.slice(content.indexOf('=') + 1, -2)),
      ).toStrictEqual({
        '/guide/': [
          { text: 'Guide', link: '/guide/' },
          { text: 'B', link: '/guide/b.html' },
          { text: 'A', link: '/guide/a.html', icon: 'a-icon' },
        ],
      })
    } finally {
      app.cleanup()
    }
  })

  it('should register a watcher', async () => {
    const app = await createApp()
    const watchers: { close: () => void }[] = []

    try {
      watchSidebarData(app, watchers, { scopes: ['/guide/'] })

      expect(watchers).toHaveLength(1)
    } finally {
      watchers.forEach((watcher) => watcher.close())
      app.cleanup()
    }
  })
})
