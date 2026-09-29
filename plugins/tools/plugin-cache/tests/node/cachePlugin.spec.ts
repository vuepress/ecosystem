import { tmpdir } from 'node:os'
import path from 'node:path'
import { setTimeout as delay } from 'node:timers/promises'

import { createTestApp } from '@vuepress/test-utils'
import { describe, expect, it } from 'vitest'
import type { PluginObject } from 'vuepress/core'
import { fs } from 'vuepress/utils'

import { cachePlugin } from '../../src/node/cachePlugin.js'

describe(cachePlugin, () => {
  it('should expose the markdown hook', () => {
    const plugin = cachePlugin() as PluginObject

    expect(plugin.name).toBe('@vuepress/plugin-cache')
    expect(plugin.extendsMarkdown).toBeTypeOf('function')
  })

  it('should cache the render result of the app markdown', async () => {
    const source = await fs.mkdtemp(path.join(tmpdir(), 'vuepress-cache-'))

    // the memory cache is only used when the cache directory already exists
    await fs.ensureDir(path.join(source, '.vuepress/.cache/markdown/rendered'))

    const app = await createTestApp({ plugins: [cachePlugin()], source })

    try {
      await app.prepare()

      const rendered = app.markdown.render('# hi', { filePathRelative: 'a.md' })

      expect(rendered).toContain('>hi</span>')

      const cacheFile = app.dir.cache('markdown/rendered/_cache.json')

      // the cache is written after a debounce
      await delay(300)

      await expect(fs.pathExists(cacheFile)).resolves.toBe(true)

      const cache = (await fs.readJSON(cacheFile)) as Record<
        string,
        { content: string }
      >

      expect(Object.keys(cache)).toContain('a.md')
      expect(cache['a.md'].content).toBe(rendered)
    } finally {
      app.cleanup()
      await fs.remove(source)
    }
  })
})
