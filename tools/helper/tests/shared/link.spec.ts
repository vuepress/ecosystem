import { expect, it } from 'vitest'
import { isLinkAbsolute } from '../../src/shared/link.js'

it('isLinkAbsolute()', () => {
  expect(isLinkAbsolute('/a/')).toBe(true)
  expect(isLinkAbsolute('/a.html')).toBe(true)
  expect(isLinkAbsolute('mister-hope.com')).toBe(false)
  expect(isLinkAbsolute('mrhope')).toBe(false)
})
