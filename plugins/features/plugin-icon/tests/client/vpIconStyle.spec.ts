import { readFileSync } from 'node:fs'

import { compileString } from 'sass-embedded'
import { describe, expect, it } from 'vitest'

const source = readFileSync(
  new URL('../../src/client/styles/vp-icon.scss', import.meta.url),
  'utf-8',
)

const { css } = compileString(source)

describe('vp-icon styles', () => {
  it('should align the `<i>` icons with the documented default', () => {
    // FontAwesome and iconfont render an `<i>`, which must fall back to the
    // documented `-0.125em` when the `verticalAlign` prop is not set
    expect(css).toMatch(
      /\.vp-icon:is\(i\)\s*\{\s*vertical-align:\s*var\(--icon-vertical-align,\s*-0\.125em\)/u,
    )
  })

  it('should align the other icons with the documented default', () => {
    expect(css).toMatch(
      /\.vp-icon:not\(i\)\s*\{\s*vertical-align:\s*var\(--icon-vertical-align,\s*-0\.125em\)/u,
    )
  })
})
