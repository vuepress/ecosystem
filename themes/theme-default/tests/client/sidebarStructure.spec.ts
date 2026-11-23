import { describe, expect, it, vi } from 'vitest'
import type { resolveRoute as resolveRouteType } from 'vuepress/client'

/**
 * The item shape of the default theme, the theme data is generated at build
 * time so the client only reads it
 *
 * 默认主题的条目形状，主题数据在构建时生成，客户端只负责读取
 */
interface StructureItem {
  text: string
  link?: string
  icon?: string
  items?: StructureItem[]
  collapsed?: boolean
}

// the structure data is generated at build time and read by the client of the
// helper, it is replaced with a fixture so that the resolution of the theme can
// be tested
const { structureData } = vi.hoisted(
  (): { structureData: Record<string, StructureItem[]> } => ({
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
          items: [{ text: 'B', link: '/guide/b.html' }],
        },
        {
          text: 'Expanded Group',
          collapsed: false,
          items: [{ text: 'C', link: '/guide/c.html' }],
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
  getSidebarStructure: <Item>(scope: string): Item[] =>
    (structureData[scope] ?? []) as unknown as Item[],
}))

const { getSidebar } =
  await import('../../src/client/theme-default/support/sidebar.js')

const guideItems = structureData['/guide/']

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
