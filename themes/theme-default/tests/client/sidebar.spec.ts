import { describe, expect, it, vi } from 'vitest'
import type { resolveRoute as resolveRouteType } from 'vuepress/client'

// `resolveRoute` is generic, so the mock is cast to its type
const resolveRoute = ((link: string) => ({
  notFound: false,
  meta: link.includes('git')
    ? { icon: 'la:git-alt', title: 'git' }
    : { icon: 'lucide:link-2', title: 'active-header-links' },
  path: link,
})) as typeof resolveRouteType

vi.mock(import('vuepress/client'), () => ({ resolveRoute }))

// the structure sidebar is generated from the file structure at build time
vi.mock(import('@vuepress/theme-helper/client'), () => ({
  getSidebarStructure: <T>(scope: string): T[] =>
    [{ link: scope, text: scope }] as T[],
}))

const { getSidebar, hasActiveLink, resolveSidebarData } =
  await import('../../src/client/theme-default/support/sidebar.js')
const { isExternal } = await import('../../src/client/theme-default/shared.js')

describe(resolveSidebarData, () => {
  it('should resolve the text and the icon from the page meta', () => {
    expect(
      resolveSidebarData([{ link: '/plugins/development/git.html' }]),
    ).toStrictEqual([
      {
        icon: 'la:git-alt',
        link: '/plugins/development/git.html',
        text: 'git',
      },
    ])
  })

  it('should keep the text and the icon defined by the item', () => {
    expect(
      resolveSidebarData([
        {
          icon: 'custom-icon',
          link: '/plugins/development/git.html',
          text: 'Git',
        },
      ]),
    ).toStrictEqual([
      {
        icon: 'custom-icon',
        link: '/plugins/development/git.html',
        text: 'Git',
      },
    ])
  })

  it('should resolve the nested items', () => {
    expect(
      resolveSidebarData([
        {
          text: 'Development',
          items: [{ link: '/plugins/development/active-header-links.html' }],
        },
      ]),
    ).toStrictEqual([
      {
        text: 'Development',
        items: [
          {
            icon: 'lucide:link-2',
            link: '/plugins/development/active-header-links.html',
            text: 'active-header-links',
          },
        ],
      },
    ])
  })

  it('should not resolve the external links', () => {
    const externalLink = 'https://vuepress.vuejs.org/'

    expect(isExternal(externalLink)).toBe(true)
    expect(resolveSidebarData([{ link: externalLink }])).toStrictEqual([
      { link: externalLink },
    ])
  })
})

describe(getSidebar, () => {
  it('should prepend the matched scope to the relative links of the multi sidebar', () => {
    expect(
      getSidebar(
        {
          '/plugins/': [
            { link: 'features/', text: 'Features' },
            { link: '/plugins/search/' },
          ],
        },
        'plugins/features/index.html',
        '/',
      ),
    ).toStrictEqual([
      { link: '/plugins/features/', text: 'Features' },
      { link: '/plugins/search/' },
    ])
  })

  it('should generate the structure sidebar for the object value scope', () => {
    expect(
      getSidebar(
        { '/guide/': { base: '/guide/', items: 'structure' } } as never,
        '/guide/install.html',
      ),
    ).toStrictEqual([{ link: '/guide/', text: '/guide/' }])
  })

  it('should disable the sidebar of a matched scope with `false`', () => {
    expect(
      getSidebar({ '/config/': false }, 'config/index.html', '/'),
    ).toStrictEqual([])
  })
})

describe(hasActiveLink, () => {
  it('should match the links of the items exactly by default', () => {
    expect(hasActiveLink('guide/install.html', '', { link: '/guide/' })).toBe(
      false,
    )
    expect(hasActiveLink('guide/', '', { link: '/guide/' })).toBe(true)
  })

  it('should match the pages under the link with `exact: false`', () => {
    expect(
      hasActiveLink('guide/install.html', '', {
        link: '/guide/',
        exact: false,
      }),
    ).toBe(true)
  })
})
