import { createTestApp } from '@vuepress/test-utils'
import { describe, expect, it } from 'vitest'

import { getSitemapInfos } from '../../src/node/getInfo.js'
import { getSiteMap } from '../../src/node/getSitemap.js'

const HOSTNAME = 'https://example.com'

describe(getSiteMap, () => {
  it('should generate sitemap entries with `loc` from hostname, base and page path', async () => {
    const app = await createTestApp({
      base: '/base/',
      files: {
        'README.md': '# Home',
        'guide/index.md': '# Guide',
      },
      plugins: [],
    })

    const [filename, content] = await getSiteMap(
      app,
      { hostname: HOSTNAME },
      HOSTNAME,
    )

    expect(filename).toBe('sitemap.xml')
    expect(content).toContain('<loc>https://example.com/base/</loc>')
    expect(content).toContain('<loc>https://example.com/base/guide/</loc>')

    app.cleanup()
  })

  it('should not include the `404.html` page by default', async () => {
    const app = await createTestApp({
      files: {
        'README.md': '# Home',
        'draft/index.md': '# Draft',
      },
    })

    const [, content] = await getSiteMap(app, { hostname: HOSTNAME }, HOSTNAME)

    expect(content).not.toContain('404.html')
    // a regular page is kept
    expect(content).toContain('/draft/')

    app.cleanup()
  })

  it('should exclude the paths given by `excludePaths`', async () => {
    const app = await createTestApp({
      files: {
        'README.md': '# Home',
        'draft/index.md': '# Draft',
      },
    })

    const [, content] = await getSiteMap(
      app,
      { excludePaths: ['/draft/'], hostname: HOSTNAME },
      HOSTNAME,
    )

    expect(content).not.toContain('/draft/')

    app.cleanup()
  })

  it('should respect the `sitemap: false` frontmatter', async () => {
    const app = await createTestApp({
      files: {
        'README.md': '# Home',
        'secret/index.md': '---\nsitemap: false\n---\n# Secret',
      },
    })

    const [, content] = await getSiteMap(app, { hostname: HOSTNAME }, HOSTNAME)

    expect(content).toContain('<loc>https://example.com/</loc>')
    expect(content).not.toContain('/secret/')

    app.cleanup()
  })

  it('should skip pages with a `robots` noindex meta tag', async () => {
    const app = await createTestApp({
      files: {
        'README.md': '# Home',
        'hidden/index.md':
          '---\nhead:\n  - - meta\n    - name: robots\n      content: "noindex, nofollow"\n---\n# Hidden',
      },
    })

    const infos = getSitemapInfos(app, { hostname: HOSTNAME })

    expect(infos.map(([path]) => path)).toStrictEqual(['/'])

    app.cleanup()
  })

  it('should allow a page to override the `changefreq` and add `priority`', async () => {
    const app = await createTestApp({
      files: {
        'README.md': '# Home',
        'hot/index.md':
          '---\nsitemap:\n  changefreq: hourly\n  priority: 0.9\n---\n# Hot',
      },
    })

    const infos = getSitemapInfos(app, { hostname: HOSTNAME })

    expect(infos).toStrictEqual([
      ['/', { changefreq: 'daily', links: [] }],
      ['/hot/', { changefreq: 'hourly', links: [], priority: 0.9 }],
    ])

    app.cleanup()
  })

  it('should add `lastmod` from the `modifyTimeGetter`', async () => {
    const app = await createTestApp({
      files: { 'README.md': '# Home' },
    })

    const [, content] = await getSiteMap(
      app,
      {
        hostname: HOSTNAME,
        modifyTimeGetter: () =>
          new Date('2024-01-02T03:04:05.000Z').toISOString(),
      },
      HOSTNAME,
    )

    expect(content).toContain('<lastmod>2024-01-02T03:04:05.000Z</lastmod>')

    app.cleanup()
  })

  it('should include the extra urls', async () => {
    const app = await createTestApp({
      files: { 'README.md': '# Home' },
    })

    const [, content] = await getSiteMap(
      app,
      { extraUrls: ['/extra/', 'extra2.html'], hostname: HOSTNAME },
      HOSTNAME,
    )

    expect(content).toContain('<loc>https://example.com/extra/</loc>')
    expect(content).toContain('<loc>https://example.com/extra2.html</loc>')

    app.cleanup()
  })

  it('should add alternate links for pages available in multiple locales', async () => {
    const app = await createTestApp({
      locales: {
        '/': { lang: 'en' },
        '/zh/': { lang: 'zh-CN' },
      },
      files: {
        'README.md': '# Home',
        'zh/README.md': '# 首页',
      },
    })

    const [, content] = await getSiteMap(app, { hostname: HOSTNAME }, HOSTNAME)

    expect(content).toContain('hreflang="en" href="https://example.com/"')
    expect(content).toContain('hreflang="zh-CN" href="https://example.com/zh/"')

    app.cleanup()
  })

  it('should insert the xsl stylesheet declaration and use custom filenames', async () => {
    const app = await createTestApp({
      base: '/base/',
      files: { 'README.md': '# Home' },
    })

    const [filename, content] = await getSiteMap(
      app,
      {
        hostname: HOSTNAME,
        sitemapFilename: '/custom-map.xml',
        sitemapXSLFilename: '/custom.xsl',
      },
      HOSTNAME,
    )

    expect(filename).toBe('custom-map.xml')
    expect(content).toContain(
      '<?xml-stylesheet type="text/xsl" href="/base/custom.xsl"?>',
    )

    app.cleanup()
  })
})
