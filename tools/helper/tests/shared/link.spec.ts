import { describe, expect, it } from 'vitest'

import { isLinkAbsolute } from '../../src/shared/link.js'

describe(isLinkAbsolute, () => {
  it('should return true for absolute links', () => {
    expect(isLinkAbsolute('/a/')).toBe(true)
    expect(isLinkAbsolute('/a.html')).toBe(true)
  })

  it('should return false for relative links and non-absolute links', () => {
    expect(isLinkAbsolute('mister-hope.com')).toBe(false)
    expect(isLinkAbsolute('mrhope')).toBe(false)
    expect(isLinkAbsolute('./a/')).toBe(false)
    expect(isLinkAbsolute('../a/')).toBe(false)
    expect(isLinkAbsolute('a/')).toBe(false)
    expect(isLinkAbsolute('a.html')).toBe(false)
  })
})
