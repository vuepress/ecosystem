import { setTimeout as delay } from 'node:timers/promises'

import { createTestApp, createTestMarkdown } from '@vuepress/test-utils'
import { describe, expect, it, vi } from 'vitest'
import type { App } from 'vuepress/core'
import type { Markdown, MarkdownEnv } from 'vuepress/markdown'
import { fs } from 'vuepress/utils'

import { highlightCache } from '../../src/node/highlightCache.js'
import {
  renderCacheWithFilesystem,
  renderCacheWithMemory,
} from '../../src/node/renderCache.js'

const CACHE_DIR = 'markdown/rendered'

type RenderImpl = (input: string, env: MarkdownEnv) => void

// Create a markdown instance whose render calls the given implementation
const createCountedMarkdown = (
  render: RenderImpl,
  html = '<p>rendered</p>',
): Markdown =>
  ({
    render: (input: string, env: MarkdownEnv = {}): string => {
      render(input, env)
      return html
    },
  }) as unknown as Markdown

// Block the thread for `time` ms so that the render exceeds the I/O speed
const busyWait = (time: number): void => {
  const end = Date.now() + time

  while (Date.now() < end) {
    // wait
  }
}

describe(renderCacheWithMemory, () => {
  it('should reuse the cached render result for unchanged input', async () => {
    const app = await createTestApp()

    await fs.ensureDir(app.dir.cache(CACHE_DIR))
    // fake timers avoid the debounced cache write after the temp dir is removed
    vi.useFakeTimers()

    try {
      let calls = 0
      const md = createCountedMarkdown((input, env) => {
        calls += 1
        ;(env as Record<string, unknown>).fromFirstRender = true
      })

      await renderCacheWithMemory(md, app)

      expect(md.render('# a', { filePathRelative: 'a.md' })).toBe(
        '<p>rendered</p>',
      )
      expect(calls).toBe(1)

      // the same file path with the same input is served from the cache
      const nextEnv: MarkdownEnv = { filePathRelative: 'a.md' }

      expect(md.render('# a', nextEnv)).toBe('<p>rendered</p>')
      expect(calls).toBe(1)
      // the cached env is merged back into the new env
      expect((nextEnv as Record<string, unknown>).fromFirstRender).toBe(true)
    } finally {
      vi.useRealTimers()
      app.cleanup()
    }
  })

  it('should re-render when the input changed', async () => {
    const app = await createTestApp()

    await fs.ensureDir(app.dir.cache(CACHE_DIR))
    vi.useFakeTimers()

    try {
      let calls = 0
      const md = createCountedMarkdown(() => {
        calls += 1
      })

      await renderCacheWithMemory(md, app)

      md.render('# a', { filePathRelative: 'a.md' })
      md.render('# b', { filePathRelative: 'a.md' })

      expect(calls).toBe(2)
    } finally {
      vi.useRealTimers()
      app.cleanup()
    }
  })

  it('should not cache when the file path is unknown', async () => {
    const app = await createTestApp()

    await fs.ensureDir(app.dir.cache(CACHE_DIR))

    try {
      let calls = 0
      const md = createCountedMarkdown(() => {
        calls += 1
      })

      await renderCacheWithMemory(md, app)

      md.render('# a', {})
      md.render('# a', {})

      expect(calls).toBe(2)
    } finally {
      app.cleanup()
    }
  })

  it('should not wrap the render without a cache in build mode', async () => {
    const app = await createTestApp()

    try {
      const original = (): string => '<p>rendered</p>'
      const md = { render: original } as unknown as Markdown

      await renderCacheWithMemory(md, app)

      expect(md.render).toBe(original)
    } finally {
      app.cleanup()
    }
  })
})

describe(renderCacheWithFilesystem, () => {
  it('should reuse the cached render result on a later run', async () => {
    const app = await createTestApp()

    await fs.ensureDir(app.dir.cache(CACHE_DIR))

    try {
      let firstCalls = 0
      const firstMd = createCountedMarkdown(() => {
        firstCalls += 1
        busyWait(20)
      }, '<p>slow</p>')

      await renderCacheWithFilesystem(firstMd, app)

      expect(firstMd.render('# a', { filePathRelative: 'a.md' })).toBe(
        '<p>slow</p>',
      )
      expect(firstCalls).toBe(1)

      // the cache file is written asynchronously, and the metadata is written
      // after a debounce
      await delay(300)

      // a new run reads the metadata and the cached file from the disk
      let secondCalls = 0
      const secondMd = createCountedMarkdown(() => {
        secondCalls += 1
      })

      await renderCacheWithFilesystem(secondMd, app)

      expect(secondMd.render('# a', { filePathRelative: 'a.md' })).toBe(
        '<p>slow</p>',
      )
      expect(secondCalls).toBe(0)
    } finally {
      app.cleanup()
    }
  })

  it('should not wrap the render without a cache in build mode', async () => {
    const app = await createTestApp()

    try {
      const original = (): string => '<p>rendered</p>'
      const md = { render: original } as unknown as Markdown

      await renderCacheWithFilesystem(md, app)

      expect(md.render).toBe(original)
    } finally {
      app.cleanup()
    }
  })
})

describe(highlightCache, () => {
  it('should cache the highlight result in dev mode', () => {
    const md = createTestMarkdown()
    const app = { env: { isDev: true } } as App

    let calls = 0
    const highlight = (): string => {
      calls += 1
      return '<pre>highlighted</pre>'
    }

    md.options.highlight = highlight
    highlightCache(md, app)

    expect(md.options.highlight?.('code', 'ts', '')).toBe(
      '<pre>highlighted</pre>',
    )
    expect(md.options.highlight?.('code', 'ts', '')).toBe(
      '<pre>highlighted</pre>',
    )
    expect(calls).toBe(1)

    md.options.highlight?.('other', 'ts', '')
    expect(calls).toBe(2)
  })

  it('should keep the highlight untouched outside dev mode', async () => {
    const md = createTestMarkdown()
    const highlight = (): string => '<pre>highlighted</pre>'

    md.options.highlight = highlight

    const app = await createTestApp()

    try {
      highlightCache(md, app)

      expect(md.options.highlight).toBe(highlight)
    } finally {
      app.cleanup()
    }
  })
})
