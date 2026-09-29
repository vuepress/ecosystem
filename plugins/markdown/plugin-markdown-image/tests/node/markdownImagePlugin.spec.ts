import { createTestApp } from '@vuepress/test-utils'
import { describe, expect, it } from 'vitest'

import { markdownImagePlugin } from '../../src/node/index.js'

describe('markdown image plugin', () => {
  it('keeps a plain image when no feature is enabled', async () => {
    const app = await createTestApp({
      plugins: [markdownImagePlugin({})],
    })

    try {
      expect(app.markdown.render('![alt](a.png)', {})).toContain(
        '<p><img src="a.png" alt="alt"></p>',
      )
    } finally {
      app.cleanup()
    }
  })

  it('renders a standalone image as a figure with a figcaption from the title', async () => {
    const app = await createTestApp({
      plugins: [markdownImagePlugin({ figure: true })],
    })

    try {
      const html = app.markdown.render('![alt](a.png "the title")', {})

      expect(html).toContain('<figure>')
      expect(html).toContain('<figcaption>the title</figcaption>')
      expect(html).toContain('tabindex="0"')
      expect(html).not.toContain('<p>')
    } finally {
      app.cleanup()
    }
  })

  it('enables native lazy loading', async () => {
    const app = await createTestApp({
      plugins: [markdownImagePlugin({ lazyload: true })],
    })

    try {
      expect(app.markdown.render('![alt](a.png)', {})).toContain(
        'loading="lazy"',
      )
    } finally {
      app.cleanup()
    }
  })

  it('marks light and dark only images and strips the marker from the src', async () => {
    const app = await createTestApp({
      plugins: [markdownImagePlugin({ mark: true })],
    })

    try {
      const light = app.markdown.render('![alt](a.png#light)', {})

      expect(light).toContain('data-mode="lightmode-only"')
      expect(light).toContain('src="a.png"')
      expect(light).not.toContain('#light')

      const dark = app.markdown.render('![alt](a.png#dark)', {})

      expect(dark).toContain('data-mode="darkmode-only"')
      expect(dark).toContain('src="a.png"')
    } finally {
      app.cleanup()
    }
  })

  it('parses the size from the image label', async () => {
    const app = await createTestApp({
      plugins: [markdownImagePlugin({ size: true })],
    })

    try {
      const html = app.markdown.render('![alt =100x200](a.png)', {})

      expect(html).toContain('width="100"')
      expect(html).toContain('height="200"')
      expect(html).toContain('alt="alt"')

      // percentage sizes are supported as well
      expect(app.markdown.render('![alt =30%x](a.png)', {})).toContain(
        'width="30%"',
      )

      // an all-zero size is invalid and stays in the alt text
      expect(app.markdown.render('![alt =0x0](a.png)', {})).toContain(
        'alt="alt =0x0"',
      )
    } finally {
      app.cleanup()
    }
  })

  it('parses the obsidian image size from the label', async () => {
    const app = await createTestApp({
      plugins: [markdownImagePlugin({ obsidianSize: true })],
    })

    try {
      const html = app.markdown.render('![alt|100x200](a.png)', {})

      expect(html).toContain('width="100"')
      expect(html).toContain('height="200"')
      expect(html).toContain('alt="alt"')
    } finally {
      app.cleanup()
    }
  })

  it('parses the legacy image size from the link destination', async () => {
    const app = await createTestApp({
      plugins: [
        // oxlint-disable-next-line typescript/no-deprecated
        markdownImagePlugin({ legacySize: true }),
      ],
    })

    try {
      const html = app.markdown.render('![alt](a.png =100x200)', {})

      expect(html).toContain('width="100"')
      expect(html).toContain('height="200"')
      expect(html).toContain('src="a.png"')
    } finally {
      app.cleanup()
    }
  })
})
