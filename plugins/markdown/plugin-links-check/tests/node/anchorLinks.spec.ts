import MarkdownIt from 'markdown-it'
import { describe, expect, it } from 'vitest'
import type { MarkdownEnv } from 'vuepress/markdown'

import { anchorLinksPlugin } from '../../src/node/anchorLinks.js'

const createMarkdownIt = (): MarkdownIt => {
  const md = new MarkdownIt({ html: true })

  md.use(anchorLinksPlugin)

  // Simulate the ids added by the plugins that generate them
  md.core.ruler.push('test-anchors', (state) => {
    for (const token of state.tokens)
      if (token.type === 'heading_open') token.attrSet('id', `id-${token.tag}`)
  })

  return md
}

describe(anchorLinksPlugin, () => {
  it('should collect anchors and anchor links', () => {
    const env: MarkdownEnv = {}

    createMarkdownIt().render(
      `\
# Title

See [anchor](#id-h1) and [broken](#missing).

See also [page](./b.md#id-h1) and [external](https://example.com#id-h1).
`,
      env,
    )

    expect(env.markdownAnchors).toStrictEqual(['id-h1'])
    expect(env.markdownAnchorLinks).toStrictEqual(['#id-h1', '#missing'])
  })

  it('should always initialize the env keys', () => {
    const env: MarkdownEnv = {}

    createMarkdownIt().render('plain text', env)

    expect(env.markdownAnchors).toStrictEqual([])
    expect(env.markdownAnchorLinks).toStrictEqual([])
  })

  it('should keep the anchors published by other plugins', () => {
    const env: MarkdownEnv = { markdownAnchors: ['field-a'] }

    createMarkdownIt().render('# Title', env)

    expect(env.markdownAnchors).toStrictEqual(['field-a', 'id-h1'])
  })

  it('should collect ids in raw html', () => {
    const env: MarkdownEnv = {}

    createMarkdownIt().render('<div id="raw-html"></div>', env)

    expect(env.markdownAnchors).toStrictEqual(['raw-html'])
  })

  it('should not collect ids inside code blocks', () => {
    const env: MarkdownEnv = {}

    createMarkdownIt().render('```html\n<div id="fake"></div>\n```', env)

    expect(env.markdownAnchors).toStrictEqual([])
  })
})
