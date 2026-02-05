import { expect, it } from 'vitest'
import { isLinkAbsolute } from '../../src/shared/link.js'

it('isLinkAbsolute()', () => {
  expect(isLinkAbsolute('/a/')).toBeTruthy()
  expect(isLinkAbsolute('/a.html')).toBeTruthy()
  expect(isLinkAbsolute('mister-hope.com')).toBeFalsy()
  expect(isLinkAbsolute('mrhope')).toBeFalsy()
})
