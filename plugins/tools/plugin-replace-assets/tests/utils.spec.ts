import { describe, expect, it } from 'vitest'

import { createAssetPattern, normalizeUrl } from '../src/node/utils.js'

describe('plugin-replace-assets > utils', () => {
  describe(createAssetPattern, () => {
    it('should match', () => {
      expect(createAssetPattern('/[^/]').test(`'/images/foo.jpg'`)).toBe(true)
      expect(createAssetPattern('/[^/]').test(`"/images/foo.jpg"`)).toBe(true)
      expect(createAssetPattern('/[^/]').test(`(/images/foo.jpg)`)).toBe(true)
      expect(createAssetPattern('/[^/]').test(`('/images/foo.jpg')`)).toBe(true)
      expect(createAssetPattern('/[^/]').test(`("/images/foo.jpg")`)).toBe(true)
      expect(createAssetPattern('/[^/]').test(`"/images/foo.jpg?a=1"`)).toBe(
        true,
      )
    })

    it('should not match', () => {
      expect(
        createAssetPattern('/[^/]').test(
          `'https://example.com/images/foo.jpg'`,
        ),
      ).toBe(false)
      expect(createAssetPattern('/[^/]').test(`"./images/foo.jpg"`)).toBe(false)
      expect(createAssetPattern('/[^/]').test(`"images/foo.jpg"`)).toBe(false)
    })
  })

  describe(normalizeUrl, () => {
    it('should normalize url correctly', () => {
      expect(normalizeUrl('')).toBe('')
      expect(normalizeUrl('/images/foo.jpg')).toBe('/images/foo.jpg')
      expect(normalizeUrl('/images/foo.jpg?a=1')).toBe('/images/foo.jpg?a=1')
      expect(normalizeUrl('/images/foo.jpg', 'https://example.com/')).toBe(
        'https://example.com/images/foo.jpg',
      )
      expect(normalizeUrl('/images/foo.jpg?a=1', 'https://example.com/')).toBe(
        'https://example.com/images/foo.jpg?a=1',
      )
    })
  })
})
