import { createTestApp, mockLogger } from '@vuepress/test-utils'
import { describe, expect, it } from 'vitest'
import type { App, PluginObject } from 'vuepress/core'

import { googleTagManagerPlugin } from '../../src/node/index.js'

/**
 * Resolve the plugin object for a given environment
 *
 * The plugin only enables itself in build or debug mode, and the test app is
 * always a build app, so the environment flags are stubbed.
 *
 * @param env - The environment flags to use
 * @returns The resolved plugin object
 */
const resolvePlugin = (env: {
  isBuild: boolean
  isDebug: boolean
  isDev: boolean
}): PluginObject =>
  (googleTagManagerPlugin({ id: 'GTM-ENV' }) as (app: App) => PluginObject)({
    env,
  } as App)

describe('google tag manager plugin', () => {
  it('should inject the loader script with the container id in build mode', async () => {
    const app = await createTestApp({
      plugins: [googleTagManagerPlugin({ id: 'GTM-TEST123' })],
    })

    try {
      const scripts = app.siteData.head.filter(([tag]) => tag === 'script')

      expect(scripts).toHaveLength(1)

      const content = String(scripts[0][2])

      expect(content).toContain('GTM-TEST123')
      expect(content).toContain('https://www.googletagmanager.com/gtm.js?id=')
      expect(content).toContain("'dataLayer'")
    } finally {
      app.cleanup()
    }
  })

  it('should warn and inject nothing when the id is missing', async () => {
    const { warn, restore } = mockLogger()

    try {
      const app = await createTestApp({
        plugins: [googleTagManagerPlugin({ id: '' })],
      })

      try {
        expect(warn).toHaveBeenCalledWith(
          expect.stringContaining("'id' is required"),
        )
        expect(app.siteData.head).toHaveLength(0)
      } finally {
        app.cleanup()
      }
    } finally {
      restore()
    }
  })

  it('should not inject the script outside of build and debug mode', () => {
    const pluginObject = resolvePlugin({
      isBuild: false,
      isDebug: false,
      isDev: true,
    })

    expect(pluginObject.onInitialized).toBeUndefined()
  })

  it('should enable itself in debug mode', () => {
    const pluginObject = resolvePlugin({
      isBuild: false,
      isDebug: true,
      isDev: true,
    })

    expect(pluginObject.onInitialized).toBeTypeOf('function')
  })
})
