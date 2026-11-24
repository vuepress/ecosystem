import { renderVuePress } from '@vuepress/test-utils/client'
import { describe, expect, it } from 'vitest'
import type { VNode } from 'vue'
import { defineComponent, h } from 'vue'

import themeDataClientConfig from '../../../../plugins/development/plugin-theme-data/src/client/config.js'
import { useNavbarConfig } from '../../src/client/composables/useNavbarConfig.js'
import { useSidebarItems } from '../../src/client/composables/useSidebarItems.js'
import themeClassicClientConfig from '../../src/client/config.js'
import type { NavbarItem, SidebarItem } from '../../src/client/typings.js'

/**
 * The client configs that a classic theme site applies
 *
 * In a real site they are injected by the plugins and the theme, and here they
 * are applied explicitly so that the theme data and the sidebar providers
 * exist.
 */
const clientConfigs = [themeDataClientConfig, themeClassicClientConfig]

interface ResolvedItem {
  text?: string
  icon?: string
  link?: string
  children?: ResolvedItem[]
}

const resolveItem = (item: NavbarItem | SidebarItem): ResolvedItem => ({
  text: item.text,
  ...(item.icon ? { icon: item.icon } : {}),
  ...('link' in item && item.link ? { link: item.link } : {}),
  ...('children' in item
    ? {
        children: item.children.map((child) =>
          resolveItem(child as NavbarItem | SidebarItem),
        ),
      }
    : {}),
})

/**
 * Serialize the resolved items into one readable string
 *
 * @param items - The resolved items / 解析后的条目
 * @returns The serialized items / 序列化后的条目
 */
const serialize = (items: (NavbarItem | SidebarItem)[]): string =>
  JSON.stringify(items.map((item) => resolveItem(item)))

const NavbarProbe = defineComponent({
  name: 'TestNavbarProbe',
  setup(): () => VNode {
    const navbar = useNavbarConfig()

    return () => h('pre', { class: 'navbar' }, serialize(navbar.value))
  },
})

const SidebarProbe = defineComponent({
  name: 'TestSidebarProbe',
  setup(): () => VNode {
    const sidebar = useSidebarItems()

    return () => h('pre', { class: 'sidebar' }, serialize(sidebar.value))
  },
})

/**
 * Decode the entities that Vue escapes in the rendered text
 *
 * @param html - The rendered html / 渲染后的 html
 * @returns The decoded text / 解码后的文本
 */
const decodeText = (html: string): string =>
  html
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&amp;', '&')

const routes = {
  '/': { meta: { icon: 'vpi-home', title: 'Home' } },
  '/api/': { meta: { title: 'API' } },
  '/guide/': { meta: { icon: 'lucide:book', title: 'Guide' } },
  '/guide/child.html': { meta: { title: 'Child' } },
}

const themeData = {
  locales: {
    '/': {
      navbar: [
        // a link only item, resolved from the page meta
        { link: '/guide/' },
        // an external link, the text falls back to the link
        { link: 'https://example.com' },
        // a group with a link, the group keeps its text
        {
          text: 'Group',
          link: '/api/',
          children: [{ link: '/guide/child.html' }],
        },
      ],
      sidebar: {
        '/': [
          // a link only item, resolved from the page meta
          { link: '/guide/' },
          // a group with a link, the icon falls back to the page meta
          {
            text: 'API',
            link: '/api/',
            children: [{ link: '/guide/child.html' }],
          },
        ],
      },
    },
  },
}

describe('item meta', () => {
  it('should resolve the text and the icon of the navbar items', async () => {
    const html = await renderVuePress({
      clientConfigs,
      page: { path: '/', title: 'Home' },
      rootComponent: NavbarProbe,
      routes,
      site: { title: 'My Site' },
      themeData,
    })

    expect(decodeText(html)).toContain(
      JSON.stringify([
        { text: 'Guide', icon: 'lucide:book', link: '/guide/' },
        { text: 'https://example.com', link: 'https://example.com' },
        {
          text: 'Group',
          link: '/api/',
          children: [{ text: 'Child', link: '/guide/child.html' }],
        },
      ]),
    )
  })

  it('should resolve the text and the icon of the sidebar items', async () => {
    const html = await renderVuePress({
      clientConfigs,
      page: { path: '/', title: 'Home' },
      rootComponent: SidebarProbe,
      routes,
      site: { title: 'My Site' },
      themeData,
    })

    expect(decodeText(html)).toContain(
      JSON.stringify([
        { text: 'Guide', icon: 'lucide:book', link: '/guide/' },
        {
          text: 'API',
          link: '/api/',
          children: [{ text: 'Child', link: '/guide/child.html' }],
        },
      ]),
    )
  })
})
