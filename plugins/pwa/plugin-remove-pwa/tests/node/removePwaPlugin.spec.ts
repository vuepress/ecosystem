import { createTestApp } from '@vuepress/test-utils'
import { describe, expect, it } from 'vitest'
import { fs } from 'vuepress/utils'

import { removePwaPlugin } from '../../src/node/removePwaPlugin.js'
import { generateEmptyServiceWorker } from '../../src/node/serviceWorkerContent.js'

describe(generateEmptyServiceWorker, () => {
  it('should write a service worker that unregisters itself and clears the caches', async () => {
    const app = await createTestApp()

    await fs.ensureDir(app.dir.dest())
    await generateEmptyServiceWorker(app, 'service-worker.js', [])

    const content = await fs.readFile(
      app.dir.dest('service-worker.js'),
      'utf-8',
    )

    expect(content).toContain(`self.addEventListener('install'`)
    expect(content).toContain('await self.registration.unregister()')
    expect(content).toContain('self.caches.delete(name)')
    expect(content).toContain(
      'const cachePatterns = [].map((pattern) => new RegExp(pattern));',
    )

    app.cleanup()
  })

  it('should strip the leading slash of the service worker location', async () => {
    const app = await createTestApp()

    await fs.ensureDir(app.dir.dest())
    await generateEmptyServiceWorker(app, '/custom-name.js', [])

    await expect(fs.pathExists(app.dir.dest('custom-name.js'))).resolves.toBe(
      true,
    )

    app.cleanup()
  })

  it('should inline the cache patterns', async () => {
    const app = await createTestApp()

    await fs.ensureDir(app.dir.dest())
    await generateEmptyServiceWorker(app, 'service-worker.js', [
      'workbox',
      'v1',
    ])

    const content = await fs.readFile(
      app.dir.dest('service-worker.js'),
      'utf-8',
    )

    expect(content).toContain(
      'const cachePatterns = ["workbox","v1"].map((pattern) => new RegExp(pattern));',
    )

    app.cleanup()
  })
})

describe(removePwaPlugin, () => {
  it('should only expose the `onGenerated` hook', () => {
    const plugin = removePwaPlugin({})

    expect(plugin.name).toBe('@vuepress/plugin-remove-pwa')
    expect(Object.keys(plugin).sort()).toStrictEqual(['name', 'onGenerated'])
  })

  it('should write the empty service worker on generated', async () => {
    const app = await createTestApp()
    const plugin = removePwaPlugin({
      swLocation: 'custom-sw.js',
    })

    await fs.ensureDir(app.dir.dest())
    await plugin.onGenerated?.(app)

    const content = await fs.readFile(app.dir.dest('custom-sw.js'), 'utf-8')

    expect(content).toContain('await self.registration.unregister()')

    app.cleanup()
  })
})
