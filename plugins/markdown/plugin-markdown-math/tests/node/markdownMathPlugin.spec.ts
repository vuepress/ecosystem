import { createTestApp, mockLogger } from '@vuepress/test-utils'
import { describe, expect, it } from 'vitest'

import { markdownMathPlugin } from '../../src/node/index.js'

describe('markdown math plugin', () => {
  it('renders inline math with katex and marks it with v-pre', async () => {
    const app = await createTestApp({
      plugins: [markdownMathPlugin({ type: 'katex' })],
    })

    try {
      const html = app.markdown.render('inline $a^2+b^2=c^2$ end', {})

      expect(html).toContain('<span v-pre class="katex">')
      expect(html).toContain(
        'annotation encoding="application/x-tex">a^2+b^2=c^2<',
      )
      // the delimiters are consumed
      expect(html).not.toContain('$')
    } finally {
      app.cleanup()
    }
  })

  it('renders block math as a katex block', async () => {
    const app = await createTestApp({
      plugins: [markdownMathPlugin({ type: 'katex' })],
    })

    try {
      const html = app.markdown.render('$$\na^2\n$$', {})

      expect(html).toContain("class='katex-block'")
      expect(html).toContain('v-pre')
      expect(html).toContain('display="block"')
    } finally {
      app.cleanup()
    }
  })

  it('keeps an unclosed dollar sign as literal text', async () => {
    const app = await createTestApp({
      plugins: [markdownMathPlugin({ type: 'katex' })],
    })

    try {
      expect(app.markdown.render('unclosed $a^2 end', {})).toContain(
        'unclosed $a^2 end',
      )
    } finally {
      app.cleanup()
    }
  })

  it('renders an error span for malformed input instead of throwing', async () => {
    const app = await createTestApp({
      plugins: [markdownMathPlugin({ type: 'katex' })],
    })

    try {
      const html = app.markdown.render(String.raw`$\frac{}{$`, {})

      expect(html).toContain('class="katex-error"')
    } finally {
      app.cleanup()
    }
  })

  it('warns when a unicode character is used inside math mode', async () => {
    const app = await createTestApp({
      plugins: [markdownMathPlugin({ type: 'katex' })],
    })
    const { warn, restore } = mockLogger()

    try {
      app.markdown.render('$你$', {})

      expect(warn).toHaveBeenCalledWith(
        expect.stringContaining('unicode character'),
      )
    } finally {
      restore()
      app.cleanup()
    }
  })

  it('renders math with mathjax when it is selected', async () => {
    const app = await createTestApp({
      plugins: [markdownMathPlugin({ type: 'mathjax' })],
    })

    try {
      const inline = app.markdown.render('inline $a^2$ end', {})

      expect(inline).toContain('<mjx-container v-pre class="MathJax"')
      expect(inline).toContain('data-latex="a^2"')

      const block = app.markdown.render('$$\na^2\n$$', {})

      expect(block).toContain('display="true"')
    } finally {
      app.cleanup()
    }
  })
})
