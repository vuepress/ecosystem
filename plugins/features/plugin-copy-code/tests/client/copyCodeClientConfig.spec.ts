// @vitest-environment happy-dom
import { flushPromises } from '@vue/test-utils'
import {
  collectClientDefines,
  createTestApp,
  stubClientDefines,
} from '@vuepress/test-utils'
import { mountVuePress } from '@vuepress/test-utils/client'
import { describe, expect, it } from 'vitest'

import copyCodeClientConfig from '../../src/client/config.js'
import { copyCodePlugin } from '../../src/node/index.js'

const content = `
  <div class="special"><div class="language-ts"><pre><code>const a = 1</code></pre></div></div>
  <div class="normal"><div class="language-ts"><pre><code>const b = 2</code></pre></div></div>
`

describe('copy code client config', () => {
  it('should apply the options defined in Node', async () => {
    const app = await createTestApp({
      plugins: [
        copyCodePlugin({ duration: 1500, selector: 'div.special pre' }),
      ],
    })

    try {
      const defines = await collectClientDefines(app)

      expect(defines.__CC_OPTIONS__).toMatchObject({
        duration: 1500,
        selector: 'div.special pre',
      })

      const restore = stubClientDefines(defines)

      try {
        const wrapper = await mountVuePress({
          attachTo: document.body,
          clientConfigs: [copyCodeClientConfig],
          content,
        })

        await flushPromises()

        expect(
          wrapper.find('div.special button.vp-copy-code-button').exists(),
        ).toBe(true)
        expect(
          wrapper.find('div.normal button.vp-copy-code-button').exists(),
        ).toBe(false)
      } finally {
        restore()
      }
    } finally {
      app.cleanup()
    }
  })
})
