import markdownIt from 'markdown-it'
import { describe, expect, it } from 'vitest'

import { steps } from '../../src/node/steps.js'

describe(steps, () => {
  it('should wrap content with vp-steps container', () => {
    const md = markdownIt().use(steps)

    expect(
      md.render(`::: steps
1. step 1
2. step 2
:::
`),
    ).toBe(`<div class="vp-steps">
<ol>
<li>step 1</li>
<li>step 2</li>
</ol>
</div>
`)
  })

  it('should support unordered list', () => {
    const md = markdownIt().use(steps)

    expect(
      md.render(`::: steps
- step 1
- step 2
:::
`),
    ).toBe(`<div class="vp-steps">
<ul>
<li>step 1</li>
<li>step 2</li>
</ul>
</div>
`)
  })

  it('should support other markdown syntax inside', () => {
    const md = markdownIt().use(steps)

    expect(
      md.render(`::: steps
1. step 1

   > quote

2. step 2
:::
`),
    ).toContain('<blockquote>')
  })
})
