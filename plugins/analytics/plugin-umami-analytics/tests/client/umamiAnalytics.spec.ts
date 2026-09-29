// @vitest-environment happy-dom
import {
  collectClientDefines,
  createTestApp,
  stubClientDefines,
} from '@vuepress/test-utils'
import { mountVuePress, renderVuePress } from '@vuepress/test-utils/client'
import { describe, expect, it } from 'vitest'

import umamiClientConfig from '../../src/client/config.js'
import { umamiAnalyticsPlugin } from '../../src/node/index.js'

const UMM_ID = 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee'
const UMM_LINK = 'https://umami.example.com/script.js'

const scriptSelector = `script[data-website-id="${UMM_ID}"]`

/**
 * Run a test against a real plugin, with its defines stubbed and a clean DOM
 *
 * The app is created from the plugin so that the client code is driven by the
 * real options, and it is cleaned up together with the DOM and the stubbed
 * defines.
 *
 * @param options - The plugin options / 插件选项
 * @param run - The test body / 测试主体
 * @returns The result of the test body / 测试主体的返回值
 */
const runWithPlugin = async <T>(
  options: Parameters<typeof umamiAnalyticsPlugin>[0],
  run: () => Promise<T>,
): Promise<T> => {
  document.head.innerHTML = ''

  const app = await createTestApp({
    plugins: [umamiAnalyticsPlugin(options)],
  })

  try {
    const restore = stubClientDefines(await collectClientDefines(app))

    try {
      return await run()
    } finally {
      restore()
    }
  } finally {
    app.cleanup()
    document.head.innerHTML = ''
    Reflect.deleteProperty(window, 'umami')
  }
}

describe('umami analytics client config', () => {
  it('should not inject the tracking script during SSR', async () => {
    await runWithPlugin({ id: UMM_ID }, async () => {
      await renderVuePress({ clientConfigs: [umamiClientConfig] })

      expect(document.head.querySelector(scriptSelector)).toBeNull()
    })
  })

  it('should inject the tracking script with the default link', async () => {
    await runWithPlugin({ id: UMM_ID }, async () => {
      await mountVuePress({ clientConfigs: [umamiClientConfig] })

      const script =
        document.head.querySelector<HTMLScriptElement>(scriptSelector)

      expect(script).not.toBeNull()
      expect(script?.getAttribute('src')).toBe('https://us.umami.is/script.js')
      expect(script?.dataset.autoTrack).toBeUndefined()
      expect(script?.dataset.cache).toBeUndefined()
      expect(script?.dataset.domains).toBeUndefined()
      expect(script?.dataset.hostUrl).toBeUndefined()
    })
  })

  it('should apply the options defined in Node', async () => {
    await runWithPlugin(
      {
        autoTrack: false,
        cache: true,
        domains: ['example.com', 'docs.example.com'],
        hostUrl: 'https://umami.example.com',
        id: UMM_ID,
        link: UMM_LINK,
      },
      async () => {
        await mountVuePress({ clientConfigs: [umamiClientConfig] })

        const script =
          document.head.querySelector<HTMLScriptElement>(scriptSelector)

        expect(script?.getAttribute('src')).toBe(UMM_LINK)
        expect(script?.dataset.websiteId).toBe(UMM_ID)
        expect(script?.dataset.autoTrack).toBe('false')
        expect(script?.dataset.cache).toBe('true')
        expect(script?.dataset.domains).toBe('example.com,docs.example.com')
        expect(script?.dataset.hostUrl).toBe('https://umami.example.com')
      },
    )
  })

  it('should not inject the tracking script when the global is already set', async () => {
    await runWithPlugin({ id: UMM_ID }, async () => {
      const tracks: unknown[] = []

      Reflect.set(window, 'umami', {
        track: (...args: unknown[]): void => {
          tracks.push(args)
        },
      })

      await mountVuePress({ clientConfigs: [umamiClientConfig] })

      expect(document.head.querySelector(scriptSelector)).toBeNull()
      expect(tracks).toStrictEqual([])
    })
  })
})
