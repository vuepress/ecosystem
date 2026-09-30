import { describe, expect, it } from 'vitest'

import { getAssetsType } from '../src/node/getAssetsType.js'
import type { IconAsset } from '../src/node/options.js'

// The type only accepts the asset links in an array, so the cast stands for an
// untyped configuration, which the guards must reject at runtime as well.
const asUntypedAssets = (assets: string[]): IconAsset =>
  assets as unknown as IconAsset

describe(getAssetsType, () => {
  it('should infer the type from a single asset', () => {
    expect(getAssetsType({ assets: 'iconify' })).toBe('iconify')
    expect(getAssetsType({ assets: 'fontawesome' })).toBe('fontawesome')
    expect(getAssetsType({ assets: 'fontawesome-with-brands' })).toBe(
      'fontawesome',
    )
    expect(
      getAssetsType({ assets: 'https://at.alicdn.com/t/font_123.css' }),
    ).toBe('iconfont')
    expect(
      getAssetsType({ assets: 'https://kit.fontawesome.com/abc.js' }),
    ).toBe('fontawesome')
  })

  it('should infer the type from an array of asset links', () => {
    expect(
      getAssetsType({
        assets: [
          'https://at.alicdn.com/t/font_123.css',
          'https://at.alicdn.com/t/font_456.css',
        ],
      }),
    ).toBe('iconfont')
    expect(
      getAssetsType({
        assets: [
          'https://kit.fontawesome.com/abc.js',
          'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@7/js/all.min.js',
        ],
      }),
    ).toBe('fontawesome')
  })

  it('should not accept the icon keywords inside an array', () => {
    // An array only combines the extra asset links, the icon type itself is
    // picked with a single keyword, so `fontawesome` and
    // `fontawesome-with-brands` can never coexist.
    // @ts-expect-error: a keyword is not an asset link
    const keywords: IconAsset = ['fontawesome', 'fontawesome-with-brands']

    expect(getAssetsType({ assets: keywords })).toBe('unknown')
  })

  it('should not recognize an icon keyword inside an untyped array', () => {
    expect(getAssetsType({ assets: asUntypedAssets(['iconify']) })).toBe(
      'unknown',
    )
    expect(getAssetsType({ assets: asUntypedAssets(['fontawesome']) })).toBe(
      'unknown',
    )
    expect(
      getAssetsType({ assets: asUntypedAssets(['fontawesome-with-brands']) }),
    ).toBe('unknown')
    expect(
      getAssetsType({
        assets: asUntypedAssets(['fontawesome', 'fontawesome-with-brands']),
      }),
    ).toBe('unknown')
  })

  it('should fall back to unknown for mixed or unrecognized assets', () => {
    expect(getAssetsType({ assets: 'https://example.com/icon.css' })).toBe(
      'unknown',
    )
    expect(
      getAssetsType({
        assets: [
          'https://at.alicdn.com/t/font_123.css',
          'https://kit.fontawesome.com/abc.js',
        ],
      }),
    ).toBe('unknown')
  })

  it('should default to iconify', () => {
    expect(getAssetsType({})).toBe('iconify')
  })
})
