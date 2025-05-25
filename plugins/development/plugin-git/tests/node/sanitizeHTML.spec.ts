import { describe, expect, it } from 'vitest'
import { sanitizeHTML } from '../../src/node/utils/sanitizeHTML.js'

describe('utils/sanitizeHTML', () => {
  it('should work for safe HTML', () => {
    ;[
      '<a href="https://vuejs.org" target="_blank" rel="noopener noreferrer">Vue.js</a>',
      '<a href="http://vuejs.org" target="_blank" rel="noopener noreferrer">Vue.js</a>',
      '<em>emphasized</em>',
      '<strong>strong</strong>',
      '<code>code</code>',
      '<code>code</code> <em>emphasized</em> <strong>strong</strong>',
      ':emoji: 🚀', // emoji
      'docs: update guide <code>code</code> <a href="https://github.com/vuejs/ecosystem/issue/123">#123</a>',
    ].forEach((html) => {
      expect(sanitizeHTML(html)).toBe(html)
    })
  })

  it('should sanitize disallowed tags', () => {
    ;[
      ['<script>alert(1)</script>', ''],
      ['<style>:root {}</style>', ''],
      ['<p>foo</p><script>alert(1)</script>', 'foo'],
      ['<span>foo</span><img src="foo.jpg>', 'foo'],
      [
        '<form><label for="foo">foo</label><input id="foo" type="text"><button type="submit">button</button></form>',
        'foobutton',
      ],
      ['<iframe src="https://example.com"></iframe>', ''],
      ['<img src="https://example.com">', ''],
    ].forEach(([html, expected]) => {
      expect(sanitizeHTML(html)).toBe(expected)
    })
  })

  it('should sanitize anchor href', () => {
    ;[
      ['<a href="/foo/">foo</a>', '<a>foo</a>'],
      ['<a href="javascript:alert(1)">alert</a>', '<a>alert</a>'],
      ['<a href="mailto:xxx">email</a>', '<a>email</a>'],
      ['<a href="tel:xxx">phone</a>', '<a>phone</a>'],
    ].forEach(([html, expected]) => {
      expect(sanitizeHTML(html)).toBe(expected)
    })
  })

  it('should sanitize disallowed attributes', () => {
    ;[
      [
        '<a class="foo" href="https://vuejs.org">Vue.js</a>',
        '<a href="https://vuejs.org">Vue.js</a>',
      ],
      ['<code class="foo" style="margin:0">code</code>', '<code>code</code>'],
      [
        '<code class="foo" style="margin:0">code</code> <em class="foo" style="margin:0">emphasized</em> <strong class="foo" style="margin:0">strong</strong>',
        '<code>code</code> <em>emphasized</em> <strong>strong</strong>',
      ],
      [
        '<code onclick="alert(1)" style="margin:0">code</code>',
        '<code>code</code>',
      ],
    ].forEach(([html, expected]) => {
      expect(sanitizeHTML(html)).toBe(expected)
    })
  })
})
