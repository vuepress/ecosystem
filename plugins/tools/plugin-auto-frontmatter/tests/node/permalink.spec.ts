import path from 'node:path'

import { createTestApp } from '@vuepress/test-utils'
import { describe, expect, it } from 'vitest'
import { fs } from 'vuepress/utils'

import { autoFrontmatterPlugin } from '../../src/node/autoFrontmatterPlugin.js'
import { generateFileListFrontmatter } from '../../src/node/generateFrontmatter.js'
import {
  createPermalink,
  isPermalinkHandle,
} from '../../src/node/helper/addPermalink.js'
import type {
  AutoFrontmatterContext,
  AutoFrontmatterData,
} from '../../src/node/types.js'

const readSourceFile = (source: string, file: string): Promise<string> =>
  fs.readFile(path.join(source, file), 'utf-8')

const getPermalink = (content: string): string =>
  /^permalink: (?<permalink>.+)$/mu.exec(content)!.groups!.permalink

const createContext = (
  relativePath: string,
  content: string,
): AutoFrontmatterContext => ({
  filepath: `/tmp/${relativePath}`,
  relativePath,
  content,
})

describe(createPermalink, () => {
  it('should derive a deterministic value from a checksum of the seed', () => {
    const context = createContext('a.md', '123456789')
    const options = { source: 'content', length: 0, suffix: '' } as const

    const crc16Data: AutoFrontmatterData = {}
    createPermalink({ ...options, algorithm: 'crc16' })(crc16Data, context)
    // CRC-16/XMODEM of "123456789"
    expect(crc16Data.permalink).toBe('/31c3')

    const crc32Data: AutoFrontmatterData = {}
    createPermalink({ ...options, algorithm: 'crc32' })(crc32Data, context)
    // CRC-32/ISO-HDLC of "123456789"
    expect(crc32Data.permalink).toBe('/cbf43926')
  })

  it('should support dec encoding', () => {
    const data: AutoFrontmatterData = {}
    createPermalink({
      algorithm: 'crc32',
      encoding: 'dec',
      source: 'content',
      length: 0,
      suffix: '',
    })(data, createContext('a.md', '123456789'))

    expect(data.permalink).toBe('/3421780262')
  })

  it('should truncate the value to the given length', () => {
    const data: AutoFrontmatterData = {}
    createPermalink({
      algorithm: 'crc32',
      source: 'content',
      length: 4,
      suffix: '',
    })(data, createContext('a.md', '123456789'))

    expect(data.permalink).toBe('/cbf4')
  })

  it('should support the crypto algorithms', () => {
    const data: AutoFrontmatterData = {}
    createPermalink({
      algorithm: 'sha256',
      source: 'content',
      length: 0,
      suffix: '',
    })(data, createContext('a.md', '123456789'))

    expect(data.permalink).toBe(
      '/15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225',
    )
  })

  it('should generate a random value with the nanoid algorithm', () => {
    const data: AutoFrontmatterData = {}
    createPermalink({ algorithm: 'nanoid', length: 6 })(
      data,
      createContext('a.md', ''),
    )

    expect(data.permalink).toMatch(/^\/[a-z0-9]{6}\.html$/u)
  })

  it('should use the relative path as the seed by default', () => {
    const options = { algorithm: 'crc32', length: 0, suffix: '' } as const

    const fromPath: AutoFrontmatterData = {}
    createPermalink(options)(fromPath, createContext('posts/a.md', 'foo'))

    const fromSamePath: AutoFrontmatterData = {}
    createPermalink(options)(fromSamePath, createContext('posts/a.md', 'bar'))

    // the content does not matter, the permalink stays the same
    expect(fromSamePath.permalink).toBe(fromPath.permalink)

    const fromOtherPath: AutoFrontmatterData = {}
    createPermalink(options)(fromOtherPath, createContext('posts/b.md', 'foo'))

    expect(fromOtherPath.permalink).not.toBe(fromPath.permalink)
  })

  it('should keep an existing permalink', () => {
    const data: AutoFrontmatterData = { permalink: '/custom.html' }
    createPermalink()(data, createContext('a.md', 'foo'))

    expect(data.permalink).toBe('/custom.html')
  })

  it('should respect `permalink: null`', () => {
    const data: AutoFrontmatterData = { permalink: null }
    createPermalink()(data, createContext('a.md', 'foo'))

    expect(data.permalink).toBeNull()
  })

  it('should overwrite an existing permalink when force is enabled', () => {
    const data: AutoFrontmatterData = { permalink: '/custom.html' }
    createPermalink({
      algorithm: 'crc16',
      source: 'content',
      length: 0,
      suffix: '',
      force: true,
    })(data, createContext('a.md', '123456789'))

    expect(data.permalink).toBe('/31c3')
  })

  it('should resolve conflicts deterministically', () => {
    const context = createContext('a.md', '123456789')
    const options = {
      algorithm: 'crc16',
      source: 'content',
      length: 0,
      suffix: '',
      reserved: ['/31c3'],
    } as const

    const first: AutoFrontmatterData = {}
    createPermalink(options)(first, context)
    expect(first.permalink).not.toBe('/31c3')

    // the salted value is stable
    const second: AutoFrontmatterData = {}
    createPermalink(options)(second, context)
    expect(second.permalink).toBe(first.permalink)
  })

  it('should support reserving permalinks after creation', () => {
    const handle = createPermalink({
      algorithm: 'crc16',
      source: 'content',
      length: 0,
      suffix: '',
    })

    expect(isPermalinkHandle(handle)).toBe(true)

    handle.reserve(['/31c3'])

    const data: AutoFrontmatterData = {}
    handle(data, createContext('a.md', '123456789'))

    expect(data.permalink).not.toBe('/31c3')
  })

  it('should not use a permalink that already exists in the frontmatter', async () => {
    const app = await createTestApp({
      files: {
        'a.md': '---\npermalink: /31c3\n---\n# A',
        'b.md': '123456789',
      },
      plugins: [
        autoFrontmatterPlugin({
          filter: '**/*.md',
          handle: createPermalink({
            algorithm: 'crc16',
            source: 'content',
            length: 0,
            suffix: '',
          }),
        }),
      ],
      prepare: true,
    })

    try {
      // the hand written permalink is kept
      await expect(readSourceFile(app.dir.source(), 'a.md')).resolves.toBe(
        '---\npermalink: /31c3\n---\n# A',
      )

      const result = await readSourceFile(app.dir.source(), 'b.md')
      expect(getPermalink(result)).not.toBe('/31c3')
    } finally {
      app.cleanup()
    }
  })

  it('should give a different permalink to every file', async () => {
    const app = await createTestApp({
      files: {
        'a.md': '# A',
        'b.md': '# B',
        'c.md': '# C',
      },
      plugins: [
        autoFrontmatterPlugin({
          filter: '**/*.md',
          handle: createPermalink(),
        }),
      ],
      prepare: true,
    })

    try {
      const permaLinks = await Promise.all(
        ['a.md', 'b.md', 'c.md'].map(async (file) =>
          getPermalink(await readSourceFile(app.dir.source(), file)),
        ),
      )

      expect(new Set(permaLinks).size).toBe(3)

      for (const permaLink of permaLinks)
        expect(permaLink).toMatch(/^\/[0-9a-f]{8}\.html$/u)
    } finally {
      app.cleanup()
    }
  })

  it('should keep the other entries, comments and order untouched', async () => {
    const app = await createTestApp({
      files: {
        'x.md': '---\n# a comment\ntitle: Hello\ncustom: 1\n---\n# Body',
      },
      plugins: [
        autoFrontmatterPlugin({
          filter: '**/*.md',
          handle: createPermalink(),
        }),
      ],
      prepare: true,
    })

    try {
      await expect(readSourceFile(app.dir.source(), 'x.md')).resolves.toMatch(
        /^---\n# a comment\ntitle: Hello\ncustom: 1\npermalink: \/[0-9a-f]{8}\.html\n---\n# Body$/u,
      )
    } finally {
      app.cleanup()
    }
  })

  it('should keep CRLF line endings', async () => {
    const app = await createTestApp({
      files: {
        'crlf.md': '---\r\ntitle: CRLF\r\n---\r\n# Body',
      },
      plugins: [
        autoFrontmatterPlugin({
          filter: '**/*.md',
          handle: createPermalink(),
        }),
      ],
      prepare: true,
    })

    try {
      await expect(
        readSourceFile(app.dir.source(), 'crlf.md'),
      ).resolves.toMatch(
        /^---\r\ntitle: CRLF\r\npermalink: \/[0-9a-f]{8}\.html\r\n---\r\n# Body$/u,
      )
    } finally {
      app.cleanup()
    }
  })

  it('should generate the same permalink on a new run', async () => {
    const run = async (): Promise<string> => {
      const app = await createTestApp({
        files: { 'posts/hello.md': '# Hello' },
        plugins: [
          autoFrontmatterPlugin({
            filter: '**/*.md',
            handle: createPermalink({ source: 'content' }),
          }),
        ],
        prepare: true,
      })

      try {
        return await readSourceFile(app.dir.source(), 'posts/hello.md')
      } finally {
        app.cleanup()
      }
    }

    await expect(run()).resolves.toBe(await run())
  })

  it('should keep an unquoted date, comments and flow collections untouched', async () => {
    const app = await createTestApp({
      files: {
        'post.md':
          '---\n# Front matter comment\ntitle: Hello\ndate: 2025-01-02\ntags: [a, b]\n---\n# Body',
      },
      plugins: [
        autoFrontmatterPlugin({
          filter: '**/*.md',
          handle: createPermalink(),
        }),
      ],
      prepare: true,
    })

    try {
      // `date` must stay a plain date, `tags` must stay a flow collection and
      // the comment must survive, only the permalink is added
      await expect(
        readSourceFile(app.dir.source(), 'post.md'),
      ).resolves.toMatch(
        /^---\n# Front matter comment\ntitle: Hello\ndate: 2025-01-02\ntags: \[a, b\]\npermalink: \/[0-9a-f]{8}\.html\n---\n# Body$/u,
      )
    } finally {
      app.cleanup()
    }
  })

  it('should keep CRLF line endings with an unquoted date', async () => {
    const app = await createTestApp({
      files: {
        'crlf-date.md':
          '---\r\n# comment\r\ndate: 2025-01-02\r\ntitle: CRLF\r\n---\r\n# Body',
      },
      plugins: [
        autoFrontmatterPlugin({
          filter: '**/*.md',
          handle: createPermalink(),
        }),
      ],
      prepare: true,
    })

    try {
      await expect(
        readSourceFile(app.dir.source(), 'crlf-date.md'),
      ).resolves.toMatch(
        /^---\r\n# comment\r\ndate: 2025-01-02\r\ntitle: CRLF\r\npermalink: \/[0-9a-f]{8}\.html\r\n---\r\n# Body$/u,
      )
    } finally {
      app.cleanup()
    }
  })

  it('should keep a comment that documents a rewritten entry', async () => {
    const app = await createTestApp({
      files: {
        'commented.md': '---\ntitle: Hello\n# keep me\nauthor: Me\n---\n# Body',
      },
      plugins: [
        autoFrontmatterPlugin({
          filter: '**/*.md',
          handle: (data): AutoFrontmatterData => {
            data.title = 'World'
            return data
          },
        }),
      ],
      prepare: true,
    })

    try {
      await expect(
        readSourceFile(app.dir.source(), 'commented.md'),
      ).resolves.toBe('---\ntitle: World\n# keep me\nauthor: Me\n---\n# Body')
    } finally {
      app.cleanup()
    }
  })

  it('should keep a key that contains a hash', async () => {
    const app = await createTestApp({
      files: {
        'hash-key.md': '---\na#b: 1\ntitle: Hello\ntags: [a, b]\n---\n# Body',
      },
      plugins: [
        autoFrontmatterPlugin({
          filter: '**/*.md',
          handle: (data): AutoFrontmatterData => {
            data.title = 'World'
            return data
          },
        }),
      ],
      prepare: true,
    })

    try {
      // the flow collection would be reflowed by the whole file fallback
      await expect(
        readSourceFile(app.dir.source(), 'hash-key.md'),
      ).resolves.toBe('---\na#b: 1\ntitle: World\ntags: [a, b]\n---\n# Body')
    } finally {
      app.cleanup()
    }
  })

  it('should keep the comments of a removed entry', async () => {
    const app = await createTestApp({
      files: {
        'removed.md': '---\ntitle: Hello\n# keep me\nremove: 1\n---\n# Body',
      },
      plugins: [
        autoFrontmatterPlugin({
          filter: '**/*.md',
          handle: (data): AutoFrontmatterData => {
            delete data.remove
            return data
          },
        }),
      ],
      prepare: true,
    })

    try {
      await expect(
        readSourceFile(app.dir.source(), 'removed.md'),
      ).resolves.toBe('---\ntitle: Hello\n# keep me\n---\n# Body')
    } finally {
      app.cleanup()
    }
  })

  it('should keep the trailing comments at the end', async () => {
    const app = await createTestApp({
      files: {
        'trailing.md': '---\ntitle: Hello\n# end of file\n---\n# Body',
      },
      plugins: [
        autoFrontmatterPlugin({
          filter: '**/*.md',
          handle: createPermalink(),
        }),
      ],
      prepare: true,
    })

    try {
      await expect(
        readSourceFile(app.dir.source(), 'trailing.md'),
      ).resolves.toMatch(
        /^---\ntitle: Hello\npermalink: \/[0-9a-f]{8}\.html\n# end of file\n---\n# Body$/u,
      )
    } finally {
      app.cleanup()
    }
  })

  it('should fall back to 8 characters for an invalid length', () => {
    const data: AutoFrontmatterData = {}
    createPermalink({ length: -1 })(data, createContext('a.md', 'foo'))

    expect(data.permalink).toMatch(/^\/[0-9a-f]{8}\.html$/u)
  })

  it('should normalize the prefix', () => {
    const data: AutoFrontmatterData = {}
    createPermalink({ prefix: 'posts' })(data, createContext('a.md', 'foo'))

    expect(data.permalink).toMatch(/^\/posts\/[0-9a-f]{8}\.html$/u)
  })

  it('should keep the permalinks stable when regenerating', async () => {
    const files = ['a.md', 'b.md', 'c.md', 'd.md', 'e.md', 'f.md']

    const app = await createTestApp({
      files: Object.fromEntries(files.map((file) => [file, `# ${file}`])),
      plugins: [
        autoFrontmatterPlugin({
          filter: '**/*.md',
          // `crc16` only has 65536 values, so conflicts are likely
          handle: createPermalink({ algorithm: 'crc16', source: 'path' }),
        }),
      ],
      prepare: true,
    })

    try {
      const source = app.dir.source()
      const readAll = (): Promise<string[]> =>
        Promise.all(files.map((file) => readSourceFile(source, file)))

      const first = await readAll()

      // regenerating must not churn the permalinks
      await generateFileListFrontmatter(files, source, [
        {
          filter: '**/*.md',
          handle: createPermalink({ algorithm: 'crc16', source: 'path' }),
        },
      ])

      await expect(readAll()).resolves.toStrictEqual(first)
      expect(new Set(first.map((content) => getPermalink(content))).size).toBe(
        files.length,
      )
    } finally {
      app.cleanup()
    }
  })
})
