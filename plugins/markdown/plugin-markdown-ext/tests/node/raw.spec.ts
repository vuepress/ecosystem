import { createTestApp } from '@vuepress/test-utils'
import markdownIt from 'markdown-it'
import { describe, expect, it } from 'vitest'

import { raw } from '../../src/node/markdown-it-plugins/raw.js'
import { markdownExtPlugin } from '../../src/node/markdownExtPlugin.js'

describe(raw, () => {
  it('should add raw wrapper', () => {
    const md = markdownIt({ linkify: true }).use(raw)

    expect(md.render('::: raw\nHello.\n:::\n')).toBe(
      '<div class="vp-raw">\n<p>Hello.</p>\n</div>\n',
    )
  })
})

describe('markdownExtPlugin raw option', () => {
  it('should register the raw container when enabled', async () => {
    const app = await createTestApp({
      plugins: [markdownExtPlugin({ raw: true })],
    })

    try {
      expect(app.markdown.render('::: raw\nHello.\n:::\n')).toBe(
        '<div class="vp-raw">\n<p>Hello.</p>\n</div>\n',
      )
    } finally {
      app.cleanup()
    }
  })

  it('should not register the raw container by default', async () => {
    const app = await createTestApp({ plugins: [markdownExtPlugin({})] })

    try {
      expect(app.markdown.render('::: raw\nHello.\n:::\n')).not.toContain(
        'vp-raw',
      )
    } finally {
      app.cleanup()
    }
  })
})
