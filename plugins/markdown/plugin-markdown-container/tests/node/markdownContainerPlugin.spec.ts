import { createTestApp, mockLogger } from '@vuepress/test-utils'
import { describe, expect, it } from 'vitest'

import type { MarkdownItContainerRenderFunction } from '../../src/node/index.js'
import { markdownContainerPlugin } from '../../src/node/index.js'

const renderSection: MarkdownItContainerRenderFunction = (
  tokens,
  index,
): string => (tokens[index].nesting === 1 ? '<section>' : '</section>')

describe('markdown container plugin', () => {
  it('renders a configured container as a custom-container div', async () => {
    const app = await createTestApp({
      plugins: [markdownContainerPlugin({ type: 'tip' })],
    })

    try {
      const html = app.markdown.render('::: tip\ncontent\n:::', {})

      expect(html).toContain('<div class="custom-container tip">')
      expect(html).toContain('<p>content</p>')
      expect(html).toContain('</div>')
    } finally {
      app.cleanup()
    }
  })

  it('renders the container title when it is given', async () => {
    const app = await createTestApp({
      plugins: [markdownContainerPlugin({ type: 'tip' })],
    })

    try {
      const html = app.markdown.render('::: tip Custom title\ncontent\n:::', {})

      expect(html).toContain(
        '<p class="custom-container-title">Custom title</p>',
      )
    } finally {
      app.cleanup()
    }
  })

  it('falls back to the uppercased type when the locale has no default info', async () => {
    const app = await createTestApp({
      plugins: [
        markdownContainerPlugin({
          type: 'tip',
          locales: { '/zh/': { defaultInfo: '提示' } },
        }),
      ],
    })

    try {
      expect(
        app.markdown.render('::: tip\ncontent\n:::', {
          filePathRelative: 'index.md',
        }),
      ).toContain('<p class="custom-container-title">TIP</p>')
    } finally {
      app.cleanup()
    }
  })

  it('falls back to the uppercased type when no locales are configured', async () => {
    const app = await createTestApp({
      plugins: [markdownContainerPlugin({ type: 'tip' })],
    })

    try {
      expect(app.markdown.render('::: tip\ncontent\n:::', {})).toContain(
        '<p class="custom-container-title">TIP</p>',
      )
    } finally {
      app.cleanup()
    }
  })

  it('resolves the default title from the matched locale', async () => {
    const app = await createTestApp({
      plugins: [
        markdownContainerPlugin({
          type: 'tip',
          locales: {
            '/': { defaultInfo: 'TIP' },
            '/zh/': { defaultInfo: '提示' },
          },
        }),
      ],
    })

    try {
      expect(
        app.markdown.render('::: tip\ncontent\n:::', {
          filePathRelative: 'zh/index.md',
        }),
      ).toContain('<p class="custom-container-title">提示</p>')

      expect(
        app.markdown.render('::: tip\ncontent\n:::', {
          filePathRelative: 'index.md',
        }),
      ).toContain('<p class="custom-container-title">TIP</p>')
    } finally {
      app.cleanup()
    }
  })

  it('keeps an unknown container as literal text', async () => {
    const app = await createTestApp({
      plugins: [markdownContainerPlugin({ type: 'tip' })],
    })

    try {
      const html = app.markdown.render('::: warning\ncontent\n:::', {})

      expect(html).toContain('::: warning')
      expect(html).not.toContain('custom-container')
    } finally {
      app.cleanup()
    }
  })

  it('uses the before and after render functions when both are given', async () => {
    const app = await createTestApp({
      plugins: [
        markdownContainerPlugin({
          type: 'tip',
          before: (info): string => `<div class="my-tip" data-info="${info}">`,
          after: (): string => '</div>',
        }),
      ],
    })

    try {
      const html = app.markdown.render('::: tip Title\ncontent\n:::', {})

      expect(html).toContain('<div class="my-tip" data-info="Title">')
      expect(html).toContain('<p>content</p>')
    } finally {
      app.cleanup()
    }
  })

  it('uses a custom render function when it is given', async () => {
    const app = await createTestApp({
      plugins: [
        markdownContainerPlugin({ type: 'tip', render: renderSection }),
      ],
    })

    try {
      const html = app.markdown.render('::: tip\ncontent\n:::', {})

      expect(html).toContain('<section><p>content</p>')
      expect(html).toContain('</section>')
      expect(html).not.toContain('custom-container')
    } finally {
      app.cleanup()
    }
  })

  it('warns and keeps the syntax literal when the type option is missing', async () => {
    const { warn, restore } = mockLogger()
    const app = await createTestApp({
      plugins: [markdownContainerPlugin({ type: '' })],
    })

    try {
      const html = app.markdown.render('::: tip\ncontent\n:::', {})

      expect(warn).toHaveBeenCalledWith(expect.stringContaining('type'))
      expect(html).toContain('::: tip')
    } finally {
      app.cleanup()
      restore()
    }
  })
})
