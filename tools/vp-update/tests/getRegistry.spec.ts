import { describe, expect, it } from 'vitest'

import { getRegistry } from '../src/utils/registry.js'

describe(getRegistry, () => {
  it('should return the default registry for pnpm', () => {
    expect(getRegistry('pnpm')).toBe('https://registry.npmjs.org/')
  })
})
