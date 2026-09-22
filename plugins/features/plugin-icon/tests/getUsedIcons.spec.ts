import { describe, expect, it } from 'vitest'
import type { App } from 'vuepress/core'

import { getUsedIcons } from '../src/node/getUsedIcons.js'

const createApp = (
  pages: {
    contentRendered?: string
    template?: string
  }[],
): App =>
  ({
    pages: pages.map(({ contentRendered = '', template }) => ({
      contentRendered,
      sfcBlocks: { template: template ? { content: template } : null },
    })),
  }) as unknown as App

describe(getUsedIcons, () => {
  it('should detect the icons of the icon syntax and of the component', () => {
    const app = createApp([
      {
        contentRendered: `\
<p>Text</p>
<p><VPIcon icon="fa-solid fa-house" /></p>
<p><VPIcon icon='brands:apple'></VPIcon></p>`,
      },
    ])

    expect(getUsedIcons(app)).toStrictEqual([
      'fa-solid fa-house',
      'brands:apple',
    ])
  })

  it('should detect the icons in the template block of markdown', () => {
    const app = createApp([
      {
        contentRendered: '<p>Text</p>',
        template: '<VPIcon icon="solid:user" />',
      },
    ])

    expect(getUsedIcons(app)).toStrictEqual(['solid:user'])
  })

  it('should detect the icons nested in other elements', () => {
    const app = createApp([
      {
        contentRendered:
          '<ul><li><span><VPIcon icon="deep" /></span></li></ul>',
      },
    ])

    expect(getUsedIcons(app)).toStrictEqual(['deep'])
  })

  it('should ignore the icons in HTML comments', () => {
    const app = createApp([
      {
        contentRendered: `\
<!-- <VPIcon icon="commented" /> -->
<p><VPIcon icon="real" /></p>`,
      },
    ])

    expect(getUsedIcons(app)).toStrictEqual(['real'])
  })

  it('should ignore the bound props and the other elements', () => {
    const app = createApp([
      {
        contentRendered: `\
<VPIcon :icon="icon" />
<VPIcon data-icon="house" />
<VPIconX icon="house" />
<Icon icon="house" />`,
      },
    ])

    expect(getUsedIcons(app)).toStrictEqual([])
  })

  it('should support a custom component name', () => {
    const app = createApp([{ contentRendered: '<MyIcon icon="house" />' }])

    expect(getUsedIcons(app, 'MyIcon')).toStrictEqual(['house'])
    expect(getUsedIcons(app)).toStrictEqual([])
  })

  it('should detect the kebab-case form of the component', () => {
    const app = createApp([{ contentRendered: '<my-icon icon="house" />' }])

    expect(getUsedIcons(app, 'MyIcon')).toStrictEqual(['house'])
  })

  it('should deduplicate the icons of all pages', () => {
    const app = createApp([
      { contentRendered: '<VPIcon icon="house" />' },
      { contentRendered: '<VPIcon icon="house" /><VPIcon icon="user" />' },
    ])

    expect(getUsedIcons(app)).toStrictEqual(['house', 'user'])
  })
})
