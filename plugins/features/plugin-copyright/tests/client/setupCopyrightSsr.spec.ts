import {
  collectClientDefines,
  createTestApp,
  stubClientDefines,
} from '@vuepress/test-utils'
import { renderVuePress } from '@vuepress/test-utils/client'
import { describe, expect, it } from 'vitest'

import copyrightClientConfig from '../../src/client/config.js'
import { copyrightPlugin } from '../../src/node/index.js'

// This file runs in the `node` environment, where `document` does not exist.
// The client setup of the plugin must be skipped during SSR, otherwise it
// would throw when it looks up the `#app` element.
describe('copyright client config during SSR', () => {
  it('should not touch the DOM', async () => {
    const app = await createTestApp({
      plugins: [copyrightPlugin({ author: 'Alice', global: true })],
    })

    try {
      const restore = stubClientDefines(await collectClientDefines(app))

      try {
        const html = await renderVuePress({
          clientConfigs: [copyrightClientConfig],
          content: '<p class="content">Hello world</p>',
        })

        expect(html).toContain('Hello world')
      } finally {
        restore()
      }
    } finally {
      app.cleanup()
    }
  })
})
