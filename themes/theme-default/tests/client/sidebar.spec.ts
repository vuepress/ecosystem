// @vitest-environment happy-dom
import { mountVuePress, renderVuePress } from '@vuepress/test-utils/client'
import { describe, expect, it } from 'vitest'
import type { Component, VNode } from 'vue'
import { defineComponent, h } from 'vue'

import themeDataClientConfig from '../../../../plugins/development/plugin-theme-data/src/client/config.js'
import VPSidebarItem from '../../src/client/components/VPSidebarItem.vue'
import { useSidebarItems } from '../../src/client/composables/useSidebarItems.js'
import defaultThemeClientConfig from '../../src/client/config.js'
import type { SidebarItem } from '../../src/client/typings.js'

/**
 * The client configs that a default theme site applies
 *
 * They provide the theme locale data and run `setupSidebarItems()`, which is
 * required to resolve the sidebar items.
 */
const clientConfigs = [themeDataClientConfig, defaultThemeClientConfig]

/**
 * Serialize the resolved sidebar items into readable lines
 *
 * Groups are written as a line with their children indented below them, so that
 * the nesting and the resolved links can be asserted in one string.
 *
 * @param items - The sidebar items to serialize / 要序列化的侧边栏项
 * @param depth - The current nesting depth / 当前嵌套层级
 * @returns The serialized lines / 序列化后的行
 */
const serializeSidebar = (items: SidebarItem[], depth = 0): string =>
  items
    .map((item) => {
      const line = `${'  '.repeat(depth)}${item.text}${
        item.link ? ` | ${item.link}` : ''
      }`
      const children =
        'children' in item ? serializeSidebar(item.children, depth + 1) : ''

      return children ? `${line}\n${children}` : line
    })
    .join('\n')

const SidebarTree = defineComponent({
  name: 'TestSidebarTree',
  setup(): () => VNode {
    const sidebarItems = useSidebarItems()

    return () => h('pre', serializeSidebar(sidebarItems.value))
  },
})

describe(useSidebarItems, () => {
  it('should resolve the prefix and the nested children of an array config', async () => {
    const html = await renderVuePress({
      clientConfigs,
      rootComponent: SidebarTree,
      page: { path: '/foo/baz.html', title: 'Baz' },
      site: { title: 'My Site' },
      themeData: {
        locales: {
          '/': {
            sidebar: [
              { text: 'Foo', prefix: '/foo/', children: ['bar.md', '/ray.md'] },
              '/bar/README.md',
            ],
          },
        },
      },
    })

    // `prefix` is prepended to the relative children, while an absolute child
    // that starts with `/` is kept as it is
    expect(html).toContain(
      [
        'Foo',
        '  /foo/bar.html | /foo/bar.html',
        '  /ray.html | /ray.html',
        '/bar/ | /bar/',
      ].join('\n'),
    )
  })

  it('should match the longest path prefix of an object config', async () => {
    const html = await renderVuePress({
      clientConfigs,
      rootComponent: SidebarTree,
      page: { path: '/guide/nested/page.html', title: 'Page' },
      site: { title: 'My Site' },
      themeData: {
        locales: {
          '/': {
            sidebar: {
              '/guide/': [{ text: 'Guide', children: ['intro.md'] }],
              '/guide/nested/': [
                { text: 'Nested Guide', children: ['deep.md'] },
              ],
              '/reference/': 'heading',
            },
          },
        },
      },
    })

    // `/guide/nested/page.html` matches both `/guide/` and `/guide/nested/`,
    // and the longer prefix wins
    expect(html).toContain(
      'Nested Guide\n  /guide/nested/deep.html | /guide/nested/deep.html',
    )
    expect(html).not.toContain('intro.md')
  })

  it('should generate the items from the page title when the config is `heading`', async () => {
    const html = await renderVuePress({
      clientConfigs,
      rootComponent: SidebarTree,
      page: { path: '/reference/cli.html', title: 'CLI' },
      site: { title: 'My Site' },
      themeData: {
        locales: { '/': { sidebar: { '/reference/': 'heading' } } },
      },
    })

    expect(html).toContain('<pre>CLI</pre>')
  })

  it('should resolve an empty config when the sidebar is disabled', async () => {
    const html = await renderVuePress({
      clientConfigs,
      rootComponent: SidebarTree,
      page: { path: '/guide/', title: 'Guide' },
      site: { title: 'My Site' },
      themeData: { locales: { '/': { sidebar: false } } },
    })

    expect(html).toContain('<pre></pre>')
  })
})

/**
 * Wrap a sidebar item in a root component
 *
 * The item is passed as a prop, which the test client can only do through a
 * wrapper component.
 *
 * @param item - The sidebar item to render / 要渲染的侧边栏项
 * @returns The wrapper component / 包装组件
 */
const createItemWrapper = (item: SidebarItem): Component =>
  defineComponent({
    name: 'TestSidebarItemWrapper',
    setup(): () => VNode {
      return () => h(VPSidebarItem, { item })
    },
  })

describe('sidebar item', () => {
  it('should mark the item of the current page as active and expand it', async () => {
    const item: SidebarItem = {
      text: 'Foo',
      link: '/foo/',
      collapsible: true,
      children: [{ text: 'Bar', link: '/foo/bar.html' }],
    }

    const wrapper = await mountVuePress({
      rootComponent: createItemWrapper(item),
      page: { path: '/foo/', title: 'Foo' },
      site: { title: 'My Site' },
      // the element must be attached to the document for `isVisible()` to
      // read the computed style of `v-show`
      attachTo: document.body,
    })

    expect(wrapper.find('a.vp-sidebar-item').classes()).toContain('active')
    expect(wrapper.find('ul.vp-sidebar-children').isVisible()).toBe(true)
  })

  it('should toggle a collapsible group on click', async () => {
    const item: SidebarItem = {
      text: 'Foo',
      collapsible: true,
      children: [{ text: 'Bar', link: '/foo/bar.html' }],
    }

    const wrapper = await mountVuePress({
      rootComponent: createItemWrapper(item),
      page: { path: '/other/', title: 'Other' },
      site: { title: 'My Site' },
      attachTo: document.body,
    })

    const children = wrapper.find('ul.vp-sidebar-children')

    expect(children.isVisible()).toBe(false)

    await wrapper.find('p.vp-sidebar-item').trigger('click')

    expect(children.isVisible()).toBe(true)
  })
})
