import markdownIt from 'markdown-it'
import { describe, expect, it } from 'vitest'

import { raw } from '../../src/node/markdown-it-plugins/raw.js'

describe('raw container', () => {
  it('should render the raw container', () => {
    const md = markdownIt().use(raw)

    expect(md.render('::: raw\nhello\n:::\n')).toBe(
      '<div class="vp-raw">\n<p>hello</p>\n</div>\n',
    )
  })

  it('should not register the v-pre container', () => {
    const md = markdownIt().use(raw)

    expect(md.render('::: v-pre\n{{ a }}\n:::\n')).toBe(
      '<p>::: v-pre\n{{ a }}\n:::</p>\n',
    )
  })
})
