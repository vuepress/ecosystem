import MarkdownIt from 'markdown-it'
import { describe, expect, it } from 'vitest'
import { inlineCodePlugin } from '../src/node/index.js'

describe('@vuepress/plugin-prismjs > inlineCodePlugin', () => {
  it('should enabled inline v-pre', () => {
    const md = MarkdownIt().use(inlineCodePlugin, true)
    expect(md.render('`a`')).toBe('<p><code v-pre>a</code></p>\n')
  })

  it('should disabled inline v-pre', () => {
    const md = MarkdownIt().use(inlineCodePlugin, false)
    expect(md.render('`a`')).toBe('<p><code>a</code></p>\n')
  })
})
