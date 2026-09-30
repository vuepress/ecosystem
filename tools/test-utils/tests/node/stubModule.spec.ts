import { describe, expect, it, vi } from 'vitest'

import {
  getStubbedModules,
  stubModule,
  stubTempModule,
} from '../../src/node/stubModule.js'
import type { getFixtureValues } from '../__fixtures__/stubModuleConsumer.js'

const INTERNAL_ID = '@internal/test-utils-fixture'

const loadConsumer = async (): Promise<{
  getFixtureValues: typeof getFixtureValues
}> => {
  vi.resetModules()

  return import('../__fixtures__/stubModuleConsumer.js')
}

describe(stubModule, () => {
  it('should stub a generated module in the node environment', async () => {
    const restoreInternal = stubModule(INTERNAL_ID, {
      fixtureValue: 'internal-value',
    })
    const restoreTemp = stubTempModule('test-utils-fixture', {
      default: 'temp-default',
      fixtureNamed: () => 'temp-named',
    })

    try {
      const { getFixtureValues } = await loadConsumer()

      expect(getFixtureValues()).toStrictEqual([
        'internal-value',
        'temp-default',
        'temp-named',
      ])
    } finally {
      restoreInternal()
      restoreTemp()
    }
  })

  it('should restore the previous stub of a module', () => {
    const registry = getStubbedModules()
    const first = stubModule(INTERNAL_ID, { fixtureValue: 'first' })
    const second = stubModule(INTERNAL_ID, { fixtureValue: 'second' })

    expect(registry[INTERNAL_ID]).toStrictEqual({ fixtureValue: 'second' })

    second()

    expect(registry[INTERNAL_ID]).toStrictEqual({ fixtureValue: 'first' })

    first()

    expect(registry[INTERNAL_ID]).toBeUndefined()
  })

  it('should fail with a clear message when the module is not stubbed', async () => {
    const restore = stubModule(INTERNAL_ID, { fixtureValue: 'internal-value' })

    restore()

    await expect(loadConsumer()).rejects.toThrow(
      /The module "@internal\/test-utils-fixture" is imported but has not been stubbed/u,
    )
  })

  it('should reject an export name that is not an identifier', () => {
    expect(() =>
      stubModule(INTERNAL_ID, { 'not-an-identifier': 'value' }),
    ).toThrow(/is not a valid identifier/u)
  })
})
