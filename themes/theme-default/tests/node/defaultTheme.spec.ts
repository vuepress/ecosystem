// oxlint-disable typescript/no-deprecated -- the classic theme syntax is asserted here
import { existsSync } from 'node:fs'
import path from 'node:path'

import { createTestApp, createTestPage } from '@vuepress/test-utils'
import { describe, expect, it } from 'vitest'
import type { ThemeObject } from 'vuepress/core'

import clientConfig from '../../src/client/config.js'
import { getSidebar } from '../../src/client/theme-default/support/sidebar.js'
import {
  resolveTemplateAppearance,
  resolveThemeData,
  defaultTheme,
} from '../../src/node/defaultTheme.js'

const createTheme = (
  options?: Parameters<typeof defaultTheme>[0],
): ThemeObject => defaultTheme(options)

describe(defaultTheme, () => {
  it('should create the theme with expected metadata', () => {
    const theme = createTheme()

    expect(theme.name).toBe('@vuepress/theme-default')
    expect(theme.templateBuild).toBeDefined()
    expect(existsSync(theme.templateBuild!)).toBe(true)
    expect(theme.userStyle).toBe('.vuepress/styles/index.css')
    // some plugin factories do not set a name, so only the named ones are
    // asserted here
    expect(theme.plugins).toHaveLength(14)
    expect(
      theme.plugins
        ?.map((plugin) => (plugin as { name?: string } | undefined)?.name)
        .filter(Boolean),
    ).toStrictEqual([
      '@vuepress/plugin-theme-data',
      '@vuepress/plugin-markdown-raw',
      '@vuepress/plugin-active-header-links',
      '@vuepress/plugin-icon',
      '@vuepress/plugin-medium-zoom',
      '@vuepress/plugin-nprogress',
    ])
  })

  it('should allow configuring or disabling the wired plugins', () => {
    const disabled = createTheme({
      themePlugins: {
        icon: false,
        nprogress: false,
        mediumZoom: false,
      },
      markdownPlugins: {
        raw: false,
      },
    })

    expect(disabled.plugins).toHaveLength(10)
    expect(
      disabled.plugins
        ?.map((plugin) => (plugin as { name?: string } | undefined)?.name)
        .filter(Boolean),
    ).toStrictEqual([
      '@vuepress/plugin-theme-data',
      '@vuepress/plugin-active-header-links',
    ])

    const configured = createTheme({
      themePlugins: { copyCode: { selector: '.custom pre' }, mediumZoom: {} },
    })

    expect(configured.plugins).toHaveLength(14)
  })

  it('should wire the SEO and sitemap plugins only when hostname is given', () => {
    expect(createTheme().plugins).toHaveLength(14)

    const withHostname = createTheme({ hostname: 'https://example.com' })

    expect(withHostname.plugins).toHaveLength(16)

    const disabled = createTheme({
      hostname: 'https://example.com',
      themePlugins: { seo: false, sitemap: false },
    })

    expect(disabled.plugins).toHaveLength(14)
  })

  it('should convert VitePress locale keys to route locale paths', () => {
    const themeData = resolveThemeData({
      locales: {
        root: { label: 'English', lang: 'en-US' },
        ja: { label: '日本語', lang: 'ja-JP' },
        zh: { label: '简体中文', lang: 'zh-CN', link: '/zh/' },
      },
      navbar: [{ text: 'Guide', link: '/guide/' }],
    })

    expect(themeData).toStrictEqual({
      navbar: [{ text: 'Guide', link: '/guide/' }],
      locales: {
        '/': { label: 'English', lang: 'en-US' },
        '/ja/': { label: '日本語', lang: 'ja-JP' },
        '/zh/': { label: '简体中文', lang: 'zh-CN', link: '/zh/' },
      },
    })

    // route-style keys are normalized as well
    expect(
      resolveThemeData({
        locales: {
          '/': { label: 'English', lang: 'en-US' },
          '/zh/': { label: '简体中文', lang: 'zh-CN' },
        },
      }).locales,
    ).toStrictEqual({
      '/': { label: 'English', lang: 'en-US' },
      '/zh/': { label: '简体中文', lang: 'zh-CN' },
    })
  })

  it('should render hint containers through the markdown hint plugin', async () => {
    const app = await createTestApp({ theme: createTheme() })

    expect(app.markdown.render('::: tip\nHello\n:::', {})).toContain(
      '<div class="hint-container tip">\n<p class="hint-container-title">Tips</p>',
    )

    expect(
      app.markdown.render('::: tip Custom title\nHello\n:::', {}),
    ).toContain('<p class="hint-container-title">Custom title</p>')

    expect(app.markdown.render('::: details\nHello\n:::', {})).toContain(
      '<details class="hint-container details"><summary>Details</summary>',
    )

    expect(app.markdown.render('::: warning\nHello\n:::', {})).toContain(
      '<div class="hint-container warning">',
    )
  })

  it('should forward the container labels to the markdown hint plugin', async () => {
    const app = await createTestApp({
      locales: { '/': { lang: 'en-US' }, '/zh/': { lang: 'zh-CN' } },
      theme: createTheme({
        tip: 'Custom Tip',
        warning: 'Be careful',
        locales: {
          root: { label: 'English', lang: 'en-US' },
          zh: { label: '简体中文', lang: 'zh-CN', tip: '提示' },
        },
      }),
    })

    expect(app.markdown.render('::: tip\nHello\n:::', {})).toContain(
      '<p class="hint-container-title">Custom Tip</p>',
    )

    expect(app.markdown.render('::: warning\nHello\n:::', {})).toContain(
      '<p class="hint-container-title">Be careful</p>',
    )

    expect(
      app.markdown.render('::: tip\nHello\n:::', {
        filePathRelative: 'zh/index.md',
      }),
    ).toContain('<p class="hint-container-title">提示</p>')
  })

  it('should register the layout and the 404 layout', () => {
    const layouts = clientConfig.layouts as Record<string, unknown>

    expect(Object.keys(layouts)).toStrictEqual(['Layout', 'NotFound'])
  })

  it('should keep the page type and layout untouched', async () => {
    const app = await createTestApp()
    const theme = createTheme()

    const page = await createTestPage(app, {
      filePath: path.join(app.dir.source(), 'home.md'),
      frontmatter: { type: 'home' },
    })

    await theme.extendsPage?.(page, app)

    expect(page.data.frontmatter.type).toBe('home')
    expect(page.data.frontmatter.layout).toBeUndefined()

    const customPage = await createTestPage(app, {
      filePath: path.join(app.dir.source(), 'custom.md'),
      frontmatter: { layout: 'CommentPage', type: 'page' },
    })

    await theme.extendsPage?.(customPage, app)

    expect(customPage.data.frontmatter.layout).toBe('CommentPage')
    expect(customPage.data.frontmatter.type).toBe('page')
  })

  it('should extend the page with client data', async () => {
    const app = await createTestApp()
    const page = await createTestPage(app, {
      filePath: path.join(app.dir.source(), 'guide/index.md'),
      frontmatter: { icon: 'lucide:book', title: 'Guide' },
    })

    await createTheme().extendsPage?.(page, app)

    expect(page.data.filePathRelative).toBe('guide/index.md')
    expect(page.routeMeta.title).toBe(page.title)
    expect(page.routeMeta.icon).toBe('lucide:book')
  })

  it('should only save a string icon into the route meta', async () => {
    const app = await createTestApp()
    const page = await createTestPage(app, {
      filePath: path.join(app.dir.source(), 'guide/svg.md'),
      frontmatter: { icon: { svg: '<svg></svg>' }, title: 'SVG' },
    })

    await createTheme().extendsPage?.(page, app)

    expect(page.routeMeta.icon).toBeUndefined()
  })
})

