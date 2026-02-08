import { describe, expect, it } from 'vitest'
import { isModuleAvailable } from '../../src/node/utils/isModuleAvailable.js'

// See https://github.com/vitest-dev/vitest/issues/6953
describe(isModuleAvailable, () => {
  it('should return true with deps', () => {
    expect(isModuleAvailable('vue', import.meta)).toBe(true)
  })

  it('should return true with built-in', () => {
    expect(isModuleAvailable('path', import.meta)).toBe(true)
    expect(isModuleAvailable('node:path', import.meta)).toBe(true)
  })

  it('should return true with built-in', () => {
    expect(isModuleAvailable('path', import.meta)).toBe(true)
    expect(isModuleAvailable('node:path', import.meta)).toBe(true)
  })

  it('should return false with not existed', () => {
    expect(isModuleAvailable('not-existed', import.meta)).toBe(false)
  })
})
