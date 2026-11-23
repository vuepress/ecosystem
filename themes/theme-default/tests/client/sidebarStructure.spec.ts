import type {
  SidebarStructureData,
  SidebarStructureItem,
} from '@vuepress/theme-helper'
import { describe, expect, it, vi } from 'vitest'
import type { resolveRoute as resolveRouteType } from 'vuepress/client'

// the structure data is generated at build time and read by the client of the
// helper, it is replaced with a fixture so that the mapping of the theme can
// be tested
const { structureData } = vi.hoisted(
  (): {
    structureData: SidebarStructureData
  } => ({
    structureData: {
      '/': [
        { text: 'Home', link: '/' },
        { text: 'Guide', link: '/guide/' },
      ],
      '/guide/': [
        { text: 'Guide', link: '/guide/' },
        { text: 'A', link: '/guide/a.html' },
        {
          text: 'Static Group',
          collapsible: false,
          children: [{ text: 'B', link: '/guide/b.html' }],
        },
        {
          text: 'Expanded Group',
          expanded: true,
          children: [{ text: 'C', link: '/guide/c.html' }],
        },
      ],
      '/zh/': [{ text: 'Home', link: '/zh/' }],
    },
  }),
)

// `resolveRoute` is generic, so the mock is cast to its type
const resolveRoute = ((link: string) => ({
  notFound: false,
  meta: {},
  path: link,
})) as unknown as typeof resolveRouteType

vi.mock(import('vuepress/client'), () => ({ resolveRoute }))

vi.mock(import('@vuepress/theme-helper/client'), () => ({
  getSidebarStructure: (scope: string): SidebarStructureItem[] =>
    structureData[scope] ?? [],
}))

const { getSidebar } =
  await import('../../src/client/theme-default/support/sidebar.js')

/**
 * The structure items of `/guide/` mapped to the sidebar items of the theme
 *
 * 映射为默认主题侧边栏条目的 `/guide/` 结构条目
 */
const guideItems = [
  { text: 'Guide', link: '/guide/' },
  { text: 'A', link: '/guide/a.html' },
  // `collapsible: false` keeps the group static, so `collapsed` is absent
  {
    text: 'Static Group',
    items: [{ text: 'B', link: '/guide/b.html' }],
  },
  {
    text: 'Expanded Group',
    collapsed: false,
    items: [{ text: 'C', link: '/guide/c.html' }],
  },
]

describe(getSidebar, () => {
  it('should resolve a `structure` sidebar of the matching locale', () => {
    expect(getSidebar('structure', '/', undefined, '/zh/')).toStrictEqual([
      { text: 'Home', link: '/zh/' },
    ])
  })

  it('should resolve a `structure` sidebar of the root locale', () => {
    expect(getSidebar('structure', '/', undefined, '/')).toStrictEqual([
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
    ])
  })

  it('should resolve a `structure` sidebar of a multi sidebar config', () => {
    expect(
      getSidebar({ '/guide/': 'structure' }, '/guide/a.html', undefined, '/'),
    ).toStrictEqual(guideItems)
  })

  it('should resolve the structure items of a nested group', () => {
    expect(
      getSidebar(
        [{ text: 'Docs', base: '/guide/', items: 'structure' }],
        '/guide/a.html',
        undefined,
        '/',
      ),
    ).toStrictEqual([{ text: 'Docs', base: '/guide/', items: guideItems }])
  })
})
