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
import { registerExtraContainers } from '../../src/node/containers.js'
import { resolveThemeData, themeNew } from '../../src/node/themeNew.js'

const createTheme = (): ThemeObject => themeNew()

const containerPlugin = (md: MarkdownIt): void => registerExtraContainers(md)

describe(themeNew, () => {
  it('should create the theme with expected metadata', () => {
    const theme = createTheme()

    expect(theme.name).toBe('@vuepress/theme-new')
    expect(theme.templateBuild).toBeDefined()
    expect(existsSync(theme.templateBuild!)).toBe(true)
    // some plugin factories do not set a name, so only the named ones are
    // asserted here
    expect(theme.plugins).toHaveLength(9)
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
      frontmatter: { title: 'Guide' },
    })

    await createTheme().extendsPage?.(page, app)

    expect(page.data.filePathRelative).toBe('guide/index.md')
    expect(page.routeMeta.title).toBe(page.title)
  })
})

describe(registerExtraContainers, () => {
  it('should render the extra container markup', () => {
    const md = createTestMarkdown({ plugins: [containerPlugin] })

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
