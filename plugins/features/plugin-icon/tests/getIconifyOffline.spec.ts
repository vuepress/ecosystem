import { describe, expect, it } from 'vitest'

import type { PrunedIconifySet } from '../src/node/getIconifyOffline.js'
import {
  getIconifyOfflineCode,
  getIconifySetPackage,
  getUsedIconSet,
  isIconifyInstalled,
  isIconifySetInstalled,
  parseIconifyIcon,
} from '../src/node/getIconifyOffline.js'

/**
 * Get the sorted names of the icons of an icon set
 *
 * @param set - Icon set / 图标集
 * @returns Icon names / 图标名称
 */
const getIconNames = (set: PrunedIconifySet | null): string[] =>
  Object.keys(set?.icons ?? {}).sort()

describe(getIconifySetPackage, () => {
  it('should get the package of an icon set', () => {
    expect(getIconifySetPackage('mdi')).toBe('@iconify-json/mdi')
    expect(getIconifySetPackage('svg-spinners')).toBe(
      '@iconify-json/svg-spinners',
    )
  })
})

describe(isIconifyInstalled, () => {
  it('should detect the installed web component', () => {
    expect(isIconifyInstalled()).toBe(true)
  })
})

describe(isIconifySetInstalled, () => {
  it('should detect the installed icon set packages', () => {
    expect(isIconifySetInstalled('mdi')).toBe(true)
  })

  it('should reject the icon sets that are not installed', () => {
    expect(isIconifySetInstalled('not-an-icon-set')).toBe(false)
  })
})

describe(parseIconifyIcon, () => {
  it('should parse an icon with a prefix', () => {
    expect(parseIconifyIcon('mdi:home')).toStrictEqual({
      type: 'icon',
      name: 'home',
      prefix: 'mdi',
    })
    expect(parseIconifyIcon('svg-spinners:180-ring')).toStrictEqual({
      type: 'icon',
      name: '180-ring',
      prefix: 'svg-spinners',
    })
  })

  it('should use the default prefix when the icon does not have one', () => {
    expect(parseIconifyIcon('home', 'mdi')).toStrictEqual({
      type: 'icon',
      name: 'home',
      prefix: 'mdi',
    })
    // the prefix of the icon wins
    expect(parseIconifyIcon('lucide:home', 'mdi')).toStrictEqual({
      type: 'icon',
      name: 'home',
      prefix: 'lucide',
    })
  })

  it('should detect image icons', () => {
    expect(
      parseIconifyIcon('https://example.com/icon.png', 'mdi'),
    ).toStrictEqual({ type: 'image' })
    expect(parseIconifyIcon('/images/icon.svg', 'mdi')).toStrictEqual({
      type: 'image',
    })
  })

  it('should detect the icons without an icon set', () => {
    expect(parseIconifyIcon('home')).toStrictEqual({ type: 'unresolved' })
    expect(parseIconifyIcon('home', '')).toStrictEqual({ type: 'unresolved' })
    expect(parseIconifyIcon('mdi:', 'mdi')).toStrictEqual({
      type: 'unresolved',
    })
    expect(parseIconifyIcon('', 'mdi')).toStrictEqual({ type: 'unresolved' })
  })
})

describe(getUsedIconSet, () => {
  it('should reduce an icon set to the icons in use', async () => {
    const { notFound, set } = await getUsedIconSet('mdi', ['home', 'account'])

    expect(notFound).toStrictEqual([])
    expect(getIconNames(set)).toStrictEqual(['account', 'home'])
    // the unused icons are dropped
    expect(getIconNames(set)).not.toContain('beer')
  })

  it('should resolve the aliases of an icon', async () => {
    // `123` is an alias of the `numeric` icon
    const { notFound, set } = await getUsedIconSet('mdi', ['123'])

    expect(notFound).toStrictEqual([])
    expect(set?.aliases?.['123']).toStrictEqual({ parent: 'numeric' })
    // the parent of the alias is bundled as well
    expect(set?.icons.numeric).toHaveProperty('body')
  })

  it('should report the icons that the icon set does not provide', async () => {
    const { notFound, set } = await getUsedIconSet('mdi', [
      'home',
      'not-an-icon',
    ])

    expect(notFound).toStrictEqual(['not-an-icon'])
    expect(getIconNames(set)).toStrictEqual(['home'])
  })

  it('should not provide an icon set when none of the icons is provided', async () => {
    const { notFound, set } = await getUsedIconSet('mdi', ['not-an-icon'])

    expect(notFound).toStrictEqual(['not-an-icon'])
    expect(set).toBeNull()
  })
})

describe(getIconifyOfflineCode, () => {
  it('should register every icon set', () => {
    const code = getIconifyOfflineCode(
      [
        { icons: { home: { body: '<path d="M0 0"/>' } }, prefix: 'mdi' },
        { icons: { house: { body: '<path d="M1 1"/>' } }, prefix: 'lucide' },
      ],
      false,
    )

    expect(code).toContain('import { addCollection } from "iconify-icon";')
    expect(code.match(/addCollection\(/gu)).toHaveLength(2)
    expect(code).toContain('"prefix":"mdi"')
    expect(code).toContain('"prefix":"lucide"')
    // the API is not touched outside of the dev server
    expect(code).not.toContain('_api')
  })

  it('should block the Iconify API in the dev server', () => {
    const code = getIconifyOfflineCode([], true)

    expect(code).toContain(
      'import { _api, addCollection } from "iconify-icon";',
    )
    expect(code).toContain('_api?.setFetch?.(')
    // the missing icon is reported, as the API failure is silent otherwise
    expect(code).toContain('console.warn(')
    expect(code).toContain('reportedIcons')
    expect(code).toContain('} catch {')
  })

  it('should sort the icon sets for a stable output', () => {
    const code = getIconifyOfflineCode(
      [
        { icons: {}, prefix: 'lucide' },
        { icons: {}, prefix: 'mdi' },
      ],
      false,
    )

    expect(code.indexOf('"prefix":"lucide"')).toBeLessThan(
      code.indexOf('"prefix":"mdi"'),
    )
  })
})
