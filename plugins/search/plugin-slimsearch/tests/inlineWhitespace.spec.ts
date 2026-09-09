import { describe, expect, it } from 'vitest'
import type { Page } from 'vuepress/core'

import { generatePageIndex } from '../src/node/generateIndex.js'
import type { PageIndexItem } from '../src/node/index.js'
import { PathStore } from '../src/node/pathStore.js'

const makePage = (contentRendered: string): Page =>
  ({
    path: '/test.html',
    pathLocale: '/',
    title: 'Test',
    contentRendered,
    frontmatter: {},
    data: {},
  }) as Page

describe('inline element whitespace handling', () => {
  it('vp-fields style HTML (newlines between spans) is split into separate words', () => {
    const html = `<div class="vp-field">
<div class="vp-field-header">
<span class="vp-field-name">theme</span>
<span class="vp-field-badges">
<span class="vp-field-required">Required</span>
</span>
<code class="vp-field-type">ThemeConfig</code></div>
<div class="vp-field-description">
<p>Theme Config</p>
</div>
</div>`

    const store = new PathStore()
    const items = generatePageIndex(makePage(html), store, {
      indexContent: true,
    })
    const text = JSON.stringify(items)

    expect(text).toContain('theme')
    expect(text).toContain('Required')
    expect(text).toContain('ThemeConfig')
    // must NOT be joined into one long word
    expect(text).not.toContain('themeRequiredThemeConfig')
  })

  it('compact spans without whitespace are joined into a single word', () => {
    const html =
      '<div><span>Hello</span><span>World</span><span>foo</span></div>'

    const store = new PathStore()
    const items = generatePageIndex(makePage(html), store, {
      indexContent: true,
    })
    const joined = (items[0] as PageIndexItem).t!.join(' ')

    // No whitespace between inline elements → joined
    expect(joined).toBe('HelloWorldfoo')
  })

  it('a word split across spans is correctly re-joined', () => {
    const html = '<div><span>Hel</span><span>lo</span> world</div>'

    const store = new PathStore()
    const items = generatePageIndex(makePage(html), store, {
      indexContent: true,
    })
    const joined = (items[0] as PageIndexItem).t!.join(' ')

    expect(joined).toBe('Hello world')
  })
})
