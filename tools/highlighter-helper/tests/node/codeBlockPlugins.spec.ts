import {
  codeBlockTitle,
  collapsedLines,
  lineNumbers,
} from '@vuepress/highlighter-helper'
import { createTestMarkdown } from '@vuepress/test-utils'
import { describe, expect, it } from 'vitest'
import type { Markdown } from 'vuepress/markdown'

/**
 * Create a markdown instance whose fence renderer wraps the code in a language
 * div, which is the shape produced by the syntax highlighter plugins.
 *
 * 创建一个 fence 渲染器会把代码包裹在 language div 中的 markdown 实例，这与语法高亮插件产出的结构一致。
 *
 * @returns A markdown-it instance with a highlighter-like fence renderer /
 *   带有类高亮器 fence 渲染器的 markdown-it 实例
 */
const createHighlighterMarkdown = (): Markdown => {
  const md = createTestMarkdown()

  md.renderer.rules.fence = (tokens, index): string => {
    const token = tokens[index]
    const lang = token.info.trim().split(/\s+/u)[0] || 'text'

    return `<div class="language-${lang}"><pre><code class="language-${lang}">${md.utils.escapeHtml(token.content)}</code></pre></div>`
  }

  return md
}

const resolveSkipLine = (info: string): boolean | undefined =>
  info.includes('skip') ? false : undefined

describe(codeBlockTitle, () => {
  it('wraps a titled code block with a title bar', () => {
    const md = createTestMarkdown()

    md.use(codeBlockTitle)

    const html = md.render('```js title="a.js"\nconst a = 1\n```', {})

    expect(html).toContain('class="code-block-with-title"')
    expect(html).toContain('data-title="a.js"')
    expect(html).toContain('<span>a.js</span>')
  })

  it('leaves a code block without a title untouched', () => {
    const md = createTestMarkdown()

    md.use(codeBlockTitle)

    const html = md.render('```js\nconst a = 1\n```', {})

    expect(html).not.toContain('code-block-with-title')
    expect(html).not.toContain('code-block-title-bar')
  })

  it('does nothing when the option is disabled', () => {
    const md = createTestMarkdown()

    md.use(codeBlockTitle, { codeBlockTitle: false })

    const html = md.render('```js title="a.js"\nconst a = 1\n```', {})

    expect(html).not.toContain('code-block-with-title')
  })

  it('uses a custom title render function', () => {
    const md = createTestMarkdown()

    md.use(codeBlockTitle, {
      codeBlockTitle: (title): string => `<header>${title}</header>`,
    })

    const html = md.render('```js title="a.js"\nconst a = 1\n```', {})

    expect(html).toContain('<header>a.js</header>')
    expect(html).not.toContain('code-block-with-title')
  })
})

describe(lineNumbers, () => {
  it('adds a line numbers wrapper to every code block by default', () => {
    const md = createHighlighterMarkdown()

    md.use(lineNumbers)

    const html = md.render('```js\nconst a = 1\nconst b = 2\n```', {})

    expect(html).toContain('line-numbers-mode')
    expect(html).toContain('<div class="line-numbers" aria-hidden="true"')
    expect(html).toContain('counter-reset:line-number 0')
    expect(html).toContain('<div class="line-number"></div>')
  })

  it('starts the counter from the value of the mark', () => {
    const md = createHighlighterMarkdown()

    md.use(lineNumbers)

    const html = md.render('```js :line-numbers=10\nconst a = 1\n```', {})

    expect(html).toContain('counter-reset:line-number 9')
  })

  it('skips a code block marked with no-line-numbers', () => {
    const md = createHighlighterMarkdown()

    md.use(lineNumbers)

    const html = md.render('```js :no-line-numbers\nconst a = 1\n```', {})

    expect(html).not.toContain('line-numbers-mode')
  })

  it('does nothing when the option is disabled', () => {
    const md = createHighlighterMarkdown()

    md.use(lineNumbers, { lineNumbers: false })

    const html = md.render('```js\nconst a = 1\n```', {})

    expect(html).not.toContain('line-numbers-mode')
  })

  it('completely disables line numbers when the option is `disable`', () => {
    const md = createHighlighterMarkdown()

    md.use(lineNumbers, { lineNumbers: 'disable' })

    // even a code block that explicitly asks for line numbers is left untouched
    const html = md.render('```js :line-numbers\nconst a = 1\n```', {})

    expect(html).not.toContain('line-numbers-mode')
    expect(html).not.toContain('line-numbers')
  })

  it('honors a custom resolve function', () => {
    const md = createHighlighterMarkdown()

    md.use(lineNumbers, {
      lineNumbers: true,
      resolveLineNumbers: resolveSkipLine,
    })

    expect(md.render('```js skip\nconst a = 1\n```', {})).not.toContain(
      'line-numbers-mode',
    )
    expect(md.render('```js\nconst a = 1\n```', {})).toContain(
      'line-numbers-mode',
    )
  })
})

describe(collapsedLines, () => {
  it('collapses a code block that reaches the threshold', () => {
    const md = createHighlighterMarkdown()

    md.use(collapsedLines, { collapsedLines: 2 })

    const html = md.render(
      '```js\nconst a = 1\nconst b = 2\nconst c = 3\n```',
      {},
    )

    expect(html).toContain('has-collapsed-lines collapsed')
    expect(html).toContain('--vp-collapsed-lines:2;')
    expect(html).toContain('<div class="collapsed-lines"></div>')
  })

  it('leaves a short code block untouched', () => {
    const md = createHighlighterMarkdown()

    md.use(collapsedLines, { collapsedLines: 20 })

    const html = md.render('```js\nconst a = 1\n```', {})

    expect(html).not.toContain('has-collapsed-lines')
  })

  it('uses the threshold from the mark', () => {
    const md = createHighlighterMarkdown()

    md.use(collapsedLines, { collapsedLines: true })

    const html = md.render('```js :collapsed-lines=2\nconst a = 1\n```', {})

    expect(html).toContain('--vp-collapsed-lines:2;')
  })

  it('skips a code block marked with no-collapsed-lines', () => {
    const md = createHighlighterMarkdown()

    md.use(collapsedLines, { collapsedLines: 2 })

    const html = md.render(
      '```js :no-collapsed-lines\nconst a = 1\nconst b = 2\nconst c = 3\n```',
      {},
    )

    expect(html).not.toContain('has-collapsed-lines')
  })

  it('does nothing when the option is disabled', () => {
    const md = createHighlighterMarkdown()

    md.use(collapsedLines, { collapsedLines: 'disable' })

    const html = md.render(
      '```js\nconst a = 1\nconst b = 2\nconst c = 3\n```',
      {},
    )

    expect(html).not.toContain('has-collapsed-lines')
  })
})
