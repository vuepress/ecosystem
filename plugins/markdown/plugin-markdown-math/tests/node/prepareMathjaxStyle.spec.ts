import { readFileSync } from 'node:fs'

import type { MathjaxInstance } from '@mdit/plugin-mathjax-slim'
import { createTestApp } from '@vuepress/test-utils'
import { describe, expect, it } from 'vitest'

import { prepareMathjaxStyle } from '../../src/node/prepare/prepareMathjaxStyle.js'

describe('mathjax style preparation', () => {
  it('writes the mathjax output style together with the layout patch', async () => {
    const app = await createTestApp({})
    const instance = {
      outputStyle: (): Promise<string> =>
        Promise.resolve('mjx-container { color: red; }'),
    } as unknown as MathjaxInstance

    try {
      await prepareMathjaxStyle(app, instance)

      const content = readFileSync(
        app.dir.temp('markdown-math/mathjax.css'),
        'utf-8',
      )

      expect(content).toContain('mjx-container { color: red; }')
      // the patch prevents mathjax from breaking the mobile layout
      expect(content).toContain('overflow: auto hidden;')
      expect(content).toContain('mjx-assistive-mml {\n  display: none;\n}')
    } finally {
      app.cleanup()
    }
  })
})
