import { renderVuePress } from '@vuepress/test-utils/client'
import { describe, expect, it } from 'vitest'
import type { VNode } from 'vue'
import { defineComponent, h } from 'vue'

import themeDataClientConfig from '../../../../plugins/development/plugin-theme-data/src/client/config.js'
import { useNavbarConfig } from '../../src/client/composables/useNavbarConfig.js'
import defaultThemeClientConfig from '../../src/client/config.js'
import type { NavbarItem } from '../../src/client/typings.js'

/**
 * The client configs that a default theme site applies
 *
 * In a real site they are injected by the plugins and the theme, and here they
 * are applied explicitly so that the `useThemeLocaleData()` provider exists and
 * the navbar config can be resolved.
 */
const clientConfigs = [themeDataClientConfig, defaultThemeClientConfig]

/**
 * Serialize the resolved navbar config into readable lines
 *
 * Groups are written as a line with their children indented below them, so that
 * the nesting and the resolved links can be asserted in one string.
 *
 * @param items - The navbar items to serialize / 要序列化的导航栏项
 * @param depth - The current nesting depth / 当前嵌套层级
 * @returns The serialized lines / 序列化后的行
 */
const serializeNavbar = (items: NavbarItem[], depth = 0): string =>
  items
    .map((item) => {
      const line = `${'  '.repeat(depth)}${item.text}${
        'link' in item ? ` | ${item.link}` : ''
      }`
      const children =
        'children' in item ? serializeNavbar(item.children, depth + 1) : ''

      return children ? `${line}\n${children}` : line
    })
    .join('\n')

const NavbarTree = defineComponent({
  name: 'TestNavbarTree',
  setup(): () => VNode {
    const navbar = useNavbarConfig()

    return () => h('pre', serializeNavbar(navbar.value))
  },
})

describe(useNavbarConfig, () => {
  it('should resolve the prefix and the nested children of a group', async () => {
    const html = await renderVuePress({
      clientConfigs,
      rootComponent: NavbarTree,
      site: { title: 'My Site' },
      themeData: {
        locales: {
          '/': {
            navbar: [
              {
                text: 'Group',
                prefix: '/group/',
                children: ['foo.md', '/absolute.md'],
              },
              {
                text: 'Nested',
                prefix: '/nested/',
                children: [
                  'top.md',
                  { text: 'Sub', prefix: 'sub/', children: ['inner.md'] },
                  { text: 'Example', link: 'https://example.com' },
                ],
              },
            ],
          },
        },
      },
    })

    // `prefix` is prepended to the relative children, while an absolute child
    // that starts with `/` and an external link are kept as they are
    expect(html).toContain(
      [
        'Group',
        '  /group/foo.html | /group/foo.html',
        '  /absolute.html | /absolute.html',
        'Nested',
        '  /nested/top.html | /nested/top.html',
        '  Sub',
        '    /nested/sub/inner.html | /nested/sub/inner.html',
        '  Example | https://example.com',
      ].join('\n'),
    )
  })

  it('should use the navbar config of the current locale', async () => {
    const html = await renderVuePress({
      clientConfigs,
      rootComponent: NavbarTree,
      page: { path: '/zh/guide/', title: '指南' },
      site: {
        locales: {
          '/': { lang: 'en-US', title: 'My Site' },
          '/zh/': { lang: 'zh-CN', title: '我的站点' },
        },
        title: 'My Site',
      },
      themeData: {
        locales: {
          '/': { navbar: [{ text: 'Home', link: '/' }] },
          '/zh/': { navbar: [{ text: '首页', link: '/zh/' }] },
        },
      },
    })

    expect(html).toContain('首页 | /zh/')
    expect(html).not.toContain('Home')
  })

  it('should resolve an empty config when the navbar is disabled', async () => {
    const html = await renderVuePress({
      clientConfigs,
      rootComponent: NavbarTree,
      site: { title: 'My Site' },
      themeData: { locales: { '/': { navbar: false } } },
    })

    expect(html).toContain('<pre></pre>')
  })
})
