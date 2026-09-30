// @vitest-environment happy-dom
import { describe, expect, it, vi } from 'vitest'

import { stubModule, stubTempModule } from '../../src/node/stubModule.js'
import type { getFixtureValues } from '../__fixtures__/stubModuleConsumer.js'

const INTERNAL_ID = '@internal/test-utils-fixture'

const loadConsumer = async (): Promise<{
  getFixtureValues: typeof getFixtureValues
}> => {
  vi.resetModules()

  return import('../__fixtures__/stubModuleConsumer.js')
}

describe('stubModule in a DOM environment', () => {
  it('should stub a generated module in the happy-dom environment', async () => {
    const restoreInternal = stubModule(INTERNAL_ID, {
      fixtureValue: 'dom-internal',
    })
    const restoreTemp = stubTempModule('test-utils-fixture', {
      default: 'dom-default',
      fixtureNamed: () => 'dom-named',
    })

    try {
      const { getFixtureValues } = await loadConsumer()

      expect(getFixtureValues()).toStrictEqual([
        'dom-internal',
        'dom-default',
        'dom-named',
      ])
    } finally {
      restoreInternal()
      restoreTemp()
    }
  })
})
