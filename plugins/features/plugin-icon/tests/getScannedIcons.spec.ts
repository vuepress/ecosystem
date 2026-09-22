import { describe, expect, it, vi } from 'vitest'
import type { App } from 'vuepress/core'

import { getScannedIcons } from '../src/node/getScannedIcons.js'
import { logger } from '../src/node/utils.js'

const createApp = (
  pages: { contentRendered?: string; frontmatter?: Record<string, unknown> }[],
): App =>
  ({
    pages: pages.map(({ contentRendered = '', frontmatter = {} }) => ({
      contentRendered,
      frontmatter,
      sfcBlocks: { template: null },
    })),
  }) as unknown as App

describe(getScannedIcons, () => {
  it('should scan the `icon` field of the front matter by default', async () => {
    const app = createApp([
      { frontmatter: { icon: 'mdi:home' } },
      { frontmatter: { icon: 'mdi:account' } },
    ])

    await expect(getScannedIcons(app)).resolves.toStrictEqual([
      'mdi:home',
      'mdi:account',
    ])
  })

  it('should scan the given front matter fields', async () => {
    const app = createApp([
      {
        frontmatter: {
          icon: 'mdi:home',
          features: [{ name: 'mdi:a' }, { name: 'mdi:b' }],
        },
      },
    ])

    await expect(
      getScannedIcons(app, { frontmatter: ['icon', 'features[*].name'] }),
    ).resolves.toStrictEqual(['mdi:home', 'mdi:a', 'mdi:b'])
  })

  it('should scan no front matter field when the list is empty', async () => {
    const app = createApp([{ frontmatter: { icon: 'mdi:home' } }])

    await expect(
      getScannedIcons(app, { frontmatter: [] }),
    ).resolves.toStrictEqual([])
  })

  it('should scan the given component props', async () => {
    const app = createApp([{ contentRendered: '<VPCustom icon="mdi:home" />' }])

    await expect(
      getScannedIcons(app, { components: ['VPCustom.icon'] }),
    ).resolves.toStrictEqual(['mdi:home'])
  })

  it('should call the scanner', async () => {
    const app = createApp([{ frontmatter: { icon: 'mdi:home' } }])

    await expect(
      getScannedIcons(app, { scanner: () => ['mdi:extra'] }),
    ).resolves.toStrictEqual(['mdi:home', 'mdi:extra'])
  })

  it('should ignore the values that the scanner returns wrongly', async () => {
    const app = createApp([])

    await expect(
      getScannedIcons(app, {
        scanner: () => ['mdi:ok', 1, null] as unknown as string[],
      }),
    ).resolves.toStrictEqual(['mdi:ok'])
  })

  it('should warn when the scanner does not return an array', async () => {
    const warnSpy = vi.spyOn(logger, 'warn').mockImplementation(() => {})
    const app = createApp([])

    await expect(
      getScannedIcons(app, {
        scanner: (() => 'mdi:home') as unknown as () => string[],
      }),
    ).resolves.toStrictEqual([])
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('must return an array of icons'),
    )

    warnSpy.mockRestore()
  })

  it('should merge the front matter, the components and the scanner', async () => {
    const app = createApp([
      {
        contentRendered: '<VPCustom icon="mdi:component" />',
        frontmatter: { icon: 'mdi:frontmatter' },
      },
    ])

    await expect(
      getScannedIcons(app, {
        components: ['VPCustom.icon'],
        scanner: () => ['mdi:scanner'],
      }),
    ).resolves.toStrictEqual([
      'mdi:frontmatter',
      'mdi:component',
      'mdi:scanner',
    ])
  })
})
