// @vitest-environment happy-dom
import { flushPromises } from '@vue/test-utils'
import {
  collectClientDefines,
  createTestApp,
  stubClientDefines,
} from '@vuepress/test-utils'
import {
  createTestClient,
  mountVuePress,
  renderVuePress,
} from '@vuepress/test-utils/client'
import { describe, expect, it } from 'vitest'

import baiduClientConfig from '../../src/client/config.js'
import { baiduAnalyticsPlugin } from '../../src/node/index.js'

const BD_ID = '0123456789abcdef'

const scriptSelector = `script[src="https://hm.baidu.com/hm.js?${BD_ID}"]`

/**
 * Run a test against a real plugin, with its defines stubbed and a clean DOM
 *
 * The app is created from the plugin so that the client code is driven by the
 * real options, and it is cleaned up together with the DOM and the stubbed
 * defines.
 *
 * @param plugin - The plugin under test / 被测插件
 * @param run - The test body / 测试主体
 * @returns The result of the test body / 测试主体的返回值
 */
const runWithPlugin = async <T>(
  plugin: ReturnType<typeof baiduAnalyticsPlugin>,
  run: () => Promise<T>,
): Promise<T> => {
  document.head.innerHTML = ''

  const app = await createTestApp({ plugins: [plugin] })

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
    delete window._hmt
  }
}

describe('baidu analytics client config', () => {
  it('should not inject the tracking script during SSR', async () => {
    await runWithPlugin(baiduAnalyticsPlugin({ id: BD_ID }), async () => {
      await renderVuePress({ clientConfigs: [baiduClientConfig] })

      expect(window._hmt).toBeUndefined()
      expect(document.head.querySelector(scriptSelector)).toBeNull()
    })
  })

  it('should inject the tracking script with the id defined in Node', async () => {
    await runWithPlugin(baiduAnalyticsPlugin({ id: BD_ID }), async () => {
      await mountVuePress({ clientConfigs: [baiduClientConfig] })

      const script =
        document.head.querySelector<HTMLScriptElement>(scriptSelector)

      expect(script).not.toBeNull()
      expect(script?.async).toBe(true)
      expect(window._hmt).toStrictEqual([])
    })
  })

  it('should report the page view when the route changes', async () => {
    await runWithPlugin(baiduAnalyticsPlugin({ id: BD_ID }), async () => {
      const client = await createTestClient({
        clientConfigs: [baiduClientConfig],
        routes: { '/other/': {} },
      })

      await client.mount()
      await client.router.push('/other/')
      await flushPromises()

      expect(window._hmt).toStrictEqual([['_trackPageview', '/other/']])
    })
  })

  it('should not inject the tracking script when the global is already set', async () => {
    await runWithPlugin(baiduAnalyticsPlugin({ id: BD_ID }), async () => {
      window._hmt = []

      await mountVuePress({ clientConfigs: [baiduClientConfig] })

      expect(document.head.querySelector(scriptSelector)).toBeNull()
    })
  })
})