describe(resolveTemplateAppearance, () => {
  it('should resolve the appearance of the build template', () => {
    expect(resolveTemplateAppearance(false)).toBe('light')
    expect(resolveTemplateAppearance('dark')).toBe('dark')
    expect(resolveTemplateAppearance('force-dark')).toBe('force-dark')
    expect(resolveTemplateAppearance('force-auto')).toBe('force-auto')
    expect(resolveTemplateAppearance(true)).toBe('auto')
    expect(resolveTemplateAppearance(undefined)).toBe('auto')
    expect(resolveTemplateAppearance({ initialValue: 'dark' })).toBe('dark')
  })
})

describe('templateBuildRenderer', () => {
  const template =
    '<html lang="{{ lang }}" data-appearance="auto"><head><!--vuepress-ssr-head--></head><body><div id="app"><!--vuepress-ssr-content--></div><!--vuepress-ssr-scripts--></body></html>'

  const context = {
    content: '<main>content</main>',
    head: '<meta name="test" content="1" />',
    lang: 'en-US',
    prefetch: '',
    preload: '',
    scripts: '<script type="module" src="/app.js"></script>',
    styles: '',
    version: '2.0.0-rc.32',
  }

  it('should inject the fixed appearance and render the template outlets', () => {
    const theme = defaultTheme({ appearance: 'force-dark' })

    const html = theme.templateBuildRenderer!(template, context)

    expect(html).toContain('lang="en-US"')
    expect(html).toContain('data-appearance="force-dark"')
    expect(html).toContain(context.content)
    expect(html).toContain(context.head)
    expect(html).toContain(context.scripts)
  })

  it('should fall back to auto for the default appearance', () => {
    const html = defaultTheme().templateBuildRenderer!(template, context)

    expect(html).toContain('data-appearance="auto"')
  })
})

