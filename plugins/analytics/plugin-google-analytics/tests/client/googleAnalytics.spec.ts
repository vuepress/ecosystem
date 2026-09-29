// @vitest-environment happy-dom
import {
  collectClientDefines,
  createTestApp,
  stubClientDefines,
} from '@vuepress/test-utils'
import { mountVuePress, renderVuePress } from '@vuepress/test-utils/client'
import { describe, expect, it, vi } from 'vitest'
import type { ClientConfig } from 'vuepress/client'

import { googleAnalyticsPlugin } from '../../src/node/index.js'
import type { GoogleAnalyticsPluginOptions } from '../../src/shared/index.js'

const GA_ID = 'G-TEST123'

const scriptSelector = `script[src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"]`

/**
 * Read the queued `dataLayer` entries as plain arrays
 *
 * @returns The queued entries / 排队的条目
 */
const getDataLayer = (): unknown[][] => {
  const entries: unknown[][] = []

  for (const entry of window.dataLayer ?? [])
    entries.push([...(entry as Iterable<unknown>)])

  return entries
}

/**
 * Run a test against a real plugin, with its defines stubbed and a clean DOM
 *
 * The client config reads its options at module scope, so the module is
 * re-imported with `vi.resetModules()` after the defines are stubbed.
 *
 * @param options - The plugin options / 插件选项
 * @param run - The test body, receiving the imported client config /
 *   测试主体，接收导入的客户端配置
 */
const runWithPlugin = async (
  options: GoogleAnalyticsPluginOptions,
  run: (clientConfig: ClientConfig) => Promise<void>,
): Promise<void> => {
  document.head.innerHTML = ''

  const app = await createTestApp({
    plugins: [googleAnalyticsPlugin(options)],
  })

  try {
    const restore = stubClientDefines(await collectClientDefines(app))

    try {
      vi.resetModules()

      const { default: clientConfig } =
        await import('../../src/client/config.js')

      await run(clientConfig)
    } finally {
      restore()
    }
  } finally {
    app.cleanup()
    document.head.innerHTML = ''
    delete window.dataLayer
    delete window.gtag
  }
}

describe('google analytics client config', () => {
  it('should not inject the tracking script during SSR', async () => {
    await runWithPlugin({ id: GA_ID }, async (clientConfig) => {
      await renderVuePress({ clientConfigs: [clientConfig] })

      expect(window.dataLayer).toBeUndefined()
      expect(document.head.querySelector(scriptSelector)).toBeNull()
    })
  })

  it('should inject the tracking script with the id defined in Node', async () => {
    await runWithPlugin({ id: GA_ID }, async (clientConfig) => {
      await mountVuePress({ clientConfigs: [clientConfig] })

      expect(document.head.querySelector(scriptSelector)).not.toBeNull()
      expect(window.gtag).toBeTypeOf('function')

      const dataLayer = getDataLayer()

      expect(dataLayer[0]?.[0]).toBe('js')
      expect(dataLayer[1]).toStrictEqual(['config', GA_ID])
    })
  })

  it('should send the events to debug view when debug mode is enabled', async () => {
    await runWithPlugin({ debug: true, id: GA_ID }, async (clientConfig) => {
      await mountVuePress({ clientConfigs: [clientConfig] })

      expect(getDataLayer()[1]).toStrictEqual([
        'config',
        GA_ID,
        { debug_mode: true },
      ])
    })
  })

  it('should not inject the tracking script when the global is already set', async () => {
    await runWithPlugin({ id: GA_ID }, async (clientConfig) => {
      const calls: unknown[] = []

      window.dataLayer = []
      window.gtag = (...args: unknown[]): void => {
        calls.push(args)
      }

      await mountVuePress({ clientConfigs: [clientConfig] })

      expect(document.head.querySelector(scriptSelector)).toBeNull()
      expect(calls).toStrictEqual([])
    })
  })
})
