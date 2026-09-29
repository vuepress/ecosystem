import { describe, expect, it } from 'vitest'

import { getAssetsType } from '../src/node/getAssetsType.js'

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

  it('should infer the type from an array of assets', () => {
    expect(getAssetsType({ assets: ['iconify'] })).toBe('iconify')
    expect(getAssetsType({ assets: ['fontawesome'] })).toBe('fontawesome')
    expect(getAssetsType({ assets: ['fontawesome-with-brands'] })).toBe(
      'fontawesome',
    )
    expect(
      getAssetsType({ assets: ['https://at.alicdn.com/t/font_123.css'] }),
    ).toBe('iconfont')
  })

  it('should fall back to unknown for mixed or unrecognized assets', () => {
    expect(getAssetsType({ assets: 'https://example.com/icon.css' })).toBe(
      'unknown',
    )
    expect(
      getAssetsType({
        assets: ['iconify', 'https://at.alicdn.com/t/font_123.css'],
      }),
    ).toBe('unknown')
  })

  it('should default to iconify', () => {
    expect(getAssetsType({})).toBe('iconify')
  })
})
