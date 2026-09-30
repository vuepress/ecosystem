import path from 'node:path'

import { createTestApp } from '@vuepress/test-utils'
import { describe, expect, it } from 'vitest'
import { fs } from 'vuepress/utils'

import { sitemapPlugin } from '../../src/node/sitemapPlugin.js'

describe(sitemapPlugin, () => {
  it('should not register any hook when `hostname` is missing', async () => {
    const app = await createTestApp()

    const plugin = sitemapPlugin({
      hostname: undefined as unknown as string,
    })(app)

    expect(plugin).toStrictEqual({ name: '@vuepress/plugin-sitemap' })

    app.cleanup()
  })

  it('should write the sitemap, the xsl and a new robots.txt on generated', async () => {
    const app = await createTestApp({ files: { 'README.md': '# Home' } })
    const plugin = sitemapPlugin({ hostname: 'example.com/' })(app)

    await fs.ensureDir(app.dir.dest())
    await plugin.onGenerated?.(app)

    const sitemap = await fs.readFile(app.dir.dest('sitemap.xml'), 'utf-8')
    const xsl = await fs.readFile(app.dir.dest('sitemap.xsl'), 'utf-8')
    const robots = await fs.readFile(app.dir.dest('robots.txt'), 'utf-8')

    // hostname is normalized to `https://...` without trailing slash
    expect(sitemap).toContain('<loc>https://example.com/</loc>')
    expect(xsl).toContain('<?xml')
    expect(robots).toBe('Sitemap: https://example.com/sitemap.xml\n')

    app.cleanup()
  })

  it('should keep a non-http hostname untouched', async () => {
    const app = await createTestApp({ files: { 'README.md': '# Home' } })
    const plugin = sitemapPlugin({ hostname: 'http://example.com/' })(app)

    await fs.ensureDir(app.dir.dest())
    await plugin.onGenerated?.(app)

    const sitemap = await fs.readFile(app.dir.dest('sitemap.xml'), 'utf-8')

    expect(sitemap).toContain('<loc>http://example.com/</loc>')

    app.cleanup()
  })

  it('should append the sitemap declaration to an existing robots.txt', async () => {
    const app = await createTestApp({ files: { 'README.md': '# Home' } })
    const plugin = sitemapPlugin({ hostname: 'https://example.com' })(app)

    await fs.ensureDir(app.dir.dest())
    await fs.writeFile(
      app.dir.dest('robots.txt'),
      'User-agent: *\nDisallow:\n',
      'utf-8',
    )
    await plugin.onGenerated?.(app)

    const robots = await fs.readFile(app.dir.dest('robots.txt'), 'utf-8')

    expect(robots).toBe(
      'User-agent: *\nDisallow:\n\nSitemap: https://example.com/sitemap.xml\n',
    )

    app.cleanup()
  })

  it('should replace an existing sitemap declaration in robots.txt', async () => {
    const app = await createTestApp({ files: { 'README.md': '# Home' } })
    const plugin = sitemapPlugin({ hostname: 'https://example.com' })(app)

    await fs.ensureDir(app.dir.dest())
    await fs.writeFile(
      app.dir.dest('robots.txt'),
      'User-agent: *\nSitemap: https://old.example.com/sitemap.xml\nDisallow:\n',
      'utf-8',
    )
    await plugin.onGenerated?.(app)

    const robots = await fs.readFile(app.dir.dest('robots.txt'), 'utf-8')

    // the declaration ends with a newline, so the replaced line keeps an extra
    // blank line before the following content
    expect(robots).toBe(
      'User-agent: *\nSitemap: https://example.com/sitemap.xml\n\nDisallow:\n',
    )

    app.cleanup()
  })

  it('should write the sitemap to the configured filenames', async () => {
    const app = await createTestApp({ files: { 'README.md': '# Home' } })
    const plugin = sitemapPlugin({
      hostname: 'https://example.com',
      sitemapFilename: 'map.xml',
      sitemapXSLFilename: 'map.xsl',
      sitemapXSLTemplate: '<!-- custom template -->',
    })(app)

    await fs.ensureDir(app.dir.dest())
    await plugin.onGenerated?.(app)

    await expect(
      fs.pathExists(path.join(app.dir.dest(), 'map.xml')),
    ).resolves.toBe(true)
    await expect(fs.readFile(app.dir.dest('map.xsl'), 'utf-8')).resolves.toBe(
      '<!-- custom template -->',
    )

    app.cleanup()
  })

  it('should expose the plugin hooks', async () => {
    const app = await createTestApp()
    const plugin = sitemapPlugin({ hostname: 'https://example.com' })(app)

    expect(plugin.name).toBe('@vuepress/plugin-sitemap')
    expect(plugin.onGenerated).toBeTypeOf('function')
    expect(plugin.extendsBundlerOptions).toBeTypeOf('function')

    app.cleanup()
  })
})
