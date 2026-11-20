import markdownIt from 'markdown-it'
import { describe, expect, it } from 'vitest'

import { window as windowPlugin } from '../../src/node/window.js'

describe(windowPlugin, () => {
  it('should render a mac window by default', () => {
    const md = markdownIt().use(windowPlugin)

    expect(
      md.render(`::: window title="Demo"
Content
:::
`),
    ).toBe(`<div class="vp-window vp-window-mac">
<div class="vp-window-header">
<span class="vp-window-controls" aria-hidden="true"><i class="vp-window-control-close"></i><i class="vp-window-control-minimize"></i><i class="vp-window-control-maximize"></i></span>
<span class="vp-window-title">Demo</span>
<span class="vp-window-spacer" aria-hidden="true"></span>
</div>
<div class="vp-window-content">
<p>Content</p>
</div>
</div>
`)
  })

  it('should support the windows style', () => {
    const md = markdownIt().use(windowPlugin)

    expect(
      md.render(`::: window windows title="Demo"
Content
:::
`),
    ).toBe(`<div class="vp-window vp-window-windows">
<div class="vp-window-header">
<span class="vp-window-controls" aria-hidden="true"><i class="vp-window-control-minimize"></i><i class="vp-window-control-maximize"></i><i class="vp-window-control-close"></i></span>
<span class="vp-window-title">Demo</span>
<span class="vp-window-spacer" aria-hidden="true"></span>
</div>
<div class="vp-window-content">
<p>Content</p>
</div>
</div>
`)
  })

  it('should support a default style', () => {
    const md = markdownIt().use(windowPlugin, { style: 'windows' })

    expect(md.render('::: window\nContent\n:::\n')).toContain(
      '<div class="vp-window vp-window-windows">',
    )
  })

  it('should let the container override the default style', () => {
    const md = markdownIt().use(windowPlugin, { style: 'windows' })

    expect(md.render('::: window mac\nContent\n:::\n')).toContain(
      '<div class="vp-window vp-window-mac">',
    )
  })

  it('should support the no-padding marker', () => {
    const md = markdownIt().use(windowPlugin)

    expect(md.render('::: window no-padding\nContent\n:::\n')).toContain(
      '<div class="vp-window-content" style="--vp-window-padding:0">',
    )
  })

  it('should support custom height and padding', () => {
    const md = markdownIt().use(windowPlugin)

    expect(
      md.render('::: window height="200" padding="1rem"\nContent\n:::\n'),
    ).toContain(
      '<div class="vp-window-content" style="--vp-window-height:200px;--vp-window-padding:1rem">',
    )
  })

  it('should ignore invalid length values', () => {
    const md = markdownIt().use(windowPlugin)

    expect(md.render('::: window height="large"\nContent\n:::\n')).toContain(
      '<div class="vp-window-content">',
    )
  })

  it('should escape the title', () => {
    const md = markdownIt().use(windowPlugin)

    expect(md.render('::: window title="<b>"\nContent\n:::\n')).toContain(
      '<span class="vp-window-title">&lt;b&gt;</span>',
    )
  })

  it('should support markdown syntax inside', () => {
    const md = markdownIt().use(windowPlugin)

    expect(md.render('::: window\n- a\n- b\n:::\n')).toContain(
      '<ul>\n<li>a</li>\n<li>b</li>\n</ul>',
    )
  })
})
