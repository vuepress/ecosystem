import path from 'node:path'

import { createTestApp } from '@vuepress/test-utils'
import { describe, expect, it } from 'vitest'
import { fs } from 'vuepress/utils'

import { autoFrontmatterPlugin } from '../../src/node/autoFrontmatterPlugin.js'
import {
  addCreateDate,
  addShortPermalink,
  addTitleByFilename,
} from '../../src/node/helper/index.js'
import type { AutoFrontmatterData } from '../../src/node/types.js'

const readSourceFile = (source: string, file: string): Promise<string> =>
  fs.readFile(path.join(source, file), 'utf-8')

describe(autoFrontmatterPlugin, () => {
  it('should generate the frontmatter from the filename and keep the content', async () => {
    const app = await createTestApp({
      files: { 'guide/alpha.md': '# Alpha' },
      plugins: [
        autoFrontmatterPlugin({
          filter: '**/*.md',
          handle: (data, context): AutoFrontmatterData => {
            addTitleByFilename(data, context)
            return data
          },
        }),
      ],
      prepare: true,
    })

    try {
      await expect(
        readSourceFile(app.dir.source(), 'guide/alpha.md'),
      ).resolves.toBe('---\ntitle: alpha\n---\n# Alpha')
    } finally {
      app.cleanup()
    }
  })

  it('should preserve existing frontmatter and not rewrite an unchanged file', async () => {
    const content = '---\ntitle: Beta Title\norder: 1\n---\n# Beta\n\nBeta body'

    const app = await createTestApp({
      files: { 'beta.md': content },
      plugins: [
        autoFrontmatterPlugin((data, context): AutoFrontmatterData => {
          addTitleByFilename(data, context)
          return data
        }),
      ],
      prepare: true,
    })

    try {
      await expect(readSourceFile(app.dir.source(), 'beta.md')).resolves.toBe(
        content,
      )
    } finally {
      app.cleanup()
    }
  })

  it('should skip files excluded by a negative pattern', async () => {
    const app = await createTestApp({
      files: {
        'index.md': '# Gamma Index',
        'guide/delta.md': '# Delta Guide',
      },
      plugins: [
        autoFrontmatterPlugin([
          {
            filter: ['**/*.md', '!guide/**'],
            handle: (data, context): AutoFrontmatterData => {
              addTitleByFilename(data, context)
              return data
            },
          },
        ]),
      ],
      prepare: true,
    })

    try {
      await expect(readSourceFile(app.dir.source(), 'index.md')).resolves.toBe(
        '---\ntitle: index\n---\n# Gamma Index',
      )
      // excluded by the negative pattern
      await expect(
        readSourceFile(app.dir.source(), 'guide/delta.md'),
      ).resolves.toBe('# Delta Guide')
    } finally {
      app.cleanup()
    }
  })

  it('should use the first matching rule', async () => {
    const app = await createTestApp({
      files: { 'epsilon.md': '# Epsilon' },
      plugins: [
        autoFrontmatterPlugin([
          {
            filter: '**/*.md',
            handle: (data): AutoFrontmatterData => {
              data.title = 'first'
              return data
            },
          },
          {
            filter: '**/*.md',
            handle: (data): AutoFrontmatterData => {
              data.title = 'second'
              return data
            },
          },
        ]),
      ],
      prepare: true,
    })

    try {
      await expect(
        readSourceFile(app.dir.source(), 'epsilon.md'),
      ).resolves.toBe('---\ntitle: first\n---\n# Epsilon')
    } finally {
      app.cleanup()
    }
  })

  it('should support a function filter', async () => {
    const app = await createTestApp({
      files: {
        'blog/zeta.md': '# Zeta',
        'eta.md': '# Eta',
      },
      plugins: [
        autoFrontmatterPlugin({
          filter: (relativePath): boolean => relativePath.startsWith('blog/'),
          handle: (data): AutoFrontmatterData => {
            data.permalink = '/post/'
            return data
          },
        }),
      ],
      prepare: true,
    })

    try {
      await expect(
        readSourceFile(app.dir.source(), 'blog/zeta.md'),
      ).resolves.toBe('---\npermalink: /post/\n---\n# Zeta')
      await expect(readSourceFile(app.dir.source(), 'eta.md')).resolves.toBe(
        '# Eta',
      )
    } finally {
      app.cleanup()
    }
  })

  it('should generate the frontmatter independently for files with the same body', async () => {
    const app = await createTestApp({
      files: {
        'one.md': '# Same body',
        'two.md': '# Same body',
      },
      plugins: [
        autoFrontmatterPlugin((data, context): AutoFrontmatterData => {
          addTitleByFilename(data, context)
          return data
        }),
      ],
      prepare: true,
    })

    try {
      await expect(readSourceFile(app.dir.source(), 'one.md')).resolves.toBe(
        '---\ntitle: one\n---\n# Same body',
      )
      await expect(readSourceFile(app.dir.source(), 'two.md')).resolves.toBe(
        '---\ntitle: two\n---\n# Same body',
      )
    } finally {
      app.cleanup()
    }
  })

  it('should generate a short permalink with the configured format', async () => {
    const app = await createTestApp({
      files: { 'theta.md': '# Theta' },
      plugins: [
        autoFrontmatterPlugin((data): AutoFrontmatterData => {
          addShortPermalink(data, { prefix: '/posts/', suffix: '.html' })
          return data
        }),
      ],
      prepare: true,
    })

    try {
      await expect(
        readSourceFile(app.dir.source(), 'theta.md'),
      ).resolves.toMatch(
        /^---\npermalink: \/posts\/[a-z0-9]{8}\.html\n---\n# Theta$/u,
      )
    } finally {
      app.cleanup()
    }
  })

  it('should keep an existing permalink', async () => {
    const content = '---\npermalink: /custom.html\n---\n# Iota'

    const app = await createTestApp({
      files: { 'iota.md': content },
      plugins: [
        autoFrontmatterPlugin((data): AutoFrontmatterData => {
          addShortPermalink(data)
          return data
        }),
      ],
      prepare: true,
    })

    try {
      await expect(readSourceFile(app.dir.source(), 'iota.md')).resolves.toBe(
        content,
      )
    } finally {
      app.cleanup()
    }
  })

  it('should add a formatted create date and keep an existing one', async () => {
    const app = await createTestApp({
      files: {
        'kappa.md': '# Kappa',
        'lambda.md': '---\ncreateTime: 2020-01-01 00:00:00\n---\n# Lambda',
      },
      plugins: [
        autoFrontmatterPlugin((data, context): AutoFrontmatterData => {
          addCreateDate(data, context, { key: 'createTime', format: 'full' })
          return data
        }),
      ],
      prepare: true,
    })

    try {
      await expect(
        readSourceFile(app.dir.source(), 'kappa.md'),
      ).resolves.toMatch(
        /^---\ncreateTime: '?\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}'?\n---\n# Kappa$/u,
      )
      await expect(readSourceFile(app.dir.source(), 'lambda.md')).resolves.toBe(
        '---\ncreateTime: 2020-01-01 00:00:00\n---\n# Lambda',
      )
    } finally {
      app.cleanup()
    }
  })
})