describe(getSidebar, () => {
  it('should disable the sidebar with `false`', () => {
    expect(getSidebar(false, '/guide/')).toStrictEqual([])
    expect(getSidebar(undefined, '/guide/')).toStrictEqual([])
  })

  it('should resolve string items and the deprecated classic theme keys', () => {
    const themeData = resolveThemeData({
      sidebar: [
        '/guide/',
        {
          text: 'Guide',
          prefix: '/guide/',
          children: ['/guide/install', { text: 'Usage', link: '/guide/usage' }],
        },
        {
          text: 'Collapsible',
          collapsible: true,
          expanded: true,
          children: ['/config/'],
        },
      ],
    })

    expect(themeData.sidebar).toStrictEqual([
      { link: '/guide/' },
      {
        text: 'Guide',
        base: '/guide/',
        items: [
          { link: '/guide/install' },
          { text: 'Usage', link: '/guide/usage' },
        ],
      },
      {
        text: 'Collapsible',
        collapsible: true,
        expanded: true,
        items: [{ link: '/config/' }],
      },
    ])
  })

  it('should not crash on the removed modes of the multi sidebar config', () => {
    const themeData = resolveThemeData({
      sidebar: {
        '/legacy/': 'heading',
        '/structure/': { items: 'structure', base: '/structure/' },
      } as never,
    })

    expect(themeData.sidebar).toStrictEqual({
      '/legacy/': [],
      '/structure/': { items: 'structure', base: '/structure/' },
    })
  })

  it('should support `false` in the multi sidebar config', () => {
    const themeData = resolveThemeData({
      sidebar: { '/guide/': ['/guide/a'], '/config/': false },
    })

    expect(themeData.sidebar).toStrictEqual({
      '/guide/': [{ link: '/guide/a' }],
      '/config/': false,
    })
  })
})

describe('navbar', () => {
  it('should normalize the classic theme syntax', () => {
    const themeData = resolveThemeData({
      navbar: [
        '/guide/',
        {
          text: 'Themes',
          prefix: '/themes/',
          children: [
            'default/',
            { text: 'Help', link: 'https://vuepress.vuejs.org/' },
          ],
        },
        { component: 'MyNavbarComponent' },
      ],
    })

    expect(themeData.navbar).toStrictEqual([
      { link: '/guide/' },
      {
        text: 'Themes',
        base: '/themes/',
        items: [
          { link: 'default/' },
          { text: 'Help', link: 'https://vuepress.vuejs.org/' },
        ],
      },
      { component: 'MyNavbarComponent' },
    ])
  })

  it('should keep `false` to hide the navbar', () => {
    expect(resolveThemeData({ navbar: false }).navbar).toBe(false)
  })
})

describe('markdown containers', () => {
  it('should render the v-pre and raw containers through the plugins', async () => {
    const app = await createTestApp({ theme: createTheme() })

    expect(app.markdown.render('::: raw\nHello\n:::', {})).toContain(
      '<div class="vp-raw">',
    )

    expect(app.markdown.render('::: v-pre\nHello\n:::', {})).toContain(
      '<div v-pre>',
    )
  })

  it('should not render the raw container when the markdown raw plugin is disabled', async () => {
    const app = await createTestApp({
      theme: createTheme({ markdownPlugins: { raw: false } }),
    })

    expect(app.markdown.render('::: raw\nHello\n:::', {})).toContain('::: raw')
  })

  it('should keep the v-pre container when the markdown raw plugin is disabled', async () => {
    const app = await createTestApp({
      theme: createTheme({ markdownPlugins: { raw: false } }),
    })

    expect(app.markdown.render('::: v-pre\nHello\n:::', {})).toContain(
      '<div v-pre>',
    )
  })

  it('should not render the v-pre container when the markdown extensions plugin is disabled', async () => {
    const app = await createTestApp({
      theme: createTheme({ markdownPlugins: { ext: false } }),
    })

    expect(app.markdown.render('::: v-pre\nHello\n:::', {})).toContain(
      '::: v-pre',
    )
  })

  it('should render code tabs through the markdown tab plugin', async () => {
    const app = await createTestApp({ theme: createTheme() })

    const html = app.markdown.render(
      '::: code-tabs\n@tab pnpm\n```bash\npnpm install\n```\n@tab npm\n```bash\nnpm install\n```\n:::',
      {},
    )

    expect(html).toContain('<VPCodeTabs')
    expect(html).toContain('>pnpm</template>')
    expect(html).toContain('>npm</template>')
  })
})
