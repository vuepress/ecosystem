import { createTestApp } from '@vuepress/test-utils'
import { describe, expect, it } from 'vitest'

import { markdownIncludePlugin } from '../../src/node/index.js'

describe('markdown include plugin', () => {
  it('includes a file with the comment syntax', async () => {
    const app = await createTestApp({
      plugins: [markdownIncludePlugin({})],
      files: {
        'index.md': '',
        'snippet.md': 'snippet content\n',
      },
    })

    try {
      const html = app.markdown.render('<!-- @include: snippet.md -->', {
        filePath: `${app.dir.source()}/index.md`,
        filePathRelative: 'index.md',
      })

      expect(html).toContain('snippet content')
    } finally {
      app.cleanup()
    }
  })

  it('does not resolve the plain syntax by default', async () => {
    const app = await createTestApp({
      plugins: [markdownIncludePlugin({})],
      files: {
        'index.md': '',
        'snippet.md': 'snippet content\n',
      },
    })

    try {
      const html = app.markdown.render('@include: snippet.md', {
        filePath: `${app.dir.source()}/index.md`,
        filePathRelative: 'index.md',
      })

      expect(html).toContain('@include: snippet.md')
      expect(html).not.toContain('snippet content')
    } finally {
      app.cleanup()
    }
  })

  it('resolves the plain syntax when useComment is disabled', async () => {
    const app = await createTestApp({
      plugins: [markdownIncludePlugin({ useComment: false })],
      files: {
        'index.md': '',
        'snippet.md': 'snippet content\n',
      },
    })

    try {
      const html = app.markdown.render('@include: snippet.md', {
        filePath: `${app.dir.source()}/index.md`,
        filePathRelative: 'index.md',
      })

      expect(html).toContain('snippet content')
    } finally {
      app.cleanup()
    }
  })

  it('includes only the requested line range', async () => {
    const app = await createTestApp({
      plugins: [markdownIncludePlugin({})],
      files: {
        'index.md': '',
        'snippet.md': 'line1\nline2\nline3\nline4\n',
      },
    })

    try {
      const html = app.markdown.render('<!-- @include: snippet.md{2-3} -->', {
        filePath: `${app.dir.source()}/index.md`,
        filePathRelative: 'index.md',
      })

      expect(html).toContain('line2')
      expect(html).toContain('line3')
      expect(html).not.toContain('line1')
      expect(html).not.toContain('line4')
    } finally {
      app.cleanup()
    }
  })

  it('includes only the content between the region markers', async () => {
    const app = await createTestApp({
      plugins: [markdownIncludePlugin({})],
      files: {
        'index.md': '',
        'snippet.md': [
          'before',
          '// #region my-region',
          'inside 1',
          'inside 2',
          '// #endregion my-region',
          'after',
          '',
        ].join('\n'),
      },
    })

    try {
      const html = app.markdown.render(
        '<!-- @include: snippet.md#my-region -->',
        {
          filePath: `${app.dir.source()}/index.md`,
          filePathRelative: 'index.md',
        },
      )

      expect(html).toContain('inside 1')
      expect(html).toContain('inside 2')
      expect(html).not.toContain('before')
      expect(html).not.toContain('after')
    } finally {
      app.cleanup()
    }
  })

  it('renders a "File not found" placeholder for a missing file', async () => {
    const app = await createTestApp({
      plugins: [markdownIncludePlugin({})],
      files: { 'index.md': '' },
    })

    try {
      const html = app.markdown.render('<!-- @include: missing.md -->', {
        filePath: `${app.dir.source()}/index.md`,
        filePathRelative: 'index.md',
      })

      expect(html).toContain('File not found')
    } finally {
      app.cleanup()
    }
  })

  it('does not include the nested file when deep is disabled', async () => {
    const app = await createTestApp({
      plugins: [markdownIncludePlugin({})],
      files: {
        'index.md': '',
        'snippet.md': 'nested content\n',
        'deep.md': 'deep content\n<!-- @include: snippet.md -->\n',
      },
    })

    try {
      const html = app.markdown.render('<!-- @include: deep.md -->', {
        filePath: `${app.dir.source()}/index.md`,
        filePathRelative: 'index.md',
      })

      expect(html).toContain('deep content')
      // the nested include stays as an html comment
      expect(html).toContain('<!-- @include: snippet.md -->')
      expect(html).not.toContain('nested content')
    } finally {
      app.cleanup()
    }
  })

  it('includes the nested file when deep is enabled', async () => {
    const app = await createTestApp({
      plugins: [markdownIncludePlugin({ deep: true })],
      files: {
        'index.md': '',
        'snippet.md': 'nested content\n',
        'deep.md': 'deep content\n<!-- @include: snippet.md -->\n',
      },
    })

    try {
      const html = app.markdown.render('<!-- @include: deep.md -->', {
        filePath: `${app.dir.source()}/index.md`,
        filePathRelative: 'index.md',
      })

      expect(html).toContain('deep content')
      expect(html).toContain('nested content')
    } finally {
      app.cleanup()
    }
  })

  it('registers the included files as page dependencies', async () => {
    const app = await createTestApp({
      plugins: [markdownIncludePlugin({})],
      files: {
        'index.md': '<!-- @include: snippet.md -->\n',
        'snippet.md': 'snippet content\n',
      },
      prepare: true,
    })

    try {
      const deps = app.pages.flatMap((page) => page.deps)

      expect(deps.some((dep) => dep.endsWith('snippet.md'))).toBe(true)
    } finally {
      app.cleanup()
    }
  })
})
