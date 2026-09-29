import { describe, expect, it } from 'vitest'

import { getLink } from '../../src/client/utils/getLink.js'

describe(getLink, () => {
  it('should keep an http link unchanged', () => {
    expect(getLink('https://example.com/a.png')).toBe(
      'https://example.com/a.png',
    )
  })

  it('should keep an absolute path', () => {
    expect(getLink('/images/a.png')).toBe('/images/a.png')
  })

  it('should resolve a relative path from the site root', () => {
    expect(getLink('images/a.png')).toBe('/images/a.png')
  })
})
