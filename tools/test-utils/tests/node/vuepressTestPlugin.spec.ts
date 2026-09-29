import { existsSync } from 'node:fs'

import type { Plugin } from 'vite'
import { describe, expect, it } from 'vitest'

import { vuepressTestPlugin } from '../../src/node/plugin/vuepressTestPlugin.js'
import { stubModule } from '../../src/node/stubModule.js'

const resolveId = (plugin: Plugin, id: string): string | undefined => {
  const hook = plugin.resolveId

  if (typeof hook !== 'function')
    throw new TypeError('The `resolveId` hook of the plugin is missing.')

  return (hook as (id: string, importer?: string) => string | undefined).call(
    {} as never,
    id,
  )
}

describe(vuepressTestPlugin, () => {
  it('should not resolve a module that has not been stubbed', () => {
    const plugin = vuepressTestPlugin()

    expect(
      resolveId(plugin, '@internal/test-utils-not-stubbed'),
    ).toBeUndefined()
  })

  it('should resolve a module registered by `stubModule()`', () => {
    const plugin = vuepressTestPlugin()
    const restore = stubModule('@internal/test-utils-plugin-fixture', {
      fixtureValue: 'value',
    })

    try {
      const resolved = resolveId(plugin, '@internal/test-utils-plugin-fixture')

      expect(resolved).toBeTypeOf('string')
      expect(existsSync(resolved!)).toBe(true)
    } finally {
      restore()
    }
  })

  it('should resolve any module id that has been stubbed', () => {
    const plugin = vuepressTestPlugin()
    const restore = stubModule('@vuepress/plugin-comment/service', {
      default: () => null,
    })

    try {
      expect(resolveId(plugin, '@vuepress/plugin-comment/service')).toBeTypeOf(
        'string',
      )
    } finally {
      restore()
    }
  })

  it('should fall back to the `resolve` option', () => {
    const themeFiles: Record<string, string> = {
      '@theme/foo': '/tmp/foo.vue',
    }
    const plugin = vuepressTestPlugin({
      resolve: (id) => themeFiles[id],
    })

    expect(resolveId(plugin, '@theme/foo')).toBe('/tmp/foo.vue')
    expect(resolveId(plugin, '@theme/bar')).toBeUndefined()
  })

  it('should ignore relative and bare module ids', () => {
    const plugin = vuepressTestPlugin()

    expect(resolveId(plugin, './foo.js')).toBeUndefined()
    expect(resolveId(plugin, 'vuepress/client')).toBeUndefined()
  })
})
