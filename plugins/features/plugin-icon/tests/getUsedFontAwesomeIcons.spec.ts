import { describe, expect, it } from 'vitest'
import type { App } from 'vuepress/core'

import { getUsedFontAwesomeIcons } from '../src/node/getUsedFontAwesomeIcons.js'

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

describe(getUsedFontAwesomeIcons, () => {
  it('should detect icons of the icon syntax and of the component', () => {
    const app = createApp([
      {
        contentRendered: `\
<p>Text</p>
<p><VPIcon icon="fa-solid fa-house" /></p>
<p><VPIcon icon='brands:apple'></VPIcon></p>`,
      },
    ])

    expect(getUsedFontAwesomeIcons(app)).toStrictEqual([
      'fa-solid fa-house',
      'brands:apple',
    ])
  })

  it('should detect icons in the template block of markdown', () => {
    const app = createApp([
      {
        contentRendered: '<p>Text</p>',
        template: '<VPIcon icon="solid:user" />',
      },
    ])

    expect(getUsedFontAwesomeIcons(app)).toStrictEqual(['solid:user'])
  })

  it('should ignore icons of other components and bound props', () => {
    const app = createApp([
      {
        contentRendered: `\
<VPIcon :icon="icon" />
<VPIcon data-icon="house" />
<VPIconX icon="house" />
<Icon icon="house" />`,
      },
    ])

    expect(getUsedFontAwesomeIcons(app)).toStrictEqual([])
  })

  it('should support a custom component name', () => {
    const app = createApp([{ contentRendered: '<MyIcon icon="house" />' }])

    expect(getUsedFontAwesomeIcons(app, 'MyIcon')).toStrictEqual(['house'])
    expect(getUsedFontAwesomeIcons(app)).toStrictEqual([])
  })

  it('should deduplicate icons of all pages', () => {
    const app = createApp([
      { contentRendered: '<VPIcon icon="house" />' },
      { contentRendered: '<VPIcon icon="house" /><VPIcon icon="user" />' },
    ])

    expect(getUsedFontAwesomeIcons(app)).toStrictEqual(['house', 'user'])
  })
})
