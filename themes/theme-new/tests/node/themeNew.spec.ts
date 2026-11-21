import { existsSync } from 'node:fs'
import path from 'node:path'

import {
  createTestApp,
  createTestMarkdown,
  createTestPage,
} from '@vuepress/test-utils'
import type { MarkdownIt } from 'markdown-it'
import { describe, expect, it } from 'vitest'
import type { ThemeObject } from 'vuepress/core'

import clientConfig from '../../src/client/config.js'
import { registerContainers } from '../../src/node/containers.js'
import { resolveThemeData, themeNew } from '../../src/node/themeNew.js'

const createTheme = (): ThemeObject => themeNew()

const containerPlugin = (md: MarkdownIt): void => registerContainers(md)

describe(themeNew, () => {
  it('should create the theme with expected metadata', () => {
    const theme = createTheme()

    expect(theme.name).toBe('@vuepress/theme-new')
    expect(theme.templateBuild).toBeDefined()
    expect(existsSync(theme.templateBuild!)).toBe(true)
    // some plugin factories do not set a name, so only the named ones are
    // asserted here
    expect(theme.plugins).toHaveLength(8)
    expect(
      theme.plugins
        ?.map((plugin) => (plugin as { name?: string } | undefined)?.name)
        .filter(Boolean),
    ).toStrictEqual([
      '@vuepress/plugin-theme-data',
      '@vuepress/plugin-nprogress',
      '@vuepress/plugin-active-header-links',
      '@vuepress/plugin-icon',
    ])
  })

  it('should convert VitePress locale keys to route locale paths', () => {
    const themeData = resolveThemeData({
      locales: {
        root: { label: 'English', lang: 'en-US' },
        ja: { label: '日本語', lang: 'ja-JP' },
        zh: { label: '简体中文', lang: 'zh-CN', link: '/zh/' },
      },
      nav: [{ text: 'Guide', link: '/guide/' }],
    })

    expect(themeData).toStrictEqual({
      nav: [{ text: 'Guide', link: '/guide/' }],
      locales: {
        '/': { label: 'English', lang: 'en-US' },
        '/ja/': { label: '日本語', lang: 'ja-JP' },
        '/zh/': { label: '简体中文', lang: 'zh-CN', link: '/zh/' },
      },
    })
  })

  it('should register plugin-default containers through the theme', async () => {
    const app = await createTestApp({ theme: createTheme() })

    const html = app.markdown.render('::: tip\nHello\n:::', {})

    expect(html).toContain(
      '<div class="custom-container tip"><p class="custom-container-title">TIP</p>',
    )
  })

  it('should register the layout and the 404 layout', () => {
    const layouts = clientConfig.layouts as Record<string, unknown>

    expect(Object.keys(layouts)).toStrictEqual(['Layout', 'NotFound'])
  })

  it('should normalize VitePress layout names to the single layout', async () => {
    const app = await createTestApp()
    const theme = createTheme()

    const results = await Promise.all(
      (
        [
          ['home', 'Layout'],
          ['doc', 'Layout'],
          ['page', 'Layout'],
        ] as const
      ).map(async ([layout, normalized]) => {
        const page = await createTestPage(app, {
          filePath: path.join(app.dir.source(), `${layout}.md`),
          frontmatter: { layout },
        })

        await theme.extendsPage?.(page, app)

        return { layout, normalized, page }
      }),
    )

    for (const { layout, normalized, page } of results) {
      expect(page.data.originalLayout).toBe(layout)
      expect(page.data.frontmatter.layout).toBe(normalized)
    }

    const customPage = await createTestPage(app, {
      filePath: path.join(app.dir.source(), 'custom.md'),
      frontmatter: { layout: 'CommentPage' },
    })

    await theme.extendsPage?.(customPage, app)

    expect(customPage.data.originalLayout).toBeUndefined()
    expect(customPage.data.frontmatter.layout).toBe('CommentPage')
  })

  it('should extend the page with client data', async () => {
    const app = await createTestApp()
    const page = await createTestPage(app, {
      filePath: path.join(app.dir.source(), 'guide/index.md'),
      frontmatter: { title: 'Guide' },
    })

    await createTheme().extendsPage?.(page, app)

    expect(page.data.filePathRelative).toBe('guide/index.md')
    expect(page.routeMeta.title).toBe(page.title)
  })
})

describe(registerContainers, () => {
  it('should render the plugin default container markup', () => {
    const md = createTestMarkdown({ plugins: [containerPlugin] })

    expect(md.render('::: tip\nHello\n:::', {})).toContain(
      '<div class="custom-container tip"><p class="custom-container-title">TIP</p>',
    )

    expect(md.render('::: tip Custom title\nHello\n:::', {})).toContain(
      '<p class="custom-container-title">Custom title</p>',
    )

    expect(md.render('::: details\nHello\n:::', {})).toContain(
      '<details class="custom-container details"><summary class="custom-container-title">Details</summary>',
    )

    expect(md.render('::: warning\nHello\n:::', {})).toContain(
      '<div class="custom-container warning">',
    )

    expect(md.render('::: raw\nHello\n:::', {})).toContain(
      '<div class="vp-raw">',
    )

    expect(md.render('::: v-pre\nHello\n:::', {})).toContain('<div v-pre>')
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
