// @vitest-environment happy-dom
import { mountVuePress } from '@vuepress/test-utils/client'
import { describe, expect, it } from 'vitest'
import type { VNode } from 'vue'
import { defineComponent, h } from 'vue'

import VPNavbarDropdown from '../../src/client/components/VPNavbarDropdown.vue'
import type { AutoLinkOptions, NavGroup } from '../../src/shared/index.js'

const dropdownConfig: NavGroup<AutoLinkOptions> = {
  text: 'Dropdown',
  children: [{ text: 'Item', link: '/item.html' }],
}

const Dropdowns = defineComponent({
  name: 'TestDropdowns',
  setup(): () => VNode {
    return () =>
      h('div', [
        h(VPNavbarDropdown, { config: dropdownConfig }),
        h(VPNavbarDropdown, { config: dropdownConfig }),
      ])
  },
})

describe('navbar dropdown', () => {
  it('should expose the controlled menu of each dropdown', async () => {
    const wrapper = await mountVuePress({
      rootComponent: Dropdowns,
      page: { path: '/', title: 'Home' },
      site: { title: 'My Site' },
    })

    const buttons = wrapper.findAll('button')
    const menus = wrapper.findAll('ul.vp-navbar-dropdown')

    // each dropdown has a desktop and a mobile trigger
    expect(buttons).toHaveLength(4)
    expect(menus).toHaveLength(2)

    expect(
      buttons.map((button) => button.attributes('aria-expanded')),
    ).toStrictEqual(['false', 'false', 'false', 'false'])

    // both triggers of a dropdown control the same menu
    expect(
      buttons.slice(0, 2).map((button) => button.attributes('aria-controls')),
    ).toStrictEqual([menus[0].attributes('id'), menus[0].attributes('id')])
    expect(buttons[2].attributes('aria-controls')).toBe(
      menus[1].attributes('id'),
    )

    // the menus of different dropdowns have different ids
    expect(menus[0].attributes('id')).not.toBe(menus[1].attributes('id'))
  })

  it('should toggle the menu with a keyboard activation', async () => {
    const wrapper = await mountVuePress({
      rootComponent: Dropdowns,
      page: { path: '/', title: 'Home' },
      site: { title: 'My Site' },
    })

    const buttons = wrapper.findAll('button')

    // the mobile trigger opens the menu
    await buttons[1].trigger('click')
    expect(
      buttons.map((button) => button.attributes('aria-expanded')),
    ).toStrictEqual(['true', 'true', 'false', 'false'])

    // a keyboard activation of the desktop trigger closes it
    await buttons[0].trigger('click', { detail: 0 })
    expect(
      buttons.map((button) => button.attributes('aria-expanded')),
    ).toStrictEqual(['false', 'false', 'false', 'false'])
  })
})
