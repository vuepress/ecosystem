import { describe, expect, it, vi } from 'vitest'

import { getSidebarStructure } from '../../src/client/index.js'
import type { SidebarStructureData } from '../../src/shared/index.js'

// the data of the generated module is mocked, so that the client is tested
// with a known scope data instead of the empty fallback
const { sidebarData } = vi.hoisted(
  (): { sidebarData: SidebarStructureData } => ({
    sidebarData: {
      '/': [{ text: 'Home', link: '/' }],
      '/guide/': [
        { text: 'Guide', link: '/guide/' },
        { text: 'A', link: '/guide/a.html' },
      ],
    },
  }),
)

vi.mock(import('@temp/theme-helper/sidebar.js'), () => ({ sidebarData }))

describe(getSidebarStructure, () => {
  it('should normalize the scope before resolving the data', () => {
    const items = [
      { text: 'Guide', link: '/guide/' },
      { text: 'A', link: '/guide/a.html' },
    ]

    expect(getSidebarStructure('/guide/')).toStrictEqual(items)
    expect(getSidebarStructure('/guide')).toStrictEqual(items)
    expect(getSidebarStructure('guide/')).toStrictEqual(items)
    expect(getSidebarStructure('guide')).toStrictEqual(items)
  })

  it('should resolve the data of the root scope', () => {
    expect(getSidebarStructure('/')).toStrictEqual([
      { text: 'Home', link: '/' },
    ])
  })

  it('should resolve an empty list when the scope is not generated', () => {
    expect(getSidebarStructure('/missing/')).toStrictEqual([])
  })
})
