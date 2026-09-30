import { describe, expect, it } from 'vitest'
import type { PluginFunction } from 'vuepress/core'

import { collectClientDefines } from '../../src/node/collectClientDefines.js'
import { createTestApp } from '../../src/node/createTestApp.js'
import { stubClientDefines } from '../../src/node/stubClientDefines.js'

const optionsPlugin = (): PluginFunction => () => ({
  name: 'test-options-plugin',
  define: () => ({
    __TEST_OPTIONS__: { foo: 'bar' },
  }),
})

const globals = globalThis as Record<string, unknown>

describe(collectClientDefines, () => {
  it('should collect the defines of every plugin', async () => {
    const app = await createTestApp({ plugins: [optionsPlugin()] })

    await expect(collectClientDefines(app)).resolves.toStrictEqual({
      __TEST_OPTIONS__: { foo: 'bar' },
    })

    app.cleanup()
  })

  it('should return an empty object without defines', async () => {
    const app = await createTestApp()

    await expect(collectClientDefines(app)).resolves.toStrictEqual({})

    app.cleanup()
  })
})

describe(stubClientDefines, () => {
  it('should stub the defines on `globalThis`', () => {
    const restore = stubClientDefines({ __TEST_OPTIONS__: { foo: 'bar' } })

    expect(globals.__TEST_OPTIONS__).toStrictEqual({ foo: 'bar' })

    restore()

    expect('__TEST_OPTIONS__' in globals).toBe(false)
  })

  it('should restore the previous value', () => {
    globals.__TEST_OPTIONS__ = 'previous'

    const restore = stubClientDefines({ __TEST_OPTIONS__: { foo: 'bar' } })

    expect(globals.__TEST_OPTIONS__).toStrictEqual({ foo: 'bar' })

    restore()

    expect(globals.__TEST_OPTIONS__).toBe('previous')

    delete globals.__TEST_OPTIONS__
  })

  it('should keep a function define as is', () => {
    const transform = (): void => {}

    const restore = stubClientDefines({ __TEST_TRANSFORM__: transform })

    expect(globals.__TEST_TRANSFORM__).toBe(transform)

    restore()
  })
})
