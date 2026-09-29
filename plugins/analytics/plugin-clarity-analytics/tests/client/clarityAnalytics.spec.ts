// @vitest-environment happy-dom
import {
  collectClientDefines,
  createTestApp,
  stubClientDefines,
} from '@vuepress/test-utils'
import { mountVuePress, renderVuePress } from '@vuepress/test-utils/client'
import { describe, expect, it } from 'vitest'

import clarityClientConfig from '../../src/client/config.js'
import { clarityAnalyticsPlugin } from '../../src/node/index.js'

const CLARITY_ID = 'abcdefghij'

const scriptSelector = `script[src="https://www.clarity.ms/tag/${CLARITY_ID}"]`

interface ClarityStub {
  (...args: unknown[]): void
  q: Iterable<unknown>[]
}

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
  plugin: ReturnType<typeof clarityAnalyticsPlugin>,
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
    delete window.clarity
  }
}

describe('clarity analytics client config', () => {
  it('should not inject the tracking script during SSR', async () => {
    await runWithPlugin(
      clarityAnalyticsPlugin({ id: CLARITY_ID }),
      async () => {
        await renderVuePress({ clientConfigs: [clarityClientConfig] })

        expect(window.clarity).toBeUndefined()
        expect(document.head.querySelector(scriptSelector)).toBeNull()
      },
    )
  })

  it('should inject the tracking script with the id defined in Node', async () => {
    await runWithPlugin(
      clarityAnalyticsPlugin({ id: CLARITY_ID }),
      async () => {
        await mountVuePress({ clientConfigs: [clarityClientConfig] })

        expect(document.head.querySelector(scriptSelector)).not.toBeNull()
        expect(window.clarity).toBeTypeOf('function')
      },
    )
  })

  it('should queue the calls made before the script is loaded', async () => {
    await runWithPlugin(
      clarityAnalyticsPlugin({ id: CLARITY_ID }),
      async () => {
        await mountVuePress({ clientConfigs: [clarityClientConfig] })

        const clarity = window.clarity as ClarityStub

        clarity('identify', 'user-1')

        const queue: unknown[][] = []

        for (const entry of clarity.q) queue.push([...entry])

        expect(queue).toStrictEqual([['identify', 'user-1']])
      },
    )
  })

  it('should not set the crossorigin attribute by default', async () => {
    await runWithPlugin(
      clarityAnalyticsPlugin({ id: CLARITY_ID }),
      async () => {
        await mountVuePress({ clientConfigs: [clarityClientConfig] })

        expect(
          document.head
            .querySelector(scriptSelector)
            ?.hasAttribute('crossorigin'),
        ).toBe(false)
      },
    )
  })

  it('should apply the crossorigin attribute defined in Node', async () => {
    await runWithPlugin(
      clarityAnalyticsPlugin({ crossOrigin: 'anonymous', id: CLARITY_ID }),
      async () => {
        await mountVuePress({ clientConfigs: [clarityClientConfig] })

        expect(
          document.head
            .querySelector(scriptSelector)
            ?.getAttribute('crossorigin'),
        ).toBe('anonymous')
      },
    )
  })

  it('should not inject the tracking script when the global is already set', async () => {
    await runWithPlugin(
      clarityAnalyticsPlugin({ id: CLARITY_ID }),
      async () => {
        const calls: unknown[] = []

        window.clarity = (...args: unknown[]): void => {
          calls.push(args)
        }

        await mountVuePress({ clientConfigs: [clarityClientConfig] })

        expect(document.head.querySelector(scriptSelector)).toBeNull()
        expect(calls).toStrictEqual([])
      },
    )
  })
})
