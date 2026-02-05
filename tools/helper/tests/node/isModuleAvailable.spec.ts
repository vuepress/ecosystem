import { describe, expect, it } from 'vitest'
import { isModuleAvailable } from '../../src/node/utils/isModuleAvailable.js'

// See https://github.com/vitest-dev/vitest/issues/6953
describe(isModuleAvailable, () => {
  it('should return true with deps', () => {
    expect(isModuleAvailable('vue', import.meta)).toBeTruthy()
  })

  it('should return true with built-in', () => {
    expect(isModuleAvailable('path', import.meta)).toBeTruthy()
    expect(isModuleAvailable('node:path', import.meta)).toBeTruthy()
  })

  it('should return true with built-in', () => {
    expect(isModuleAvailable('path', import.meta)).toBeTruthy()
    expect(isModuleAvailable('node:path', import.meta)).toBeTruthy()
  })

  it('should return false with not existed', () => {
    expect(isModuleAvailable('not-existed', import.meta)).toBeFalsy()
  })
})
