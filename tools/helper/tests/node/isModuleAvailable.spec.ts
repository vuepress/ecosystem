import { describe, expect, it } from 'vitest'
import { isModuleAvailable } from '../../src/node/utils/isModuleAvailable.js'

// See https://github.com/vitest-dev/vitest/issues/6953
describe.skip('isModuleAvailable', () => {
  it('should return true with deps', () => {
    expect(isModuleAvailable('vue', import.meta)).toEqual(true)
  })

  it('should return true with built-in', () => {
    expect(isModuleAvailable('path', import.meta)).toEqual(true)
    expect(isModuleAvailable('node:path', import.meta)).toEqual(true)
  })

  it('should return true with built-in', () => {
    expect(isModuleAvailable('path', import.meta)).toEqual(true)
    expect(isModuleAvailable('node:path', import.meta)).toEqual(true)
  })

  it('should return false with not existed', () => {
    expect(isModuleAvailable('not-existed', import.meta)).toEqual(false)
  })
})
