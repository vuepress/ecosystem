import { attrs } from '@mdit/plugin-attrs'
import { createTestMarkdown } from '@vuepress/test-utils'
import { describe, expect, it } from 'vitest'
import type { Markdown } from 'vuepress/markdown'

import { hint } from '../../src/node/hint.js'

const locales = {
  '/': {
    important: 'Important',
    info: 'Info',
    note: 'Note',
    tip: 'Tips',
    warning: 'Warning',
    caution: 'Caution',
    details: 'Details',
  },
}

const createMarkdown = (): Markdown =>
  createTestMarkdown({ plugins: [(md): void => hint(md, locales)] })

describe('markdown-hint', () => {
  it('should render the container with the default title', () => {
    const html = createMarkdown().render('::: tip\n\nA tip.\n\n:::', {})

    expect(html).toContain(
      '<div class="hint-container tip">\n<p class="hint-container-title">Tips</p>',
    )
    expect(html).not.toContain('no-title')
  })

  it('should render the container with an inline custom title', () => {
    expect(
      createMarkdown().render('::: info **Check** this\n\nInfo.\n\n:::', {}),
    ).toContain(
      '<div class="hint-container info">\n<p class="hint-container-title"><strong>Check</strong> this</p>',
    )
  })

  it('should render the container without a title when {no-title} is used', () => {
    const html = createMarkdown().render(
      '::: warning {no-title}\n\nBe careful.\n\n:::',
      {},
    )

    expect(html).toContain('<div class="hint-container warning no-title">')
    expect(html).not.toContain('hint-container-title')
  })

  it('should ignore the custom title when {no-title} is used', () => {
    const html = createMarkdown().render(
      '::: tip Custom title {no-title}\n\nA tip.\n\n:::',
      {},
    )

    expect(html).toContain('<div class="hint-container tip no-title">')
    expect(html).not.toContain('Custom title')
  })

  it('should support {no-title} parsed as a token attribute by the attrs plugin', () => {
    const html = createTestMarkdown({
      plugins: [
        (md): void => {
          md.use(attrs)
        },
        (md): void => {
          hint(md, locales)
        },
      ],
    }).render('::: tip {no-title}\n\nA tip.\n\n:::', {})

    expect(html).toContain('<div class="hint-container tip no-title">')
    expect(html).not.toContain('hint-container-title')
  })

  it('should keep a {no-title} marker that is not at the end of the title', () => {
    const html = createMarkdown().render(
      '::: tip Use {no-title} to hide the title\n\nA tip.\n\n:::',
      {},
    )

    expect(html).toContain(
      '<p class="hint-container-title">Use {no-title} to hide the title</p>',
    )
    expect(html).not.toContain('no-title"')
  })

  it('should render danger without a title when {no-title} is used', () => {
    const html = createMarkdown().render(
      '::: danger {no-title}\n\nDanger.\n\n:::',
      {},
    )

    expect(html).toContain('<div class="hint-container caution no-title">')
    expect(html).not.toContain('hint-container-title')
  })

  it('should render the details summary even with a parsed no-title attribute', () => {
    const html = createTestMarkdown({
      plugins: [
        (md): void => {
          md.use(attrs)
        },
        (md): void => {
          hint(md, locales)
        },
      ],
    }).render('::: details {no-title}\n\nDetails content.\n\n:::', {})

    expect(html).toContain(
      '<details class="hint-container details"><summary>Details</summary>',
    )
  })

  it('should always render the summary of details', () => {
    const html = createMarkdown().render(
      '::: details {no-title}\n\nDetails content.\n\n:::',
      {},
    )

    expect(html).toContain(
      '<details class="hint-container details"><summary>Details</summary>',
    )
  })

  it('should render danger as a caution container', () => {
    const html = createMarkdown().render('::: danger\n\nDanger.\n\n:::', {})

    expect(html).toContain(
      '<div class="hint-container caution">\n<p class="hint-container-title">Caution</p>',
    )
  })
})
