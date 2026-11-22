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

const { resolveSidebarData } =
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
