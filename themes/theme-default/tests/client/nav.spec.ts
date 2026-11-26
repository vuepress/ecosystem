import { describe, expect, it, vi } from 'vitest'
import type { resolveRoute as resolveRouteType } from 'vuepress/client'

// `resolveRoute` is generic, so the mock is cast to its type
const resolveRoute = ((link: string) => ({
  notFound: false,
  meta: link.includes('features')
    ? { icon: 'lucide:sparkles', title: 'Common Features' }
    : { icon: 'lucide:scroll-text', title: 'Markdown' },
  path: link,
})) as typeof resolveRouteType

vi.mock(import('vuepress/client'), () => ({ resolveRoute }))

const { resolveNavData } =
  await import('../../src/client/theme-default/support/nav.js')

describe(resolveNavData, () => {
  it('should resolve the text and the icon from the page meta', () => {
    expect(resolveNavData([{ link: '/plugins/features/' }])).toStrictEqual([
      {
        icon: 'lucide:sparkles',
        link: '/plugins/features/',
        text: 'Common Features',
      },
    ])
  })

  it('should keep the text and the icon defined by the item', () => {
    expect(
      resolveNavData([
        {
          icon: 'custom-icon',
          link: '/plugins/features/',
          text: 'Features',
        },
      ]),
    ).toStrictEqual([
      {
        icon: 'custom-icon',
        link: '/plugins/features/',
        text: 'Features',
      },
    ])
  })

  it('should resolve the nested items', () => {
    expect(
      resolveNavData([
        {
          text: 'Plugins',
          items: [{ link: '/plugins/markdown/' }],
        },
      ]),
    ).toStrictEqual([
      {
        text: 'Plugins',
        items: [
          {
            icon: 'lucide:scroll-text',
            link: '/plugins/markdown/',
            text: 'Markdown',
          },
        ],
      },
    ])
  })

  it('should not resolve the external links', () => {
    expect(
      resolveNavData([{ link: 'https://vuepress.vuejs.org/' }]),
    ).toStrictEqual([{ link: 'https://vuepress.vuejs.org/' }])
  })
})

describe(resolveNavData, () => {
  it('should prepend the base of a group to its relative child links', () => {
    expect(
      resolveNavData([
        {
          text: 'Themes',
          base: '/themes/',
          items: [{ link: 'features/' }, { link: 'default/' }],
        },
      ]),
    ).toStrictEqual([
      {
        text: 'Themes',
        base: '/themes/',
        items: [
          {
            icon: 'lucide:sparkles',
            link: '/themes/features/',
            text: 'Common Features',
          },
          {
            icon: 'lucide:scroll-text',
            link: '/themes/default/',
            text: 'Markdown',
          },
        ],
      },
    ])
  })

  it('should resolve the nested base of the groups', () => {
    expect(
      resolveNavData([
        {
          text: 'Plugins',
          base: '/plugins/',
          items: [
            { text: 'Features', base: 'features/', items: [{ link: 'icon' }] },
          ],
        },
      ]),
    ).toStrictEqual([
      {
        text: 'Plugins',
        base: '/plugins/',
        items: [
          {
            text: 'Features',
            base: 'features/',
            items: [
              {
                icon: 'lucide:sparkles',
                link: '/plugins/features/icon',
                text: 'Common Features',
              },
            ],
          },
        ],
      },
    ])
  })
})
